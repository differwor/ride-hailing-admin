export type Status = 'completed' | 'cancelled' | 'pending' | 'in-progress';

export interface Ride {
  id: number,
  customer: string,
  driverName: string,
  pickup: string,
  destination: string,
  status: Status,
}