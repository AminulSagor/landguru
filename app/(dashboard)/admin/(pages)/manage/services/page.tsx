"use client";

import { useMemo, useState } from "react";
import Card from "@/components/cards/card";
import { ManageServiceType } from "@/app/(dashboard)/admin/types/manage-service-type";
import { demoManageServiceTypes } from "@/app/(dashboard)/admin/dummy-data/manage-service-data";
import ServicesToolbar from "@/app/(dashboard)/admin/(pages)/manage/_components/manage-services-toolbar";
import ServicesTable from "@/app/(dashboard)/admin/(pages)/manage/_components/services-table";
import AddServiceTypeDialog from "@/app/(dashboard)/admin/(pages)/manage/_components/add-service-type-dialog";


export default function AdminManageServicesPage() {
  const [openAdd, setOpenAdd] = useState(false);
  const [rows, setRows] = useState<ManageServiceType[]>(demoManageServiceTypes);

  const total = rows.length;

  const footerText = useMemo(() => {
    const from = total === 0 ? 0 : 1;
    const to = total;
    return `Showing ${from} to ${to} of ${total} services`;
  }, [total]);

  return (
    <div className="space-y-4">
      <ServicesToolbar onAdd={() => setOpenAdd(true)} />

      <div className="border border-gray/20 rounded-md overflow-hidden">
        <ServicesTable
          rows={rows}
          onToggle={(id, v) =>
            setRows((prev) => prev.map((r) => (r.id === id ? { ...r, isActive: v } : r)))
          }
          onEdit={(id) => {
            // hook later
            console.log("edit", id);
          }}
          onDelete={(id) => {
            // hook later
            setRows((prev) => prev.filter((r) => r.id !== id));
          }}
        />

        {/* footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray/10 bg-white">
          <p className="text-xs font-medium text-gray">{footerText}</p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="h-8 rounded-lg border border-gray/15 bg-white px-3 text-xs font-semibold text-gray opacity-60 cursor-not-allowed"
            >
              Previous
            </button>
            <button
              type="button"
              className="h-8 rounded-lg border border-gray/15 bg-white px-3 text-xs font-semibold text-gray opacity-60 cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <AddServiceTypeDialog
        open={openAdd}
        onOpenChange={setOpenAdd}
        onSave={(newRow) => setRows((prev) => [newRow, ...prev])}
      />
    </div>
  );
}
