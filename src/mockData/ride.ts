import { Status } from "@/types/ride";

export const rides = [
  {
    id: 1,
    customer: 'Lagos1',
    driverId: 101,
    pickup: 'Lagos1',
    destination: 'Abuja1',
    status: 'completed' as Status,
    rating: 5,
    review: 'Great ride',
  },
  {
    id: 2,
    customer: 'Lagos2',
    driverId: 102,
    pickup: 'Lagos2',
    destination: 'Abuja2',
    status: 'cancelled' as Status,
    rating: 5,
    review: 'Great ride',
  },
  {
    id: 3,
    customer: 'Lagos3',
    driverId: 103,
    pickup: 'Lagos3',
    destination: 'Abuja3',
    status: 'pending' as Status,
    rating: 5,
    review: 'Great ride',
  },
  {
    id: 4,
    customer: 'Lagos4',
    driverId: 104,
    pickup: 'Lagos4',
    destination: 'Abuja4',
    status: 'in-progress' as Status,
    rating: 5,
    review: 'Great ride',
  },
]