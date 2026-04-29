export type ResetRequestStatus = "pending_action" | "processed" | "rejected";

export type AgentRole = "Surveyor" | "Lawyer" | "Deed Writer" | "Field Assistant";

export interface ResetRequestRow {
  id: string; // internal
  requestId: string; // #REQ-992

  agent: {
    name: string;
    role: AgentRole;
    avatar: string; // image path
  };

  details: {
    agentId: string; // SUR-2026-0002
    phone: string; // +880 1711-***-**90
  };

  status: ResetRequestStatus;
}

export interface ResetRequestsStats {
  pendingResetRequests: number;
  pendingSubtitle: string; // Requires immediate attention

  processedToday: number;
  processedSubtitle: string; // All cleared

  totalActiveAgents: number;
  totalActiveSubtitle: string; // Verified accounts
}
