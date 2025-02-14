import { verifyToken } from "@/lib/02.auth";
import { permissions } from "@/mockData/permission";
import { users } from "@/mockData/user";
import { NextResponse } from "next/server";

export async function GET() {
  // Get user data from JWT token
  const user = await verifyToken();

  // Get newest user info
  const newestInfo = users.find((u) => u.email === user.email);

  // Simulate query permissions by role
  const permissionsByRole = permissions.find(
    (p) => p.role === newestInfo?.role
  );

  // Return user data without password
  return NextResponse.json(
    {
      message: null,
      data: { ...newestInfo, permissions: permissionsByRole?.actions || [] },
    },
    { status: 200 }
  );
}
