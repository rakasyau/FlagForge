import express from 'express';
import { User } from '../models/User.js';
import { ChallengeProgress } from '../models/ChallengeProgress.js';
import { Submission } from '../models/Submission.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get User Progress & Solved challenges
router.get('/', authMiddleware, async (req, res) => {
  try {
    const progressList = await ChallengeProgress.find({ userId: req.userId });
    const progressMap = {};
    for (const item of progressList) {
      progressMap[item.challengeId] = {
        challengeId: item.challengeId,
        status: item.status,
        pointsEarned: item.pointsEarned,
        solvedAt: item.solvedAt,
        revealedAt: item.revealedAt
      };
    }

    const user = await User.findById(req.userId).select('-password');
    res.json({
      progress: progressMap,
      user
    });
  } catch (err) {
    console.error('Fetch progress error:', err);
    res.status(500).json({ error: 'Gagal mengambil data progress.' });
  }
});

// Record a Solve
router.post('/solve', authMiddleware, async (req, res) => {
  try {
    const { challengeId, category, points, submittedValue, challengeTitle } = req.body;

    // Check existing progress
    let prog = await ChallengeProgress.findOne({ userId: req.userId, challengeId });
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User tidak ditemukan.' });
    }

    // Record submission log
    await Submission.create({
      userId: req.userId,
      challengeId,
      challengeTitle: challengeTitle || challengeId,
      category,
      submittedValue,
      isCorrect: true,
      submittedAt: new Date()
    });

    if (prog) {
      if (prog.status === 'solved') {
        return res.json({ message: 'Soal ini sudah pernah diselesaikan.', user, progress: prog });
      }
      // Was revealed earlier -> now solved
      prog.status = 'solved';
      prog.pointsEarned = points;
      prog.solvedAt = new Date();
      await prog.save();

      user.solvedCount += 1;
      user.revealedCount = Math.max(0, user.revealedCount - 1);
      user.points += points;
    } else {
      prog = await ChallengeProgress.create({
        userId: req.userId,
        challengeId,
        category,
        status: 'solved',
        pointsEarned: points,
        solvedAt: new Date()
      });

      user.solvedCount += 1;
      user.points += points;
    }

    // Update Title Rank
    if (user.points >= 800) user.title = 'Elite CTF Master';
    else if (user.points >= 400) user.title = 'Cyber Vanguard';
    else if (user.points >= 150) user.title = 'Apprentice Hacker';

    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    res.json({
      message: `Selamat! Flag valid. Poin bertambah +${points}.`,
      user: userObj,
      progress: prog
    });
  } catch (err) {
    console.error('Solve challenge error:', err);
    res.status(500).json({ error: 'Gagal menyimpan penyelesaian soal.' });
  }
});

// Record a Surrender / Reveal
router.post('/surrender', authMiddleware, async (req, res) => {
  try {
    const { challengeId, category, challengeTitle } = req.body;

    let prog = await ChallengeProgress.findOne({ userId: req.userId, challengeId });
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User tidak ditemukan.' });
    }

    if (!prog) {
      prog = await ChallengeProgress.create({
        userId: req.userId,
        challengeId,
        category,
        status: 'revealed',
        pointsEarned: 0,
        revealedAt: new Date()
      });

      user.revealedCount += 1;
      await user.save();
    }

    // Record surrender in submissions log
    await Submission.create({
      userId: req.userId,
      challengeId,
      challengeTitle: challengeTitle || challengeId,
      category,
      submittedValue: '[SURRENDER_REVEALED]',
      isCorrect: false,
      submittedAt: new Date()
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.json({
      message: 'Soal ditandai sebagai Revealed.',
      user: userObj,
      progress: prog
    });
  } catch (err) {
    console.error('Surrender error:', err);
    res.status(500).json({ error: 'Gagal menyimpan status menyerah.' });
  }
});

// Get User Submissions History
router.get('/submissions', authMiddleware, async (req, res) => {
  try {
    const subs = await Submission.find({ userId: req.userId })
      .sort({ submittedAt: -1 })
      .limit(50);
    res.json({ submissions: subs });
  } catch (err) {
    console.error('Fetch submissions error:', err);
    res.status(500).json({ error: 'Gagal mengambil riwayat submission.' });
  }
});

export default router;
