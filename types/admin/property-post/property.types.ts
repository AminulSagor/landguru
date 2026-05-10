export type PropertyPostStatus =
  | "DRAFT"
  | "PENDING_ADMIN"
  | "PENDING_BUYER_REVIEW"
  | "QUOTED"
  | "PAYMENT_PENDING_REVIEW"
  | "ACTIVE"
  | "SOLD"
  | "PARTIAL_SOLD"
  | "REJECTED"
  | (string & {});

export type PropertyDocumentCategory =
  | "PHOTO"
  | "VIDEO"
  | "DEED"
  | "KHATIAN"
  | "OTHER"
  | (string & {});

export interface PropertyPostSeller {
  id?: string;
  name?: string;
  fullName?: string;
  phone?: string | null;
  email?: string | null;
  photoUrl?: string | null;
  avatar?: string | null;
  isVerified?: boolean;
}

export interface PropertyPostServiceAssignment {
  id?: string;
  sellPostId?: string;
  agentId?: string;
  serviceKey: string;
  serviceName?: string;
  status?: string;
  feeAmount?: number;
  payoutStatus?: string;
  responseDeadline: string | null;
  isAppointmentScheduled?: boolean;
  appointmentTitle: string | null;
  appointmentDate: string | null;
  appointmentStatus: string | null;
  autoReassign?: boolean;
  startedAt: string | null;
  completedAt: string | null;
  adminFeedback: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PropertyPostAddress {
  id?: string;
  sellPostId?: string;
  division?: string;
  district?: string;
  upazila?: string;
  unionOrCityCorp?: string;
  wardNo?: string;
  postalCode?: string;
  fullAddress?: string;
}

export interface PropertyPostDocument {
  id?: string;
  sellPostId?: string;
  fileUrl: string;
  category: PropertyDocumentCategory;
}

export interface PropertyPostSelectedServiceItem {
  id?: string;
  sellPostId?: string;
  serviceKey: string;
  isVerified?: boolean;
}

export interface PropertyPostOwnershipHistoryItem {
  id?: string;
  ownerName?: string;
  name?: string;
  duration?: string;
  dateRange?: string;
  isCurrent?: boolean;
}

export interface PropertyPostRiskChecklistItem {
  id?: string;
  label?: string;
  isChecked?: boolean;
  checked?: boolean;
}

export interface PropertyPostItem {
  id: string;
  sellerId: string;
  seller: PropertyPostSeller;
  status: PropertyPostStatus;
  title: string;
  description: string | null;
  propertyType: string;
  roadDistanceMin: number | null;
  roadDistanceMax: number | null;
  sellableAmount: number;
  sellableUnit: string;
  plotSize: number;
  plotUnit: string;
  isPropertyShareable: boolean;
  shareAmount: number | null;
  shareUnit: string | null;
  askingPricePerUnit: number;
  askingPrice: number;
  validatedPrice: number | null;
  validatedPricePerUnit: number | null;
  mandatoryServiceFee: number | null;
  optionalServiceFee: number | null;
  rejectionReason: string | null;
  photos: string[];
  lastCompletedStep: number;
  isResell: boolean;
  serviceAssignments?: PropertyPostServiceAssignment[];

  division?: string;
  district?: string;
  upazila?: string;
  unionOrCityCorp?: string;
  wardNo?: string;
  postalCode?: string;
  fullAddress?: string;
  videoUrl?: string | null;
  deedFiles?: string[];
  khatianFiles?: string[];
  otherFiles?: string[];

  address?: PropertyPostAddress | null;
  documents?: PropertyPostDocument[];
  selectedServices?: string[];
  selectedServiceslist?: PropertyPostSelectedServiceItem[];
  ownershipHistory?: PropertyPostOwnershipHistoryItem[];
  riskChecklist?: PropertyPostRiskChecklistItem[];

  previousTransactionId: string | null;
  createdAt: string;
  updatedAt: string;
  servicesProgress?: string;
}

export interface PropertyPostsListMeta {
  total: number;
  page: number | string;
  limit: number | string;
  totalPages: number;
}

export interface PropertyPostsListResponse {
  data: PropertyPostItem[];
  meta: PropertyPostsListMeta;
}

export interface PropertyPostsListQueryParams {
  page?: number;
  limit?: number;
  status?: PropertyPostStatus | "";
  propertyType?: string;
  serviceType?: string;
  search?: string;
}

export interface ReviewPropertyPostPayload {
  status:
    | "QUOTED"
    | "REJECTED"
    | "PENDING_BUYER_REVIEW"
    | "PAYMENT_PENDING_REVIEW"
    | (string & {});
  validatedPricePerUnit?: number;
  validatedPrice?: number;
  mandatoryServiceFee?: number;
  optionalServiceFee?: number;
  rejectionReason?: string;
}

export interface ActivatePropertyPostResponse {
  success: boolean;
  message: string;
  sellPostId: string;
  status: PropertyPostStatus;
}

export interface PropertyStatusBuyerInput {
  buyerId: string;
  soldPrice: number;
  saleDate: string;
}

export interface UpdatePropertyStatusPayload {
  status: PropertyPostStatus;
  buyers?: PropertyStatusBuyerInput[];
}

export interface ReorganizePropertyDocumentInput {
  fileUrl: string;
  category: PropertyDocumentCategory;
}

export interface ReorganizePropertyDocumentsPayload {
  documents: ReorganizePropertyDocumentInput[];
}

export interface ReorganizePropertyDocumentsResponse {
  success: boolean;
  message: string;
}

export interface UpdateOwnershipHistoryInput {
  ownerName: string;
  duration: string;
  isCurrent?: boolean;
}

export interface UpdateOwnershipHistoryPayload {
  ownershipHistory: UpdateOwnershipHistoryInput[];
}

export interface UpdateRiskChecklistInput {
  label: string;
  isChecked: boolean;
}

export interface UpdateRiskChecklistPayload {
  riskChecklist: UpdateRiskChecklistInput[];
}
