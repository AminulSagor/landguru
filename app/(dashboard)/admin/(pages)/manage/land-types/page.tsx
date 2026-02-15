"use client";

import { useMemo, useState } from "react";
import Card from "@/components/cards/card";
import { LandTypeRow } from "@/app/(dashboard)/admin/types/land-type.types";
import { demoLandTypes } from "@/app/(dashboard)/admin/dummy-data/land-type.demo";
import LandTypesToolbar from "@/app/(dashboard)/admin/(pages)/manage/_components/land-types-toolbar";
import LandTypesTable from "@/app/(dashboard)/admin/(pages)/manage/_components/land-types-table";
import AddLandTypeDialog from "@/app/(dashboard)/admin/(pages)/manage/_components/add-land-type-dialog";

export default function ManageLandTypesPage() {
  const [rows, setRows] = useState<LandTypeRow[]>(demoLandTypes);
  const [openAdd, setOpenAdd] = useState(false);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((r) => r.typeName.toLowerCase().includes(s));
  }, [q, rows]);

  const visible = filtered;

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <LandTypesToolbar
        query={q}
        onQueryChange={setQ}
        onAdd={() => setOpenAdd(true)}
      />

      <div className="border border-gray/15 rounded-lg overflow-hidden">
        <LandTypesTable
          rows={visible}
          onToggle={(id, v) =>
            setRows((prev) =>
              prev.map((r) => (r.id === id ? { ...r, isActive: v } : r)),
            )
          }
          onEdit={(id) => console.log("edit", id)}
          onDelete={(id) => setRows((prev) => prev.filter((r) => r.id !== id))}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray">
          Showing 1 to {visible.length} of {visible.length} results
        </p>

        <div className="flex items-center gap-2">
          <button className="h-9 w-9 rounded-lg border border-gray/15 bg-white text-primary">
            ‹
          </button>
          <button className="h-9 w-9 rounded-lg bg-primary text-white font-semibold">
            1
          </button>
          <button className="h-9 w-9 rounded-lg border border-gray/15 bg-white text-primary">
            ›
          </button>
        </div>
      </div>

      <AddLandTypeDialog
        open={openAdd}
        onOpenChange={setOpenAdd}
        onSave={(row) => setRows((prev) => [row, ...prev])}
      />
    </div>
  );
}
