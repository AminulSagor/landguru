import type { BuyRequestStatus } from "@/types/admin/buy-requests/buy-requests-list.types";

export interface BuyRequestRejectPayload {
  rejectionReason: string;
}

export interface BuyRequestRejectAddress {
  id: string;
  division: string;
  district: string;
  upazila: string;
  unionOrCityCorp: string;
  wardNo: string;
  postalCode: string;
}

export interface BuyRequestRejectResponse {
  id: string;
  buyerId: string;
  status: BuyRequestStatus;
  title: string;
  description: string;
  propertyType: string;
  landSizeMin: number | null;
  landSizeUnit: string | null;
  plotSizeMin: number | null;
  plotSizeUnit: string | null;
  roadDistanceMin: number | null;
  roadDistanceMax: number | null;
  budgetMin: number | null;
  budgetMax: number | null;
  address: BuyRequestRejectAddress | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
}
