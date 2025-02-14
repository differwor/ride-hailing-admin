import { verifyToken } from "@/lib/02.auth";
import { drivers } from "@/mockData/driver";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  // always verify auth token when call from client
  try {
    if (request.headers.get("referer")) {
      await verifyToken();
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: 401 },
    );
  }

  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") as string) || 1;
  const limit = parseInt(searchParams.get("limit") as string) || 3;

  // filter by params
  const ridesByFilter = drivers.filter((r) => search ? r.name.startsWith(search) : true);

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