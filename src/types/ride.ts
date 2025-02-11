import { Driver } from "./driver";

export type Status = 'completed' | 'cancelled' | 'pending' | 'in-progress';

export interface Ride {
  id: number;
  customer: string;
  driver: Driver;
  pickup: string;
  destination: string;
  status: Status;
  rating: number;
  review: string;
}