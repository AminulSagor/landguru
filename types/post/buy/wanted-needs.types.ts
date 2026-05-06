import type {
  LandSizeUnitLabel,
  PropertyTypeLabel,
} from "@/types/post/buy/buypost.payload.types";

export type PaginationParams = {
  page: number;
  limit: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
};

export type BuyPostListMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type MakeOfferFromExistingRequest = {
  sellPostId: string;
};

export type CreateOfferDraftStep1Request = {
  title: string;
  description: string;
  propertyType: PropertyTypeLabel;
  sellableAmount: number;
  sellableUnit: LandSizeUnitLabel;
  isShareable: boolean;
  isPropertyShareable: boolean;
  askingPrice: number;
  pricePerUnit: number;
  askingPricePerUnit: number;
  distanceFromRoad?: string;
  roadDistanceMin?: number;
  roadDistanceMax?: number;
  roadWidthMin?: number;
  roadWidthMax?: number;
  plotSize?: number;
  plotUnit?: LandSizeUnitLabel;
  division?: string;
  district?: string;
  upazila?: string;
  unionOrCityCorp?: string;
  wardNo?: string;
  postalCode?: string;
  fullAddress?: string;
};

export type UpdateOfferDraftStep2Request = {
  photos: string[];
};

export type PresignUploadRequest = {
  filename: string;
  contentType: string;
  type: string;
};

export type DraftEntityResponse = {
  id?: string;
  offerId?: string;
  draftOfferId?: string;
  postId?: string;
  data?: {
    id?: string;
    offerId?: string;
    draftOfferId?: string;
    postId?: string;
  };
};

export type PresignUploadResponse = {
  data?: {
    uploadUrl?: string;
    presignedUrl?: string;
    signedUrl?: string;
    url?: string;
    putUrl?: string;
    fileUrl?: string;
    publicUrl?: string;
    location?: string;
    key?: string;
  };
};

export type AddressParts = {
  id?: string;
  wardNo?: string;
  unionOrCityCorp?: string;
  upazila?: string;
  district?: string;
  division?: string;
  postalCode?: string;
};

export type BuyerSummary = {
  id?: string;
  phone?: string;
  email?: string;
  name?: string;
  fullName?: string;
  avatar?: string;
  image?: string;
  photoUrl?: string | null;
  role?: string;
  isVerified?: boolean;
  isVerifiedPending?: boolean;
  isNIDVerified?: boolean;
  isTINVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type BuyPostListItem = {
  id?: string;
  buyerId?: string;
  buyer?: BuyerSummary;
  status?: string;
  title?: string;
  description?: string;
  propertyType?: string;
  landSizeMin?: number | null;
  landSizeUnit?: string | null;
  plotSizeMin?: number | null;
  plotSizeUnit?: string | null;
  roadDistanceMin?: number | null;
  roadDistanceMax?: number | null;
  budgetMin?: number | null;
  budgetMax?: number | null;
  address?: AddressParts | string | null;
  rejectionReason?: string | null;
  updatedAt?: string;
  createdAt?: string;
};

export type OfferStatusApiValue =
  | "PENDING"
  | "BUYER_ACCEPTED"
  | "ACCEPTED"
  | "PENDING_ADMIN_REVIEW"
  | "PENDING_ADMIN"
  | "APPOINTMENT_SCHEDULED"
  | "COMPLETED"
  | "DONE"
  | "BUYER_REJECTED"
  | "REJECTED";

export type MyOfferListItem = {
  offerId?: string;
  status?: OfferStatusApiValue;
  title?: string;
  askingPrice?: number;
  thumbnail?: string;
  createdAt?: string;
  offeredAt?: string;
  buyPost?: {
    id?: string;
    title?: string;
    location?: string;
    propertyType?: string;
    sizeMin?: number;
    sizeUnit?: string;
    roadDistanceMin?: number;
    roadDistanceMax?: number;
    budgetMin?: number;
    budgetMax?: number;
    description?: string;
    postedByName?: string;
    postedByAvatar?: string;
    postedBy?: BuyerSummary;
    postedAgo?: string;
  };
};

export type SellPostListItem = {
  id?: string;
  postId?: string;
  title?: string;
  address?: string;
  location?: string;
  price?: number;
  propertyType?: string;
  isVerified?: boolean;
  description?: string;
  sellableAmount?: number;
  sellableUnit?: string;
  plotSize?: number;
  plotUnit?: string;
  roadDistanceMin?: number;
  roadDistanceMax?: number;
  seller?: {
    name?: string;
    fullName?: string;
    avatar?: string;
    image?: string;
    photoUrl?: string;
    isVerified?: boolean;
  };
  photos?: string[];
  image?: string;
  updatedAt?: string;
  createdAt?: string;
};
