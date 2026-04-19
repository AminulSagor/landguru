export type SiteVisitRequestStatus =
  | "PENDING"
  | "SCHEDULED"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED"
  | (string & {});

export interface SiteVisitRequestProperty {
  id: string;
  title: string;
  propertyType: string;
  image: string | null;
  location: string;
}

export interface SiteVisitRequestParticipant {
  id: string;
  name: string;
  phone: string;
  photoUrl: string | null;
}

export interface SiteVisitRequestItem {
  requestId: string;
  requestedAt: string;
  status: SiteVisitRequestStatus;
  scheduledTitle: string | null;
  scheduledAt: string | null;
  property: SiteVisitRequestProperty;
  buyer: SiteVisitRequestParticipant;
  owner: SiteVisitRequestParticipant;
}

export interface SiteVisitRequestsListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SiteVisitRequestsListResponse {
  data: SiteVisitRequestItem[];
  meta: SiteVisitRequestsListMeta;
}

export interface SiteVisitRequestsQueryParams {
  page?: number;
  limit?: number;
  status?: SiteVisitRequestStatus | "";
  location?: string;
  propertyType?: string;
  search?: string;
}
