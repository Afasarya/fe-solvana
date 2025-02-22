export type PetStage = 'EGG' | 'BABY' | 'TEEN' | 'ADULT';

export interface Pet {
  id: number;
  name: string;
  stage: PetStage;
  currentStreak: number;
  nextEvolution: {
    threshold: number;
    daysLeft: number;
    progress: number;
  } | null;
  achievements: number;
}

export interface Quest {
  questNumber: number;
  title: string;
  description: string;
  url: string;
  status: 'PENDING' | 'COMPLETED';
  completedAt: string | null;
}

export interface QuestCompletion {
  message: string;
  completed: boolean;
  remainingQuests?: number;
  streak?: number;
}

export interface PetStatus {
  pet: Pet;
  streak: number;
}

export interface DailyQuestsResponse {
  quests: Quest[];
  message: string;
}

interface QuestCardProps {
    quest: {
      id: number;
      questNumber: number;
      status: 'PENDING' | 'COMPLETED';
      completedAt: string | null;
      title: string;
      description: string;
      url: string;
      type: 'VIDEO';
    };
    onComplete: (questNumber: number) => void;
  }