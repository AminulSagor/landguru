export type AgentAppointmentStatus =
  | "SCHEDULED"
  | "VISITED"
  | "COMPLETED"
  | "CANCELLED"
  | (string & {});

export type AgentAppointmentTab = "UPCOMING" | "PAST";

export interface AgentAppointmentDate {
  full: string;
  day: number;
  month: string;
}

export interface AgentAppointmentSellPost {
  id: string;
  title: string;
  propertyType: string;
  location: string;
}

export interface AgentAppointmentAgent {
  name: string;
  assignedService: string;
}

export interface AgentAppointmentTags {
  isVisitToday: boolean;
  propertyTypeTag: string;
}

export interface AgentAppointmentItem {
  assignmentId: string;
  appointmentStatus: AgentAppointmentStatus;
  appointmentDate: AgentAppointmentDate;
  sellPost: AgentAppointmentSellPost;
  agent: AgentAppointmentAgent;
  tags: AgentAppointmentTags;
}

export type AgentAppointmentDateValue = AgentAppointmentDate | string;

export interface AgentAppointmentDetailsProperty {
  id: string;
  title: string;
  propertyType: string;
  location: string;
}

export interface AgentAppointmentDetailsClient {
  id: string;
  name: string;
  phone?: string;
  image?: string | null;
}

export interface AgentAppointmentDetailsService {
  name: string;
  key: string;
}

export interface AgentAppointmentDetails {
  assignmentId: string;
  appointmentDate: AgentAppointmentDateValue;
  appointmentTitle?: string;
  status?: string;
  appointmentStatus?: AgentAppointmentStatus;
  property?: AgentAppointmentDetailsProperty;
  client?: AgentAppointmentDetailsClient;
  service?: AgentAppointmentDetailsService;
  sellPost?: AgentAppointmentSellPost;
  agent?: AgentAppointmentAgent;
  tags?: AgentAppointmentTags;
}

export interface AgentAppointmentDetailsResponse {
  data: AgentAppointmentDetails | AgentAppointmentDetails[];
  meta?: AgentAppointmentsMeta;
}

export interface AgentAppointmentsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AgentAppointmentsResponse {
  data: AgentAppointmentItem[];
  meta: AgentAppointmentsMeta;
}

export interface AgentAppointmentsQueryParams {
  page?: number;
  limit?: number;
  tab?: AgentAppointmentTab;
}
