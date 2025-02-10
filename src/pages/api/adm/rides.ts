import type { NextApiRequest, NextApiResponse } from 'next'
import { rides } from '@/mockData/ride';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        const { customerName, id } = req.query;
        const ridesByFilter = rides.filter(r => {
          return (customerName ? r.customer === customerName : true) &&
            (id ? r.id === parseInt(id as string) : true)
        });
        return res.status(200).json({ success: true, data: ridesByFilter });
    
      default:
        return res.status(200).json({ success: true });
    }
  } catch (error: unknown) {
    res.status(500).json({ error })
  }
}