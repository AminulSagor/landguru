import AgentAssignedLocationCard from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-assigned-location-card";
import AgentBankInfoCard from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-bank-info-card";
import AgentPersonalInfoCard from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-personal-info-card";
import { Agent } from "@/app/(dashboard)/admin/types/agent-list-type";

export default function AgentMiddleColumn({ agent }: { agent: Agent }) {
  return (
    <>
      <AgentPersonalInfoCard agent={agent} />
      <AgentBankInfoCard />
      <AgentAssignedLocationCard />
    </>
  );
}
