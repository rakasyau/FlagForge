import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, LogIn, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(emailOrUsername, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login gagal. Periksa kembali kredensial Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-6 px-2">
      <div className="w-full max-w-md bg-surface-panel text-txt-on-light rounded-[32px] p-6 sm:p-8 shadow-2xl border border-white/80 space-y-6 animate-fade-in">
        {/* Top Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-black/10">
          <div className="w-12 h-12 rounded-2xl bg-void text-flag flex items-center justify-center shadow-md shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-txt-on-light">
              Masuk ke FlagForge
            </h2>
            <p className="text-xs text-txt-subtle">
              Masuk ke akun FlagForge Anda
            </p>
          </div>
        </div>

        {/* Notice for Protected Route Redirect */}
        {from !== '/dashboard' && (
          <div className="p-3 bg-[#FFF4E5] border border-[#FFE2B8] rounded-2xl text-xs text-[#7A3218] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-flag shrink-0" />
            <span>Silakan login terlebih dahulu untuk mengakses fitur FlagForge.</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-[#FEF3F2] border border-state-locked/30 text-state-locked text-xs font-mono flex items-start gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-txt-on-light mb-1.5 uppercase font-mono tracking-wider">
              Email atau Username
            </label>
            <input
              type="text"
              required
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="cadet@flagforge.io atau username"
              className="w-full bg-white text-txt-on-light text-xs sm:text-sm px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-flag placeholder:text-txt-subtle transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-txt-on-light uppercase font-mono tracking-wider">
                Password
              </label>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-white text-txt-on-light text-xs sm:text-sm px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-flag placeholder:text-txt-subtle transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-flag hover:bg-flag-hover disabled:opacity-50 text-white text-xs sm:text-sm font-semibold shadow-orange-glow-sm transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-pulse font-mono">Memverifikasi...</span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer to Register */}
        <div className="pt-4 border-t border-black/10 text-center text-xs text-txt-subtle">
          <span>Belum punya akun hacker? </span>
          <Link to="/register" className="font-bold text-flag hover:underline">
            Daftar Akun Baru
          </Link>
        </div>
      </div>
    </div>
  );
};
