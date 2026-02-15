"use client";

import AdminRequestDetails from "@/app/(dashboard)/admin/(pages)/reset-requests/_components/admin-request-details";
import AdminResetStats from "@/app/(dashboard)/admin/(pages)/reset-requests/_components/admin-reset-stats";
import PendingQueue from "@/app/(dashboard)/admin/(pages)/reset-requests/_components/pending-queue";
import { demoRequests, demoStats } from "@/app/(dashboard)/admin/dummy-data/admin-reset.data";

export default function ResetRequestsPage() {
  return (
    <div className="space-y-5">
      <AdminResetStats stats={demoStats} />

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-4">
          <PendingQueue items={demoRequests} />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <AdminRequestDetails data={demoRequests[0]} />
        </div>
      </div>
    </div>
  );
}
