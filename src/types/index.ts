export interface User {
  id: number;
  name: string;
  email: string;
  profile?: {
    bio: string | null;
    age: number | null;
    gender: string | null;
    avatar: string | null;
  };
}

export interface DashboardStats {
  currentStreak: number;
  diaryCount: number;
  currentMood: string;
  questionnaire: number;
}

export type MoodType = 'HAPPY' | 'NEUTRAL' | 'SAD' | 'ANGRY';

export interface MoodEntry {
  type: MoodType;
  note: string;
  createdAt: string;
}
