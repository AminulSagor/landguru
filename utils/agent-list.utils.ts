export type AgentType =
  | "surveyor"
  | "lawyer"
  | "field_assistant"
  | "deed_writer";

export type AgentSortOrder = "ASC" | "DESC";

export interface AgentProfile {
  name: string;
  displayId: string;
  photoUrl: string;
}

export interface AgentListItem {
  id: string;
  profile: AgentProfile;
  role: string;
  assignedZone: string;
  contact: string;
  performance: string;
  isActive: boolean;
}

export interface AgentListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AgentListResponse {
  success: boolean;
  data: AgentListItem[];
  meta: AgentListMeta;
}

export interface GetAgentListParams {
  page?: number;
  limit?: number;
  agentType?: AgentType;
  sort?: AgentSortOrder;
}

export interface AgentSummaryData {
  totalAgents: number;
  activeAgents: number;
}

export interface AgentSummaryResponse {
  success: boolean;
  data: AgentSummaryData;
}