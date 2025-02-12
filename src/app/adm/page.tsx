import { RideService } from "@/services/ride.service";
import { Metadata } from "next";
import RideList from "@/components/adm/dashboard/RideList";
import { PAGINATION_LIMIT } from "@/config/01.constants";

export const metadata: Metadata = {
  title: "Admin Center",
};

export default async function Dashboard() {
  const ridesResponse = await RideService.getRides({
    page: 1,
    limit: PAGINATION_LIMIT,
  });
  return <RideList ridesSSR={ridesResponse.data} />;
}
