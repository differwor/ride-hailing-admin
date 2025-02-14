import { StatusRecord } from "@/config/01.constants";
import { PaginationResponse } from "./api";
import { Driver } from "./driver";

export type Status = (typeof StatusRecord)[keyof typeof StatusRecord]["value"];

export type RideFilterParams = {
  status?: Status | null;
  dateRange?: string | null;
  search?: string | null;
  page?: number | undefined;
  limit?: number | undefined;
};

export interface Ride {
  id: number;
  customer: string;
  driver: Driver | null;
  pickup: string;
  destination: string;
  status: Status;
  createdDate: string;
  rating: number;
  review: string;
}

export type RideUpdateBody = Omit<Ride, "driver"> & {
  driverId: number;
};

export type RideResponse = PaginationResponse<Ride[]>;
