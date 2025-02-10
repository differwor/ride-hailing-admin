import type { NextApiRequest, NextApiResponse } from 'next'
import { AUTH_COOKIE_NAME } from '@/const/01.auth';
import { users } from '@/mockData/user';
import { verifyToken } from '@/lib/02.jose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }
  
  // Get session token from cookie
  const authToken = req.cookies[AUTH_COOKIE_NAME];

  if (!authToken) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  try {
    // Get user info from token
    const userInfo = await verifyToken(authToken);

    // Simulate query user info
    const newestInfo = users.find(u => u.email === userInfo.email);

    return res.status(200).json({ success: true, data: newestInfo });
  } catch (error: unknown) {
    res.status(500).json({ error })
  }
}