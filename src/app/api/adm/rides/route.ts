import { NextRequest, NextResponse } from "next/server";
import { drivers } from "@/mockData/driver";
import { rides } from "@/mockData/ride";
import _omit from 'lodash/omit';

export async function GET( request: NextRequest ) {
  const searchParams = request.nextUrl.searchParams;

  const customerName = searchParams.get('customerName');
  const id = searchParams.get('id');

  // filter by input
  const ridesByFilter = rides.filter(r => {
    return (customerName ? r.customer === customerName : true) &&
      (id ? r.id === parseInt(id as string) : true)
  });

  // simulate aggregation query = ride + driver
  const aggregationRides = ridesByFilter.map(r => {
    const driver = drivers.find(d => d.id === r.driverId);
    return { ..._omit(r, 'driverId'), driver };
  });
  
  return NextResponse.json({ message: null, data: aggregationRides }, { status: 200 });
}