import { API_PREFIX } from '@/const/01.auth';
import { LoginCredentials, User } from '@/types/auth';
import { ApiService } from './api.service';

export class AuthService {
  static async login(credentials: LoginCredentials) {
    return ApiService.post<User>(`${API_PREFIX}/login`, credentials as User);
  }

  static async logout(): Promise<void> {
    await ApiService.post(`${API_PREFIX}/logout`, null);
  }

  static async getProfile() {
    return ApiService.get<User>(`${API_PREFIX}/me`);
  }
}