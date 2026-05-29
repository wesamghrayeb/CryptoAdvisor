import { Router } from 'express';
import {
  getDashboard,
  getPrices,
  getNews,
  getMeme,
} from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/dashboard', protect, getDashboard);
router.get('/crypto/prices', protect, getPrices);
router.get('/crypto/news', protect, getNews);
router.get('/meme', protect, getMeme);

export default router;
