import api from './api';
import { Pet, Quest, QuestCompletion, PetStatus, DailyQuestsResponse } from '@/types/gamification';

export const gamificationService = {
  // Pet-related endpoints
  createPet: async (): Promise<Pet> => {
    const response = await api.post('/pets'); // Changed from /pet to /pets
    return response.data;
  },

  getPet: async (): Promise<Pet> => {
    const response = await api.get('/pets'); // Changed from /pet to /pets
    return response.data;
  },

  updatePetName: async (name: string): Promise<Pet> => {
    const response = await api.put('/pets/name', { name }); // Changed from /pet/name to /pets/name
    return response.data;
  },

  getPetStatus: async (): Promise<PetStatus> => {
    const response = await api.get('/pets/status'); // Changed from /pet/status to /pets/status
    return response.data;
  },

  // Quest-related endpoints
  getDailyQuests: async (): Promise<DailyQuestsResponse> => {
    const response = await api.get('/quests/daily'); // Changed from /quest/daily to /quests/daily
    return response.data;
  },

  completeQuest: async (questNumber: number): Promise<QuestCompletion> => {
    const response = await api.post(`/quests/complete/${questNumber}`); // Changed from /quest/complete to /quests/complete
    return response.data;
  }
};