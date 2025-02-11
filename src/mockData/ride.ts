import { Status } from "@/types/ride";

export const rides = [
  {
    id: 1,
    customer: 'cus1',
    driverId: 101,
    pickup: 'pic1',
    destination: 'des1',
    status: 'completed' as Status,
    rating: 5,
    review: 'Great ride',
  },
  {
    id: 2,
    customer: 'cus2',
    driverId: 102,
    pickup: 'pic2',
    destination: 'des2',
    status: 'cancelled' as Status,
    rating: 5,
    review: 'Great ride',
  },
  {
    id: 3,
    customer: 'cus3',
    driverId: 103,
    pickup: 'pic3',
    destination: 'des3',
    status: 'pending' as Status,
    rating: 5,
    review: 'Great ride',
  },
  {
    id: 4,
    customer: 'cus4',
    driverId: 104,
    pickup: 'pic4',
    destination: 'des4',
    status: 'in-progress' as Status,
    rating: 5,
    review: 'Great ride',
  },
]