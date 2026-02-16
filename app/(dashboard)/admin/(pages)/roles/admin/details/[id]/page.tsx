"use client";

import AdminActivityLog from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-activity-log";
import AdminDetailsHeader from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-details-header";
import AdminLeaderboards from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-leaderboards";
import AdminMetricsGrid from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-metrics-grid";
import AdminProfileCard from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-profile-card";
import SupervisedAgentsCard from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/supervised-agents-card";
import { adminDetailsDemo } from "@/app/(dashboard)/admin/dummy-data/admin-details-data";

export default function AdminDetailsPage() {
  const data = adminDetailsDemo;

  return (
    <div className="space-y-4">
      <AdminDetailsHeader breadcrumbName={data.breadcrumbName} />

      <AdminProfileCard profile={data.profile} />

      <AdminMetricsGrid items={data.metrics} />

      <AdminLeaderboards
        topSellers={data.topSellers}
        topBuyers={data.topBuyers}
      />

      <SupervisedAgentsCard block={data.supervisedAgents} />

      <AdminActivityLog items={data.activity} />
    </div>
  );
}
