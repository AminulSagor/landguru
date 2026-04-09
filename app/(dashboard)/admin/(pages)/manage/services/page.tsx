"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Card from "@/components/cards/card";
import ServicesToolbar from "@/app/(dashboard)/admin/(pages)/manage/_components/manage-services-toolbar";
import ServicesTable from "@/app/(dashboard)/admin/(pages)/manage/_components/services-table";
import AddServiceTypeDialog from "@/app/(dashboard)/admin/(pages)/manage/_components/add-service-type-dialog";
import DeleteServiceTypeDialog from "@/app/(dashboard)/admin/(pages)/manage/_components/delete-service-type-dialog";
import { createServiceTypeService } from "@/service/admin/manage/services/create-service-type.service";
import { deleteServiceTypeService } from "@/service/admin/manage/services/delete-service-type.service";
import { serviceTypesListService } from "@/service/admin/manage/services/service-types-list.service";
import { toggleServiceTypeStatusService } from "@/service/admin/manage/services/toggle-service-type-status.service";
import { updateServiceTypeService } from "@/service/admin/manage/services/update-service-type.service";
import type { CreateServiceTypePayload } from "@/types/admin/manage/services/create-service-type.types";
import type { ServiceTypeItem } from "@/types/admin/manage/services/service-types-list.types";
import type { UpdateServiceTypePayload } from "@/types/admin/manage/services/update-service-type.types";

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

export default function AdminManageServicesPage() {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const [editingService, setEditingService] = useState<ServiceTypeItem | null>(
    null,
  );
  const [deletingService, setDeletingService] = useState<ServiceTypeItem | null>(
    null,
  );
  const [page, setPage] = useState(1);

  const listQuery = useQuery({
    queryKey: ["service-types", page, PAGE_SIZE],
    queryFn: () =>
      serviceTypesListService.getServiceTypes({
        page,
        limit: PAGE_SIZE,
      }),
    placeholderData: (previousData) => previousData,
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateServiceTypePayload) =>
      createServiceTypeService.createServiceType(payload),
    onSuccess: (response) => {
      toast.success(response.message || "Service type created successfully.");
      setOpenDialog(false);
      queryClient.invalidateQueries({ queryKey: ["service-types"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      serviceTypeId,
      payload,
    }: {
      serviceTypeId: string;
      payload: UpdateServiceTypePayload;
    }) => updateServiceTypeService.updateServiceType(serviceTypeId, payload),
    onSuccess: (response) => {
      toast.success(response.message || "Service type updated successfully.");
      setOpenDialog(false);
      setEditingService(null);
      queryClient.invalidateQueries({ queryKey: ["service-types"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (serviceTypeId: string) =>
      deleteServiceTypeService.deleteServiceType(serviceTypeId),
    onSuccess: (response) => {
      toast.success(response.message || "Service type deleted successfully.");
      setDeletingService(null);
      queryClient.invalidateQueries({ queryKey: ["service-types"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({
      serviceTypeId,
      isActive,
    }: {
      serviceTypeId: string;
      isActive: boolean;
    }) =>
      toggleServiceTypeStatusService.toggleServiceTypeStatus(serviceTypeId, {
        isActive,
      }),
    onSuccess: (response) => {
      toast.success(response.message || "Status updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["service-types"] });
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

  const isDialogSubmitting =
    createMutation.isPending || updateMutation.isPending;

  const footerText = useMemo(
    () => `Showing ${startIndex} to ${endIndex} of ${total} services`,
    [endIndex, startIndex, total],
  );

  const handleOpenAdd = () => {
    setEditingService(null);
    setOpenDialog(true);
  };

  const handleEdit = (row: ServiceTypeItem) => {
    setEditingService(row);
    setOpenDialog(true);
  };

  const handleDelete = (row: ServiceTypeItem) => {
    setDeletingService(row);
  };

  const handleToggle = (row: ServiceTypeItem, isActive: boolean) => {
    toggleStatusMutation.mutate({
      serviceTypeId: row.id,
      isActive,
    });
  };

  const handleSave = async (
    payload: CreateServiceTypePayload | UpdateServiceTypePayload,
  ) => {
    if (editingService) {
      await updateMutation.mutateAsync({
        serviceTypeId: editingService.id,
        payload,
      });
      return;
    }

    await createMutation.mutateAsync(payload);
  };

  const isPreviousDisabled = page <= 1 || listQuery.isFetching;
  const isNextDisabled = page >= totalPages || listQuery.isFetching;

  return (
    <div className="space-y-4">
      <ServicesToolbar onAdd={handleOpenAdd} />

      <Card className="p-0 overflow-hidden border border-gray/20 rounded-md">
        <ServicesTable
          rows={rows}
          isLoading={listQuery.isLoading}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <div className="flex items-center justify-between px-5 py-4 border-t border-gray/10 bg-white">
          <p className="text-xs font-medium text-gray">{footerText}</p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={isPreviousDisabled}
              className="h-8 rounded-lg border border-gray/15 bg-white px-3 text-xs font-semibold text-gray disabled:cursor-not-allowed disabled:opacity-60"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={isNextDisabled}
              className="h-8 rounded-lg border border-gray/15 bg-white px-3 text-xs font-semibold text-gray disabled:cursor-not-allowed disabled:opacity-60"
            >
              Next
            </button>
          </div>
        </div>
      </Card>

      <AddServiceTypeDialog
        open={openDialog}
        service={editingService}
        isSubmitting={isDialogSubmitting}
        onOpenChange={(nextOpen) => {
          setOpenDialog(nextOpen);
          if (!nextOpen) {
            setEditingService(null);
          }
        }}
        onSave={handleSave}
      />

      <DeleteServiceTypeDialog
        open={Boolean(deletingService)}
        serviceName={deletingService?.name ?? ""}
        isDeleting={deleteMutation.isPending}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            setDeletingService(null);
          }
        }}
        onConfirm={() => {
          if (!deletingService) {
            return;
          }

          deleteMutation.mutate(deletingService.id);
        }}
      />
    </div>
  );
}
