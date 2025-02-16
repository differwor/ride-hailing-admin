import { Metadata } from "next";
import RideList from "@/components/adm/dashboard/RideList";
// import { PAGINATION_LIMIT } from "@/config/01.constants";
// import { getRidesSS } from "@/lib/mockData/ride";

export const metadata: Metadata = {
  title: "Admin Center",
};

export default async function Dashboard() {
  // if you want to fetch data from server, you can get data from db directly to ignore token verify
  // NOTE: this simulates getting data
  // const ridesSimulatingResponse = await getRidesSS(1, PAGINATION_LIMIT);
  return (
    <div className="w-full flex flex-col gap-y-4">
      <strong className="text-4xl">List bookings</strong>
      <RideList ridesSSR={null} />
    </div>
  );
}
