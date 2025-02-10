import { API_PREFIX } from "@/const/02.admin";
import Api from "@/lib/01.axios";
import { Ride, RideResponse } from "@/types/ride";

export class RideService {
  static async getRides(): Promise<RideResponse> {
    try {
      const response = await Api.get<RideResponse>(`${API_PREFIX}/rides`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getRide(id: number): Promise<Ride> {
    try {
      const response = await Api.get<Ride>(`/rides/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async createRide(ride: Ride): Promise<Ride> {
    try {
      const response = await Api.post<Ride>('/rides', ride);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async updateRide(ride: Ride): Promise<Ride> {
    try {
      const response = await Api.put<Ride>(`/rides/${ride.id}`, ride);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async deleteRide(id: number): Promise<void> {
    try {
      await Api.delete(`/rides/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private static handleError(error: unknown): Error {
    return new Error(error instanceof Error ? error.message : 'An error occurred');
  }
}