export type ServiceRequestSortOrder = "ASC" | "DESC";

export type ServiceRequestStatus =
  | "PENDING_ASSIGNMENT"
  | "UNASSIGNED"
  | "IN_PROGRESS"
  | "SUBMITTED"
  | "COMPLETED"
  | "EXPIRED"
  | (string & {});

export interface ServiceRequestListServiceInfo {
  id: string;
  displayId?: string;
  name: string;
  key?: string;
  description?: string | null;
}

export interface ServiceRequestListParentPost {
  id: string;
  displayId?: string;
  location: string;
}

export interface ServiceRequestListAssignedAgent {
  id: string;
  name: string;
  photoUrl: string | null;
}

export interface ServiceRequestLatestWorkLogApi {
  title: string;
  createdAt: string;
}

export interface ServiceRequestListApiItem {
  service: ServiceRequestListServiceInfo;
  parentPost: ServiceRequestListParentPost;
  assignedAgent: ServiceRequestListAssignedAgent | null;
  status: ServiceRequestStatus;
  latestWorkLog: ServiceRequestLatestWorkLogApi | null;
  serviceKey?: string;
  serviceDescription?: string | null;
  feeAmount?: number | null;
  responseDeadline?: string | null;
  autoReassign?: boolean;
  documents?: string[] | null;
}

export interface ServiceRequestListItem {
  service: ServiceRequestListServiceInfo;
  parentPost: ServiceRequestListParentPost;
  assignedAgent: ServiceRequestListAssignedAgent | null;
  status: ServiceRequestStatus;
  latestWorkLog: ServiceRequestLatestWorkLogApi | null;
  serviceKey?: string;
  serviceDescription?: string | null;
  feeAmount?: number | null;
  responseDeadline?: string | null;
  autoReassign?: boolean;
  documents?: string[] | null;
}

export interface ServiceRequestListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ServiceRequestListResponse {
  success: boolean;
  data: ServiceRequestListItem[];
  meta: ServiceRequestListMeta;
}

export interface ServiceRequestListApiResponse {
  success: boolean;
  data: ServiceRequestListApiItem[];
  meta: ServiceRequestListMeta;
}

export interface ServiceRequestListQueryParams {
  page?: number;
  limit?: number;
  status?: ServiceRequestStatus | "";
  serviceType?: string;
  search?: string;
  sort?: ServiceRequestSortOrder;
}
