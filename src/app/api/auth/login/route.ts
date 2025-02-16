import { NextRequest, NextResponse } from "next/server";
import _omit from "lodash/omit";
import { users } from "@/lib/mocks/user";
import { permissions } from "@/lib/mocks/permission";
import { createToken, setTokenCookie } from "@/lib/02.auth";

type Role = "ADMIN" | "OPERATOR";

type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  role: Role;
  permissions?: string[];
};

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // Simulate query user info
  const user: User | undefined = users.find((u) => u.email === email);

  if (!user) {
    return NextResponse.json(
      { message: "User not found", data: null },
      { status: 401 },
    );
  }

  if (user.password !== password) {
    return NextResponse.json(
      { message: "Invalid password", data: null },
      { status: 401 },
    );
  }

  // Simulate query permissions by role
  const permissionsByRole = permissions.find((p) => p.role === user.role);
  user.permissions = permissionsByRole?.actions || [];

  // Remove password from user data
  const userWithoutPassword = _omit(user, "password");

  // Generate JWT token
  const token = await createToken(userWithoutPassword);

  // Set HTTP-only cookie
  await setTokenCookie(token);

  // Return user data without password
  return NextResponse.json(
    { message: null, data: userWithoutPassword },
    { status: 200 },
  );
}
