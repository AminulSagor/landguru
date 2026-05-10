export interface AdminWorkforceSupervision {
  totalAgents: number;
  activeAgents: number;
  inactiveAgents: number;
}

export interface AdminListItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  photoUrl: string | null;
  assignedLocation: string | null;
  isVerified?: boolean;
  isActive: boolean;
  workforceSupervision?: AdminWorkforceSupervision | null;
  workforceCount?: number;
  workforceActive?: number;
  workforceSuspended?: number;
  activityStatus?: string | null;
  lastLoginText?: string | null;
  accountEnabled?: boolean;
}

export interface AdminListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminListResponse {
  success: boolean;
  data: AdminListItem[];
  meta: AdminListMeta;
}

export interface AdminListQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  zone?: string;
  isActive?: boolean;
}
