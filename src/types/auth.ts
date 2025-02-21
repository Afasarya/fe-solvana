export type UserRole = 'USER' | 'ADMIN';

export interface Doctor {
  id: string;
  fullName: string;
  strNumber: string;
  sipNumber: string;
  phoneNumber: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  address: string;
  codePos: string;
  educationBackground: string;
  photoProfile?: string;
  documentsProof?: string;
  layananKesehatanId: string;
}

export interface User {
    id: string;
    email: string;
    role: UserRole;
    doctor?: Doctor;
    createdAt: Date;
    updatedAt: Date;
  }

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  confirmPassword: string;
}