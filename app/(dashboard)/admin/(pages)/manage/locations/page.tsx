"use client";

import { useMemo, useState } from "react";
import Card from "@/components/cards/card";
import LocationsToolbar from "@/app/(dashboard)/admin/(pages)/manage/_components/locations-toolbar";
import LocationsTable from "@/app/(dashboard)/admin/(pages)/manage/_components/locations-table";
import AddZoneDialog from "@/app/(dashboard)/admin/(pages)/manage/_components/add-zone-dialog";
import { ManageZoneRow } from "@/app/(dashboard)/admin/types/manage-location.types";
import { demoZones } from "@/app/(dashboard)/admin/dummy-data/manage-location.demo";

export default function ManageLocationsPage() {
  const [openAdd, setOpenAdd] = useState(false);
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<ManageZoneRow[]>(demoZones);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => r.zoneName.toLowerCase().includes(q));
  }, [rows, query]);

  const visible = filtered.slice(0, 5);
  const totalResults = 56;

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <LocationsToolbar
        query={query}
        onQueryChange={setQuery}
        onAdd={() => setOpenAdd(true)}
        onFilter={() => {}}
      />

      <Card className="p-0 overflow-hidden">
        <LocationsTable
          rows={visible}
          onToggle={(id, v) =>
            setRows((prev) =>
              prev.map((r) => (r.id === id ? { ...r, isActive: v } : r)),
            )
          }
          onEdit={(id) => console.log("edit", id)}
          onDelete={(id) => setRows((prev) => prev.filter((r) => r.id !== id))}
        />

        {/* footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray/10 bg-white">
          <p className="text-sm font-medium text-gray">
            Showing 1 to {visible.length} of {totalResults} results
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="h-9 rounded-lg border border-gray/15 bg-white px-4 text-sm font-semibold text-gray opacity-70 cursor-not-allowed"
            >
              Previous
            </button>
            <button
              type="button"
              className="h-9 rounded-lg border border-gray/15 bg-white px-4 text-sm font-semibold text-gray opacity-70 cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </Card>

      <AddZoneDialog
        open={openAdd}
        onOpenChange={setOpenAdd}
        onSave={(row) => setRows((prev) => [row, ...prev])}
      />
    </div>
  );
}
