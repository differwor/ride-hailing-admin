import { PaginationResponse } from "./api";
import { Driver } from "./driver";

export type Status = 'completed' | 'cancelled' | 'pending' | 'in-progress';

export type RideFilterParams = {
  status?: Status | null;
  dateRange?: string | null;
  search?: string | null;
  page: number | undefined;
  limit: number | undefined;
};

export interface Ride {
  id: number;
  customer: string;
  driver: Driver;
  pickup: string;
  destination: string;
  status: Status;
  createdDate: string;
  rating: number;
  review: string;
}

export type RideResponse = PaginationResponse<Ride[]>;