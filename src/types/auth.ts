export interface User {
  id: number;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  profile?: {
    id?: number;
    avatar?: string | null;
    bio?: string | null;
    age?: number | null;
    gender?: string | null;
  };
  questionnaire?: {
    id: number;
    answers: any;
    mentalScore?: number;
    recommendations?: any;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  whatsappNumber: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}