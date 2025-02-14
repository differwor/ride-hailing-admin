import { API_ADMIN_PREFIX } from "@/config/01.constants";
import { ApiService } from "./api.service";
import { DriverFilterParams, DriverResponse } from "@/types/driver";

export class DriverService {
  static async getDrivers(params?: DriverFilterParams) {
    return ApiService.get<DriverResponse>(`${API_ADMIN_PREFIX}/driver`, params);
  }
}
