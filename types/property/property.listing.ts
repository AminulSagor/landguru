
export type BackendSellPostListing = {
  id: string;
  title: string;
  price: number;
  image?: string | null;
  propertyType: string;
  status: string;
  createdAt: string;
  location?: string | null;
};

export type LegacyPropertyListing = {
  id: string;
  title: string;
  locationText: string;
  areaText?: string;
  price: number;
  currencySymbol?: string;
  coverImage: string;
  tag: string;
  mode: string;
  verified?: boolean;
};

export type PropertyListing = BackendSellPostListing | LegacyPropertyListing;

export type SellPostListingMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type SellPostListingResponse = {
  data: BackendSellPostListing[];
  meta: SellPostListingMeta;
};