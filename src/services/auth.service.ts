import { LoginCredentials, User } from "@/types/auth";
import { ApiService } from "./api.service";
import { API_AUTH_PREFIX } from "@/config/01.constants";

export class AuthService {
  static async login(credentials: LoginCredentials) {
    return ApiService.post<User>(`${API_AUTH_PREFIX}/login`, credentials);
  }

  static async logout(): Promise<void> {
    await ApiService.post(`${API_AUTH_PREFIX}/logout`, null);
  }

  static async getProfile() {
    return ApiService.get<User>(`${API_AUTH_PREFIX}/me`);
  }
}
