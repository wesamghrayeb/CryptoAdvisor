import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import BrandLogo from '../components/BrandLogo';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setSubmitting(true);

    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.'
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
            Start tracking markets in minutes
          </h2>
          <p className="text-slate-300 mt-4 max-w-sm leading-relaxed text-base">
            Create a free account to unlock prices, news, and your personalized investor dashboard.
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
            <h1 className="text-2xl font-bold text-white tracking-tight">Create account</h1>
            <p className="text-slate-400 mt-2 text-sm">Join InvestorHub in a few steps</p>
          </div>

          <form onSubmit={handleSubmit} className="card space-y-4">
            <ErrorMessage message={error} />

            <div>
              <label htmlFor="name" className="label">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="John Doe"
                required
                autoComplete="name"
              />
            </div>

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
                placeholder="Min. 6 characters"
                required
                autoComplete="new-password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="label">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                placeholder="Repeat password"
                required
                autoComplete="new-password"
              />
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full py-3 mt-2">
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="sm" />
                  Creating account…
                </span>
              ) : (
                'Create account'
              )}
            </button>

            <p className="text-center text-sm text-slate-400 pt-1">
              Already registered?{' '}
              <Link
                to="/login"
                className="text-sky-400 hover:text-sky-300 font-semibold underline-offset-2 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
