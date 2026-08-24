export interface AuthResponse {
  message: string;
  token: string;
  user: {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    title: string;
    points: number;
    solvedCount: number;
    revealedCount: number;
    createdAt: string;
  };
}

const TOKEN_KEY = 'flagforge_auth_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`/api${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Terjadi kesalahan pada permintaan ke server.');
  }

  return data as T;
}

export const api = {
  // Auth
  register: (body: { username: string; email: string; password: string }) =>
    request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  login: (body: { emailOrUsername: string; password: string }) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  getMe: () =>
    request<{ user: AuthResponse['user'] }>('/auth/me'),

  // Progress
  getProgress: () =>
    request<{
      progress: Record<string, { challengeId: string; status: 'solved' | 'revealed'; pointsEarned: number }>;
      user: AuthResponse['user'];
    }>('/progress'),

  solveChallenge: (body: {
    challengeId: string;
    category: string;
    points: number;
    submittedValue: string;
    challengeTitle: string;
  }) =>
    request<{ message: string; user: AuthResponse['user']; progress: any }>('/progress/solve', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  surrenderChallenge: (body: {
    challengeId: string;
    category: string;
    challengeTitle: string;
  }) =>
    request<{ message: string; user: AuthResponse['user']; progress: any }>('/progress/surrender', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  getSubmissions: () =>
    request<{ submissions: Array<{ _id: string; challengeId: string; challengeTitle: string; category: string; submittedValue: string; isCorrect: boolean; submittedAt: string }> }>('/progress/submissions'),
};
