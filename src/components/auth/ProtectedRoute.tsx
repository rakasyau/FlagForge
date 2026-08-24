import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-flag/20 border-t-flag animate-spin" />
        <p className="text-xs font-mono text-txt-muted uppercase tracking-wider">
          Memverifikasi sesi...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
