import type { AgentRoleBadgeColor, AgentRoleIconKey, AgentRoleItem } from "@/types/admin/manage/agent-roles/agent-roles-list.types";

export interface CreateAgentRolePayload {
  name: string;
  shortCode: string;
  description: string;
  icon: AgentRoleIconKey;
  badgeColor: AgentRoleBadgeColor;
}

export interface CreateAgentRoleResponse {
  success: boolean;
  message: string;
  data: AgentRoleItem;
}
