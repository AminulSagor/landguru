export type BuyRequestApiTab = "PENDING" | "ACTIVE" | "ARCHIVED";

export type BuyRequestStatus =
  | "PENDING_ADMIN"
  | "ACTIVE"
  | "ARCHIVED"
  | (string & {});

export type BuyRequestSortKey = "newest_first" | "oldest_first";
export type BuyRequestTabKey =
  | "pending_validation"
  | "active_listings"
  | "archived";
export type BuyRequestTagIconKey = "home" | "ruler" | "wallet";

export interface BuyRequestBuyerApi {
  id: string;
  name: string;
  phone: string;
  image: string | null;
  isVerified: boolean;
}

export interface BuyRequestPostApi {
  id: string;
  title: string;
  description: string;
  status: BuyRequestStatus;
  propertyType: string;
  address: string;
  distanceFromRoad: string;
  propertySize: string;
  priceRange: string;
  rejectionReason: string | null;
}

export interface BuyRequestListApiItem {
  buyer: BuyRequestBuyerApi;
  post: BuyRequestPostApi;
}

export interface BuyRequestListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BuyRequestListApiResponse {
  success: boolean;
  data: BuyRequestListApiItem[];
  meta: BuyRequestListMeta;
}

export interface BuyRequestTag {
  icon: BuyRequestTagIconKey;
  label: string;
  strong?: string;
}

export interface BuyRequestListUser {
  id: string;
  avatarUrl: string | null;
  name: string;
  phone: string;
  verified: boolean;
}

export interface BuyRequestListItem {
  id: string;
  title: string;
  status: BuyRequestStatus;
  statusLabel: string;
  createdAgo?: string | null;
  description: string;
  locationLine: string;
  tags: BuyRequestTag[];
  user: BuyRequestListUser;
}

export interface BuyRequestListResponse {
  success: boolean;
  data: BuyRequestListItem[];
  meta: BuyRequestListMeta;
}

export interface BuyRequestsListQueryParams {
  page?: number;
  limit?: number;
  tab?: BuyRequestApiTab;
}

export interface BuyRequestTabItem {
  key: BuyRequestTabKey;
  label: string;
}
