import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BrandLogo from './BrandLogo';

const Navbar = ({ onRefresh, refreshing }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || '?';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
          <BrandLogo size="sm" />

          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <div className="hidden sm:flex items-center gap-2.5 mr-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-xs font-bold text-white">
                {initials}
              </span>
              <div className="text-left">
                <p className="text-sm font-medium text-white leading-tight">{user?.name}</p>
                <p className="text-xs text-slate-400 truncate max-w-[180px]">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={onRefresh}
              disabled={refreshing}
              className="btn-primary"
              type="button"
            >
              {refreshing ? (
                <>
                  <span className="h-4 w-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                  Syncing…
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </>
              )}
            </button>

            <button onClick={handleLogout} className="btn-ghost" type="button">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
