export type AvailableAgentFilter =
  | "RECOMMENDED"
  | "LOWEST_LOAD"
  | "CLOSEST_ZONE"
  | (string & {});

export interface AvailableAgentItem {
  id: string;
  name: string;
  phone: string;
  photoUrl: string | null;
  designation: string;
  activeJobs: number;
  activeJobsLabel: string;
  matchesZone: boolean;
  location: string;
}

export interface AvailableAgentsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AvailableAgentsResponse {
  data: AvailableAgentItem[];
  meta: AvailableAgentsMeta;
}

export interface AvailableAgentsQueryParams {
  sellPostId: string;
  filter?: AvailableAgentFilter;
  page?: number;
  limit?: number;
}

export interface AssignAgentPayload {
  sellPostId: string;
  agentId: string;
  serviceKey: string;
  serviceName: string;
  feeAmount: number;
  responseDeadline: string;
  documents: string[];
  autoReassign?: boolean;
}

export interface AssignAgentResponse {
  success: boolean;
  message: string;
  assignmentId: string;
}

export interface ServiceRequestFeedbackPayload {
  feedback: string;
}

export interface ServiceRequestActionResponse {
  success: boolean;
  message: string;
}
