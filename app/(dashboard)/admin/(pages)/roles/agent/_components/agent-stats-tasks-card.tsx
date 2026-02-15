import Card from "@/components/cards/card";
import Link from "next/link";
import { Check } from "lucide-react";

export default function AgentStatsTasksCard() {
  // Screenshot static
  const totalTasks = 12;

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs tracking-wide text-gray uppercase">
            Total Tasks
          </p>
          <p className="text-3xl font-semibold text-black mt-2">{totalTasks}</p>
          <p className="text-xs text-gray mt-1">Completed successfully</p>
        </div>

        <div className="h-7 w-7 rounded-md bg-green/10 flex items-center justify-center">
          <Check size={16} className="text-green" />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Link
          href="/admin/agents/details/12/service_history"
          className="text-sm text-primary font-medium"
        >
          View All →
        </Link>
      </div>
    </Card>
  );
}
