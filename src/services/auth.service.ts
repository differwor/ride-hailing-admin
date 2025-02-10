import { API_PREFIX } from '@/const/01.auth';
import Api from '@/lib/01.axios';
import { LoginCredentials, AuthResponse } from '@/types/auth';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await Api.post<AuthResponse>(`${API_PREFIX}/login`, credentials);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async logout(): Promise<void> {
    try {
      await Api.post<AuthResponse>(`${API_PREFIX}/logout`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getProfile(): Promise<AuthResponse> {
    try {
      const response = await Api.get<AuthResponse>(`${API_PREFIX}/me`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private static handleError(error: unknown): Error {
    return new Error(error instanceof Error ? error.message : 'An error occurred');
  }
}