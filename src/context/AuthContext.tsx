import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, getToken, setToken, removeToken, AuthResponse } from '../services/api';

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [token, setTokenState] = useState<string | null>(getToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progressMap, setProgressMap] = useState<Record<string, { challengeId: string; status: 'solved' | 'revealed'; pointsEarned?: number }>>({});

  const refreshProgress = async () => {
    if (!getToken()) return;
    try {
      const data = await api.getProgress();
      setProgressMap(data.progress || {});
      if (data.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.error('Failed to sync progress from MongoDB:', err);
    }
  };

  const refreshUser = async () => {
    const existingToken = getToken();
    if (!existingToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const { user: fetchedUser } = await api.getMe();
      setUser(fetchedUser);
      await refreshProgress();
    } catch (err) {
      console.warn('Session expired or invalid, logging out:', err);
      removeToken();
      setTokenState(null);
      setUser(null);
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
