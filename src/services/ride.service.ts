import { API_PREFIX } from "@/const/02.admin";
import { Ride } from "@/types/ride";
import { ApiService } from "./api.service";

export class RideService {
  static async getRides() {
    return ApiService.get<Ride[]>(`${API_PREFIX}/rides`);
  }
}