export type Id = string;
export type ApiNumber = number | string;
export type ApiDateString = string;

export type PropertyTypeDto =
  | "Flat"
  | "FLAT"
  | "Plain Land"
  | "PLAIN_LAND"
  | "plainLand"
  | "Water Land"
  | "WATER_LAND"
  | "waterLand"
  | "Agro Land"
  | "AGRO_LAND"
  | "agroLand"
  | string;

export interface PaginationMetaDto {
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface ApiListResponseDto<T> {
  success?: boolean;
  message?: string;
  data: T[];
  meta?: PaginationMetaDto;
  total?: number;
}

export interface ApiDataResponseDto<T> {
  success?: boolean;
  message?: string;
  data: T;
}

export type ApiMaybeWrappedDto<T> = T | ApiDataResponseDto<T>;

export interface AddressPartsDto {
  id?: Id;
  sellPostId?: Id;
  division?: string | null;
  district?: string | null;
  upazila?: string | null;
  unionOrCityCorp?: string | null;
  wardNo?: string | null;
  postalCode?: string | null;
  fullAddress?: string | null;
  location?: string | null;
}

export interface UserSummaryDto {
  id?: Id;
  name?: string | null;
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  avatar?: string | null;
  image?: string | null;
  imageUrl?: string | null;
  photoUrl?: string | null;
  isVerified?: boolean;
}

export type MySellPostTabDto = "ALL" | "PENDING" | "QUOTED" | "ACTIVE" | "DRAFT";

export type SellPostStatusDto =
  | "PENDING"
  | "PENDING_ADMIN"
  | "PENDING_ADMIN_REVIEW"
  | "QUOTED"
  | "ACTIVE"
  | "DRAFT"
  | "COMPLETED"
  | "DONE"
  | string;

export type BuyPostStatusDto =
  | "PENDING"
  | "PENDING_ADMIN"
  | "PENDING_ADMIN_REVIEW"
  | "ACTIVE"
  | "DRAFT"
  | "COMPLETED"
  | "DONE"
  | "ARCHIVED"
  | "REJECTED"
  | string;

export type OfferStatusDto =
  | "PENDING"
  | "ACCEPTED"
  | "BUYER_ACCEPTED"
  | "BUYER_ACCEPTED_OFFER"
  | "REJECTED"
  | "BUYER_REJECTED"
  | "PENDING_ADMIN"
  | "PENDING_ADMIN_REVIEW"
  | "APPOINTMENT_SCHEDULED"
  | "COMPLETED"
  | "DONE"
  | string;

/* =========================
   Sell Posts
========================= */

export interface SellPostDto {
  id: Id;
  postId?: string | null;
  shortId?: string | null;
  sellerId?: Id;
  lastCompletedStep?: number | null;

  title?: string | null;
  description?: string | null;

  price?: ApiNumber | null;
  askingPrice?: ApiNumber | null;
  askingPricePerUnit?: ApiNumber | null;

  propertyType?: PropertyTypeDto | null;
  status?: SellPostStatusDto | null;
  isVerified?: boolean;
  isPropertyShareable?: boolean | null;
  isResell?: boolean | null;

  image?: string | null;
  imageUrl?: string | null;
  photo?: string | null;
  thumbnail?: string | null;
  coverImage?: string | null;
  photos?: string[];
  images?: string[];

  sellableAmount?: ApiNumber | null;
  sellableUnit?: string | null;

  plotSize?: ApiNumber | null;
  plotUnit?: string | null;

  shareAmount?: ApiNumber | null;
  shareUnit?: string | null;

  roadDistanceMin?: ApiNumber | null;
  roadDistanceMax?: ApiNumber | null;
  distanceFromRoadMin?: ApiNumber | null;
  distanceFromRoadMax?: ApiNumber | null;
  distanceFromRoad?: string | null;

  division?: string | null;
  district?: string | null;
  upazila?: string | null;
  unionOrCityCorp?: string | null;
  wardNo?: string | null;
  postalCode?: string | null;
  location?: string | null;
  address?: AddressPartsDto | string | null;

  seller?: UserSummaryDto | null;
  owner?: UserSummaryDto | null;
  previousTransactionId?: Id | null;
  rejectionReason?: string | null;
  mandatoryServiceFee?: ApiNumber | null;
  optionalServiceFee?: ApiNumber | null;
  validatedPrice?: ApiNumber | null;
  validatedPricePerUnit?: ApiNumber | null;

  quotesCount?: number;
  quoteCount?: number;
  offersCount?: number;

  createdAt?: ApiDateString;
  updatedAt?: ApiDateString;

  [key: string]: unknown;
}

export type SellPostListResponseDto = ApiListResponseDto<SellPostDto>;
export type SellPostDetailsResponseDto = ApiMaybeWrappedDto<SellPostDto>;

export interface FetchMySellPostsParamsDto {
  page: number;
  limit: number;
  tab: MySellPostTabDto;
}

/* =========================
   Buy / Wanted Posts
========================= */

export interface BuyPostDto {
  id: Id;
  postId?: string | null;
  shortId?: string | null;
  lastCompletedStep?: number | null;

  title?: string | null;
  description?: string | null;
  status?: BuyPostStatusDto | null;

  propertyType?: PropertyTypeDto | null;

  location?: string | null;
  preferredLocation?: string | null;
  address?: AddressPartsDto | string | null;

  sizeMin?: ApiNumber | null;
  sizeMax?: ApiNumber | null;
  sizeUnit?: string | null;

  landSizeMin?: ApiNumber | null;
  landSizeMax?: ApiNumber | null;
  landSizeUnit?: string | null;

  plotSizeMin?: ApiNumber | null;
  plotSizeMax?: ApiNumber | null;
  plotSizeUnit?: string | null;

  roadDistanceMin?: ApiNumber | null;
  roadDistanceMax?: ApiNumber | null;
  distanceFromRoad?: string | null;

  budget?: string | null;
  budgetMin?: ApiNumber | null;
  budgetMax?: ApiNumber | null;

  buyer?: UserSummaryDto | null;
  postedBy?: UserSummaryDto | null;
  postedByName?: string | null;

  offers?: OfferReceivedDto[];
  offersReceived?: number;
  acceptedOffer?: OfferReceivedDto | null;

  postedAt?: ApiDateString;
  createdAt?: ApiDateString;
  updatedAt?: ApiDateString;

  [key: string]: unknown;
}

export type BuyPostListResponseDto = ApiListResponseDto<BuyPostDto>;
export type BuyPostDetailsResponseDto = ApiMaybeWrappedDto<BuyPostDto>;

export type MyBuyPostTabDto =
  | "ALL"
  | "OFFERS"
  | "ACTIVE"
  | "IN_REVIEW"
  | "DRAFT"
  | "ACCEPTED";

export interface FetchMyBuyPostsParamsDto {
  page: number;
  limit: number;
  tab: MyBuyPostTabDto;
}

/* =========================
   Offers Received on Buy Post
========================= */

export interface OfferReceivedDto {
  id?: Id;
  offerId?: Id;

  status?: OfferStatusDto | null;

  property?: SellPostDto | null;
  offerPost?: SellPostDto | null;
  yourOffer?: SellPostDto | null;

  seller?: UserSummaryDto | null;
  offeredTo?: UserSummaryDto | null;
  buyer?: UserSummaryDto | null;

  title?: string | null;
  propertyTitle?: string | null;
  askingPrice?: ApiNumber | null;
  price?: ApiNumber | null;
  propertyType?: PropertyTypeDto | null;

  image?: string | null;
  imageUrl?: string | null;
  photo?: string | null;
  thumbnail?: string | null;
  coverImage?: string | null;
  photos?: string[];
  images?: string[];

  description?: string | null;
  sellableAmount?: ApiNumber | null;
  sellableUnit?: string | null;
  plotSize?: ApiNumber | null;
  plotUnit?: string | null;
  shareAmount?: ApiNumber | null;
  shareUnit?: string | null;
  roadDistanceMin?: ApiNumber | null;
  roadDistanceMax?: ApiNumber | null;
  distanceFromRoadMin?: ApiNumber | null;
  distanceFromRoadMax?: ApiNumber | null;
  location?: string | null;

  offeredAt?: ApiDateString;
  createdAt?: ApiDateString;
  updatedAt?: ApiDateString;

  [key: string]: unknown;
}

export type OfferReceivedDetailsResponseDto = ApiMaybeWrappedDto<OfferReceivedDto>;

/* =========================
   My Offered Posts
========================= */

export interface OfferedPostDto {
  id?: Id;
  offerId?: Id;
  shortId?: string | null;

  title?: string | null;
  askingPrice?: ApiNumber | null;
  price?: ApiNumber | null;
  propertyType?: PropertyTypeDto | null;

  status?: OfferStatusDto | null;
  statusLabel?: string | null;

  thumbnail?: string | null;
  image?: string | null;
  photo?: string | null;
  imageUrl?: string | null;
  photos?: string[];

  description?: string | null;

  sellableAmount?: ApiNumber | null;
  sellableLandAmount?: ApiNumber | string | null;
  sellableUnit?: string | null;

  plotSize?: ApiNumber | null;
  plotUnit?: string | null;

  shareAmount?: ApiNumber | null;
  shareUnit?: string | null;

  roadDistanceMin?: ApiNumber | null;
  roadDistanceMax?: ApiNumber | null;

  location?: string | null;

  buyerId?: Id;
  buyerName?: string | null;
  buyerVerified?: boolean;
  buyerImageUrl?: string | null;

  buyPostId?: Id;
  buyPostTitle?: string | null;
  buyPost?: BuyPostDto | null;

  offeredTo?: UserSummaryDto | null;
  yourOffer?: SellPostDto | null;
  offerPost?: SellPostDto | null;

  offeredAt?: ApiDateString;
  createdAt?: ApiDateString;
  postedAt?: ApiDateString;
  updatedAt?: ApiDateString;

  [key: string]: unknown;
}

export type OfferedPostListResponseDto = ApiListResponseDto<OfferedPostDto>;
export type OfferedPostDetailsResponseDto = ApiMaybeWrappedDto<OfferedPostDto>;

export interface FetchMyOfferedPostsParamsDto {
  page: number;
  limit: number;
  filter?: "ALL" | OfferStatusDto;
}

/* =========================
   Payload DTOs
========================= */

export interface MakeOfferFromExistingPayloadDto {
  sellPostId: Id;
}

export interface RequestSellPostAppointmentPayloadDto {
  sellPostId: Id;
  buyerName: string;
  buyerPhone: string;
  buyerAddress: string;
}

export type UpdateSellPostPayloadDto = Record<string, unknown>;

export interface RequoteSellPostPayloadDto {
  proposedMandatoryFee: number;
  proposedOptionalFee: number;
}

export interface AcceptQuotedPricePayloadDto {
  tranId: string;
}

/* =========================
   Quote / Payment DTOs
========================= */

export interface ServiceFeeItemDto {
  id?: Id;
  name?: string;
  title?: string;
  fee?: ApiNumber;
  amount?: ApiNumber;
  isRequired?: boolean;
  required?: boolean;
  [key: string]: unknown;
}

export interface QuotePaymentSummaryDto {
  postId?: Id;
  id?: Id;
  title?: string;
  status?: SellPostStatusDto;

  askingPrice?: ApiNumber;
  validatedPrice?: ApiNumber;

  mandatoryServiceFee?: ApiNumber;
  mandatoryServiceFees?: ApiNumber;
  proposedMandatoryFee?: ApiNumber;

  optionalServiceFee?: ApiNumber;
  optionalServiceFees?: ApiNumber;
  proposedOptionalFee?: ApiNumber;

  totalPayable?: ApiNumber;
  payableAmount?: ApiNumber;

  quoteRevisedCount?: ApiNumber;
  quotationRevisions?: ApiNumber;

  mandatoryServices?: ServiceFeeItemDto[];
  optionalServices?: ServiceFeeItemDto[];

  paymentMethods?: {
    code: string;
    name?: string;
  }[];

  [key: string]: unknown;
}

export type QuotePaymentSummaryResponseDto =
  ApiMaybeWrappedDto<QuotePaymentSummaryDto>;

export interface SslCommerzSessionDto {
  gatewayUrl?: string;
  url?: string;
  redirectUrl?: string;
  sessionkey?: string;
  tranId?: string;
  status?: string;
  [key: string]: unknown;
}

export type SslCommerzSessionResponseDto =
  ApiMaybeWrappedDto<SslCommerzSessionDto>;

export interface PaymentSessionValidationDto {
  isValidated?: boolean;
  validated?: boolean;
  tranId?: string;
  status?: string;
  gatewayStatus?: string;
  [key: string]: unknown;
}

export type PaymentSessionValidationResponseDto =
  ApiMaybeWrappedDto<PaymentSessionValidationDto>;

/* =========================
   Generic Action Response
========================= */

export interface DraftEntityResponseDto {
  id?: Id;
  offerId?: Id;
  draftOfferId?: Id;
  postId?: Id;
  data?: {
    id?: Id;
    offerId?: Id;
    draftOfferId?: Id;
    postId?: Id;
    [key: string]: unknown;
  };
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}