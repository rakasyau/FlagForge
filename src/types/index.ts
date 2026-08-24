export type CategoryId = 
  | 'pengantar'
  | 'environment'
  | 'linux'
  | 'networking'
  | 'crypto'
  | 'web'
  | 'forensics'
  | 'stego'
  | 'reverse'
  | 'pwn'
  | 'osint'
  | 'scripting'
  | 'strategi'
  | 'resources';

export type ChallengeCategory = 
  | 'linux'
  | 'networking'
  | 'crypto'
  | 'web'
  | 'forensics'
  | 'stego'
  | 'reverse'
  | 'pwn'
  | 'osint'
  | 'scripting';

export type DifficultyTier = 'basic' | 'menengah' | 'advance';

export type ChallengeStatus = 'not_attempted' | 'solved' | 'revealed';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  shortName: string;
  tag: string;
  icon: string;
  description: string;
  difficultyTier: DifficultyTier;
  color: string;
  chapterNumber: number;
}

export interface ModuleSection {
  id: string;
  title: string;
  content: string;
  codeSnippets?: {
    language: string;
    code: string;
    description?: string;
  }[];
}

export interface ModuleChapter {
  id: CategoryId;
  chapterNumber: number;
  title: string;
  subtitle?: string;
  summary: string;
  readingTimeMinutes: number;
  sections: ModuleSection[];
  practiceChallengeIds: string[];
}

export interface VirtualFile {
  name: string;
  type: 'file' | 'dir';
  content?: string;
  permissions?: string;
  owner?: string;
  size?: number;
  children?: { [key: string]: VirtualFile };
}

export interface VirtualFSConfig {
  initialDir: string;
  currentUser: string;
  hostname: string;
  root: VirtualFile;
}

export interface Challenge {
  id: string;
  category: ChallengeCategory;
  title: string;
  difficulty: DifficultyTier;
  points: number;
  description: string;
  flagHash: string; // SHA-256 hash of the valid flag
  flagFormat?: string;
  hints: string[];
  explanationMd: string; // Step-by-step writeup revealed on surrender or solve
  attachmentUrl?: string;
  attachmentName?: string;
  attachmentData?: string; // Text/base64 mock preview
  hasTerminal: boolean;
  terminalFsConfig?: VirtualFSConfig;
  hasCodeRunner?: boolean;
  codeRunnerStarter?: string;
  author?: string;
}

export interface SubmissionLog {
  id: string;
  challengeId: string;
  challengeTitle: string;
  category: ChallengeCategory;
  submittedValue: string;
  isCorrect: boolean;
  submittedAt: string;
}

export interface UserChallengeProgress {
  challengeId: string;
  status: ChallengeStatus;
  attemptsCount: number;
  solvedAt?: string;
  revealedAt?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  title: string;
  createdAt: string;
  points: number;
  solvedCount: number;
  revealedCount: number;
  categoryStats: Record<ChallengeCategory, { solved: number; revealed: number; total: number }>;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0 to 100
  requirementText: string;
}

export type ActiveTab = 'landing' | 'dashboard' | 'modules' | 'practice' | 'terminal' | 'profile';
