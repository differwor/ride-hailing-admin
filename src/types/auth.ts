export type Role = 'admin' | 'operator';
export type Permission = 'view' | 'create';

export interface User {
  id: number;
  username: string;
  role: Role;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User | null;
  token: string | null;
}