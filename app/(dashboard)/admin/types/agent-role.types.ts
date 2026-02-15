export type AgentRoleIconKey =
  | "legal"
  | "survey"
  | "deed"
  | "field"
  | "finance"
  | "home"
  | "key"
  | "doc"
  | "gear"
  | "bag"
  | "helmet"
  | "users";

export type BadgeColorKey = "purple" | "orange" | "teal" | "green" | "red" | "blue";

export type AgentRoleRow = {
  id: string;
  roleName: string;
  shortCode: string; // LAW, SURV
  description: string;
  isActive: boolean;
  icon: AgentRoleIconKey;
  badgeColor: BadgeColorKey;
};
