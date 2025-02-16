import { NextRequest, NextResponse } from "next/server";
import { drivers } from "@/lib/mocks/driver";
import { create, rides } from "@/lib/mocks/ride";
import _omit from "lodash/omit";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { verifyToken } from "@/lib/02.auth";

dayjs.extend(isBetween);

const isDateInRange = (
  checkDate: string | null,
  startDate: string,
  endDate: string,
) => {
  if (!checkDate || !startDate || !endDate) return false;
  return dayjs(checkDate).isBetween(startDate, endDate, "day", "[]");
};

export async function GET(request: NextRequest) {
  // always verify auth token when call from client
  try {
    await verifyToken();
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: 401 },
    );
  }

  const searchParams = request.nextUrl.searchParams;

  const status = searchParams.get("status");
  const dateRange = searchParams.get("dateRange");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") as string) || 1;
  const limit = parseInt(searchParams.get("limit") as string) || 3;

  // simulate aggregation query = ride + driver
  const aggregationRides = rides.map((r) => {
    const driver = drivers.find((d) => d.id === r.driverId);
    return { ..._omit(r, "driverId"), driver };
  });

  // filter by params
  const ridesByFilter = aggregationRides.filter((r) => {
    let isValidRange = true;
    if (dateRange) {
      const [startDate, endDate] = dateRange.split(",");
      isValidRange = isDateInRange(r.createdDate, startDate, endDate);
    }

    return (
      isValidRange &&
      (status ? r.status === status : true) &&
      (search
        ? r.customer.toLowerCase().startsWith(search) ||
          r.driver?.name.toLowerCase().startsWith(search) ||
          String(r.id).startsWith(search)
        : true)
    );
  });

  // Return by page and limit
  let ridesByPaging;
  if (page && limit) {
    const startIndex = (page - 1) * limit;
    ridesByPaging = ridesByFilter.slice(startIndex, startIndex + limit);
  }

  return NextResponse.json(
    {
      message: null,
      data: {
        items: ridesByPaging,
        extras: {
          current: page,
          limit: limit,
          totalItems: ridesByFilter.length,
          totalPages: Math.ceil(ridesByFilter.length / limit),
        },
      },
    },
    { status: 200 },
  );
}

export async function POST(request: NextRequest) {
  // always verify auth token when call from client
  try {
    await verifyToken();
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: 401 },
    );
  }

  const body = await request.json();

  // Simulate validation
  if (!body.customer) {
    return NextResponse.json(
      { message: "customer is required" },
      { status: 400 },
    );
  }
  if (!body.driverId) {
    return NextResponse.json(
      { message: "driverId is required" },
      { status: 400 },
    );
  }
  if (!body.pickup) {
    return NextResponse.json(
      { message: "pickup is required" },
      { status: 400 },
    );
  }
  if (!body.destination) {
    return NextResponse.json(
      { message: "destination is required" },
      { status: 400 },
    );
  }

  const newItem = {
    ...body,
    id: Math.floor(Math.random() * 1000) + 1,
    review: null,
    status: "in-progress",
    createdDate: new Date().toISOString().split("T")[0],
  };

  // Simulate create in db
  create(newItem);

  return NextResponse.json(
    {
      message: "Create item successfully",
      data: newItem,
    },
    { status: 201 },
  );
}
