import { removeTokenCookie } from "@/lib/02.auth";
import { NextResponse } from "next/server";

export async function POST() {
  await removeTokenCookie();
  return NextResponse.json({ message: null, data: null }, { status: 200 });
}
