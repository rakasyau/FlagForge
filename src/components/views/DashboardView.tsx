import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, MODULE_CHAPTERS } from '../../data/modulesData';
import { CHALLENGES } from '../../data/challengesData';
import { useAuth } from '../../context/AuthContext';
import { 
  CheckCircle2, 
  Eye, 
  ArrowRight, 
  Flame, 
  BookOpen, 
  Swords, 
  ChevronRight,
  TrendingUp,
  Shield
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { user, progressMap } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const totalChallenges = CHALLENGES.length;
  const overallPercentage = Math.round((user.solvedCount / totalChallenges) * 100) || 0;

  // Find unsolved recommendations
  const recommendedChallenges = CHALLENGES.filter(c => {
    const p = progressMap[c.id];
    return !p || p.status !== 'solved';
  }).slice(0, 4);

  // Find active recommended chapter dynamically
  const firstUnsolvedCategory = CATEGORIES.find(cat => {
    if (['pengantar', 'environment', 'strategi', 'resources'].includes(cat.id)) return false;
    const catChallenges = CHALLENGES.filter(ch => ch.category === cat.id);
    return catChallenges.some(ch => progressMap[ch.id]?.status !== 'solved');
  }) || CATEGORIES[2]; // fallback to Linux

  const activeChapter = MODULE_CHAPTERS.find(m => m.id === firstUnsolvedCategory.id) || MODULE_CHAPTERS[2];

  return (
    <div className="space-y-8 pb-10">
      {/* Top Greeting & Overview Card */}
      <section className="bg-surface-panel text-txt-on-light rounded-2xl sm:rounded-[32px] p-4 sm:p-6 md:p-8 shadow-panel-card border border-white/70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-4 ring-flag/30 shrink-0 bg-void/10">
              <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] sm:text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-flag/10 text-flag">
                  {user.title}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-txt-on-light">
                Selamat Datang, {user.username}!
              </h2>
              <p className="text-[11px] sm:text-xs text-txt-subtle mt-0.5">
                Lanjutkan latihan untuk menguasai 10 kategori CTF dan meningkatkan ranking.
              </p>
            </div>
          </div>

          {/* Points & Solved Stats */}
          <div className="flex items-center justify-around gap-2 sm:gap-4 flex-wrap bg-white p-3 sm:p-4 rounded-2xl border border-black/5 shadow-sm w-full md:w-auto">
            <div className="text-center px-2 sm:px-3">
              <span className="text-[10px] sm:text-xs text-txt-subtle block font-mono">TOTAL SCORE</span>
              <span className="text-xl sm:text-2xl font-display font-bold text-flag flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-flag" />
                {user.points}
              </span>
            </div>
            <div className="w-px h-8 sm:h-10 bg-black/10" />
            <div className="text-center px-2 sm:px-3">
              <span className="text-[10px] sm:text-xs text-txt-subtle block font-mono">SOLVED</span>
              <span className="text-xl sm:text-2xl font-display font-bold text-state-solved flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                {user.solvedCount}
              </span>
            </div>
            <div className="w-px h-8 sm:h-10 bg-black/10" />
            <div className="text-center px-2 sm:px-3">
              <span className="text-[10px] sm:text-xs text-txt-subtle block font-mono">REVEALED</span>
              <span className="text-xl sm:text-2xl font-display font-bold text-state-revealed flex items-center justify-center gap-1">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                {user.revealedCount}
              </span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-black/10">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-txt-on-light font-bold flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-flag" />
              Progress Keseluruhan Platform: {user.solvedCount}/{totalChallenges} Soal
            </span>
            <span className="font-bold text-flag">{overallPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-black/10 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-flag rounded-full transition-all duration-500 shadow-orange-glow-sm"
              style={{ width: `${Math.max(3, overallPercentage)}%` }}
            />
          </div>
        </div>
      </section>

      {/* Two Column Grid: Category Mastery & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Category Mastery Bars */}
        <div className="lg:col-span-7 bg-surface-dark-card rounded-[28px] p-6 border border-white/5 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-bold text-txt-on-dark flex items-center gap-2">
              <Shield className="w-5 h-5 text-flag" />
              <span>Progress Per Kategori</span>
            </h3>
            <button
              onClick={() => navigate('/latihan')}
              className="text-xs text-flag hover:underline font-mono font-medium cursor-pointer"
            >
              Lihat Semua Soal ({totalChallenges}) →
            </button>
          </div>

          <div className="space-y-3.5">
            {CATEGORIES.filter(c => !['pengantar', 'environment', 'strategi', 'resources'].includes(c.id)).map((cat) => {
              const catChallenges = CHALLENGES.filter(ch => ch.category === cat.id);
              const total = catChallenges.length;
              const solvedCount = catChallenges.filter(ch => progressMap[ch.id]?.status === 'solved').length;
              const percent = total > 0 ? Math.min(100, Math.round((solvedCount / total) * 100)) : 0;

              return (
                <div 
                  key={cat.id} 
                  onClick={() => navigate(`/modul/${cat.id}`)}
                  className="p-3.5 rounded-xl bg-void/50 border border-white/5 hover:border-flag/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-display font-bold text-txt-on-dark group-hover:text-flag transition-colors flex items-center gap-2">
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-txt-subtle font-mono font-normal">({solvedCount}/{total} Solved)</span>
                    </span>
                    <span className="font-mono text-txt-muted text-[11px]">{percent}%</span>
                  </div>

                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden flex">
                    <div 
                      className="h-full bg-flag transition-all duration-300 rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Recommendations & "Lanjutkan Belajar" */}
        <div className="lg:col-span-5 space-y-6">
          {/* Lanjutkan Belajar Card */}
          <div className="bg-surface-dark-card rounded-[28px] p-6 border border-white/5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-display font-bold text-txt-on-dark flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-flag" />
                <span>Rekomendasi Materi</span>
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-flag/15 text-flag">
                Bab {activeChapter.chapterNumber} Aktif
              </span>
            </div>

            <div className="bg-void/60 rounded-2xl p-4 border border-white/5">
              <span className="text-[10px] font-mono text-flag font-bold block mb-1">LANJUTKAN BELAJAR</span>
              <h4 className="font-display font-bold text-sm text-txt-on-dark mb-1">
                {activeChapter.chapterNumber}. {activeChapter.title}
              </h4>
              <p className="text-xs text-txt-muted line-clamp-2 mb-3">
                {activeChapter.summary}
              </p>
              <button
                onClick={() => navigate(`/modul/${activeChapter.id}`)}
                className="w-full py-2 bg-flag hover:bg-flag-hover text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Buka Bab {activeChapter.chapterNumber} Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Recommended Next Challenges */}
          <div className="bg-surface-dark-card rounded-[28px] p-6 border border-white/5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-display font-bold text-txt-on-dark flex items-center gap-2">
                <Swords className="w-4 h-4 text-flag" />
                <span>Rekomendasi Soal Berikutnya</span>
              </h3>
            </div>

            <div className="space-y-2.5">
              {recommendedChallenges.map((ch) => (
                <div
                  key={ch.id}
                  onClick={() => navigate(`/latihan/${ch.category}/${ch.id}`)}
                  className="p-3 rounded-xl bg-void/40 border border-white/5 hover:border-flag/40 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.2 rounded bg-flag/15 text-flag">
                        {ch.category}
                      </span>
                      <span className="text-[10px] text-txt-subtle font-mono">+{ch.points} PTS</span>
                    </div>
                    <h5 className="text-xs font-bold text-txt-on-dark group-hover:text-flag transition-colors">
                      {ch.title}
                    </h5>
                  </div>
                  <ChevronRight className="w-4 h-4 text-txt-subtle group-hover:text-flag group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
