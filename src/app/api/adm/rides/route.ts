import { NextRequest, NextResponse } from "next/server";
import { drivers } from "@/mockData/driver";
import { rides } from "@/mockData/ride";
import _omit from "lodash/omit";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const isDateInRange = (
  checkDate: string,
  startDate: string,
  endDate: string,
) => {
  if (!checkDate || !startDate || !endDate) return false;
  return dayjs(checkDate).isBetween(startDate, endDate, "day", "[]");
};

export async function GET(request: NextRequest) {
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
        ? r.customer.startsWith(search) ||
          r.driver?.name.startsWith(search) ||
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

  // Simulate delay 2s
  await new Promise((resolve) => setTimeout(resolve, 2000));


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
