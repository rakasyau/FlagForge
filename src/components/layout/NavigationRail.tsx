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
    { path: '/modul', label: 'Modul', icon: <BookOpen className="w-5 h-5" />, badge: '14', protected: true },
    { path: '/latihan', label: 'Latihan', icon: <Swords className="w-5 h-5" />, protected: true },
    { path: '/terminal', label: 'Terminal', icon: <TerminalIcon className="w-5 h-5" />, protected: true },
    { path: '/profile', label: 'Profil', icon: <User className="w-5 h-5" />, protected: true },
  ];

  return (
    <>
      {/* ================= DESKTOP & TABLET VERTICAL SIDEBAR (>= md) ================= */}
      <aside className="hidden md:flex w-20 lg:w-24 shrink-0 flex-col items-center py-6 px-2 bg-surface-panel text-txt-on-light rounded-[32px] shadow-panel-card border border-white/60 relative z-30 select-none">
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
                  <div className="hidden lg:group-hover:block absolute left-full ml-3 px-3 py-1.5 bg-void text-txt-on-dark text-xs font-medium rounded-lg whitespace-nowrap shadow-xl border border-white/10 pointer-events-none z-50">
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

      {/* ================= MOBILE BOTTOM NAVIGATION DOCK (< md) ================= */}
      <nav className="flex md:hidden fixed bottom-3 left-3 right-3 z-50 bg-surface-panel/95 backdrop-blur-xl border border-white/80 shadow-2xl rounded-full py-2 px-3 items-center justify-around select-none">
        {navItems.map((item) => {
          const isActive = item.path === '/' 
            ? location.pathname === '/' 
            : location.pathname.startsWith(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-full transition-all relative ${
                isActive
                  ? 'bg-void text-flag shadow-md scale-110 ring-2 ring-flag/30 px-3'
                  : 'text-txt-subtle hover:text-txt-on-light active:scale-95'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && !isActive && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 text-[8px] font-mono font-bold bg-flag text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[9px] font-display font-medium leading-none mt-0.5 ${isActive ? 'text-flag font-bold' : 'text-txt-subtle'}`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Mobile Profile / Login Icon */}
        {user ? (
          <Link
            to="/profile"
            className="flex flex-col items-center justify-center p-1 rounded-full relative"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-flag">
              <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
            </div>
            <span className="text-[9px] font-mono font-bold text-flag mt-0.5">
              {user.points}p
            </span>
          </Link>
        ) : (
          <Link
            to="/login"
            className="flex flex-col items-center justify-center p-1.5 rounded-full text-txt-subtle hover:text-txt-on-light"
          >
            <LogIn className="w-5 h-5" />
            <span className="text-[9px] font-display font-medium mt-0.5">
              Masuk
            </span>
          </Link>
        )}
      </nav>
    </>
  );
};
