export const FALLBACK_NEWS = [
  {
    title: 'Bitcoin Holds Steady as Institutional Interest Grows',
    source: 'Crypto Daily',
    publishedAt: new Date().toISOString(),
    url: 'https://www.coindesk.com',
  },
  {
    title: 'Ethereum Network Upgrade Boosts Developer Activity',
    source: 'Blockchain News',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    url: 'https://www.coindesk.com',
  },
  {
    title: 'Solana Ecosystem Sees Record DEX Volume',
    source: 'DeFi Pulse',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    url: 'https://www.coindesk.com',
  },
  {
    title: 'Regulatory Clarity Expected to Shape Q2 Crypto Markets',
    source: 'Market Watch',
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    url: 'https://www.coindesk.com',
  },
  {
    title: 'Altcoin Season Debate Heats Up Among Analysts',
    source: 'Coin Telegraph',
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    url: 'https://www.coindesk.com',
  },
];

export const FALLBACK_PRICES = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', price: 67500, change24h: 1.2 },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', price: 3450, change24h: -0.8 },
  { id: 'solana', symbol: 'SOL', name: 'Solana', price: 145, change24h: 3.5 },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB', price: 580, change24h: 0.4 },
  { id: 'ripple', symbol: 'XRP', name: 'XRP', price: 0.62, change24h: -1.1 },
];

export const FALLBACK_MEME = {
  url: 'https://i.imgflip.com/1bij.jpg',
  title: 'Crypto HODLer',
};
