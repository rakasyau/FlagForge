import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { saveUser, getUser } from '../../services/storage';
import { Sparkles, X, LogIn, UserPlus, Shield, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onUserUpdated: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserUpdated
}) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState(currentUser.username || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [password, setPassword] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = getUser();
    user.username = username.trim() || 'Cadet_' + Math.floor(Math.random() * 1000);
    user.email = email.trim() || 'cadet@flagforge.io';
    saveUser(user);
    onUserUpdated(user);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleGuestQuickStart = () => {
    const user = getUser();
    user.username = 'GhostRider_' + Math.floor(Math.random() * 1000);
    user.email = 'ghost@flagforge.local';
    user.avatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
    saveUser(user);
    onUserUpdated(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="w-full max-w-md bg-surface-panel text-txt-on-light rounded-[32px] p-6 md:p-8 shadow-2xl border border-white/50 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-black/5 hover:bg-black/10 text-txt-subtle hover:text-txt-on-light transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header Icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-void text-flag flex items-center justify-center shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-txt-on-light">
              {tab === 'login' ? 'Masuk ke FlagForge' : 'Buat Akun Baru'}
            </h3>
            <p className="text-xs text-txt-subtle">Simpan progress & statistik belajar CTF Anda</p>
          </div>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center p-1 bg-black/5 rounded-full mb-5">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all ${
              tab === 'login' ? 'bg-void text-txt-on-dark shadow-sm' : 'text-txt-subtle hover:text-txt-on-light'
            }`}
          >
            Masuk (Login)
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all ${
              tab === 'register' ? 'bg-void text-txt-on-dark shadow-sm' : 'text-txt-subtle hover:text-txt-on-light'
            }`}
          >
            Daftar (Register)
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-txt-on-light mb-1">Username Hacker</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="misal: CipherNinja_99"
                className="w-full bg-white text-txt-on-light text-xs md:text-sm px-4 py-2.5 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-flag placeholder:text-txt-subtle"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-txt-on-light mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="cadet@flagforge.io"
              className="w-full bg-white text-txt-on-light text-xs md:text-sm px-4 py-2.5 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-flag placeholder:text-txt-subtle"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-txt-on-light mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-white text-txt-on-light text-xs md:text-sm px-4 py-2.5 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-flag placeholder:text-txt-subtle"
            />
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 p-2.5 bg-state-solved/15 text-emerald-800 rounded-xl text-xs font-medium">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Profil berhasil diperbarui!</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-flag hover:bg-flag-hover text-white text-xs md:text-sm font-semibold shadow-orange-glow-sm transition-all flex items-center justify-center gap-2"
          >
            {tab === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            <span>{tab === 'login' ? 'Masuk & Sinkronkan Data' : 'Buat Akun Sekarang'}</span>
          </button>
        </form>

        {/* Quick Guest Start */}
        <div className="mt-5 pt-4 border-t border-black/10 text-center">
          <button
            type="button"
            onClick={handleGuestQuickStart}
            className="text-xs text-txt-subtle hover:text-flag font-medium transition-colors flex items-center justify-center gap-1.5 mx-auto"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Mulai Instan sebagai Guest (Tanpa Login)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
