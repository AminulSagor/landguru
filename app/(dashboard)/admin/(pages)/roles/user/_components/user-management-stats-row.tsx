import Card from "@/components/cards/card";
import type { UserManagementStats } from "@/app/(dashboard)/admin/types/user-lists-types";
import { Users, BadgeCheck, ShieldAlert, ShoppingBag } from "lucide-react";

export default function UserManagementStatsRow({ stats }: { stats: UserManagementStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title="Total Users"
        value={stats.totalUsers.toLocaleString("en-US")}
        subtitle={stats.totalUsersChangeText}
        icon={<Users size={18} className="text-gray" />}
        subtitleClassName="text-green"
      />

      <StatCard
        title="Pending Verification"
        value={stats.pendingVerification.toLocaleString("en-US")}
        subtitle={stats.pendingSubtitle}
        icon={<ShieldAlert size={18} className="text-[#f97316]" />}
        cardClassName=""
        valueClassName="text-[#f97316]"
        subtitleClassName="text-[#f97316]"
      />

      <StatCard
        title="Verified Sellers"
        value={stats.verifiedSellers.toLocaleString("en-US")}
        subtitle={stats.verifiedSubtitle}
        icon={<BadgeCheck size={18} className="text-gray" />}
      />

      <StatCard
        title="Active Buyers"
        value={stats.activeBuyers.toLocaleString("en-US")}
        subtitle={stats.activeBuyersSubtitle}
        icon={<ShoppingBag size={18} className="text-gray" />}
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  cardClassName = "",
  valueClassName = "text-black",
  subtitleClassName = "text-gray",
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  cardClassName?: string;
  valueClassName?: string;
  subtitleClassName?: string;
}) {
  return (
    <Card>
      <div className={`rounded-lg ${cardClassName}`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray">{title}</p>
            <p className={`mt-2 text-3xl font-semibold ${valueClassName}`}>{value}</p>
            <p className={`mt-2 text-sm ${subtitleClassName}`}>{subtitle}</p>
          </div>

          <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
}
