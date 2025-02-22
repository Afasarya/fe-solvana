import api from './api';

export interface MoodHistoryResponse {
  moods: any[];
  analysis: {
    totalEntries: number;
    moodDistribution: Record<string, number>;
    mostFrequentMood: string;
    suggestion: string;
  };
}

export interface DiaryResponse {
  entries: any[];
  pagination: {
    totalEntries: number;
    totalPages: number;
    currentPage: number;
    entriesPerPage: number;
  };
  moodDistribution: any[];
  summary: string;
}

export const userService = {
  // Get user's mood history
  getMoodHistory: async (timeframe: 'week' | 'month' | 'year' = 'week'): Promise<MoodHistoryResponse> => {
    const response = await api.get(`/mood/history?timeframe=${timeframe}`);
    return response.data;
  },

  // Get user's diary entries
  getDiaryEntries: async (page: number = 1, limit: number = 10): Promise<DiaryResponse> => {
    const response = await api.get(`/diary?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Create new mood entry
  createMood: async (data: { type: string; note?: string }) => {
    const response = await api.post('/mood', data);
    return response.data;
  },

  // Create new diary entry
  createDiary: async (data: { content: string; moodType: string; moodNote?: string }) => {
    const response = await api.post('/diary', data);
    return response.data;
  },

  // Get user's streak information
  getStreak: async () => {
    const response = await api.get('/streak');
    return response.data;
  }
};