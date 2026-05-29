export const COIN_COLORS = {
  bitcoin: 'from-amber-500 to-orange-600',
  ethereum: 'from-indigo-400 to-violet-600',
  solana: 'from-fuchsia-500 to-purple-600',
  binancecoin: 'from-yellow-400 to-amber-500',
  ripple: 'from-slate-400 to-slate-600',
};

export const getCoinGradient = (id) =>
  COIN_COLORS[id] || 'from-sky-500 to-sky-700';
