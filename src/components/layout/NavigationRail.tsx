import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Sparkles, 
  Home, 
  LayoutDashboard, 
  BookOpen, 
  Swords, 
  Terminal as TerminalIcon, 
  User, 
  Flame,
  LogIn
} from 'lucide-react';

export const NavigationRail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const navItems = [
    { path: '/', label: 'Beranda', icon: <Home className="w-5 h-5" /> },
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, protected: true },
    { path: '/modul', label: 'Modul CTF', icon: <BookOpen className="w-5 h-5" />, badge: '14', protected: true },
    { path: '/latihan', label: 'Latihan Soal', icon: <Swords className="w-5 h-5" />, protected: true },
    { path: '/terminal', label: 'Sandbox Terminal', icon: <TerminalIcon className="w-5 h-5" />, protected: true },
    { path: '/profile', label: 'Profil & Stats', icon: <User className="w-5 h-5" />, protected: true },
  ];

  return (
    <aside className="w-20 md:w-24 shrink-0 flex flex-col items-center py-6 px-2 bg-surface-panel text-txt-on-light rounded-[32px] shadow-panel-card border border-white/60 relative z-30 select-none">
      {/* Top Star Logo */}
      <Link 
        to="/"
        title="FlagForge Home"
        className="w-12 h-12 rounded-full bg-void text-txt-on-dark flex items-center justify-center mb-8 shadow-md hover:scale-105 transition-transform duration-200 group relative"
      >
        <Sparkles className="w-6 h-6 text-flag group-hover:rotate-12 transition-transform duration-300" />
      </Link>

      {/* Nav Icons list */}
      <nav className="flex-1 flex flex-col items-center gap-3 w-full">
        {navItems.map((item) => {
          const isActive = item.path === '/' 
            ? location.pathname === '/' 
            : location.pathname.startsWith(item.path);

          return (
            <div key={item.path} className="relative w-full flex items-center justify-center">
              <button
                onClick={() => navigate(item.path)}
                title={item.label}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 relative group ${
                  isActive
                    ? 'bg-void text-flag shadow-md scale-105 ring-2 ring-flag/30'
                    : 'text-txt-subtle hover:bg-black/5 hover:text-txt-on-light'
                }`}
              >
                {item.icon}

                {/* Badge indicator */}
                {item.badge && !isActive && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 text-[9px] font-mono font-bold bg-flag text-white rounded-full">
                    {item.badge}
                  </span>
                )}

                {/* Tooltip on hover */}
                <div className="hidden md:group-hover:block absolute left-full ml-3 px-3 py-1.5 bg-void text-txt-on-dark text-xs font-medium rounded-lg whitespace-nowrap shadow-xl border border-white/10 pointer-events-none z-50">
                  {item.label}
                </div>
              </button>
            </div>
          );
        })}
      </nav>

      {/* Bottom User Avatar & Quick Points or Login */}
      <div className="flex flex-col items-center gap-2 pt-4 border-t border-black/10 w-full">
        {user ? (
          <Link
            to="/profile"
            title={`Masuk sebagai ${user.username} (${user.points} Poin)`}
            className="group relative flex flex-col items-center"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-flag/50 group-hover:ring-flag transition-all duration-200 bg-void/10">
              <img 
                src={user.avatar} 
                alt={user.username} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="mt-1 flex items-center gap-0.5 px-1.5 py-0.5 bg-flag/10 text-flag rounded-full text-[10px] font-mono font-bold">
              <Flame className="w-3 h-3 fill-flag" />
              <span>{user.points}</span>
            </div>
          </Link>
        ) : (
          <Link
            to="/login"
            title="Masuk ke Akun"
            className="w-11 h-11 rounded-full bg-void text-flag flex items-center justify-center hover:scale-105 transition-transform"
          >
            <LogIn className="w-5 h-5" />
          </Link>
        )}
      </div>
    </aside>
  );
};
