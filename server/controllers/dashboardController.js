import DashboardLog from '../models/DashboardLog.js';
import { fetchCoinPrices } from '../services/cryptoService.js';
import { fetchCryptoNews } from '../services/newsService.js';
import { fetchRandomMeme } from '../services/memeService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

const buildDashboardData = async () => {
  const [pricesResult, newsResult, memeResult] = await Promise.all([
    fetchCoinPrices(),
    fetchCryptoNews(),
    fetchRandomMeme(),
  ]);

  return {
    prices: pricesResult,
    news: newsResult,
    meme: memeResult,
    refreshedAt: new Date().toISOString(),
  };
};

export const getDashboard = async (req, res) => {
  try {
    const dashboard = await buildDashboardData();

    try {
      await DashboardLog.create({
        userId: req.user._id,
        refreshedAt: new Date(),
        coins: dashboard.prices.coins?.length || 0,
        newsCount: dashboard.news.news?.length || 0,
        memeUrl: dashboard.meme.url || '',
      });
    } catch (logError) {
      console.error('Dashboard log error:', logError.message);
    }

    return successResponse(res, dashboard);
  } catch (error) {
    console.error('Dashboard error:', error.message);
    return errorResponse(res, 'Failed to load dashboard', 500);
  }
};

export const getPrices = async (req, res) => {
  try {
    const result = await fetchCoinPrices();
    return successResponse(res, result);
  } catch (error) {
    console.error('Prices error:', error.message);
    return errorResponse(res, 'Failed to fetch prices', 500);
  }
};

export const getNews = async (req, res) => {
  try {
    const result = await fetchCryptoNews();
    return successResponse(res, result);
  } catch (error) {
    console.error('News error:', error.message);
    return errorResponse(res, 'Failed to fetch news', 500);
  }
};

export const getMeme = async (req, res) => {
  try {
    const result = await fetchRandomMeme();
    return successResponse(res, result);
  } catch (error) {
    console.error('Meme error:', error.message);
    return errorResponse(res, 'Failed to fetch meme', 500);
  }
};
