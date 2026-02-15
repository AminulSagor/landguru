"use client";

import { useMemo, useState } from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { Plus } from "lucide-react";
import { AgentRoleRow } from "@/app/(dashboard)/admin/types/agent-role.types";
import { demoAgentRoles } from "@/app/(dashboard)/admin/dummy-data/agent-role.demo";
import AgentRolesTable from "@/app/(dashboard)/admin/(pages)/manage/_components/agent-roles-table";
import AddAgentRoleDialog from "@/app/(dashboard)/admin/(pages)/manage/_components/add-agent-role-dialog";

export default function ManageAgentRolesPage() {
  const [rows, setRows] = useState<AgentRoleRow[]>(demoAgentRoles);
  const [openAdd, setOpenAdd] = useState(false);

  const footerText = useMemo(
    () => `Showing ${rows.length} of ${rows.length} roles`,
    [rows.length],
  );

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex justify-end">
        <Button variant="primary" onClick={() => setOpenAdd(true)} size="base">
          <Plus className="h-4 w-4" />
          Add New Role
        </Button>
      </div>

      <div className="border border-gray/10 rounded-lg overflow-hidden">
        <AgentRolesTable
          rows={rows}
          onToggle={(id, v) =>
            setRows((prev) =>
              prev.map((r) => (r.id === id ? { ...r, isActive: v } : r)),
            )
          }
          onEdit={(id) => console.log("edit", id)}
          onDelete={(id) => setRows((prev) => prev.filter((r) => r.id !== id))}
        />

        <div className="flex items-center justify-between px-5 py-4 border-t border-gray/10 bg-white">
          <p className="text-sm font-medium text-gray">{footerText}</p>

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
      </div>

      <AddAgentRoleDialog
        open={openAdd}
        onOpenChange={setOpenAdd}
        onSave={(row) => setRows((prev) => [row, ...prev])}
      />
    </div>
  );
}
