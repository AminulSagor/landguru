
import AgentProfileCard from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-profile-card";
import AgentStatsEarningsCard from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-stats-earnings-card";
import AgentStatsTasksCard from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-stats-tasks-card";
import { Agent } from "@/app/(dashboard)/admin/types/agent-list-type";

export default function AgentLeftColumn({ agent }: { agent: Agent }) {
  return (
    <>
      <AgentProfileCard agent={agent} />
      <AgentStatsTasksCard />
      <AgentStatsEarningsCard />
    </>
  );
}
