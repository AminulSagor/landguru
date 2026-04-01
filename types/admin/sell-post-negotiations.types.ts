export type SellPostNegotiationTab =
  | "ADMIN_TO_RESPOND"
  | "WAITING_FOR_USER"
  | "CLOSED";

export type SellPostNegotiationStatus =
  | "QUOTED"
  | "ACTIVE"
  | "PAYMENT_PENDING_REVIEW"
  | string;

export type SellPostNegotiationPost = {
  id: string;
  title: string;
  image: string | null;
  location: string;
};

export type SellPostNegotiationSeller = {
  id: string;
  name: string;
  phone: string;
  image: string | null;
};

export type SellPostNegotiationPricing = {
  adminLastQuote: number | null;
  userNewCounter: number | null;
};

export type SellPostNegotiationItem = {
  negotiationId: string;
  status: SellPostNegotiationStatus;
  post: SellPostNegotiationPost;
  seller: SellPostNegotiationSeller;
  pricing: SellPostNegotiationPricing;
  requoteCount: number;
  lastActionAt: string;
  isActionRequired: boolean;
};

export type SellPostNegotiationsMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type SellPostNegotiationsResponse = {
  data: SellPostNegotiationItem[];
  meta: SellPostNegotiationsMeta;
};

export type SellPostNegotiationsQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: "newest_first" | "oldest_first";
  tab?: SellPostNegotiationTab;
};

export type SellPostNegotiationCounterPayload = {
  mandatoryFee: number;
  optionalFee: number;
};

export type SellPostNegotiationSuccessResponse = {
  success: boolean;
  message: string;
};
