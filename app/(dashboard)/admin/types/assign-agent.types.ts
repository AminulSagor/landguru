export type AssignAgentTab = "recommended" | "lowest_load" | "closest_zone";

export type AssignAgentDocType = "pdf" | "docx";

export type AssignAgentDocument = {
  id: string;
  fileName: string;
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
  activeJobsLabel: string; // e.g. "Active Jobs: 1 (Low)" or "Active Jobs: 0"
  activeTone?: "green" | "orange" | "primary";
};

export type AssignAgentDialogPayload = {
  postId: string; // "POST-1060"
  zoneLabel: string; // "Block-C, Banani"
  serviceTitle: string; // "Pentagraph Map"
  serviceDesc: string;
  documents: AssignAgentDocument[];
  serviceFeeBDT: number;
  deadlineLabel: string; // "Oct 28, 2026"
  agents: AssignAgentAgent[];
};
