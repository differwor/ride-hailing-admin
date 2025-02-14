import { verifyToken } from "@/lib/02.auth";
import { drivers } from "@/mockData/driver";
import { rides, update } from "@/mockData/ride";
import { NextRequest, NextResponse } from "next/server";
import _omit from "lodash/omit";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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

  const id = (await params).id;
  console.log('rides', rides);
  const item = rides.find((r) => String(r.id) === id);

  if (!item) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  // simulate aggregation query = ride + driver
  const itemWithDriver = { ..._omit(item, "driverId"), driver: drivers.find((d) => d.id === item.driverId) || null };

  return NextResponse.json(
    {
      message: null,
      data: itemWithDriver,
    },
    { status: 200 },
  );
}

// Only update the fields that need to be change
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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

  const id = params.id;
  const body = await request.json();

  const item = rides.find((r) => String(r.id) === id);

  if (!item) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  const updatedItem = {
    ...item,
    ...body,
  };

  // Simulate delete in db
  update(updatedItem);

  return NextResponse.json(
    {
      message: null,
      data: updatedItem,
    },
    { status: 200 },
  );
}

// PUT is equivalent of PATCH
export const PUT = PATCH;
