import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Clear session cookie
  res.setHeader('Set-Cookie', 'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT');

  return res.status(200).json({ message: 'Logged out successfully' });
}