export interface ChatMessage {
  id: number;
  content: string;
  role: 'user' | 'assistant';
  language: 'en' | 'id';
  createdAt: string;
}

export interface ChatResponse {
  message: string;
}

export interface ImageAnalysis {
    mood: 'HAPPY' | 'SAD' | 'NEUTRAL' | 'ANGRY';
    confidence: number;
    analysis: string;
    facial_features: {
      eyes: string;
      mouth: string;
      overall_expression: string;
    };
    body_language: string;
    context: string;
    suggested_emotional_state: string;
  }
  
  export interface ImageAnalysisResponse {
    status: 'success' | 'error';
    analysis: ImageAnalysis;
    usageInfo: {
      remaining: number;
      totalAllowed: number;
      nextReset: string;
      usedThisWeek: number;
    };
  }