import Card from "@/components/cards/card";
import { Check } from "lucide-react";
import type { AgentDetails } from "@/types/admin/agent-list/details/[id]/agent-details.types";

export default function AgentStatsTasksCard({
  agent,
}: {
  agent: AgentDetails;
}) {
  const totalTasks = agent?.stats?.totalTasks ?? 0;

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray">
            Total Tasks
          </p>
          <p className="mt-2 text-3xl font-semibold text-black">{totalTasks}</p>
          <p className="mt-1 text-xs text-gray">Tasks from agent activity</p>
        </div>

        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-green/10">
          <Check size={16} className="text-green" />
        </div>
      </div>
    </Card>
  );
}