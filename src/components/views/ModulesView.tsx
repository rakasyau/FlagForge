import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CategoryId } from '../../types';
import { CATEGORIES, MODULE_CHAPTERS } from '../../data/modulesData';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import { 
  ChevronRight, 
  Clock, 
  Bookmark, 
  ArrowRight,
  Swords,
  BookOpen,
  ChevronDown
} from 'lucide-react';

export const ModulesView: React.FC = () => {
  const { kategori } = useParams<{ kategori?: string }>();
  const navigate = useNavigate();

  const [activeChapterId, setActiveChapterId] = useState<CategoryId>((kategori as CategoryId) || 'pengantar');
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  useEffect(() => {
    if (kategori && CATEGORIES.some(c => c.id === kategori)) {
      setActiveChapterId(kategori as CategoryId);
    }
  }, [kategori]);

  const currentChapter = MODULE_CHAPTERS.find(m => m.id === activeChapterId) || MODULE_CHAPTERS[0];

  const handleSelectChapter = (catId: CategoryId) => {
    setActiveChapterId(catId);
    setIsMobileTocOpen(false);
    navigate(`/modul/${catId}`);
  };

  const handlePracticeRedirect = () => {
    if (currentChapter.practiceChallengeIds.length > 0) {
      navigate(`/latihan/${currentChapter.id}/${currentChapter.practiceChallengeIds[0]}`);
    } else {
      navigate('/latihan');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Category Selector Pills */}
      <section className="bg-surface-panel text-txt-on-light rounded-2xl sm:rounded-[32px] p-4 sm:p-6 shadow-panel-card border border-white/70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-4">
          <div>
            <span className="text-[10px] sm:text-xs font-mono font-bold text-flag uppercase tracking-wider block mb-1">
              CURRICULUM ARCHIVE
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-txt-on-light flex items-center gap-2">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-flag shrink-0" />
              <span>Modul Pembelajaran CTF (14 Bab)</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-txt-subtle font-mono">
            <Clock className="w-4 h-4 text-flag shrink-0" />
            <span>Estimasi: ~120 Menit Belajar</span>
          </div>
        </div>

        {/* Category Horizontal Pills with generous touch padding */}
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 px-1 scrollbar-thin">
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeChapterId;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectChapter(cat.id)}
                className={`pill-button shrink-0 transition-all ${
                  isActive
                    ? 'bg-void text-txt-on-dark shadow-md ring-2 ring-flag ring-offset-2 ring-offset-surface-panel scale-[1.02]'
                    : 'pill-button-light'
                }`}
              >
                <span>{cat.chapterNumber}. {cat.shortName}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Chapter Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mobile TOC Collapsible Toggle (< lg) */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
            className="w-full bg-surface-dark-card rounded-2xl p-4 border border-white/10 flex items-center justify-between text-xs font-mono text-txt-on-dark font-bold shadow-md"
          >
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-flag" />
              <span>Daftar 14 Bab ({currentChapter.chapterNumber}. {currentChapter.title})</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-txt-subtle transition-transform duration-200 ${isMobileTocOpen ? 'rotate-180 text-flag' : ''}`} />
          </button>

          {isMobileTocOpen && (
            <div className="mt-2 bg-surface-dark-card rounded-2xl p-3 border border-white/10 space-y-1 max-h-72 overflow-y-auto scrollbar-thin animate-fade-in shadow-xl">
              {MODULE_CHAPTERS.map((chap) => {
                const isCurrent = chap.id === activeChapterId;
                return (
                  <button
                    key={chap.id}
                    onClick={() => handleSelectChapter(chap.id)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between group ${
                      isCurrent
                        ? 'bg-void text-flag font-bold border border-flag/30 shadow-sm'
                        : 'text-txt-muted hover:bg-white/5 hover:text-txt-on-dark'
                    }`}
                  >
                    <span className="truncate pr-2">{chap.chapterNumber}. {chap.title}</span>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-flag' : 'text-txt-subtle'}`} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Left: Chapter Table of Contents Sidebar (Desktop >= lg) */}
        <aside className="hidden lg:block lg:col-span-4 space-y-4">
          <div className="bg-surface-dark-card rounded-[28px] p-5 border border-white/5 shadow-xl sticky top-4">
            <h3 className="text-sm font-display font-bold text-txt-on-dark mb-3 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-flag" />
              <span>Daftar Bab Pembelajaran</span>
            </h3>

            <div className="space-y-1.5 max-h-[540px] overflow-y-auto pr-1 scrollbar-thin">
              {MODULE_CHAPTERS.map((chap) => {
                const isCurrent = chap.id === activeChapterId;
                return (
                  <button
                    key={chap.id}
                    onClick={() => handleSelectChapter(chap.id)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between group ${
                      isCurrent
                        ? 'bg-void text-flag font-bold border border-flag/30 shadow-sm'
                        : 'text-txt-muted hover:bg-white/5 hover:text-txt-on-dark'
                    }`}
                  >
                    <span className="truncate pr-2">{chap.title}</span>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-flag' : 'text-txt-subtle group-hover:translate-x-0.5 transition-transform'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right: Active Chapter Full Reading View with Real Markdown Rendering */}
        <main className="lg:col-span-8 space-y-6">
          <article className="bg-surface-dark-card rounded-2xl sm:rounded-[32px] p-4 sm:p-6 md:p-8 border border-white/5 shadow-2xl space-y-6">
            {/* Chapter Header */}
            <div className="pb-6 border-b border-white/10 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-flag/15 text-flag border border-flag/30">
                  BAB {currentChapter.chapterNumber}
                </span>
                <span className="text-xs text-txt-subtle flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {currentChapter.readingTimeMinutes} min read
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-txt-on-dark leading-tight">
                {currentChapter.title}
              </h1>

              <p className="text-xs sm:text-sm text-txt-muted leading-relaxed">
                {currentChapter.summary}
              </p>
            </div>

            {/* Sub-sections Rendered with Rich Markdown Parser */}
            <div className="space-y-8">
              {currentChapter.sections.map((section) => (
                <section key={section.id} className="space-y-3">
                  <MarkdownRenderer content={section.content} />
                </section>
              ))}
            </div>

            {/* Bottom Action: "Coba Soal Kategori Ini" */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-void/40 p-4 sm:p-5 rounded-2xl">
              <div>
                <h4 className="font-display font-bold text-sm text-txt-on-dark mb-0.5">
                  Sudah Paham Konsep Bab Ini?
                </h4>
                <p className="text-xs text-txt-muted">
                  Uji pemahaman Anda dengan menyelesaikan tantangan latihan praktis.
                </p>
              </div>

              <button
                onClick={handlePracticeRedirect}
                className="px-5 py-2.5 rounded-full bg-flag hover:bg-flag-hover text-white text-xs font-semibold shadow-orange-glow-sm transition-all flex items-center justify-center gap-2 shrink-0 group"
              >
                <Swords className="w-4 h-4" />
                <span>Coba Soal Kategori Ini</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};
