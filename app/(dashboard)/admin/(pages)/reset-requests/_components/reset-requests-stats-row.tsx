import Card from "@/components/cards/card";
import type { ResetRequestsStats } from "@/app/(dashboard)/admin/types/reset-requests-types";
import { ShieldAlert, RotateCcw, User } from "lucide-react";

export default function ResetRequestsStatsRow({
  stats,
}: {
  stats: ResetRequestsStats;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        title="Pending Reset Requests"
        value={stats.pendingResetRequests.toLocaleString("en-US")}
        subtitle={stats.pendingSubtitle}
        variant="danger"
        icon={<ShieldAlert size={18} className="text-[#ef4444]" />}
      />

      <StatCard
        title="Resets Processed Today"
        value={stats.processedToday.toLocaleString("en-US")}
        subtitle={stats.processedSubtitle}
        variant="ok"
        icon={<RotateCcw size={18} className="text-primary" />}
      />

      <StatCard
        title="Total Active Agents"
        value={stats.totalActiveAgents.toLocaleString("en-US")}
        subtitle={stats.totalActiveSubtitle}
        icon={<User size={18} className="text-gray" />}
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  variant,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  variant?: "danger" | "ok";
}) {
  const leftBar =
    variant === "danger"
      ? "border-l-4 border-l-[#ef4444]"
      : "";

  const subtitleColor =
    variant === "danger"
      ? "text-[#ef4444]"
      : variant === "ok"
        ? "text-green"
        : "text-gray";

  return (
    <div className={`rounded-lg border border-gray/20 shadow-sm p-4 bg-white ${leftBar}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-black">{value}</p>
          <p className={`mt-2 text-sm ${subtitleColor}`}>{subtitle}</p>
        </div>

        <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}
