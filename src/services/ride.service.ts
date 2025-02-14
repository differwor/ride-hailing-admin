import { API_ADMIN_PREFIX } from "@/config/01.constants";
import {
  Ride,
  RideFilterParams,
  RideResponse,
  RideUpdateBody,
} from "@/types/ride";
import { ApiService } from "./api.service";

export class RideService {
  static async getRides(params?: RideFilterParams) {
    return ApiService.get<RideResponse>(`${API_ADMIN_PREFIX}/rides`, params);
  }

  static async create(body: Partial<RideUpdateBody>) {
    return ApiService.post<Ride>(`${API_ADMIN_PREFIX}/rides`, body);
  }

  static async getById(id: number) {
    return ApiService.get<Ride>(`${API_ADMIN_PREFIX}/rides/${id}`);
  }

  static async delete(ids: string) {
    return ApiService.post(`${API_ADMIN_PREFIX}/rides/delete`, { ids });
  }

  static async update(id: number, body: Partial<RideUpdateBody>) {
    return ApiService.put<Ride>(`${API_ADMIN_PREFIX}/rides/${id}`, body);
  }
}
