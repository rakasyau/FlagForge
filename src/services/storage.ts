import { UserProfile, UserChallengeProgress, SubmissionLog, Badge, ChallengeCategory } from '../types';
import { CHALLENGES } from '../data/challengesData';

const USER_KEY = 'flagforge_user';
const PROGRESS_KEY = 'flagforge_progress';
const LOGS_KEY = 'flagforge_logs';

export function getCategoryTotals(): Record<ChallengeCategory, number> {
  const totals: Record<ChallengeCategory, number> = {
    linux: 0,
    networking: 0,
    crypto: 0,
    web: 0,
    forensics: 0,
    stego: 0,
    reverse: 0,
    pwn: 0,
    osint: 0,
    scripting: 0,
  };

  for (const c of CHALLENGES) {
    if (totals[c.category] !== undefined) {
      totals[c.category] += 1;
    }
  }
  return totals;
}

const defaultTotals = getCategoryTotals();

export const INITIAL_USER: UserProfile = {
  id: 'usr_cadet_01',
  username: 'CyberCadet',
  email: 'cadet@flagforge.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  title: 'Novice Flag Hunter',
  createdAt: new Date().toISOString(),
  points: 0,
  solvedCount: 0,
  revealedCount: 0,
  categoryStats: {
    linux: { solved: 0, revealed: 0, total: defaultTotals.linux },
    networking: { solved: 0, revealed: 0, total: defaultTotals.networking },
    crypto: { solved: 0, revealed: 0, total: defaultTotals.crypto },
    web: { solved: 0, revealed: 0, total: defaultTotals.web },
    forensics: { solved: 0, revealed: 0, total: defaultTotals.forensics },
    stego: { solved: 0, revealed: 0, total: defaultTotals.stego },
    reverse: { solved: 0, revealed: 0, total: defaultTotals.reverse },
    pwn: { solved: 0, revealed: 0, total: defaultTotals.pwn },
    osint: { solved: 0, revealed: 0, total: defaultTotals.osint },
    scripting: { solved: 0, revealed: 0, total: defaultTotals.scripting },
  }
};

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first_blood',
    name: 'First Blood',
    description: 'Menyelesaikan soal pertama secara mandiri tanpa menyerah.',
    icon: 'Droplet',
    unlocked: false,
    progress: 0,
    requirementText: 'Solve 1 challenge'
  },
  {
    id: 'terminal_ninja',
    name: 'Terminal Ninja',
    description: 'Menyelesaikan 3+ soal tantangan Linux & Networking.',
    icon: 'Terminal',
    unlocked: false,
    progress: 0,
    requirementText: 'Solve 3+ Linux & Network challenges'
  },
  {
    id: 'crypto_cracked',
    name: 'Cipher Breaker',
    description: 'Menembus 3+ tantangan Kriptografi (Base64, Caesar, XOR, RSA).',
    icon: 'Key',
    unlocked: false,
    progress: 0,
    requirementText: 'Solve 3 Crypto challenges'
  },
  {
    id: 'web_injector',
    name: 'Web Exploiter',
    description: 'Menemukan celah SQLi, XSS, LFI, atau JWT pada target web.',
    icon: 'Globe',
    unlocked: false,
    progress: 0,
    requirementText: 'Solve 3 Web challenges'
  },
  {
    id: 'persistent_hacker',
    name: 'Persistent Solver',
    description: 'Mencapai total 500+ poin kompetisi CTF.',
    icon: 'ShieldCheck',
    unlocked: false,
    progress: 0,
    requirementText: 'Earn 500 points'
  }
];

export function getUser(): UserProfile {
  const saved = localStorage.getItem(USER_KEY);
  if (saved) {
    try {
      const user = JSON.parse(saved);
      // Ensure category total stats stay synced with current challenge list
      const totals = getCategoryTotals();
      for (const cat of Object.keys(totals) as ChallengeCategory[]) {
        if (!user.categoryStats[cat]) {
          user.categoryStats[cat] = { solved: 0, revealed: 0, total: totals[cat] };
        } else {
          user.categoryStats[cat].total = totals[cat];
        }
      }
      return user;
    } catch {
      // fallback
    }
  }
  localStorage.setItem(USER_KEY, JSON.stringify(INITIAL_USER));
  return INITIAL_USER;
}

export function saveUser(user: UserProfile): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getProgress(): Record<string, UserChallengeProgress> {
  const saved = localStorage.getItem(PROGRESS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }
  return {};
}

export function getChallengeProgress(challengeId: string): UserChallengeProgress {
  const progressMap = getProgress();
  return progressMap[challengeId] || {
    challengeId,
    status: 'not_attempted',
    attemptsCount: 0,
  };
}

export function markChallengeSolved(challengeId: string, category: ChallengeCategory, points: number): void {
  const progressMap = getProgress();
  const current = progressMap[challengeId] || { challengeId, status: 'not_attempted', attemptsCount: 0 };
  
  if (current.status !== 'solved') {
    const wasRevealed = current.status === 'revealed';
    current.status = 'solved';
    current.solvedAt = new Date().toISOString();
    current.attemptsCount += 1;
    progressMap[challengeId] = current;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressMap));

    // Update user stats & points
    const user = getUser();
    user.solvedCount += 1;
    if (wasRevealed) {
      user.revealedCount = Math.max(0, user.revealedCount - 1);
    }
    user.points += points;
    if (user.categoryStats[category]) {
      user.categoryStats[category].solved += 1;
      if (wasRevealed) {
        user.categoryStats[category].revealed = Math.max(0, user.categoryStats[category].revealed - 1);
      }
    }
    
    // Update title based on points
    if (user.points >= 1500) user.title = 'Grandmaster CTF Elite';
    else if (user.points >= 800) user.title = 'Elite CTF Master';
    else if (user.points >= 400) user.title = 'Cyber Vanguard';
    else if (user.points >= 150) user.title = 'Apprentice Hacker';

    saveUser(user);
  }
}

export function markChallengeRevealed(challengeId: string, category: ChallengeCategory): void {
  const progressMap = getProgress();
  const current = progressMap[challengeId] || { challengeId, status: 'not_attempted', attemptsCount: 0 };

  if (current.status === 'not_attempted') {
    current.status = 'revealed';
    current.revealedAt = new Date().toISOString();
    progressMap[challengeId] = current;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressMap));

    const user = getUser();
    user.revealedCount += 1;
    if (user.categoryStats[category]) {
      user.categoryStats[category].revealed += 1;
    }
    saveUser(user);
  }
}

export function getLogs(): SubmissionLog[] {
  const saved = localStorage.getItem(LOGS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }
  return [];
}

export function addSubmissionLog(
  challengeId: string,
  challengeTitle: string,
  category: ChallengeCategory,
  submittedValue: string,
  isCorrect: boolean
): void {
  const logs = getLogs();
  const newLog: SubmissionLog = {
    id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    challengeId,
    challengeTitle,
    category,
    submittedValue,
    isCorrect,
    submittedAt: new Date().toISOString()
  };
  const updatedLogs = [newLog, ...logs].slice(0, 50); // Keep last 50 submissions
  localStorage.setItem(LOGS_KEY, JSON.stringify(updatedLogs));
}

export function getBadges(user: UserProfile): Badge[] {
  return INITIAL_BADGES.map(badge => {
    let unlocked = false;
    let progress = 0;

    if (badge.id === 'first_blood') {
      progress = user.solvedCount > 0 ? 100 : 0;
      unlocked = user.solvedCount >= 1;
    } else if (badge.id === 'terminal_ninja') {
      const linuxSolved = user.categoryStats.linux?.solved || 0;
      const netSolved = user.categoryStats.networking?.solved || 0;
      const totalRequired = 3;
      const done = linuxSolved + netSolved;
      progress = Math.min(100, Math.round((done / totalRequired) * 100));
      unlocked = done >= totalRequired;
    } else if (badge.id === 'crypto_cracked') {
      const cryptoSolved = user.categoryStats.crypto?.solved || 0;
      const target = 3;
      progress = Math.min(100, Math.round((cryptoSolved / target) * 100));
      unlocked = cryptoSolved >= target;
    } else if (badge.id === 'web_injector') {
      const webSolved = user.categoryStats.web?.solved || 0;
      const target = 3;
      progress = Math.min(100, Math.round((webSolved / target) * 100));
      unlocked = webSolved >= target;
    } else if (badge.id === 'persistent_hacker') {
      progress = Math.min(100, Math.round((user.points / 500) * 100));
      unlocked = user.points >= 500;
    }

    return {
      ...badge,
      unlocked,
      progress
    };
  });
}
