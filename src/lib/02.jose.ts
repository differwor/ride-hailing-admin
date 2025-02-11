/**
 * ALERT: This file is intended for server-side use only.
 * 
 * This module provides utility functions to create and verify JSON Web Tokens (JWT) using the `jose` library.
 * It leverages the HS256 algorithm for signing and verifying tokens.
 * 
 * Functions:
 * - createToken(payload: JWTPayload): Promise<string>
 *   Generates a JWT with the provided payload, sets the issued at time, and sets an expiration time of 20 seconds.
 * 
 * - verifyToken(token: string): Promise<JWTPayload>
 *   Verifies the provided JWT and returns the decoded payload if the token is valid.
 */

import { JWTPayload, jwtVerify, SignJWT } from 'jose';

const secret_key = new TextEncoder().encode(process.env.JWT_SECRET || 'snow-in-winter');

export async function createToken(payload: JWTPayload): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret_key);
  
  return token;
};

export async function verifyToken(token: string): Promise<JWTPayload> {
    const verified = await jwtVerify(token, secret_key);
    return verified.payload;
};
