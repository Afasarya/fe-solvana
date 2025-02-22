import api from './api';
import { ChatResponse, ChatMessage, ImageAnalysisResponse } from '@/types/ai';

export const aiService = {
  sendMessage: async (message: string, language: 'en' | 'id'): Promise<ChatResponse> => {
    const response = await api.post('/ai/chat', { message, language });
    return response.data;
  },

  getChatHistory: async (): Promise<ChatMessage[]> => {
    try {
      const response = await api.get('/ai/chat/history');
      return response.data.chatHistory || [];
    } catch (error) {
      return [];
    }
  }
};
