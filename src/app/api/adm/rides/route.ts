import { rides } from "@/mockData/ride";
import { NextRequest, NextResponse } from "next/server";

export async function GET( request: NextRequest ) {
  const searchParams = request.nextUrl.searchParams;

  const customerName = searchParams.get('customerName');
  const id = searchParams.get('id');

  const ridesByFilter = rides.filter(r => {
    return (customerName ? r.customer === customerName : true) &&
      (id ? r.id === parseInt(id as string) : true)
  });
  
  return NextResponse.json({ message: null, data: ridesByFilter }, { status: 200 });
}