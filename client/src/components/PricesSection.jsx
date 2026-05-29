import SectionShell from './SectionShell';
import { formatPrice, formatChange } from '../utils/formatters';
import { getCoinGradient } from '../utils/coinMeta';

const PricesIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PricesSection = ({ coins, source, loading, error }) => (
  <SectionShell
    title="Live Prices"
    description="Top assets tracked in USD"
    icon={<PricesIcon />}
    source={source}
    loading={loading}
    error={error}
  >
    {!coins?.length ? (
      <p className="text-slate-400 text-sm text-center py-6">No price data available.</p>
    ) : (
      <ul className="divide-y divide-slate-800">
        {coins.map((coin) => {
          const positive = coin.change24h != null && coin.change24h >= 0;
          const neutral = coin.change24h == null;

          return (
            <li
              key={coin.id}
              className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
            >
              <div
                className={`h-10 w-10 rounded-full bg-gradient-to-br ${getCoinGradient(coin.id)} flex items-center justify-center text-xs font-bold text-white shrink-0`}
              >
                {coin.symbol?.slice(0, 3)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{coin.name}</p>
                <p className="text-xs text-slate-400 font-mono">{coin.symbol}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-mono text-sm font-semibold text-white tabular-nums">
                  {formatPrice(coin.price)}
                </p>
                <p
                  className={`font-mono text-xs font-medium tabular-nums mt-0.5 ${
                    neutral
                      ? 'text-slate-400'
                      : positive
                        ? 'text-emerald-400'
                        : 'text-rose-400'
                  }`}
                >
                  {formatChange(coin.change24h)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    )}
  </SectionShell>
);

export default PricesSection;
