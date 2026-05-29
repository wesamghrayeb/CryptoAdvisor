import { useState, useEffect, useCallback } from 'react';
import { fetchDashboard } from '../api/dashboardApi';
import Navbar from '../components/Navbar';
import NewsSection from '../components/NewsSection';
import PricesSection from '../components/PricesSection';
import MemeSection from '../components/MemeSection';
import ErrorMessage from '../components/ErrorMessage';
import { formatDate } from '../utils/formatters';

const DashboardPage = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadDashboard = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError('');

    try {
      const { data } = await fetchDashboard();
      setDashboard(data.data);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to load dashboard. Please try again.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleRefresh = () => loadDashboard(true);

  const coinCount = dashboard?.prices?.coins?.length ?? 0;
  const newsCount = dashboard?.news?.news?.length ?? 0;
  const liveSections = [
    dashboard?.prices?.source,
    dashboard?.news?.source,
    dashboard?.meme?.source,
  ].filter((s) => s === 'live').length;

  return (
    <div className="page-shell">
      <Navbar onRefresh={handleRefresh} refreshing={refreshing} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Market overview
          </h1>
          <p className="text-slate-400 mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
            Real-time prices, curated news, and community highlights — refreshed on demand.
          </p>
        </div>

        {error && !dashboard && (
          <div className="mb-8 max-w-lg">
            <ErrorMessage message={error} />
            <button onClick={handleRefresh} className="btn-primary mt-4" type="button">
              Try again
            </button>
          </div>
        )}

        {!loading && dashboard && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <div className="card !p-4">
              <p className="stat-label">Assets</p>
              <p className="stat-value">{coinCount}</p>
            </div>
            <div className="card !p-4">
              <p className="stat-label">Headlines</p>
              <p className="stat-value">{newsCount}</p>
            </div>
            <div className="card !p-4">
              <p className="stat-label">Live feeds</p>
              <p className="stat-value text-emerald-400">{liveSections}/3</p>
            </div>
            <div className="card !p-4 col-span-2 lg:col-span-1">
              <p className="stat-label">Updated</p>
              <p className="text-sm font-semibold text-slate-200 mt-1.5 leading-snug">
                {dashboard.refreshedAt ? formatDate(dashboard.refreshedAt) : '—'}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          <PricesSection
            coins={dashboard?.prices?.coins}
            source={dashboard?.prices?.source}
            loading={loading || refreshing}
            error={error && !dashboard?.prices ? error : ''}
          />

          <NewsSection
            news={dashboard?.news?.news}
            source={dashboard?.news?.source}
            loading={loading || refreshing}
            error={error && !dashboard?.news ? error : ''}
          />

          <MemeSection
            meme={dashboard?.meme}
            source={dashboard?.meme?.source}
            loading={loading || refreshing}
            error={error && !dashboard?.meme ? error : ''}
          />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
