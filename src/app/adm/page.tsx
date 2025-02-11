import { RideService } from '@/services/ride.service';
import { Metadata } from 'next';
import RidesTable from './_components/RidesTable';

export const metadata: Metadata = {
  title: "Admin Center",
};

export default async function Page() {
  const ridesResponse = await RideService.getRides();
  return (
    <RidesTable listRides={ridesResponse.data || []} />
  );
}
