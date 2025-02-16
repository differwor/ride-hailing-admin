import { drivers } from "./driver";
import _omit from "lodash/omit";

type Status = "completed" | "cancelled" | "pending" | "in-progress";

interface Ride {
  id: number;
  customer: string;
  driverId: number;
  pickup: string;
  destination: string;
  status: Status;
  createdDate: string | null;
  rating: number | null;
  review: string | null;
}

export const rides: Ride[] = [
  {
    id: 1,
    customer: "David",
    driverId: 101,
    pickup: "Quan 1, HCM",
    destination: "Quan 3, HCM",
    status: "completed",
    createdDate: "2025-02-01",
    rating: 4,
    review: "Great ride",
  },
  {
    id: 2,
    customer: "Tony",
    driverId: 102,
    pickup: "Quan 2, HCM",
    destination: "Quan 7, HCM",
    status: "cancelled",
    createdDate: "2025-02-03",
    rating: 4,
    review: "Great ride",
  },
  {
    id: 3,
    customer: "Justin",
    driverId: 103,
    pickup: "Quan 5, HCM",
    destination: "Quan 10, HCM",
    status: "pending",
    createdDate: "2025-02-05",
    rating: 2,
    review: "Great ride",
  },
  {
    id: 4,
    customer: "Travis",
    driverId: 104,
    pickup: "Quan 9, HCM",
    destination: "Thu Duc, HCM",
    status: "in-progress",
    createdDate: "2025-02-07",
    rating: 3,
    review: "Great ride",
  },
  {
    id: 5,
    customer: "Kendrick",
    driverId: 102,
    pickup: "Quan 7, HCM",
    destination: "Quan 2, HCM",
    status: "in-progress",
    createdDate: "2025-02-09",
    rating: 1,
    review: "Not good ride",
  },
  {
    id: 6,
    customer: "Drake",
    driverId: 103,
    pickup: "Quan 4, HCM",
    destination: "Quan 1, HCM",
    status: "completed",
    createdDate: "2025-02-11",
    rating: 2,
    review: "Good ride",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRidesSS = async (page: number, limit: number): Promise<any> => {
  const aggregationRides = rides.map((r) => {
    const driver = drivers.find((d) => d.id === r.driverId);
    return { ..._omit(r, "driverId"), driver };
  });

  let ridesByPaging = aggregationRides;
  if (page && limit) {
    const startIndex = (page - 1) * limit;
    ridesByPaging = aggregationRides.slice(startIndex, startIndex + limit);
  }

  return {
    items: ridesByPaging,
    extras: {
      current: page,
      limit: limit,
      totalItems: rides.length,
      totalPages: Math.ceil(rides.length / limit),
    },
  };
};

export const remove = (ids: string) => {
  const parsedIds = ids.split(",");
  for (let i = rides.length - 1; i >= 0; i--) {
    if (parsedIds.includes(rides[i].id.toString())) {
      rides.splice(i, 1);
    }
  }
};

export const create = (newItem: Ride) => {
  rides.unshift(newItem);
  return newItem;
};

export const update = (newItem: Ride) => {
  const index = rides.findIndex((item) => item.id === newItem.id);
  rides[index] = newItem;
  return newItem;
};
