"use client";

import { useMemo, useState } from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { Plus } from "lucide-react";
import { AdminRow } from "@/app/(dashboard)/admin/types/admin-list-type";
import {
  demoAdmins,
  demoAdminStats,
} from "@/app/(dashboard)/admin/dummy-data/admin-list-data";
import AdminStats from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-stats";
import AdminToolbar from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-toolbar";
import AdminTable from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-table";
import BulkActionBar from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/bulk-action-bar";

export default function AdminManageAdminsPage() {
  const [rows, setRows] = useState<AdminRow[]>(demoAdmins);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [tab, setTab] = useState<"active" | "suspended">("active");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
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
  }, [rows, tab, query]);

  const visible = filtered; // screenshot shows 3 rows

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

  return (
    <div className="space-y-4">
      {/* top right action */}
      <div className="flex justify-end">
        <Button variant="primary" size="base" onClick={() => {}}>
          <Plus className="h-4 w-4" />
          Onboard New Admin
        </Button>
      </div>

      {/* stats */}
      <AdminStats stats={demoAdminStats} />

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
            Showing 1 to {visible.length} of 12 results
          </p>

          <div className="flex items-center gap-0 overflow-hidden rounded-lg border border-gray/15 bg-white">
            <button className="h-9 w-9 text-gray hover:text-primary">‹</button>
            <button className="h-9 w-9 bg-primary text-white font-semibold">
              1
            </button>
            <button className="h-9 w-9 text-gray hover:text-primary">2</button>
            <button className="h-9 w-9 text-gray hover:text-primary">3</button>
            <button className="h-9 w-9 text-gray hover:text-primary">›</button>
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
    </div>
  );
}
