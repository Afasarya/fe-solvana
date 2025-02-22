import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getDashboardStats = async () => {
  const [petResponse, diaryResponse, moodResponse] = await Promise.all([
    api.get('/pet/status'),
    api.get('/diary'),
    api.get('/mood/history?timeframe=today'),
  ]);

  return {
    currentStreak: petResponse.data.streak,
    diaryCount: diaryResponse.data.pagination.totalEntries,
    currentMood: moodResponse.data.moods[0]?.type || 'NEUTRAL',
    questionnaire: 0, // This will be implemented later
  };
};

export default api;
