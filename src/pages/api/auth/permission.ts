import type { NextApiRequest, NextApiResponse } from 'next';
import { Permission } from '@/types/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Permission[]>
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    // mock data from database
    const userPermissions: Permission[] = ['create', 'view', 'create'];
    res.status(200).json(userPermissions);
  } catch (error: unknown) {
    res.status(500).end(error);
  }
}