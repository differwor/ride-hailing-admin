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

export let rides: Ride[] = [
  {
    id: 1,
    customer: "cus1",
    driverId: 101,
    pickup: "pic1",
    destination: "des1",
    status: "completed",
    createdDate: "2025-02-01",
    rating: 4,
    review: "Great ride",
  },
  {
    id: 2,
    customer: "cus2",
    driverId: 102,
    pickup: "pic2",
    destination: "des2",
    status: "cancelled",
    createdDate: "2025-02-03",
    rating: 4,
    review: "Great ride",
  },
  {
    id: 3,
    customer: "cus3",
    driverId: 103,
    pickup: "pic3",
    destination: "des3",
    status: "pending",
    createdDate: "2025-02-05",
    rating: 2,
    review: "Great ride",
  },
  {
    id: 4,
    customer: "cus4",
    driverId: 104,
    pickup: "pic4",
    destination: "des4",
    status: "in-progress",
    createdDate: "2025-02-07",
    rating: 3,
    review: "Great ride",
  },
  {
    id: 5,
    customer: "cus5",
    driverId: 102,
    pickup: "pic5",
    destination: "des6",
    status: "in-progress",
    createdDate: "2025-02-09",
    rating: 1,
    review: "Not good ride",
  },
  {
    id: 6,
    customer: "cus6",
    driverId: 103,
    pickup: "pic6",
    destination: "des6",
    status: "completed",
    createdDate: "2025-02-11",
    rating: 2,
    review: "Good ride",
  },
];

export const remove = (ids: string) => {
  const parsedIds = ids.split(",");
  rides = rides.filter((item) => !parsedIds.includes(String(item.id)));
};

export const create = (newItem: Ride) => {
  rides.push(newItem);
  return newItem;
};

export const update = (newItem: Ride) => {
  const index = rides.findIndex((item) => item.id === newItem.id);
  rides[index] = newItem;
  return newItem;
};
