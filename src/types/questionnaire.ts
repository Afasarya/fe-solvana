export interface Question {
  question: string;
  scale: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
  };
}

export interface QuestionnaireResponse {
  questionnaire: {
    id: number;
    mentalScore: number;
    analysis: {
      overview: string;
      concerns: string[];
      strengths: string[];
      recommendations: string[];
      dailyActivities: string[];
      professionalHelpRecommended: boolean;
    };
    createdAt: string;
  };
  pet: {
    name: string;
    stage: string;
  };
}