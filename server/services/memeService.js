import axios from 'axios';
import { FALLBACK_MEME } from './fallbackData.js';

export const fetchRandomMeme = async () => {
  try {
    const { data } = await axios.get('https://api.imgflip.com/get_memes', {
      timeout: 10000,
    });

    const memes = data?.data?.memes || [];
    if (memes.length === 0) {
      return { ...FALLBACK_MEME, source: 'fallback' };
    }

    const random = memes[Math.floor(Math.random() * memes.length)];
    return {
      url: random.url,
      title: random.name,
      source: 'live',
    };
  } catch (error) {
    console.error('Imgflip API error:', error.message);
    return { ...FALLBACK_MEME, source: 'fallback' };
  }
};
