import AgentProfileCard from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-profile-card";
import AgentStatsEarningsCard from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-stats-earnings-card";
import AgentStatsTasksCard from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-stats-tasks-card";
import type { AgentDetails } from "@/types/admin/agent-list/details/[id]/agent-details.types";

export default function AgentLeftColumn({ agent }: { agent: AgentDetails }) {
  return (
    <>
      <AgentProfileCard agent={agent} />
      <AgentStatsTasksCard agent={agent} />
      <AgentStatsEarningsCard agent={agent} />
    </>
  );
}