"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { Plus } from "lucide-react";
import {
  AdminManageStats,
  AdminRow,
} from "@/app/(dashboard)/admin/types/admin-list-type";
import AdminStats from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-stats";
import AdminToolbar from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-toolbar";
import AdminTable from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-table";
import BulkActionBar from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/bulk-action-bar";
import AdminOnBoardDialog from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-onboard-dialog";
import { agentSummaryService } from "@/service/admin/agent/agent-summary.service";
import { operationalZonesListService } from "@/service/admin/manage/locations/operational-zones-list.service";

const SEARCH_DEBOUNCE_MS = 350;
const PAGE_SIZE = 10;

const DEFAULT_ADMIN_STATS: AdminManageStats = {
  totalAdmins: 0,
  activeLocations: 0,
  totalWorkforce: 0,
};

export default function AdminManageAdminsPage() {
  const [rows, setRows] = useState<AdminRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [tab, setTab] = useState<"active" | "suspended">("active");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  const { data: agentSummaryResponse } = useQuery({
    queryKey: ["admin-agent-summary"],
    queryFn: () => agentSummaryService.getAdminAgentSummary(),
  });

  const { data: operationalZonesResponse } = useQuery({
    queryKey: ["admin-operational-zones-summary"],
    queryFn: () =>
      operationalZonesListService.getOperationalZones({
        page: 1,
        limit: 500,
      }),
  });

  const filtered = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    const byTab =
      tab === "active"
        ? rows.filter((r) => r.activityStatus !== "suspended")
        : rows.filter((r) => r.activityStatus === "suspended");

    if (!q) return byTab;

    return byTab.filter((r) => {
      return (
        r.name.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q)
      );
    });
  }, [rows, tab, debouncedQuery]);

  const totalResults = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const visible = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const adminStats = useMemo<AdminManageStats>(() => {
    const activeLocations =
      operationalZonesResponse?.zones.filter((zone) => zone.isActive).length ??
      DEFAULT_ADMIN_STATS.activeLocations;
    const totalWorkforce =
      agentSummaryResponse?.data.totalAgents ?? DEFAULT_ADMIN_STATS.totalWorkforce;

    return {
      totalAdmins: rows.length,
      activeLocations,
      totalWorkforce,
    };
  }, [agentSummaryResponse?.data.totalAgents, operationalZonesResponse?.zones, rows.length]);

  const allVisibleSelected =
    visible.length > 0 && visible.every((r) => selectedIds.includes(r.id));

  function toggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function toggleSelectAllVisible() {
    if (allVisibleSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !visible.some((r) => r.id === id)),
      );
    } else {
      setSelectedIds((prev) => {
        const add = visible.map((r) => r.id).filter((id) => !prev.includes(id));
        return [...prev, ...add];
      });
    }
  }

  const [openOnBoardDialog, setOnBoardDialog] = useState(false);

  return (
    <div className="space-y-4">
      {/* top right action */}
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="base"
          onClick={() => setOnBoardDialog(true)}
        >
          <Plus className="h-4 w-4" />
          Onboard New Admin
        </Button>
      </div>

      {/* stats */}
      <AdminStats stats={adminStats} />

      {/* filters bar */}
      <Card className="p-4">
        <AdminToolbar
          query={query}
          onQueryChange={setQuery}
          tab={tab}
          onTabChange={setTab}
        />
      </Card>

      {/* table */}
      <div className="border border-gray/15 rounded-lg overflow-hidden">
        <AdminTable
          rows={visible}
          selectedIds={selectedIds}
          allVisibleSelected={allVisibleSelected}
          onToggleAll={toggleSelectAllVisible}
          onToggleOne={toggleSelect}
          onToggleAccount={(id, v) =>
            setRows((prev) =>
              prev.map((r) => (r.id === id ? { ...r, accountEnabled: v } : r)),
            )
          }
          onEdit={(id) => console.log("edit", id)}
          onKey={(id) => console.log("key", id)}
          onDelete={(id) => console.log("delete", id)}
        />

        {/* footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray/10 bg-white">
          <p className="text-sm font-medium text-gray">
            {totalResults === 0
              ? "Showing 0 to 0 of 0 results"
              : `Showing ${(safePage - 1) * PAGE_SIZE + 1} to ${Math.min(
                  safePage * PAGE_SIZE,
                  totalResults,
                )} of ${totalResults} results`}
          </p>

          <div className="flex items-center gap-0 overflow-hidden rounded-lg border border-gray/15 bg-white">
            <button
              className="h-9 w-9 text-gray hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={safePage <= 1}
            >
              ‹
            </button>
            <button className="h-9 w-9 bg-primary text-white font-semibold">
              {safePage}
            </button>
            <button className="h-9 w-9 text-gray hover:text-primary">
              {Math.min(safePage + 1, totalPages)}
            </button>
            <button className="h-9 w-9 text-gray hover:text-primary">
              {Math.min(safePage + 2, totalPages)}
            </button>
            <button
              className="h-9 w-9 text-gray hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={safePage >= totalPages}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* bulk actions */}
      <BulkActionBar
        count={selectedIds.length}
        open={selectedIds.length > 0}
        onClear={() => setSelectedIds([])}
        onTurnOn={() =>
          setRows((prev) =>
            prev.map((r) =>
              selectedIds.includes(r.id) ? { ...r, accountEnabled: true } : r,
            ),
          )
        }
        onTurnOff={() =>
          setRows((prev) =>
            prev.map((r) =>
              selectedIds.includes(r.id) ? { ...r, accountEnabled: false } : r,
            ),
          )
        }
      />

      <AdminOnBoardDialog
        onOpenChange={setOnBoardDialog}
        open={openOnBoardDialog}
      />
    </div>
  );
}
