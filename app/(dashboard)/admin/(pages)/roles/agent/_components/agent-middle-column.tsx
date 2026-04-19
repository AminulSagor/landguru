import AgentAssignedLocationCard from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-assigned-location-card";
import AgentBankInfoCard from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-bank-info-card";
import AgentPersonalInfoCard from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-personal-info-card";
import type { AgentDetails } from "@/types/admin/agent-list/details/[id]/agent-details.types";

export default function AgentMiddleColumn({ agent }: { agent: AgentDetails }) {
  return (
    <>
      <AgentPersonalInfoCard agent={agent} />
      <AgentBankInfoCard agent={agent} />
      <AgentAssignedLocationCard agent={agent} />
    </>
  );
}