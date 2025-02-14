import { verifyToken } from "@/lib/02.auth";
import { remove } from "@/mockData/ride";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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

  const body = await request.json();

  if (!body.ids) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  // Simulate delete in db
  remove(body.ids);

  return NextResponse.json(
    {
      message: null,
      data: null,
    },
    { status: 200 },
  );
}
