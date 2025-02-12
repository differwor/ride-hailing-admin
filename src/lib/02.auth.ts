/**
 * ALERT: This file is intended for server-side use only.
 *
 * This module provides utility functions to create and verify JSON Web Tokens (JWT) using the `jose` library.
 * It leverages the HS256 algorithm for signing and verifying tokens.
 *
 * Functions:
 * - createToken(payload: JWTPayload): Promise<string>
 *   Generates a JWT with the provided payload, sets the issued at time, and sets an expiration time of 1 hour.
 *
 * - verifyToken(token: string): Promise<JWTPayload>
 *   Verifies the provided JWT and returns the decoded payload if the token is valid.
 *
 * - setTokenCookie(token: string): Promise<void>
 *   Sets the provided JWT as an HTTP-only cookie.
 *
 * - getTokenFromCookie(): Promise<string | undefined>
 *   Retrieves the JWT from the HTTP-only cookie.
 *
 * - removeTokenCookie(): Promise<void>
 *   Removes the JWT from the HTTP-only cookie.
 */

import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secret_key = new TextEncoder().encode(
  process.env.JWT_SECRET || "snow-in-winter",
);

const cookieOptions = {
  name: "auth-token",
  // secure: true, // Enable in production
  httpOnly: true,
  path: "/",
  sameSite: "strict" as const,
  maxAge: 60 * 60 * 24, // 24 hours
};

export async function createToken(payload: JWTPayload): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret_key);

  return token;
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  const verified = await jwtVerify(token, secret_key);
  return verified.payload;
}

// Set token in HTTP-only cookie
export async function setTokenCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(cookieOptions.name, token, cookieOptions);
}

// Get token from cookie
export async function getTokenFromCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(cookieOptions.name)?.value;
}

// Remove token cookie
export async function removeTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieOptions.name);
}
