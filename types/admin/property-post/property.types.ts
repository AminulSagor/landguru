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

export interface PropertyPostSeller {
  id: string;
  name: string;
  phone: string;
  photoUrl: string;
}

export interface PropertyPostServiceAssignment {
  id: string;
  sellPostId: string;
  agentId: string;
  serviceKey: string;
  serviceName: string;
  status: string;
  feeAmount: number;
  payoutStatus: string;
  responseDeadline: string | null;
  isAppointmentScheduled: boolean;
  appointmentTitle: string | null;
  appointmentDate: string | null;
  appointmentStatus: string | null;
  autoReassign: boolean;
  startedAt: string | null;
  completedAt: string | null;
  adminFeedback: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyPostItem {
  id: string;
  sellerId: string;
  seller: PropertyPostSeller;
  status: PropertyPostStatus;
  title: string;
  description: string;
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
  serviceAssignments: PropertyPostServiceAssignment[];
  previousTransactionId: string | null;
  createdAt: string;
  updatedAt: string;
  servicesProgress: string;
}

export interface PropertyPostsListMeta {
  total: number;
  page: string;
  limit: string;
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
}
