"use client";

import { useMemo, useState } from "react";
import {
  resetRequests,
  resetRequestsStats,
} from "@/app/(dashboard)/admin/dummy-data/reset-requests-data";
import type { ResetRequestRow } from "@/app/(dashboard)/admin/types/reset-requests-types";
import ResetRequestsStatsRow from "@/app/(dashboard)/admin/(pages)/reset-requests/_components/reset-requests-stats-row";
import ResetRequestsTable from "@/app/(dashboard)/admin/(pages)/reset-requests/_components/reset-requests-table";
import ResetCredentialsDialog from "@/app/(dashboard)/admin/(pages)/reset-requests/_components/reset-credentials-dialog";
export default function ResetRequestsPage() {
  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ResetRequestRow | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return resetRequests;

    return resetRequests.filter((r: ResetRequestRow) => {
      return (
        r.requestId.toLowerCase().includes(q) ||
        r.agent.name.toLowerCase().includes(q) ||
        r.details.agentId.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <div className="space-y-4">
      <ResetRequestsStatsRow stats={resetRequestsStats} />
      <ResetRequestsTable
        rows={filtered}
        query={query}
        onQueryChange={setQuery}
        setSelectedRow={setSelectedRow}
        setDialogOpen={setDialogOpen}
      />

      <ResetCredentialsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        row={selectedRow}
      />
    </div>
  );
}
