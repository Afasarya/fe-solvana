import api from './api';
import { ImageAnalysisResponse } from '@/types/ai';
export const imageAiService = {
  analyzeImage: async (file: File, userId: number): Promise<ImageAnalysisResponse> => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId.toString());

    const response = await api.post('/imageai/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  checkUsage: async (userId: number) => {
    const response = await api.get(`/imageai/usage/${userId}`);
    return response.data.usageInfo;
  }
};