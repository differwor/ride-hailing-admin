import { Metadata } from "next";
import RideList from "@/components/adm/dashboard/RideList";
import { PAGINATION_LIMIT } from "@/config/01.constants";
import { getRidesSS } from "@/mockData/ride";

export const metadata: Metadata = {
  title: "Admin Center",
};

export default async function Dashboard() {
  // if fetch data from server, we can get data from db directly to ignore token verify
  // NOTE: this simulates getting data
  const ridesSimulatingResponse = await getRidesSS(1, PAGINATION_LIMIT);
  return <RideList ridesSSR={ridesSimulatingResponse} />;
}
