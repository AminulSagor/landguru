import type { AgentRole, AgentServiceOption } from "../types/agent-onboard-types";

export const agentRoles: AgentRole[] = [
  "Lawyer",
  "Surveyor",
  "Deed Writer",
  "Field Assistant",
];

export const serviceOptions: AgentServiceOption[] = [
  { id: "ownership_history_validation", title: "Ownership History Validation" },
  { id: "physical_estimate", title: "Physical Estimate" },
  { id: "pentagraph_map", title: "Pentagraph Map" },
  { id: "document_organization", title: "Document Organization" },
  { id: "deed_writing", title: "Deed Writing" },
  { id: "namjari_update", title: "Namjari Update" },
  { id: "inheritance_dispute", title: "Inheritance Dispute" },
  { id: "risk_analysis", title: "Risk Analysis" },
  { id: "court_case", title: "Court Case" },
];

// DEPRECATION NOTICE
// This file contains demo data only. Replace usages with live API calls.
export const __IS_DEMO = true;

export async function getLiveOrDemo(..._args: any[]): Promise<{ roles: AgentRole[]; options: AgentServiceOption[] }> {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.warn("[DEMO] Using agent-onboard demo data — replace with live API.");
  }
  return { roles: agentRoles, options: serviceOptions };
}
