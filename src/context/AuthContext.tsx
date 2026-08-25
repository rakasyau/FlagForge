import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, getToken, setToken, removeToken, AuthResponse } from '../services/api';
import { getUser as getLocalUser, getProgress as getLocalProgress } from '../services/storage';

interface AuthContextType {
  user: AuthResponse['user'] | null;
  token: string | null;
  isLoading: boolean;
  login: (emailOrUsername: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  progressMap: Record<string, { challengeId: string; status: 'solved' | 'revealed'; pointsEarned?: number }>;
  refreshProgress: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<AuthResponse['user'] | null>>;
  setProgressMap: React.Dispatch<React.SetStateAction<Record<string, { challengeId: string; status: 'solved' | 'revealed'; pointsEarned?: number }>>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Reads localStorage progress into the progressMap format expected by UI. */
function loadLocalProgress(): Record<string, { challengeId: string; status: 'solved' | 'revealed'; pointsEarned?: number }> {
  const raw = getLocalProgress();
  const result: Record<string, { challengeId: string; status: 'solved' | 'revealed'; pointsEarned?: number }> = {};
  for (const [id, entry] of Object.entries(raw)) {
    if (entry.status === 'solved' || entry.status === 'revealed') {
      result[id] = { challengeId: id, status: entry.status };
    }
  }
  return result;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [token, setTokenState] = useState<string | null>(getToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progressMap, setProgressMap] = useState<Record<string, { challengeId: string; status: 'solved' | 'revealed'; pointsEarned?: number }>>({});

  const refreshProgress = async () => {
    try {
      if (getToken()) {
        const data = await api.getProgress();
        setProgressMap(data.progress || {});
        if (data.user) {
          setUser(data.user);
        }
        return;
      }
    } catch {
      // Server unreachable — fall through to localStorage
    }
    // Fallback: load progress from localStorage
    setProgressMap(loadLocalProgress());
  };

  const refreshUser = async () => {
    const existingToken = getToken();
    if (!existingToken) {
      // No token — use localStorage user as offline/guest mode
      const localUser = getLocalUser();
      setUser(localUser as any);
      setProgressMap(loadLocalProgress());
      setIsLoading(false);
      return;
    }

    try {
      const { user: fetchedUser } = await api.getMe();
      setUser(fetchedUser);
      await refreshProgress();
    } catch {
      // Server unreachable — use local user instead of logging out
      const localUser = getLocalUser();
      setUser(localUser as any);
      setProgressMap(loadLocalProgress());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (emailOrUsername: string, password: string) => {
    const res = await api.login({ emailOrUsername, password });
    setToken(res.token);
    setTokenState(res.token);
    setUser(res.user);
    await refreshProgress();
  };

  const register = async (username: string, email: string, password: string) => {
    const res = await api.register({ username, email, password });
    setToken(res.token);
    setTokenState(res.token);
    setUser(res.user);
    await refreshProgress();
  };

  const logout = () => {
    removeToken();
    setTokenState(null);
    setUser(null);
    setProgressMap({});
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
        progressMap,
        refreshProgress,
        setUser,
        setProgressMap,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
