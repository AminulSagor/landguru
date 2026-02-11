// app/(admin)/admin/types/service-request.types.ts

export type ServiceRequestStatus =
  | "submitted_for_review"
  | "in_progress"
  | "pending_assignment";

export type ServiceRequestType =
  | "document_organization"
  | "physical_demarcation"
  | "pentagraph_map";

export type ServiceRequestSort = "newest" | "oldest";

export type AgentLite = {
  id: string;
  name: string;
  role: string;
  phone: string;
  avatarUrl?: string | null;
  isOnline?: boolean;
  startedAtLabel: string;
  lastActiveLabel: string;
};

export type WorkLogLite = {
  title: string;
  subtitle?: string | null;
  timeLabel: string;
};

export type ServiceRequestListItem = {
  id: string; // e.g. "SERV-892"
  serviceName: string;
  parentPostId: string; // e.g. "POST-1044"
  locationLine: string; // e.g. "Banani, Banani Thana"
  assignedAgent?: { name: string; avatarUrl?: string | null } | null;
  status: ServiceRequestStatus;
  latestWorkLog?: { title: string; timeLabel: string } | null;
  createdAtISO: string;
  type: ServiceRequestType;
};

export type ServiceRequestOverview = {
  totalRequests: number;
  unassigned: number; // show "99+"
  inReview: number;
  completedToday: number;
};

export type ServiceDeliverable = {
  fileName: string;
  meta: string; // e.g. "2.4 MB • PDF Document"
};

export type ServiceDetails = {
  headerTitle: string; // "Service Details: Document Organization"
  serviceIdLabel: string; // "#SERV892-POST-1044"
  statusChipLabel: string; // "Submitted"
  agent: AgentLite;
  activityLog: Array<
    | { kind: "event"; title: string; subtitle?: string | null; timeLabel: string }
    | { kind: "note"; title: string; body: string; timeLabel: string }
    | { kind: "file"; title: string; fileName: string; timeLabel: string }
  >;
  finalDeliverable: ServiceDeliverable;
};
