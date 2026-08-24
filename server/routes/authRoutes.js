import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { authMiddleware, generateToken } from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Harap isi semua kolom pendaftaran.' });
    }

    if (username.length < 3) {
      return res.status(400).json({ error: 'Username minimal 3 karakter.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password minimal 6 karakter.' });
    }

    // Check existing
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.trim() }]
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return res.status(400).json({ error: 'Email sudah terdaftar. Silakan login.' });
      }
      return res.status(400).json({ error: 'Username sudah digunakan. Pilih username lain.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username.trim())}`,
      title: 'Novice Flag Hunter',
      points: 0,
      solvedCount: 0,
      revealedCount: 0,
    });

    await user.save();
    const token = generateToken(user._id);

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({
      message: 'Registrasi berhasil!',
      token,
      user: userObj
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Terjadi kesalahan server saat registrasi.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({ error: 'Harap masukkan email/username dan password.' });
    }

    const searchStr = emailOrUsername.trim();
    const user = await User.findOne({
      $or: [
        { email: searchStr.toLowerCase() },
        { username: searchStr }
      ]
    });

    if (!user) {
      return res.status(400).json({ error: 'Email atau username tidak ditemukan.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Password salah. Periksa kembali kata sandi Anda.' });
    }

    const token = generateToken(user._id);
    const userObj = user.toObject();
    delete userObj.password;

    res.json({
      message: 'Login berhasil!',
      token,
      user: userObj
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Terjadi kesalahan server saat login.' });
  }
});

// Get Current User Profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil profil pengguna.' });
  }
});

export default router;
