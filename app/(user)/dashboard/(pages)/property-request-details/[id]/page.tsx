import RequestPropertyDetailsView from "@/app/(user)/dashboard/(pages)/property-request-details/components/RequestPropertyDetailsView";
import { propertyRequestsData } from "@/app/(user)/dashboard/dummy-data/property-request";
import { PropertyRequestDetailsVeiw } from "@/app/(user)/dashboard/types/property-request";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export type PropertyRequestDetails = {
  id: string; // "BUY-1042"
  title: string;
  status: "Active" | "Closed" | "Pending";

  postedBy: string;
  postedAgo: string;
  verified?: boolean;

  location: string;
  propertyType: "Flat" | "Plot" | "House";

  requiredLandSize: string;
  requiredPlotSize: string;

  distanceFromRoad: string;

  budgetMin: number;
  budgetMax: number;

  description: string; // ✅ needed for details page
};

export const propertyRequests: PropertyRequestDetails = {
  id: "BUY-1042",
  title: "3 Bed Ready Flat Needed",
  status: "Active",
  postedBy: "Farhan Ahmed",
  postedAgo: "2h ago",
  verified: true,
  location:
    "Banasree, Ward No. 25, Dhaka South City Corporation, Khilgaon Thana, Dhaka - 1219",
  propertyType: "Flat",
  requiredLandSize: "Min 5 Katha",
  requiredPlotSize: "Min 5 Katha",
  distanceFromRoad: "200m-750m",
  budgetMin: 3000000,
  budgetMax: 4000000,
  description:
    "Client is looking for a ready flat in Dhanmondi area. Must have parking and be above 2nd floor. Preferably close to schools and markets.",
};

export default async function RequestDetailsPage() {
  //   const { id } = await params;

  //   const request: PropertyRequestDetailsVeiw = propertyRequestsData.find(
  //     (x) => x.id === id,
  //   );
  //   if (!request) return notFound();

  return <RequestPropertyDetailsView request={propertyRequests} />;
}
