import { PaginationResponse } from "./api";

export interface Driver {
  id: number;
  name: string;
  phone: string;
  vehicleDetail: string;
}

export type DriverFilterParams = {
  search?: string | null;
  page?: number | undefined;
  limit?: number | undefined;
};

export type DriverResponse = PaginationResponse<Driver[]>;
