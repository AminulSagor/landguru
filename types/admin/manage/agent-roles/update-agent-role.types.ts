import type { AgentRoleBadgeColor, AgentRoleIconKey, AgentRoleItem } from "@/types/admin/manage/agent-roles/agent-roles-list.types";

export interface UpdateAgentRolePayload {
  name: string;
  shortCode: string;
  description: string;
  icon: AgentRoleIconKey;
  badgeColor: AgentRoleBadgeColor;
}

export interface UpdateAgentRoleResponse {
  success: boolean;
  message: string;
  data: AgentRoleItem;
}
