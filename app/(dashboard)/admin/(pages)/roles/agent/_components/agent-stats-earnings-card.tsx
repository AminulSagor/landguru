import Card from "@/components/cards/card";
import type { AgentDetails } from "@/types/admin/agent-list/details/[id]/agent-details.types";

const formatCurrency = (value?: number | null) => {
  if (value === null || value === undefined) {
    return "৳ 0";
  }

  return `৳ ${value.toLocaleString("en-BD")}`;
};

const formatLastPayoutDate = (value?: string | null) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

export default function AgentStatsEarningsCard({
  agent,
}: {
  agent: AgentDetails;
}) {
  const earned = formatCurrency(agent?.stats?.totalEarned);
  const note = formatLastPayoutDate(agent?.stats?.lastPayoutDate);

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray">
            Total Earned
          </p>
          <p className="mt-2 text-3xl font-semibold text-black">{earned}</p>
          <p className="mt-1 text-xs text-gray">Last payout: {note}</p>
        </div>

        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-green/10">
          <span className="text-sm font-semibold text-green">৳</span>
        </div>
      </div>
    </Card>
  );
}