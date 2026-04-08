export type AgentScheduleStatus =
  | "SCHEDULED"
  | "VISITED"
  | "COMPLETED"
  | "CANCELLED"
  | (string & {});

export interface AgentScheduleProperty {
  id: string;
  displayId: string;
  title: string;
  image: string | null;
}

export interface AgentScheduleServiceType {
  name: string;
  displayId: string;
}

export interface AgentScheduleAssignedAgent {
  id: string;
  name: string;
  phone: string;
  photoUrl: string | null;
  designation: string;
}

export interface AgentScheduleItem {
  id: string;
  timeAndDate: string;
  property: AgentScheduleProperty;
  serviceType: AgentScheduleServiceType;
  assignedAgent: AgentScheduleAssignedAgent;
  status: AgentScheduleStatus;
}

export interface AgentSchedulesListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AgentSchedulesListResponse {
  success: boolean;
  data: AgentScheduleItem[];
  meta: AgentSchedulesListMeta;
}

export interface AgentSchedulesListQueryParams {
  page?: number;
  limit?: number;
}
