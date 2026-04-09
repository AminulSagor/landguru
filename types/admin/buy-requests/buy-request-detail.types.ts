import type {
  BuyRequestStatus,
  BuyRequestTag,
  BuyRequestTagIconKey,
} from "@/types/admin/buy-requests/buy-requests-list.types";

export interface BuyRequestDetailAddressObject {
  id: string;
  division: string;
  district: string;
  upazila: string;
  unionOrCityCorp: string;
  wardNo: string;
  postalCode: string;
}

export interface BuyRequestDetailBuyerApi {
  id: string;
  name: string;
  phone: string;
  image: string | null;
  isVerified: boolean;
  isNIDVerified: boolean;
}

export interface BuyRequestDetailPostApi {
  id: string;
  title: string;
  description: string;
  status: BuyRequestStatus;
  propertyType: string;
  address: string;
  fullAddressObject: BuyRequestDetailAddressObject | null;
  distanceFromRoad: string;
  propertySize: string;
  priceRange: string;
  rejectionReason: string | null;
}

export interface BuyRequestDetailApiResponse {
  buyer: BuyRequestDetailBuyerApi;
  post: BuyRequestDetailPostApi;
}

export interface BuyRequestDetailUser {
  id: string;
  avatarUrl: string | null;
  name: string;
  phone: string;
  verified: boolean;
  nidVerified: boolean;
}

export interface BuyRequestDetailData {
  id: string;
  title: string;
  status: BuyRequestStatus;
  statusLabel: string;
  description: string;
  locationLine: string;
  tags: BuyRequestTag[];
  user: BuyRequestDetailUser;
  rejectionReason: string | null;
  addressObject: BuyRequestDetailAddressObject | null;
}

export interface BuyRequestDialogFallbackData {
  id: string;
  title: string;
  statusLabel: string;
  description: string;
  locationLine: string;
  tags: BuyRequestTag[];
  user: {
    avatarUrl: string | null;
    name: string;
    phone: string;
    verified: boolean;
  };
}

export interface BuyRequestQuickVerificationItem {
  icon: BuyRequestTagIconKey;
  label: string;
  ok: boolean;
}
