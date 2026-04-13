export type AgentRoleBadgeColor =
  | "purple"
  | "orange"
  | "teal"
  | "green"
  | "red"
  | "blue"
  | "indigo"
  | (string & {});

export type AgentRoleIconKey =
  | "icon-gavel"
  | "icon-ruler"
  | "icon-file-pen-line"
  | "icon-users"
  | "icon-landmark"
  | "icon-key"
  | "icon-file-text"
  | "icon-settings"
  | "icon-briefcase"
  | "icon-hard-hat"
  | "icon-home"
  | "icon-user-round"
  | (string & {});

export interface AgentRoleItem {
  id: string;
  shortCode: string;
  name: string;
  description: string;
  icon: AgentRoleIconKey;
  badgeColor: AgentRoleBadgeColor;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AgentRolesListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AgentRolesListResponse {
  success: boolean;
  data: AgentRoleItem[];
  meta: AgentRolesListMeta;
}

export interface AgentRolesListQueryParams {
  page?: number;
  limit?: number;
}
