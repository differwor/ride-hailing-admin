import { JWT_SECRET } from '@/const/01.auth';
import { JWTPayload, jwtVerify, SignJWT } from 'jose';

const key = new TextEncoder().encode(JWT_SECRET)

export async function createToken(payload: JWTPayload): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key);
  
  return token;
};

export async function verifyToken(token: string): Promise<JWTPayload> {
    const verified = await jwtVerify(token, key)
    return verified.payload;
};
