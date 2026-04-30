import type {
  SellPostNegotiationItem,
  SellPostNegotiationSeller,
  SellPostNegotiationsMeta,
  SellPostNegotiationsResponse,
} from "@/types/admin/quote-requote/sell-post-negotiations.types";

export type SellPostNegotiationApiItem = {
  negotiationId?: string;
  lastActionAt?: string;
  status?: string;
  isActionRequired?: boolean;
  requoteCount?: number;
  post?: {
    id?: string;
    title?: string;
    image?: string | null;
    location?: string | null;
  };
  seller?: {
    id?: string;
    name?: string;
    phone?: string;
    image?: string | null;
  };
  pricing?: {
    adminLastQuote?: number | null;
    userNewCounter?: number | null;
  };
  postId?: string;
  postTitle?: string;
  postImage?: string | null;
  postLocation?: string | null;
  adminLastQuote?: number | null;
  userNewCounter?: number | null;
};

export type SellPostNegotiationsApiResponse = {
  data?: SellPostNegotiationApiItem[];
  meta: SellPostNegotiationsMeta;
};

const mapSeller = (
  seller?: SellPostNegotiationApiItem["seller"],
): SellPostNegotiationSeller => ({
  id: seller?.id ?? "",
  name: seller?.name ?? "",
  phone: seller?.phone ?? "",
  image: seller?.image ?? null,
});

const mapNegotiationItem = (
  item: SellPostNegotiationApiItem,
): SellPostNegotiationItem => {
  const postId = item.post?.id ?? item.postId ?? "";
  const postTitle = item.post?.title ?? item.postTitle ?? "";
  const postImage = item.post?.image ?? item.postImage ?? null;
  const postLocation = item.post?.location ?? item.postLocation ?? null;
  const adminLastQuote =
    item.pricing?.adminLastQuote ?? item.adminLastQuote ?? null;
  const userNewCounter =
    item.pricing?.userNewCounter ?? item.userNewCounter ?? null;

  return {
    negotiationId: item.negotiationId ?? "",
    postId,
    postTitle,
    postImage,
    seller: mapSeller(item.seller),
    adminLastQuote,
    userNewCounter,
    requoteCount: item.requoteCount ?? 0,
    lastActionAt: item.lastActionAt ?? "",
    status: item.status,
    isActionRequired: item.isActionRequired,
    postLocation,
  };
};

export const mapSellPostNegotiationsResponse = (
  response: SellPostNegotiationsApiResponse,
): SellPostNegotiationsResponse => ({
  data: (response.data ?? []).map(mapNegotiationItem),
  meta: response.meta,
});
