import { AUTH_COOKIE_NAME } from '@/const/01.auth';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Clear the authentication token or session
    res.setHeader('Set-Cookie', `${AUTH_COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict`);
    res.status(200).json({ success: true, message: 'Logged out successfully', data: null });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      data: null
    })
  }
}