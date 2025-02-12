import { getTokenFromCookie, verifyToken } from "@/lib/02.auth";
import { users } from "@/mockData/user";
import { NextResponse } from "next/server";

export async function GET() {
  // get token from cookie
  const token = await getTokenFromCookie();

  // Get user data from JWT token
  const user = await verifyToken(token as string);

  // Get newest user info
  const newestInfo = users.find((u) => u.email === user.email);

  // Return user data without password
  return NextResponse.json(
    { message: null, data: newestInfo },
    { status: 200 },
  );
}
