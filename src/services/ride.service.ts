import { API_ADMIN_PREFIX } from "@/config/01.constants";
import { RideFilterParams, RideResponse } from "@/types/ride";
import { ApiService } from "./api.service";

export class RideService {
  static async getRides(params?: RideFilterParams) {
    return ApiService.get<RideResponse>(`${API_ADMIN_PREFIX}/rides`, params);
  }
}
