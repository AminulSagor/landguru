"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Card from "@/components/cards/card";
import LocationsToolbar from "@/app/(dashboard)/admin/(pages)/manage/_components/locations-toolbar";
import LocationsTable from "@/app/(dashboard)/admin/(pages)/manage/_components/locations-table";
import AddZoneDialog from "@/app/(dashboard)/admin/(pages)/manage/_components/add-zone-dialog";
import { createOperationalZoneService } from "@/service/admin/manage/locations/create-operational-zone.service";
import { operationalZonesListService } from "@/service/admin/manage/locations/operational-zones-list.service";
import { updateOperationalZoneService } from "@/service/admin/manage/locations/update-operational-zone.service";
import type { CreateOperationalZonePayload } from "@/types/admin/manage/locations/create-operational-zone.types";
import type { OperationalZoneItem } from "@/types/admin/manage/locations/operational-zones-list.types";
import type { UpdateOperationalZonePayload } from "@/types/admin/manage/locations/update-operational-zone.types";

const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 400;

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

export default function ManageLocationsPage() {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const [editingZone, setEditingZone] = useState<OperationalZoneItem | null>(
    null,
  );
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  const listQuery = useQuery({
    queryKey: ["operational-zones", page, PAGE_SIZE, debouncedQuery],
    queryFn: () =>
      operationalZonesListService.getOperationalZones({
        page,
        limit: PAGE_SIZE,
        search: debouncedQuery,
      }),
    placeholderData: (previousData) => previousData,
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateOperationalZonePayload) =>
      createOperationalZoneService.createZone(payload),
    onSuccess: (response) => {
      toast.success(response.message || "Zone created successfully.");
      setOpenDialog(false);
      queryClient.invalidateQueries({ queryKey: ["operational-zones"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      zoneId,
      payload,
    }: {
      zoneId: string;
      payload: UpdateOperationalZonePayload;
    }) => updateOperationalZoneService.updateZone(zoneId, payload),
    onSuccess: (response) => {
      toast.success(response.message || "Zone updated successfully.");
      setOpenDialog(false);
      setEditingZone(null);
      queryClient.invalidateQueries({ queryKey: ["operational-zones"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const rows = listQuery.data?.zones ?? [];
  const meta = listQuery.data?.meta;
  const total = meta?.total ?? 0;
  const totalPages = meta?.totalPages ?? 1;
  const startIndex = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endIndex = total === 0 ? 0 : startIndex + rows.length - 1;

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const isDialogSubmitting =
    createMutation.isPending || updateMutation.isPending;

  const handleOpenAdd = () => {
    setEditingZone(null);
    setOpenDialog(true);
  };

  const handleEdit = (zone: OperationalZoneItem) => {
    setEditingZone(zone);
    setOpenDialog(true);
  };

  const handleToggle = (zone: OperationalZoneItem, nextValue: boolean) => {
    updateMutation.mutate({
      zoneId: zone.id,
      payload: {
        zoneName: zone.zoneName,
        isActive: nextValue,
      },
    });
  };

  const handleDialogSave = async (payload: {
    zoneName: string;
    division: string;
    district: string;
    thana: string;
    isActive: boolean;
  }) => {
    if (editingZone) {
      await updateMutation.mutateAsync({
        zoneId: editingZone.id,
        payload: {
          zoneName: payload.zoneName,
          isActive: payload.isActive,
        },
      });
      return;
    }

    await createMutation.mutateAsync({
      zoneName: payload.zoneName,
      division: payload.division,
      district: payload.district,
      thana: payload.thana,
    });
  };

  const isPreviousDisabled = page <= 1 || listQuery.isFetching;
  const isNextDisabled = page >= totalPages || listQuery.isFetching;

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <LocationsToolbar
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setPage(1);
        }}
        onAdd={handleOpenAdd}
        onFilter={() => {}}
      />

      <Card className="p-0 overflow-hidden">
        <LocationsTable
          rows={rows}
          isLoading={listQuery.isLoading}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />

        <div className="flex items-center justify-between px-5 py-4 border-t border-gray/10 bg-white">
          <p className="text-sm font-medium text-gray">
            Showing {startIndex} to {endIndex} of {total} results
          </p>

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

      <AddZoneDialog
        open={openDialog}
        onOpenChange={(nextOpen) => {
          setOpenDialog(nextOpen);
          if (!nextOpen) {
            setEditingZone(null);
          }
        }}
        zone={editingZone}
        isSubmitting={isDialogSubmitting}
        onSave={handleDialogSave}
      />
    </div>
  );
}
