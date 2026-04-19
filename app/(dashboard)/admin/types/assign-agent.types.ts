export type AssignAgentTab = "recommended" | "lowest_load" | "closest_zone";

export type AssignAgentDocType = "pdf" | "docx";

export type AssignAgentDocument = {
  id: string;
  fileName: string;
  fileUrl?: string;
  type: AssignAgentDocType;
  selected: boolean;
};

export type AssignAgentAgent = {
  id: string;
  name: string;
  role: string;
  phone: string;
  avatarUrl?: string | null;
  online: boolean;
  matchesZone?: boolean;
  activeJobs?: number;
  activeJobsLabel: string;
  activeTone?: "green" | "orange" | "primary";
  location?: string;
};

export type AssignAgentDialogPayload = {
  postId: string;
  sellPostId: string;
  assignmentId?: string;
  serviceKey: string;
  serviceName: string;
  zoneLabel: string;
  serviceTitle: string;
  serviceDesc: string;
  documents: AssignAgentDocument[];
  serviceFeeBDT: number;
  deadlineLabel: string;
  responseDeadlineISO?: string;
  autoReassign?: boolean;
  agents: AssignAgentAgent[];
};

export type AssignAgentSubmitPayload = {
  agentId: string;
  documents: AssignAgentDocument[];
  serviceFeeBDT: number;
  deadlineLabel: string;
  autoReassign: boolean;
};
