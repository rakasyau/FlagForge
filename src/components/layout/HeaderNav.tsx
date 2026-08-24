import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MODULE_CHAPTERS } from '../../data/modulesData';
import { CHALLENGES } from '../../data/challengesData';
import { 
  Search, 
  Trophy, 
  CheckCircle2, 
  Terminal, 
  LogIn, 
  UserPlus, 
  BookOpen, 
  Swords, 
  Flame, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface HeaderNavProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global Ctrl+K / Cmd+K shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const cleanQuery = searchQuery.trim().toLowerCase();

  // Search in Modules
  const matchingModules = cleanQuery
    ? MODULE_CHAPTERS.filter((m) => {
        const titleMatch = m.title.toLowerCase().includes(cleanQuery);
        const summaryMatch = m.summary.toLowerCase().includes(cleanQuery);
        const sectionMatch = m.sections.some(
          (s) => s.title.toLowerCase().includes(cleanQuery) || s.content.toLowerCase().includes(cleanQuery)
        );
        return titleMatch || summaryMatch || sectionMatch;
      }).slice(0, 4)
    : [];

  // Search in Challenges
  const matchingChallenges = cleanQuery
    ? CHALLENGES.filter((c) => {
        const titleMatch = c.title.toLowerCase().includes(cleanQuery);
        const descMatch = c.description.toLowerCase().includes(cleanQuery);
        const catMatch = c.category.toLowerCase().includes(cleanQuery);
        return titleMatch || descMatch || catMatch;
      }).slice(0, 4)
    : [];

  const hasResults = matchingModules.length > 0 || matchingChallenges.length > 0;

  const handleSelectModule = (catId: string) => {
    setIsOpen(false);
    setSearchQuery('');
    navigate(`/modul/${catId}`);
  };

  const handleSelectChallenge = (category: string, challengeId: string) => {
    setIsOpen(false);
    setSearchQuery('');
    navigate(`/latihan/${category}/${challengeId}`);
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/5 select-none relative z-50">
      {/* Brand Title */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 group">
          <h1 className="text-xl md:text-2xl font-display font-bold text-txt-on-dark tracking-tight flex items-center gap-2 group-hover:text-flag transition-colors">
            <span>FlagForge</span>
          </h1>
        </Link>
      </div>

      {/* Center Search Pill & Live Dropdown Matrix */}
      <div ref={searchContainerRef} className="relative flex-1 max-w-xs md:max-w-md">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 absolute left-3.5 text-txt-subtle pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari materi atau soal CTF... (Ctrl+K)"
            value={searchQuery}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
            }}
            className="w-full bg-surface-panel text-txt-on-light text-xs md:text-sm pl-9 pr-8 py-2 rounded-full border border-black/10 focus:outline-none focus:ring-2 focus:ring-flag placeholder:text-txt-subtle transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setIsOpen(false);
              }}
              className="absolute right-3 text-xs text-txt-subtle hover:text-txt-on-light font-bold"
              title="Hapus pencarian"
            >
              ✕
            </button>
          )}
        </div>

        {/* Live Search Results Popup */}
        {isOpen && cleanQuery.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-surface-dark-card border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-in max-h-[460px] overflow-y-auto scrollbar-thin">
            {hasResults ? (
              <div className="p-3 space-y-4">
                {/* Module Results Group */}
                {matchingModules.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-flag uppercase tracking-wider px-2 py-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>MODUL MATERI ({matchingModules.length})</span>
                    </div>

                    <div className="space-y-1 mt-1">
                      {matchingModules.map((mod) => (
                        <div
                          key={mod.id}
                          onClick={() => handleSelectModule(mod.id)}
                          className="p-2.5 rounded-xl bg-void/50 hover:bg-void hover:border-flag/40 border border-white/5 transition-all cursor-pointer group flex items-start justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-flag/15 text-flag">
                                Bab {mod.chapterNumber}
                              </span>
                              <h4 className="font-display font-bold text-xs text-txt-on-dark group-hover:text-flag transition-colors">
                                {mod.title}
                              </h4>
                            </div>
                            <p className="text-[11px] text-txt-muted line-clamp-1">
                              {mod.summary}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-txt-subtle group-hover:text-flag group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenge Results Group */}
                {matchingChallenges.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-flag uppercase tracking-wider px-2 py-1">
                      <Swords className="w-3.5 h-3.5" />
                      <span>SOAL LATIHAN CTF ({matchingChallenges.length})</span>
                    </div>

                    <div className="space-y-1 mt-1">
                      {matchingChallenges.map((ch) => (
                        <div
                          key={ch.id}
                          onClick={() => handleSelectChallenge(ch.category, ch.id)}
                          className="p-2.5 rounded-xl bg-void/50 hover:bg-void hover:border-flag/40 border border-white/5 transition-all cursor-pointer group flex items-center justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-white/10 text-txt-on-dark uppercase">
                                {ch.category}
                              </span>
                              <span className="text-[10px] text-txt-subtle font-mono">
                                {ch.difficulty}
                              </span>
                              <h4 className="font-display font-bold text-xs text-txt-on-dark group-hover:text-flag transition-colors">
                                {ch.title}
                              </h4>
                            </div>
                            <p className="text-[11px] text-txt-muted line-clamp-1">
                              {ch.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] font-mono font-bold text-flag flex items-center gap-0.5">
                              <Flame className="w-3 h-3 fill-flag" />
                              +{ch.points}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-txt-subtle group-hover:text-flag group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-center text-txt-muted text-xs font-mono space-y-1">
                <Sparkles className="w-6 h-6 text-txt-subtle mx-auto mb-2 opacity-50" />
                <p className="text-txt-on-dark font-bold">Tidak ada hasil ditemukan</p>
                <p className="text-[11px] text-txt-subtle">
                  Tidak ada materi atau soal yang cocok dengan kata kunci "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        )}
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
