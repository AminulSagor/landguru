import type { PropertyTypeLabel } from "@/types/post/buy/buypost.payload.types";

export type PropertyRequestPropertyType =
  | PropertyTypeLabel
  | "Plot"
  | "House"
  | "Villa";

export type PropertyRequest = {
  id: string;
  title: string;
  postedBy: string;
  postedAgo: string;
  code: string;

  location: string;
  propertyType: PropertyRequestPropertyType;

  requiredLandSize: string;
  requiredPlotSize: string;

  distanceFromRoad: string;

  budgetMin: number;
  budgetMax: number;
};

export type PropertyRequestDetailsVeiw = PropertyRequest & {
  status: "Active" | "Closed" | "Pending";
  description: string;
  verified?: boolean;
};