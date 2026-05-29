import axios from 'axios';
import { FALLBACK_PRICES } from './fallbackData.js';

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price';
const COIN_IDS = ['bitcoin', 'ethereum', 'solana', 'binancecoin', 'ripple'];
const COIN_META = {
  bitcoin: { symbol: 'BTC', name: 'Bitcoin' },
  ethereum: { symbol: 'ETH', name: 'Ethereum' },
  solana: { symbol: 'SOL', name: 'Solana' },
  binancecoin: { symbol: 'BNB', name: 'BNB' },
  ripple: { symbol: 'XRP', name: 'XRP' },
};

export const fetchCoinPrices = async () => {
  const apiKey = process.env.COINGECKO_API_KEY;
  const headers = {};

  if (apiKey) {
    headers['x-cg-demo-api-key'] = apiKey;
  }

  try {
    const { data } = await axios.get(COINGECKO_URL, {
      params: {
        ids: COIN_IDS.join(','),
        vs_currencies: 'usd',
        include_24hr_change: true,
      },
      headers,
      timeout: 10000,
    });

    const coins = COIN_IDS.map((id) => ({
      id,
      symbol: COIN_META[id].symbol,
      name: COIN_META[id].name,
      price: data[id]?.usd ?? 0,
      change24h: data[id]?.usd_24h_change ?? null,
    }));

    return { coins, source: 'live' };
  } catch (error) {
    const status = error.response?.status ?? 'N/A';
    const responseData = error.response?.data ?? error.message;

    console.error('CoinGecko API error - status:', status);
    console.error('CoinGecko API error - response:', responseData);

    return { coins: FALLBACK_PRICES, source: 'fallback' };
  }
};
