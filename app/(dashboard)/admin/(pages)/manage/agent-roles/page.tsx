"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

import Button from "@/components/buttons/button";
import Card from "@/components/cards/card";
import AddAgentRoleDialog from "@/app/(dashboard)/admin/(pages)/manage/_components/add-agent-role-dialog";
import AgentRolesTable from "@/app/(dashboard)/admin/(pages)/manage/_components/agent-roles-table";
import DeleteAgentRoleDialog from "@/app/(dashboard)/admin/(pages)/manage/_components/delete-agent-role-dialog";
import { agentRolesListService } from "@/service/admin/manage/agent-roles/agent-roles-list.service";
import { createAgentRoleService } from "@/service/admin/manage/agent-roles/create-agent-role.service";
import { updateAgentRoleService } from "@/service/admin/manage/agent-roles/update-agent-role.service";
import { toggleAgentRoleStatusService } from "@/service/admin/manage/agent-roles/toggle-agent-role-status.service";
import { deleteAgentRoleService } from "@/service/admin/manage/agent-roles/delete-agent-role.service";
import type { CreateAgentRolePayload } from "@/types/admin/manage/agent-roles/create-agent-role.types";
import type { AgentRoleItem } from "@/types/admin/manage/agent-roles/agent-roles-list.types";
import type { UpdateAgentRolePayload } from "@/types/admin/manage/agent-roles/update-agent-role.types";

const PAGE_SIZE = 10;

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: { data?: { message?: string } } }).response?.data
      ?.message === "string"
  ) {
    return (error as { response?: { data?: { message?: string } } }).response!
      .data!.message!;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}

export default function ManageAgentRolesPage() {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [editingRole, setEditingRole] = useState<AgentRoleItem | null>(null);
  const [deletingRole, setDeletingRole] = useState<AgentRoleItem | null>(null);

  const listQuery = useQuery({
    queryKey: ["agent-roles", page, PAGE_SIZE],
    queryFn: () =>
      agentRolesListService.getAgentRoles({
        page,
        limit: PAGE_SIZE,
      }),
    placeholderData: (previousData) => previousData,
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateAgentRolePayload) =>
      createAgentRoleService.createAgentRole(payload),
    onSuccess: (response) => {
      toast.success(response.message || "Agent role created successfully.");
      setOpenDialog(false);
      queryClient.invalidateQueries({ queryKey: ["agent-roles"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      agentRoleId,
      payload,
    }: {
      agentRoleId: string;
      payload: UpdateAgentRolePayload;
    }) => updateAgentRoleService.updateAgentRole(agentRoleId, payload),
    onSuccess: (response) => {
      toast.success(response.message || "Agent role updated successfully.");
      setOpenDialog(false);
      setEditingRole(null);
      queryClient.invalidateQueries({ queryKey: ["agent-roles"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({
      agentRoleId,
      isActive,
    }: {
      agentRoleId: string;
      isActive: boolean;
    }) =>
      toggleAgentRoleStatusService.toggleAgentRoleStatus(agentRoleId, {
        isActive,
      }),
    onSuccess: (response) => {
      toast.success(response.message || "Status updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["agent-roles"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (agentRoleId: string) =>
      deleteAgentRoleService.deleteAgentRole(agentRoleId),
    onSuccess: (response) => {
      toast.success(response.message || "Agent role deleted successfully.");
      setDeletingRole(null);
      queryClient.invalidateQueries({ queryKey: ["agent-roles"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const rows = listQuery.data?.data ?? [];
  const meta = listQuery.data?.meta;
  const total = meta?.total ?? 0;
  const totalPages = meta?.totalPages ?? 1;
  const startIndex = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endIndex = total === 0 ? 0 : startIndex + rows.length - 1;

  useEffect(() => {
    if (page > totalPages) {
      setPage(Math.max(totalPages, 1));
    }
  }, [page, totalPages]);

  const footerText = useMemo(
    () => `Showing ${startIndex} to ${endIndex} of ${total} roles`,
    [endIndex, startIndex, total],
  );

  const isDialogSubmitting =
    createMutation.isPending || updateMutation.isPending;

  const handleOpenAdd = () => {
    setEditingRole(null);
    setOpenDialog(true);
  };

  const handleEdit = (row: AgentRoleItem) => {
    setEditingRole(row);
    setOpenDialog(true);
  };

  const handleDelete = (row: AgentRoleItem) => {
    setDeletingRole(row);
  };

  const handleToggle = (row: AgentRoleItem, isActive: boolean) => {
    toggleStatusMutation.mutate({
      agentRoleId: row.id,
      isActive,
    });
  };

  const handleSave = async (
    payload: CreateAgentRolePayload | UpdateAgentRolePayload,
  ) => {
    if (editingRole) {
      await updateMutation.mutateAsync({
        agentRoleId: editingRole.id,
        payload,
      });
      return;
    }

    await createMutation.mutateAsync(payload);
  };

  const isPreviousDisabled = page <= 1 || listQuery.isFetching;
  const isNextDisabled = page >= totalPages || listQuery.isFetching;

  return (
    <div className="mx-auto max-w-7xl space-y-4">
      <div className="flex justify-end">
        <Button variant="primary" onClick={handleOpenAdd} size="base">
          <Plus className="h-4 w-4" />
          Add New Role
        </Button>
      </div>

      <Card className="overflow-hidden rounded-lg border border-gray/10 p-0">
        <AgentRolesTable
          rows={rows}
          isLoading={listQuery.isLoading}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <div className="flex items-center justify-between border-t border-gray/10 bg-white px-5 py-4">
          <p className="text-sm font-medium text-gray">{footerText}</p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={isPreviousDisabled}
              className="h-9 rounded-lg border border-gray/15 bg-white px-4 text-sm font-semibold text-gray disabled:cursor-not-allowed disabled:opacity-70"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={isNextDisabled}
              className="h-9 rounded-lg border border-gray/15 bg-white px-4 text-sm font-semibold text-gray disabled:cursor-not-allowed disabled:opacity-70"
            >
              Next
            </button>
          </div>
        </div>
      </Card>

      <AddAgentRoleDialog
        open={openDialog}
        role={editingRole}
        isSubmitting={isDialogSubmitting}
        onOpenChange={(nextOpen) => {
          setOpenDialog(nextOpen);
          if (!nextOpen) {
            setEditingRole(null);
          }
        }}
        onSave={handleSave}
      />

      <DeleteAgentRoleDialog
        open={Boolean(deletingRole)}
        roleName={deletingRole?.name ?? ""}
        isDeleting={deleteMutation.isPending}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            setDeletingRole(null);
          }
        }}
        onConfirm={() => {
          if (!deletingRole) {
            return;
          }

          deleteMutation.mutate(deletingRole.id);
        }}
      />
    </div>
  );
}
