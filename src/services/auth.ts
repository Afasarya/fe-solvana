import api from './api';
import { User, LoginCredentials, RegisterCredentials } from '@/types/auth';
import { AxiosError } from 'axios';

interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

interface ApiError {
  message: string;
  status?: number;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.status === 401) {
        throw new Error('Invalid credentials');
      }
      throw new Error(axiosError.response?.data?.message || 'Login failed');
    }
  },

  register: async (userData: RegisterCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/register', {
        email: userData.email,
        password: userData.password,
        name: userData.name,
        whatsappNumber: userData.whatsappNumber,
        role: 'USER'
      });
      
      return {
        message: response.data.message || 'Registration successful',
        token: response.data.token,
        user: response.data.user
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || 'Registration failed');
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getAuthToken: (): string | null => {
    return localStorage.getItem('token');
  },

  setAuthToken: (token: string): void => {
    localStorage.setItem('token', token);
  }
};