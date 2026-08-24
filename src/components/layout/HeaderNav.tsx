import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Search, Trophy, CheckCircle2, Terminal, LogIn, UserPlus } from 'lucide-react';

interface HeaderNavProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const { user } = useAuth();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/5 select-none">
      {/* Brand Title */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 group">
          <h1 className="text-xl md:text-2xl font-display font-bold text-txt-on-dark tracking-tight flex items-center gap-2 group-hover:text-flag transition-colors">
            <span>FlagForge</span>
          </h1>
        </Link>
      </div>

      {/* Center Search Pill matching reference */}
      <div className="relative flex-1 max-w-xs md:max-w-sm">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 absolute left-3.5 text-txt-subtle pointer-events-none" />
          <input
            type="text"
            placeholder="Cari materi atau topik CTF..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-panel text-txt-on-light text-xs md:text-sm pl-9 pr-4 py-2 rounded-full border border-black/10 focus:outline-none focus:ring-2 focus:ring-flag placeholder:text-txt-subtle transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-xs text-txt-subtle hover:text-txt-on-light font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Right Stats & Quick Actions */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            {/* Solved Pills */}
            <Link
              to="/profile"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-dark-card border border-white/5 hover:border-flag/30 transition-all text-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-state-solved" />
              <span className="text-txt-muted">Solved:</span>
              <span className="font-mono font-bold text-txt-on-dark">{user.solvedCount}</span>
            </Link>

            {/* Points Pill */}
            <Link
              to="/profile"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-dark-card border border-flag/20 hover:border-flag/40 transition-all text-xs font-mono"
            >
              <Trophy className="w-3.5 h-3.5 text-flag" />
              <span className="font-bold text-flag">{user.points}</span>
              <span className="text-txt-muted text-[10px]">PTS</span>
            </Link>

            {/* Sandbox Quick Launcher */}
            <Link
              to="/terminal"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-panel text-txt-on-light font-medium text-xs hover:bg-white transition-all shadow-sm"
            >
              <Terminal className="w-3.5 h-3.5 text-flag" />
              <span>Sandbox</span>
            </Link>

            {/* User Profile Pill */}
            <Link
              to="/profile"
              className="px-3.5 py-1.5 rounded-full bg-flag hover:bg-flag-hover text-white text-xs font-semibold shadow-orange-glow-sm transition-all"
            >
              <span>{user.username}</span>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="px-3.5 py-1.5 rounded-full bg-surface-panel text-txt-on-light font-semibold text-xs hover:bg-white transition-all flex items-center gap-1.5 shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Masuk</span>
            </Link>

            <Link
              to="/register"
              className="px-3.5 py-1.5 rounded-full bg-flag hover:bg-flag-hover text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-orange-glow-sm"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Daftar</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
