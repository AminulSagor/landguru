import type { BuyRequestStatus } from "@/types/admin/buy-requests/buy-requests-list.types";

export interface BuyRequestApproveAddress {
  id: string;
  division: string;
  district: string;
  upazila: string;
  unionOrCityCorp: string;
  wardNo: string;
  postalCode: string;
}

export interface BuyRequestApproveResponse {
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
  address: BuyRequestApproveAddress | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
}
