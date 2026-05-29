import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import BrandLogo from '../components/BrandLogo';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed. Please check your credentials.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-shell flex min-h-screen">
      <aside className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 border-r border-slate-800 bg-slate-900/50">
        <BrandLogo />
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white leading-tight max-w-md">
            Your daily command center for crypto markets
          </h2>
          <p className="text-slate-300 mt-4 max-w-sm leading-relaxed text-base">
            Track live prices, scan headlines, and stay informed — all in one secure dashboard.
          </p>
        </div>
        <p className="text-xs text-slate-500">© InvestorHub · For demonstration purposes</p>
      </aside>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="lg:hidden mb-8 flex justify-center">
            <BrandLogo />
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
            <p className="text-slate-400 mt-2 text-sm">
              Sign in to access your portfolio dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="card space-y-5">
            <ErrorMessage message={error} />

            <div>
              <label htmlFor="email" className="label">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full py-3">
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="sm" />
                  Signing in…
                </span>
              ) : (
                'Sign in'
              )}
            </button>

            <p className="text-center text-sm text-slate-400 pt-1">
              No account yet?{' '}
              <Link
                to="/register"
                className="text-sky-400 hover:text-sky-300 font-semibold underline-offset-2 hover:underline"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
