import type { ResetRequestRow, ResetRequestsStats } from "../types/reset-requests-types";

export const resetRequestsStats: ResetRequestsStats = {
  pendingResetRequests: 3,
  pendingSubtitle: "Requires immediate attention",
  processedToday: 2,
  processedSubtitle: "All cleared",
  totalActiveAgents: 45,
  totalActiveSubtitle: "Verified accounts",
};

export const resetRequests: ResetRequestRow[] = [
  {
    id: "row-1",
    requestId: "#REQ-992",
    agent: {
      name: "Mr. Rahim Ahmed",
      role: "Surveyor",
      avatar: "/images/avatars/avatar.png",
      isOnline: true,
    },
    details: { agentId: "SUR-2026-0002", phone: "+880 1711-***-**90" },
    status: "pending_action",
  },
  {
    id: "row-2",
    requestId: "#REQ-991",
    agent: {
      name: "Ms. Fatima Begum",
      role: "Lawyer",
      avatar: "/images/avatars/avatar.png",
      isOnline: true,
    },
    details: { agentId: "LAW-2026-0001", phone: "+880 1922-***-**43" },
    status: "pending_action",
  },
  {
    id: "row-3",
    requestId: "#REQ-989",
    agent: {
      name: "Mr. Kamal Hossain",
      role: "Deed Writer",
      avatar: "/images/avatars/avatar.png",
      isOnline: true,
    },
    details: { agentId: "DWR-2026-0003", phone: "+880 1677-***-**12" },
    status: "pending_action",
  },
  {
    id: "row-4",
    requestId: "#REQ-988",
    agent: {
      name: "Mr. Jamil Uddin",
      role: "Field Assistant",
      avatar: "/images/avatars/avatar.png",
      isOnline: true,
    },
    details: { agentId: "FAS-2026-0004", phone: "+880 1555-***-**98" },
    status: "pending_action",
  },
];
