import api from './api';
import { Question, QuestionnaireResponse } from '@/types/questionnaire';

export const questionnaireService = {
  getQuestions: async (): Promise<Record<string, Question>> => {
    const response = await api.get('/questionnaire/questions');
    return response.data;
  },

  submitQuestionnaire: async (answers: Record<string, number>): Promise<QuestionnaireResponse> => {
    const response = await api.post('/questionnaire', { answers });
    return response.data;
  }
};