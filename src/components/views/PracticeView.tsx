import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Challenge } from '../../types';
import { CHALLENGES } from '../../data/challengesData';
import { CATEGORIES } from '../../data/modulesData';
import { verifyFlag } from '../../services/cryptoUtils';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import { InteractiveTerminal } from '../terminal/InteractiveTerminal';
import { PythonCodeRunner } from '../coderunner/PythonCodeRunner';
import { SurrenderModal } from '../practice/SurrenderModal';
import { 
  CheckCircle2, 
  Eye, 
  AlertCircle, 
  ChevronRight, 
  Download, 
  HelpCircle, 
  Flame, 
  Terminal as TerminalIcon, 
  Code, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const PracticeView: React.FC = () => {
  const { kategori, id } = useParams<{ kategori?: string; id?: string }>();
  const navigate = useNavigate();
  const { progressMap, refreshProgress, setUser } = useAuth();

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>(kategori || 'all');
  const [activeDifficultyFilter, setActiveDifficultyFilter] = useState<string>('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('all');
  
  // Active challenge state
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [flagInput, setFlagInput] = useState('');
  const [submissionFeedback, setSubmissionFeedback] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSurrenderModalOpen, setIsSurrenderModalOpen] = useState(false);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'terminal' | 'coderunner'>('terminal');
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    if (kategori && CATEGORIES.some(c => c.id === kategori)) {
      setActiveCategoryFilter(kategori);
    }
  }, [kategori]);

  useEffect(() => {
    if (id) {
      const found = CHALLENGES.find(c => c.id === id);
      if (found) {
        setActiveChallenge(found);
        setFlagInput('');
        setSubmissionFeedback({ type: null, message: '' });
        setShowHints(false);
        setActiveWorkspaceTab(found.hasCodeRunner && !found.hasTerminal ? 'coderunner' : 'terminal');
      }
    } else {
      setActiveChallenge(null);
    }
  }, [id]);

  // Filtered challenges
  const filteredChallenges = CHALLENGES.filter(c => {
    if (activeCategoryFilter !== 'all' && c.category !== activeCategoryFilter) return false;
    if (activeDifficultyFilter !== 'all' && c.difficulty !== activeDifficultyFilter) return false;
    
    const progress = progressMap[c.id];
    const status = progress ? progress.status : 'not_attempted';
    if (activeStatusFilter === 'solved' && status !== 'solved') return false;
    if (activeStatusFilter === 'revealed' && status !== 'revealed') return false;
    if (activeStatusFilter === 'unsolved' && status === 'solved') return false;

    return true;
  });

  const handleSelectChallenge = (c: Challenge) => {
    setActiveChallenge(c);
    navigate(`/latihan/${c.category}/${c.id}`);
  };

  const handleBackToCatalog = () => {
    setActiveChallenge(null);
    navigate('/latihan');
  };

  const handleSubmitFlag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChallenge || !flagInput.trim()) return;

    setIsVerifying(true);
    setSubmissionFeedback({ type: null, message: '' });

    const isValid = await verifyFlag(flagInput, activeChallenge.flagHash);

    if (isValid) {
      try {
        const res = await api.solveChallenge({
          challengeId: activeChallenge.id,
          category: activeChallenge.category,
          points: activeChallenge.points,
          submittedValue: flagInput.trim(),
          challengeTitle: activeChallenge.title,
        });

        setUser(res.user);
        await refreshProgress();

        setSubmissionFeedback({
          type: 'success',
          message: `KERJA BAGUS! Flag valid. Anda mendapatkan +${activeChallenge.points} Poin!`
        });
      } catch (err: any) {
        setSubmissionFeedback({
          type: 'error',
          message: err.message || 'Gagal menyimpan ke server.'
        });
      }
    } else {
      setSubmissionFeedback({
        type: 'error',
        message: 'Flag salah! Periksa format `flag{...}` dan coba teliti kembali petunjuk soal.'
      });
    }

    setIsVerifying(false);
  };

  const handleConfirmSurrender = async () => {
    if (!activeChallenge) return;
    try {
      const res = await api.surrenderChallenge({
        challengeId: activeChallenge.id,
        category: activeChallenge.category,
        challengeTitle: activeChallenge.title,
      });

      setUser(res.user);
      await refreshProgress();

      setSubmissionFeedback({
        type: 'error',
        message: 'Soal ditandai sebagai Dilihat Jawabannya (Revealed). Penjelasan langkah demi langkah telah terbuka di bawah.'
      });
    } catch (err: any) {
      console.error('Surrender error:', err);
    }
  };

  // Helper status badge
  const renderStatusBadge = (challengeId: string) => {
    const progress = progressMap[challengeId];
    const status = progress ? progress.status : 'not_attempted';

    if (status === 'solved') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-state-solved/15 text-state-solved border border-state-solved/30 text-[10px] font-mono font-bold">
          <CheckCircle2 className="w-3 h-3" />
          <span>SOLVED</span>
        </span>
      );
    }
    if (status === 'revealed') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-state-revealed/15 text-state-revealed border border-state-revealed/30 text-[10px] font-mono font-bold">
          <Eye className="w-3 h-3" />
          <span>REVEALED</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/5 text-txt-subtle text-[10px] font-mono">
        <span>BELUM DICOBA</span>
      </span>
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ================= VIEW 1: CHALLENGE CATALOG ================= */}
      {!activeChallenge ? (
        <div className="space-y-6">
          {/* Header & Filter Controls */}
          <section className="bg-surface-panel text-txt-on-light rounded-[32px] p-6 shadow-panel-card border border-white/70 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-flag uppercase tracking-wider block mb-1">
                  TACTICAL DRILLS
                </span>
                <h2 className="text-2xl font-display font-bold text-txt-on-light">
                  Katalog Soal Latihan CTF
                </h2>
              </div>
              <div className="text-xs text-txt-subtle font-mono">
                Menampilkan <strong className="text-txt-on-light">{filteredChallenges.length}</strong> Soal Tersedia
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-black/10">
              {/* Category Pills */}
              <div className="flex items-center gap-2.5 overflow-x-auto py-2.5 px-2 scrollbar-thin w-full">
                <button
                  onClick={() => setActiveCategoryFilter('all')}
                  className={`pill-button shrink-0 transition-all ${
                    activeCategoryFilter === 'all'
                      ? 'bg-void text-txt-on-dark ring-2 ring-flag ring-offset-2 ring-offset-surface-panel shadow-md scale-[1.02]'
                      : 'pill-button-light'
                  }`}
                >
                  Semua Kategori
                </button>
                {CATEGORIES.filter(c => c.id !== 'pengantar' && c.id !== 'strategi' && c.id !== 'resources').map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryFilter(cat.id)}
                    className={`pill-button shrink-0 transition-all ${
                      activeCategoryFilter === cat.id
                        ? 'bg-void text-txt-on-dark ring-2 ring-flag ring-offset-2 ring-offset-surface-panel shadow-md scale-[1.02]'
                        : 'pill-button-light'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty & Status Filter Sub-bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono pt-2">
              <div className="flex items-center gap-2">
                <span className="text-txt-subtle">Kesulitan:</span>
                {['all', 'basic', 'menengah', 'advance'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setActiveDifficultyFilter(d)}
                    className={`px-2.5 py-1 rounded-lg uppercase font-bold transition-all ${
                      activeDifficultyFilter === d ? 'bg-void text-flag' : 'text-txt-subtle hover:text-txt-on-light'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-txt-subtle">Status:</span>
                {['all', 'unsolved', 'solved', 'revealed'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveStatusFilter(s)}
                    className={`px-2.5 py-1 rounded-lg uppercase font-bold transition-all ${
                      activeStatusFilter === s ? 'bg-void text-flag' : 'text-txt-subtle hover:text-txt-on-light'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Challenge Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChallenges.map((challenge) => (
              <div
                key={challenge.id}
                onClick={() => handleSelectChallenge(challenge)}
                className="bg-surface-dark-card rounded-[24px] p-5 border border-white/5 hover:border-flag/40 transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-flag/15 text-flag border border-flag/30">
                      {challenge.category}
                    </span>
                    {renderStatusBadge(challenge.id)}
                  </div>

                  <h3 className="font-display font-bold text-base text-txt-on-dark group-hover:text-flag transition-colors">
                    {challenge.title}
                  </h3>

                  <p className="text-xs text-txt-muted line-clamp-2 leading-relaxed">
                    {challenge.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-flag font-bold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-flag" />
                    +{challenge.points} PTS
                  </span>
                  <span className="text-txt-subtle group-hover:text-txt-on-dark flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    <span>Buka Soal</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ================= VIEW 2: INDIVIDUAL CHALLENGE WORKSPACE ================= */
        <div className="space-y-6">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToCatalog}
              className="px-4 py-2 rounded-full bg-surface-dark-card border border-white/10 hover:border-flag/40 text-xs font-semibold text-txt-on-dark transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Katalog Latihan</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-txt-muted uppercase">
                {activeChallenge.category} • {activeChallenge.difficulty}
              </span>
              {renderStatusBadge(activeChallenge.id)}
            </div>
          </div>

          {/* Main Challenge Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Challenge Description, Hints, & Flag Submission */}
            <div className="lg:col-span-5 space-y-6">
              {/* Challenge Overview Card */}
              <div className="bg-surface-dark-card rounded-[28px] p-6 border border-white/10 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-flag/15 text-flag">
                      {activeChallenge.category.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-txt-subtle">
                      Tingkat: {activeChallenge.difficulty}
                    </span>
                  </div>
                  <span className="text-sm font-mono font-bold text-flag flex items-center gap-1">
                    <Flame className="w-4 h-4 fill-flag" />
                    +{activeChallenge.points} PTS
                  </span>
                </div>

                <h1 className="text-2xl font-display font-bold text-txt-on-dark">
                  {activeChallenge.title}
                </h1>

                <div className="text-xs md:text-sm text-txt-on-dark/90 leading-relaxed whitespace-pre-line">
                  {activeChallenge.description}
                </div>

                {/* Attachment File Card if available */}
                {activeChallenge.attachmentName && (
                  <div className="p-3.5 rounded-2xl bg-void/60 border border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-flag" />
                      <div>
                        <span className="font-mono font-bold text-txt-on-dark block">
                          {activeChallenge.attachmentName}
                        </span>
                        <span className="text-[10px] text-txt-subtle">Lampiran Soal CTF</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-state-solved">Loaded in Terminal</span>
                  </div>
                )}

                {/* Collapsible Hints */}
                {activeChallenge.hints.length > 0 && (
                  <div className="pt-2">
                    <button
                      onClick={() => setShowHints(!showHints)}
                      className="text-xs font-semibold text-txt-muted hover:text-flag flex items-center gap-1.5 transition-colors"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{showHints ? 'Sembunyikan Petunjuk' : 'Buka Petunjuk (Hint)'}</span>
                    </button>

                    {showHints && (
                      <div className="mt-2.5 p-3 rounded-xl bg-void/70 border border-flag/20 space-y-1.5 text-xs text-txt-muted animate-fade-in">
                        {activeChallenge.hints.map((h, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-flag font-bold font-mono">#{i + 1}</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Flag Submission Form */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <span className="text-xs font-mono font-bold text-txt-on-dark block">
                    Submit Flag Jawaban:
                  </span>

                  <form onSubmit={handleSubmitFlag} className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="flag{...}"
                        value={flagInput}
                        onChange={(e) => setFlagInput(e.target.value)}
                        className="w-full bg-[#0A0A0C] text-txt-on-dark font-mono text-xs md:text-sm px-4 py-3 rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-flag placeholder:text-txt-subtle"
                        spellCheck={false}
                      />
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="submit"
                        disabled={isVerifying || !flagInput.trim()}
                        className="flex-1 py-2.5 bg-flag hover:bg-flag-hover disabled:opacity-50 text-white rounded-xl text-xs font-mono font-bold shadow-orange-glow-sm transition-all"
                      >
                        {isVerifying ? 'Memverifikasi...' : 'Submit Flag 🚩'}
                      </button>

                      {/* Reveal on Surrender Button */}
                      <button
                        type="button"
                        onClick={() => setIsSurrenderModalOpen(true)}
                        className="px-3.5 py-2.5 bg-white/5 hover:bg-state-locked/20 text-txt-muted hover:text-state-locked rounded-xl text-xs font-mono transition-colors border border-white/10"
                        title="Saya Menyerah & Tampilkan Jawaban"
                      >
                        Menyerah?
                      </button>
                    </div>
                  </form>

                  {/* Submission Result Feedback */}
                  {submissionFeedback.type && (
                    <div
                      className={`p-3 rounded-xl text-xs font-mono flex items-start gap-2 animate-fade-in ${
                        submissionFeedback.type === 'success'
                          ? 'bg-state-solved/15 text-state-solved border border-state-solved/30'
                          : 'bg-state-locked/15 text-state-locked border border-state-locked/30'
                      }`}
                    >
                      {submissionFeedback.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      )}
                      <span>{submissionFeedback.message}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Reveal-on-Surrender / Solved Explanation Panel rendered with MarkdownRenderer */}
              {(progressMap[activeChallenge.id]?.status === 'solved' ||
                progressMap[activeChallenge.id]?.status === 'revealed') && (
                <div className="bg-surface-dark-card text-txt-on-dark rounded-[28px] p-6 shadow-2xl border border-flag/30 space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-flag" />
                      <h4 className="font-display font-bold text-sm text-txt-on-dark">
                        Pembahasan & Write-Up Resmi
                      </h4>
                    </div>
                    {renderStatusBadge(activeChallenge.id)}
                  </div>

                  <MarkdownRenderer content={activeChallenge.explanationMd} />
                </div>
              )}
            </div>

            {/* Right Column: Interactive Terminal & Code Runner Workspace */}
            <div className="lg:col-span-7 space-y-4">
              {/* Workspace Switcher Tabs */}
              <div className="flex items-center justify-between bg-surface-dark-card px-4 py-2 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveWorkspaceTab('terminal')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                      activeWorkspaceTab === 'terminal'
                        ? 'bg-flag text-white shadow-sm'
                        : 'text-txt-muted hover:text-white'
                    }`}
                  >
                    <TerminalIcon className="w-3.5 h-3.5" />
                    <span>Virtual Terminal</span>
                  </button>

                  {activeChallenge.hasCodeRunner && (
                    <button
                      onClick={() => setActiveWorkspaceTab('coderunner')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                        activeWorkspaceTab === 'coderunner'
                          ? 'bg-flag text-white shadow-sm'
                          : 'text-txt-muted hover:text-white'
                      }`}
                    >
                      <Code className="w-3.5 h-3.5" />
                      <span>Python Code Runner</span>
                    </button>
                  )}
                </div>

                <span className="text-[10px] font-mono text-txt-subtle hidden sm:inline">
                  Interactive Challenge Environment
                </span>
              </div>

              {/* Active Workspace View */}
              {activeWorkspaceTab === 'terminal' ? (
                <InteractiveTerminal
                  key={activeChallenge.id}
                  fsConfig={activeChallenge.terminalFsConfig}
                  title={`${activeChallenge.title.toUpperCase()} — CTF TERMINAL`}
                  subtitle="Isolated virtual filesystem"
                  heightClass="h-[420px]"
                />
              ) : (
                <PythonCodeRunner
                  key={activeChallenge.id + '_py'}
                  starterCode={activeChallenge.codeRunnerStarter}
                  heightClass="h-[380px]"
                />
              )}
            </div>
          </div>

          {/* Surrender Confirmation Modal */}
          <SurrenderModal
            isOpen={isSurrenderModalOpen}
            onClose={() => setIsSurrenderModalOpen(false)}
            onConfirm={handleConfirmSurrender}
            challengeTitle={activeChallenge.title}
            points={activeChallenge.points}
          />
        </div>
      )}
    </div>
  );
};
