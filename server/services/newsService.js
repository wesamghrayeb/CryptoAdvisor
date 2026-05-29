import axios from 'axios';
import { FALLBACK_NEWS } from './fallbackData.js';

export const fetchCryptoNews = async () => {
  const apiKey = process.env.NEWSDATA_API_KEY;

  if (!apiKey) {
    return { news: FALLBACK_NEWS, source: 'fallback' };
  }

  try {
    const { data } = await axios.get('https://newsdata.io/api/1/crypto', {
      params: {
        apikey: apiKey,
      },
      timeout: 10000,
    });

    if (data.status !== 'success' || !data.results?.length) {
      return { news: FALLBACK_NEWS, source: 'fallback' };
    }

    const news = data.results.slice(0, 8).map((item) => ({
      title: item.title,
      source: item.source_name || item.source_id || 'NewsData',
      publishedAt: item.pubDate,
      url: item.link || '#',
    }));

    return { news, source: 'live' };
  } catch (error) {
    console.error('NewsData API error:', error.message);
    return { news: FALLBACK_NEWS, source: 'fallback' };
  }
};
