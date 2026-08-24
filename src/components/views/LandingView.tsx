import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryId } from '../../types';
import { CATEGORIES } from '../../data/modulesData';
import { InteractiveTerminal } from '../terminal/InteractiveTerminal';
import { useAuth } from '../../context/AuthContext';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  Swords, 
  Terminal as TerminalIcon,
  Flame,
  CheckCircle,
  Award
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Hero typing sequence simulation
  const sequence = [
    { text: 'nc target.flagforge.io 1337', delay: 100 },
    { text: '[+] Connected to FlagForge Remote Security Matrix\n[+] Probing challenge vulnerability...\n[+] Buffer overflow payload sent.\n[+] Exploitation SUCCESS!\n[+] Captured Flag: flag{w3lc0m3_t0_fl4gf0rg3_c4d3t}', delay: 600 }
  ];

  const [typedCommand, setTypedCommand] = useState('');
  const [heroOutput, setHeroOutput] = useState('');

  useEffect(() => {
    let charIdx = 0;
    const targetCmd = sequence[0].text;
    const interval = setInterval(() => {
      if (charIdx <= targetCmd.length) {
        setTypedCommand(targetCmd.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setHeroOutput(sequence[1].text);
        }, sequence[1].delay);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  const handleCategoryClick = (catId: CategoryId) => {
    navigate(`/modul/${catId}`);
  };

  return (
    <div className="space-y-12 pb-12">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-2 md:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-panel text-txt-on-light text-xs font-semibold shadow-sm border border-white/60">
              <Sparkles className="w-3.5 h-3.5 text-flag animate-spin" />
              <span>Platform Belajar Cybersecurity & CTF Interaktif</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-txt-on-dark leading-[1.1]">
              Kuasai Seni <br />
              <span className="text-flag">
                Capture The Flag
              </span>
              <br />
              Dari Basic ke Advance.
            </h1>

            <p className="text-txt-muted text-sm sm:text-base leading-relaxed max-w-xl">
              Tinggalkan cara lama yang kaku. FlagForge menghadirkan kurikulum 14 bab terstruktur, 
              terminal Linux virtual tertanam di browser, dan sistem soal latihan <em>reveal-on-surrender</em> tanpa spoiler.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/modul')}
                className="px-6 py-3.5 rounded-full bg-flag hover:bg-flag-hover text-white text-sm font-semibold shadow-orange-glow transition-all duration-200 flex items-center gap-2 group"
              >
                <span>Mulai Belajar Materi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/latihan')}
                className="px-6 py-3.5 rounded-full bg-surface-panel text-txt-on-light hover:bg-white text-sm font-semibold shadow-panel-card transition-all duration-200 flex items-center gap-2"
              >
                <Swords className="w-4 h-4 text-flag" />
                <span>Coba Soal Latihan</span>
              </button>
            </div>

            {/* Micro Stats */}
            <div className="flex items-center gap-6 pt-4 border-t border-white/5 text-xs text-txt-muted">
              <div>
                <span className="font-display font-bold text-txt-on-dark text-lg block">14 Bab</span>
                <span>Materi Lengkap</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="font-display font-bold text-txt-on-dark text-lg block">8 Kategori</span>
                <span>Web, Crypto, Pwn, dll</span>
              </div>
            </div>
          </div>

          {/* Right Hero: Signature Typing Terminal Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-surface-dark-card border border-white/15 p-1 shadow-2xl overflow-hidden glow-orange-border">
              {/* Outer chassis frame */}
              <div className="bg-[#0D0D11] rounded-[22px] p-4 text-xs font-mono">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-txt-subtle">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-state-locked" />
                    <span className="w-2.5 h-2.5 rounded-full bg-state-revealed" />
                    <span className="w-2.5 h-2.5 rounded-full bg-state-solved" />
                    <span className="text-[11px] font-bold text-txt-on-dark ml-2">flagforge-hero-session</span>
                  </div>
                  <span className="text-[10px] text-flag">LIVE EMULATION</span>
                </div>

                {/* Animated Typing Sequence */}
                <div className="space-y-2 min-h-[220px] leading-relaxed">
                  <div className="text-txt-muted">
                    # Memulai koneksi ke target challenge remote...
                  </div>

                  <div className="flex items-center gap-1.5 text-txt-on-dark font-semibold">
                    <span className="text-flag">cadet@flagforge:~$</span>
                    <span>{typedCommand}</span>
                    <span className="w-2 h-4 bg-flag inline-block animate-blink" />
                  </div>

                  {heroOutput && (
                    <div className="text-emerald-400 whitespace-pre-line pt-2 pl-2 border-l-2 border-flag/50 animate-fade-in text-[11px]">
                      {heroOutput}
                    </div>
                  )}
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-txt-subtle">
                  <span>Target: target.flagforge.io:1337</span>
                  <span className="text-state-solved flex items-center gap-1 font-bold">
                    <CheckCircle className="w-3 h-3" />
                    Flag Solved
                  </span>
                </div>
              </div>
            </div>

            {/* Floating pill badge on the corner */}
            <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-surface-panel text-txt-on-light rounded-full font-display font-bold text-xs shadow-xl border border-white/60 flex items-center gap-2">
              <Flame className="w-4 h-4 text-flag" />
              <span>Real-Time Practice</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= "CHOOSE STYLES" / CATEGORY PILLS SECTION ================= */}
      <section className="bg-surface-panel text-txt-on-light rounded-[32px] p-6 md:p-8 shadow-panel-card border border-white/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono font-bold text-flag uppercase tracking-wider block mb-1">
              EXPLORE SPECIALIZATIONS
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-txt-on-light tracking-tight">
              Pilih Kategori Keahlian Anda
            </h2>
          </div>
          <p className="text-xs md:text-sm text-txt-subtle max-w-md">
            Klik salah satu kategori di bawah untuk langsung membuka modul materi dan kumpulan soal latihan terkait.
          </p>
        </div>

        {/* Capsule / Pill Grid matching UI Reference */}
        <div className="flex flex-wrap gap-2.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="pill-button pill-button-light hover:scale-105"
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Category Preview Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-black/10">
          {CATEGORIES.slice(0, 4).map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="bg-white rounded-2xl p-4 border border-black/5 hover:border-flag/30 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/5 text-txt-subtle group-hover:bg-flag group-hover:text-white transition-colors">
                  {cat.tag}
                </span>
                <span className="text-xs font-mono text-txt-subtle">Bab {cat.chapterNumber}</span>
              </div>
              <h3 className="font-display font-bold text-base text-txt-on-light mb-1 group-hover:text-flag transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-txt-subtle line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 3 PRODUCT PILLARS ================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-flag uppercase tracking-wider">
            THE FLAGFORGE ADVANTAGE
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-txt-on-dark">
            Dirancang Seperti Instrumen Canggih
          </h2>
          <p className="text-xs sm:text-sm text-txt-muted">
            Tiga pilar utama yang membedakan FlagForge dari platform belajar CTF konvensional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-surface-dark-card rounded-[28px] p-6 border border-white/5 hover:border-flag/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-void text-flag flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-txt-on-dark mb-2">
              1. Modul Terstruktur 14 Bab
            </h3>
            <p className="text-xs text-txt-muted leading-relaxed">
              Mulai dari konsep Linux, Networking, OWASP Web Injection, Cryptography, hingga Binary Exploitation & ROP Chain dengan contoh nyata.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-surface-dark-card rounded-[28px] p-6 border border-white/5 hover:border-flag/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-void text-flag flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-txt-on-dark mb-2">
              2. Reveal-on-Surrender Jujur
            </h3>
            <p className="text-xs text-txt-muted leading-relaxed">
              Tidak ada spoiler! Kunci jawaban dan penjelasan langkah demi langkah hanya terbuka jika Anda memilih menyerah, dengan status tercatat transparan.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-surface-dark-card rounded-[28px] p-6 border border-white/5 hover:border-flag/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-void text-flag flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
              <TerminalIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-txt-on-dark mb-2">
              3. Terminal & Code Runner Tertanam
            </h3>
            <p className="text-xs text-txt-muted leading-relaxed">
              Praktik command line `ls`, `grep`, `file`, `strings`, dan scripting decoder Python langsung di browser tanpa ribet instalasi VM.
            </p>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE WORKBENCH DEMO ================= */}
      <section className="bg-surface-dark-card rounded-[32px] p-6 md:p-8 border border-white/10 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-state-solved animate-pulse" />
              <span className="text-xs font-mono font-bold text-flag uppercase tracking-wider">
                TRY IT NOW IN BROWSER
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-display font-bold text-txt-on-dark">
              Uji Coba Terminal Interaktif
            </h2>
          </div>
          <p className="text-xs text-txt-muted max-w-md">
            Coba jalankan perintah Linux seperti <code className="text-flag font-mono font-bold">help</code>, <code className="text-flag font-mono font-bold">ls -la</code>, atau <code className="text-flag font-mono font-bold">cat welcome.txt</code> di bawah.
          </p>
        </div>

        {/* Live Interactive Terminal */}
        <InteractiveTerminal
          title="SANDBOX PREVIEW SHELL"
          subtitle="Try typing commands below"
          heightClass="h-64"
        />
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="text-center py-10 px-6 rounded-[32px] bg-gradient-to-b from-[#1C1C20] to-[#131316] border border-white/10 space-y-4">
        <div className="w-12 h-12 rounded-full bg-flag/20 text-flag flex items-center justify-center mx-auto">
          <Award className="w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-txt-on-dark">
          Siap Memulai Perjalanan Cybersecurity Anda?
        </h2>
        <p className="text-xs md:text-sm text-txt-muted max-w-xl mx-auto">
          Bergabunglah sekarang, pecahkan tantangan pertama Anda, dan kumpulkan badge prestisius di FlagForge.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => navigate(user ? '/dashboard' : '/register')}
            className="px-6 py-3 rounded-full bg-flag hover:bg-flag-hover text-white text-xs md:text-sm font-semibold shadow-orange-glow transition-all"
          >
            {user ? 'Buka Dashboard Saya' : 'Daftar Akun Baru'}
          </button>
          {!user && (
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-txt-on-dark text-xs md:text-sm font-semibold transition-all"
            >
              Masuk (Login)
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
