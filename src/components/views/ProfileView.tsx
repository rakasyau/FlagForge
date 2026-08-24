import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { getBadges } from '../../services/storage';
import { 
  CheckCircle2, 
  Eye, 
  Award, 
  Flame, 
  Clock, 
  ShieldCheck, 
  History, 
  Terminal, 
  Key, 
  Globe, 
  Droplet,
  Check,
  LogOut
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState<Array<{
    _id: string;
    challengeId: string;
    challengeTitle: string;
    category: string;
    submittedValue: string;
    isCorrect: boolean;
    submittedAt: string;
  }>>([]);

  useEffect(() => {
    api.getSubmissions()
      .then(res => setSubmissions(res.submissions || []))
      .catch(err => console.error('Failed to load submissions:', err));
  }, []);

  if (!user) return null;

  // Convert MongoDB user to profile format for badges
  const badges = getBadges({
    ...user,
    id: user._id,
    solvedCount: user.solvedCount,
    revealedCount: user.revealedCount,
    points: user.points,
    categoryStats: {
      linux: { solved: 0, revealed: 0, total: 2 },
      networking: { solved: 0, revealed: 0, total: 2 },
      crypto: { solved: 0, revealed: 0, total: 2 },
      web: { solved: 0, revealed: 0, total: 2 },
      forensics: { solved: 0, revealed: 0, total: 2 },
      stego: { solved: 0, revealed: 0, total: 2 },
      reverse: { solved: 0, revealed: 0, total: 2 },
      pwn: { solved: 0, revealed: 0, total: 2 },
      osint: { solved: 0, revealed: 0, total: 1 },
      scripting: { solved: 0, revealed: 0, total: 1 },
    }
  });

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplet': return <Droplet className="w-5 h-5" />;
      case 'Terminal': return <Terminal className="w-5 h-5" />;
      case 'Key': return <Key className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Profile Banner Card */}
      <section className="bg-surface-panel text-txt-on-light rounded-[32px] p-6 md:p-8 shadow-panel-card border border-white/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-flag/40 shrink-0 shadow-lg bg-void/10">
              <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-void text-txt-on-dark shadow-sm">
                  {user.title}
                </span>
                <span className="text-xs text-txt-subtle font-mono">{user.email}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-txt-on-light">
                {user.username}
              </h2>
              <p className="text-xs text-txt-subtle mt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-flag" />
                <span>Terdaftar sejak {new Date(user.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</span>
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-full bg-[#FEF3F2] hover:bg-red-100 text-state-locked text-xs font-semibold shadow-sm transition-all flex items-center gap-2 border border-state-locked/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar (Logout)</span>
          </button>
        </div>

        {/* 3 Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-black/10">
          <div className="bg-white rounded-2xl p-4 border border-black/5 flex items-center gap-3 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-flag/10 text-flag flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 fill-flag" />
            </div>
            <div>
              <span className="text-xs text-txt-subtle font-mono block">TOTAL SCORE</span>
              <span className="text-2xl font-display font-bold text-flag">{user.points} PTS</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-black/5 flex items-center gap-3 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-state-solved/15 text-state-solved flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-txt-subtle font-mono block">SOLVED MANDIRI</span>
              <span className="text-2xl font-display font-bold text-emerald-600">{user.solvedCount} Soal</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-black/5 flex items-center gap-3 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-state-revealed/15 text-state-revealed flex items-center justify-center shrink-0">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-txt-subtle font-mono block">DILIHAT JAWABANNYA</span>
              <span className="text-2xl font-display font-bold text-amber-600">{user.revealedCount} Soal</span>
            </div>
          </div>
        </div>
      </section>

      {/* Badges / Achievements Section */}
      <section className="bg-surface-dark-card rounded-[32px] p-6 md:p-8 border border-white/5 shadow-xl space-y-6">
        <div>
          <span className="text-xs font-mono font-bold text-flag uppercase tracking-wider block mb-1">
            TROPHY ROOM
          </span>
          <h3 className="text-xl font-display font-bold text-txt-on-dark flex items-center gap-2">
            <Award className="w-5 h-5 text-flag" />
            <span>Badge & Milestone Pencapaian</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                badge.unlocked
                  ? 'bg-void/80 border-flag/40 shadow-orange-glow-sm'
                  : 'bg-void/30 border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                  badge.unlocked ? 'bg-flag text-white' : 'bg-white/5 text-txt-subtle'
                }`}>
                  {getBadgeIcon(badge.icon)}
                </div>

                {badge.unlocked ? (
                  <span className="px-2 py-0.5 rounded-full bg-state-solved/20 text-state-solved text-[10px] font-mono font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    UNLOCKED
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-txt-subtle">
                    {badge.progress}%
                  </span>
                )}
              </div>

              <div>
                <h4 className="font-display font-bold text-sm text-txt-on-dark mb-1">
                  {badge.name}
                </h4>
                <p className="text-xs text-txt-muted leading-relaxed mb-3">
                  {badge.description}
                </p>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${badge.unlocked ? 'bg-flag' : 'bg-white/20'}`}
                    style={{ width: `${badge.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Submission History Log from MongoDB */}
      <section className="bg-surface-dark-card rounded-[32px] p-6 md:p-8 border border-white/5 shadow-xl space-y-4">
        <div>
          <span className="text-xs font-mono font-bold text-flag uppercase tracking-wider block mb-1">
            AUDIT TRAIL
          </span>
          <h3 className="text-xl font-display font-bold text-txt-on-dark flex items-center gap-2">
            <History className="w-5 h-5 text-flag" />
            <span>Riwayat Aktivitas & Submission</span>
          </h3>
        </div>

        {submissions.length === 0 ? (
          <div className="text-center py-10 text-txt-muted text-xs font-mono">
            Belum ada aktivitas submission yang tercatat. Buka menu "Latihan Soal" untuk mulai berburu flag!
          </div>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {submissions.map((sub) => (
              <div
                key={sub._id}
                className="p-3 rounded-xl bg-void/50 border border-white/5 flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${sub.isCorrect ? 'bg-state-solved' : 'bg-state-locked'}`} />
                  <div>
                    <span className="font-bold text-txt-on-dark block">
                      {sub.challengeTitle}
                    </span>
                    <span className="text-[10px] text-txt-subtle">
                      Kategori: {sub.category} • Value: <code className="text-flag">{sub.submittedValue}</code>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-bold block ${sub.isCorrect ? 'text-state-solved' : 'text-state-locked'}`}>
                    {sub.isCorrect ? 'CORRECT' : 'INCORRECT'}
                  </span>
                  <span className="text-[10px] text-txt-subtle">
                    {new Date(sub.submittedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
