export interface AdminZoneAgentItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  image: string | null;
  status: string;
  currentActiveJobs: number;
  tasksCompleted: number;
  earnings: number;
}

export interface AdminZoneAgentsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminZoneAgentsResponse {
  success: boolean;
  data: AdminZoneAgentItem[];
  meta: AdminZoneAgentsMeta;
}

export interface AdminZoneAgentsQueryParams {
  adminId: string;
  page?: number;
  limit?: number;
  role?: string;
  search?: string;
}
