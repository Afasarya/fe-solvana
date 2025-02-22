import api from './api';
import { Profile, ProfileUpdateData } from '@/types/profile';

export const profileService = {
  updateProfile: async (data: ProfileUpdateData): Promise<Profile> => {
    const response = await api.put('/profile', data);
    return response.data;
  }
};