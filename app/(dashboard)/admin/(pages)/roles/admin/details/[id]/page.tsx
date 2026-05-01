import AdminActivityLog from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-activity-log";
import AdminDetailsHeader from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-details-header";
import AdminLeaderboards from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-leaderboards";
import AdminMetricsGrid from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-metrics-grid";
import AdminProfileCard from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-profile-card";
import SupervisedAgentsCard from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/supervised-agents-card";
import { adminDetailsService } from "@/service/admin/admin-list/details/[id]/admin-details.service";
import { AdminMiniStat } from "@/app/(dashboard)/admin/types/admin-details-type";
import { formatAdminDisplayId } from "@/utils/id.utils";

interface Props {
  params: Promise<{ id: string }>;
}

function formatJoinedDate(value?: string | null) {
  if (!value) return undefined;
  try {
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return value;
  }
}

export default async function AdminDetailsPage({ params }: Props) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id ?? "");

  try {
    const admin = await adminDetailsService.getAdminDetailsServer(decodedId);

    // supervised agents — backend only; default to empty
    let supervised = { count: 0, rows: [] } as { count: number; rows: any[] };
    try {
      const resp = await adminDetailsService.getAdminAgentsServer(decodedId, 1, 10);
      const rows = resp.rows ?? [];
      const meta = resp.meta ?? { total: rows.length };
      supervised = {
        count: meta.total ?? rows.length,
        rows: rows.map((a: any) => ({
          id: a.id,
          name: a.name ?? "",
          email: a.email ?? "",
          role: a.role ?? "Surveyor",
          currentLoadLabel: `Active Jobs: ${a.currentActiveJobs ?? 0}`,
          currentLoadValue: a.currentActiveJobs ?? 0,
          currentLoadMax: a.currentActiveJobsMax ?? 6,
          loadTone: (a.currentActiveJobs ?? 0) > ((a.currentActiveJobsMax ?? 6) - 1) ? "red" : "blue",
          tasksCompleted: a.tasksCompleted ?? 0,
          earnings: typeof a.earnings === "number" ? `৳ ${a.earnings.toLocaleString()}` : a.earnings ?? "",
          enabled: !(a.status && a.status.toLowerCase() === "inactive"),
        })),
      };
    } catch {
      // leave empty if backend fails
    }

    // metrics — try backend dashboard-summary; default zeros
    let metrics: AdminMiniStat[] = [
      { id: "inventory", title: "Property Inventory", value: "0", helperLeft: "0 Sold", helperRight: "0 Live", accent: "blue" },
      { id: "txn", title: "Transaction Volume", value: "৳ 0", helperLeft: "Sold", helperRight: "Bought", accent: "purple", soldAmount: 0, boughtAmount: 0 },
      { id: "services", title: "Services Status", value: "0 Days", helperLeft: "0 Provided", helperRight: "0 Ongoing", accent: "orange", providedCount: 0, ongoingCount: 0 },
      { id: "revenue", title: "Revenue Generated", value: "৳ 0", helperLeft: "Net Fees (Month)", helperRight: "↑ 0% vs last month", accent: "green" },
    ];
    try {
      const summary = await adminDetailsService.getDashboardSummaryServer(decodedId);
      if (summary) {
        metrics = [
          {
            id: "inventory",
            title: "Property Inventory",
            value: String(summary.inventory?.activeLive ?? 0),
            helperLeft: `${summary.inventory?.totalSold ?? 0} Sold`,
            helperRight: `${summary.inventory?.activeLive ?? 0} Live`,
            accent: "blue",
          },
          {
            id: "txn",
            title: "Transaction Volume",
            value: `৳ ${Number(summary.transactionVolume?.totalSalesVolume ?? summary.transactionVolume?.totalVolume ?? 0).toLocaleString()}`,
            helperLeft: "Sold",
            helperRight: "Bought",
            accent: "purple",
            soldAmount: summary.transactionVolume?.totalSalesVolume ?? summary.transactionVolume?.totalVolume ?? 0,
            boughtAmount: summary.transactionVolume?.totalBuysVolume ?? 0,
          },
          {
            id: "services",
            title: "Services Status",
            value: summary.serviceStatus?.avgTurnaroundHours ?? "0 Days",
            helperLeft: `${summary.serviceStatus?.serviceProvided ?? 0} Provided`,
            helperRight: `${summary.serviceStatus?.ongoingService ?? 0} Ongoing`,
            accent: "orange",
            providedCount: summary.serviceStatus?.serviceProvided ?? 0,
            ongoingCount: summary.serviceStatus?.ongoingService ?? 0,
          },
          {
            id: "revenue",
            title: "Revenue Generated",
            value: `৳ ${Number(summary.revenue?.feesCollection ?? 0).toLocaleString()}`,
            helperLeft: "Net Fees (Month)",
            helperRight: `↑ ${summary.revenue?.comparisonRating ?? 0}% vs last month`,
            accent: "green",
          },
        ];
      }
    } catch {
      // keep demo metrics
    }

    // leaderboards — top sellers & buyers (backend only)
    let topSellers: any[] = [];
    let topBuyers: any[] = [];
    try {
      const sellers = await adminDetailsService.getTopSellersServer(decodedId, 1, 5);
      if (sellers && sellers.length > 0) {
        topSellers = sellers.map((s: any) => ({
          id: s.id,
          name: s.name,
          sold: s.propertiesSold ?? s.properties ?? 0,
          volume: typeof s.totalVolume === "number" ? `৳ ${s.totalVolume.toLocaleString()}` : s.totalVolume ?? "",
          avatarUrl: s.photoUrl ?? s.photoUrl ?? "/images/avatar.png",
        }));
      }

      const buyers = await adminDetailsService.getTopBuyersServer(decodedId, 1, 5);
      if (buyers && buyers.length > 0) {
        topBuyers = buyers.map((b: any) => ({
          id: b.id,
          name: b.name,
          avatarText: b.name ? b.name.slice(0, 2).toUpperCase() : undefined,
          properties: b.propertiesBought ?? b.properties ?? 0,
          spent: typeof b.totalVolume === "number" ? `৳ ${b.totalVolume.toLocaleString()}` : b.totalVolume ?? "",
        }));
      }
    } catch {
      // fall back to demo leaderboards
    }

    // recent activity (backend only)
    let activity: any[] = [];
    try {
      const recent = await adminDetailsService.getRecentActivityServer(decodedId, 1, 10);
      if (recent && recent.length > 0) {
        activity = recent.map((r: any) => ({
          id: r.id,
          title: r.title ?? "",
          desc: r.message ?? "",
          timeText: r.createdAt ? new Date(r.createdAt).toLocaleString() : "",
          tone: "gray",
        }));
      }
    } catch {
      // leave empty if backend fails
    }
    const data = {
      breadcrumbName: admin?.fullName ?? admin?.name ?? "",
      profile: {
        name: admin?.fullName ?? admin?.name ?? "",
        adminId: formatAdminDisplayId(admin?.id ?? decodedId),
        roleText: admin?.role ?? "",
        email: admin?.email ?? "",
        phone: admin?.phone ?? "",
        joinedText: admin?.createdAt ? `Joined: ${formatJoinedDate(admin.createdAt)}` : "",
        address: admin?.assignedLocation ?? "",
        avatarUrl: admin?.photoUrl ?? undefined,
      },
      supervisedAgents: supervised,
      metrics,
      topSellers,
      topBuyers,
      activity,
    };

    return (
      <div className="space-y-4">
        <AdminDetailsHeader breadcrumbName={data.breadcrumbName} adminId={admin?.id ?? decodedId} />

        <AdminProfileCard profile={data.profile} />

        <AdminMetricsGrid items={data.metrics} />

        <AdminLeaderboards topSellers={data.topSellers} topBuyers={data.topBuyers} />

        <SupervisedAgentsCard adminId={decodedId} initialBlock={data.supervisedAgents} />

        <AdminActivityLog items={data.activity} />
      </div>
    );
  } catch {
    return <div className="text-gray">Admin not found</div>;
  }
}
