import { AgentRoleRow } from "@/app/(dashboard)/admin/types/agent-role.types";

export const demoAgentRoles: AgentRoleRow[] = [
  {
    id: "r-1",
    roleName: "Legal Advisor",
    shortCode: "LAW",
    description: "Verification & Legal Opinion",
    isActive: true,
    icon: "legal",
    badgeColor: "purple",
  },
  {
    id: "r-2",
    roleName: "Land Surveyor",
    shortCode: "SURV",
    description: "Mapping & Demarcation",
    isActive: true,
    icon: "survey",
    badgeColor: "orange",
  },
  {
    id: "r-3",
    roleName: "Deed Writer",
    shortCode: "DEED",
    description: "Drafting & Registration",
    isActive: true,
    icon: "deed",
    badgeColor: "teal",
  },
  {
    id: "r-4",
    roleName: "Field Assistant",
    shortCode: "ASST",
    description: "Site Visits & Logistics",
    isActive: true,
    icon: "field",
    badgeColor: "green",
  },
];

// DEPRECATION NOTICE
// This file contains demo data only. Replace usages with live API calls.
export const __IS_DEMO = true;

export async function getLiveOrDemo(..._args: any[]): Promise<{ roles: AgentRoleRow[] }> {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.warn("[DEMO] Using demoAgentRoles — replace with live API.");
  }
  return { roles: demoAgentRoles };
}
