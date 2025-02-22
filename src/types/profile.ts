export interface Profile {
  id: number;
  bio: string | null;
  age: number | null;
  gender: string | null;
  userId: number;
}

export interface ProfileUpdateData {
  bio?: string;
  age?: number;
  gender?: string;
}