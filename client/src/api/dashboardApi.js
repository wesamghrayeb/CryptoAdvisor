import api from './axios';

export const fetchDashboard = () => api.get('/dashboard');
export const fetchPrices = () => api.get('/crypto/prices');
export const fetchNews = () => api.get('/crypto/news');
export const fetchMeme = () => api.get('/meme');
