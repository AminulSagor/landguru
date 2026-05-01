"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { Plus } from "lucide-react";
import {
  AdminActivityStatus,
  AdminManageStats,
  AdminRow,
} from "@/app/(dashboard)/admin/types/admin-list-type";
import AdminStats from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-stats";
import AdminToolbar from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-toolbar";
import AdminTable from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-table";
import BulkActionBar from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/bulk-action-bar";
import AdminOnBoardDialog from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-onboard-dialog";
import EditAdminDialog from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/edit-admin-dialog";
import AdminResetCredentialsDialog from "@/app/(dashboard)/admin/(pages)/reset-requests/_components/admin-reset-credentials-dialog";
import { formatAdminDisplayId, formatDisplayIdSafe } from "@/utils/id.utils";
import type { ResetRequest } from "@/app/(dashboard)/admin/types/admin-reset-types";
import { adminListService } from "@/service/admin/admin-list/admin-list.service";
import { adminSummaryMetricsService } from "@/service/admin/admin-list/admin-summary-metrics.service";
import { adminStatusService } from "@/service/admin/admin-list/admin-status.service";
import { adminBulkStatusService } from "@/service/admin/admin-list/admin-bulk-status.service";
import { adminDeleteService } from "@/service/admin/admin-list/admin-delete.service";
import { adminUpdateService } from "@/service/admin/admin-list/admin-update.service";
import { operationalZonesListService } from "@/service/admin/manage/locations/operational-zones-list.service";
import type { AdminListItem } from "@/types/admin/admin-list/admin-list.types";
import type { AdminSummaryMetricsData } from "@/types/admin/admin-list/admin-summary-metrics.types";
import type { UpdateAdminPayload } from "@/types/admin/admin-list/admin-update.types";

const SEARCH_DEBOUNCE_MS = 350;
const PAGE_SIZE = 10;

function showConfirmToast({
  title,
  description,
  confirmLabel,
  onConfirm,
}: {
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
}) {
  toast.custom(
    (t) => (
      <div className="w-[320px] rounded-2xl border border-gray/15 bg-white p-4 shadow-xl">
        <p className="text-sm font-semibold text-primary">{title}</p>
        <p className="mt-1 text-sm text-gray">{description}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            className="rounded-lg border border-gray/15 px-3 py-2 text-sm font-medium text-gray hover:bg-secondary"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-lg bg-[#EF4444] px-3 py-2 text-sm font-medium text-white hover:bg-[#d83b3b]"
            onClick={() => {
              toast.dismiss(t.id);
              onConfirm();
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    ),
    { duration: Infinity },
  );
}

const DEFAULT_ADMIN_STATS: AdminManageStats = {
  totalAdmins: 0,
  activeLocations: 0,
  totalWorkforce: 0,
};

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: { data?: { message?: string } } }).response
      ?.data?.message === "string"
  ) {
    return (error as { response?: { data?: { message?: string } } }).response!
      .data!.message!;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}

function toActivityStatus(
  value: string | null | undefined,
  isActive?: boolean,
): AdminActivityStatus {
  if (value) {
    const normalized = value.toLowerCase();
    if (
      normalized === "online" ||
      normalized === "offline" ||
      normalized === "suspended"
    ) {
      return normalized as AdminActivityStatus;
    }
  }

  if (isActive === false) {
    return "suspended";
  }

  return "offline";
}

function toLocationTone(item: AdminListItem): AdminRow["locationTone"] {
  if (item.isActive === false) {
    return "gray";
  }

  const suspendedCount =
    item.workforceSuspended ?? item.workforceSupervision?.inactiveAgents ?? 0;

  return suspendedCount > 0 ? "purple" : "blue";
}

function mapAdminRow(item: AdminListItem): AdminRow {
  const workforceCount =
    item.workforceCount ?? item.workforceSupervision?.totalAgents ?? 0;
  const workforceActive =
    item.workforceActive ?? item.workforceSupervision?.activeAgents ?? 0;
  const workforceSuspended =
    item.workforceSuspended ?? item.workforceSupervision?.inactiveAgents ?? 0;
  const lastLoginText = item.lastLoginText?.trim()
    ? item.lastLoginText
    : "Last login: -";

  return {
    id: item.id,
    displayId: formatAdminDisplayId(item.id),
    name: item.fullName,
    avatar: item.photoUrl ?? undefined,
    assignedLocation: item.assignedLocation ?? "Unknown",
    locationTone: toLocationTone(item),
    phone: item.phone,
    email: item.email,
    workforceCount,
    workforceActive,
    workforceSuspended,
    activityStatus: toActivityStatus(item.activityStatus, item.isActive),
    lastLoginText,
    accountEnabled: item.accountEnabled ?? item.isActive ?? true,
  };
}

export default function AdminManageAdminsPage() {
  const queryClient = useQueryClient();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [tab, setTab] = useState<"active" | "suspended">("active");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedZone, setSelectedZone] = useState("");
  const [openOnBoardDialog, setOnBoardDialog] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminRow | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [resetRequestData, setResetRequestData] = useState<ResetRequest | null>(null);
  const [openResetDialog, setOpenResetDialog] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    setPage(1);
  }, [tab, selectedZone]);

  useEffect(() => {
    setSelectedIds([]);
  }, [tab, debouncedQuery, selectedZone]);

  const summaryQuery = useQuery({
    queryKey: ["admin-summary-metrics"],
    queryFn: () => adminSummaryMetricsService.getSummaryMetrics(),
  });

  const listQuery = useQuery({
    queryKey: ["admin-list", page, PAGE_SIZE, debouncedQuery, selectedZone, tab],
    queryFn: () =>
      adminListService.getAdminList({
        page,
        limit: PAGE_SIZE,
        ...(debouncedQuery ? { search: debouncedQuery } : {}),
        ...(selectedZone ? { zone: selectedZone } : {}),
        isActive: tab === "active",
      }),
    placeholderData: (previousData) => previousData,
  });

  const { data: operationalZonesResponse } = useQuery({
    queryKey: ["admin-operational-zones"],
    queryFn: () =>
      operationalZonesListService.getOperationalZones({
        page: 1,
        limit: 500,
      }),
    staleTime: 5 * 60 * 1000,
  });

  const zoneOptions = useMemo(() => {
    const values = (operationalZonesResponse?.zones ?? [])
      .map((zone) => zone.zoneName.trim())
      .filter(Boolean);

    return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
  }, [operationalZonesResponse?.zones]);

  const zoneSelectOptions = useMemo(
    () =>
      (operationalZonesResponse?.zones ?? [])
        .map((zone) => ({ id: zone.id, name: zone.zoneName.trim() }))
        .filter((zone) => zone.name),
    [operationalZonesResponse?.zones],
  );

  const rows = useMemo(
    () => (listQuery.data?.data ?? []).map(mapAdminRow),
    [listQuery.data?.data],
  );

  const adminStats = useMemo<AdminManageStats>(() => {
    const data: AdminSummaryMetricsData | undefined = summaryQuery.data?.data;
    if (!data) {
      return DEFAULT_ADMIN_STATS;
    }

    return {
      totalAdmins: Number(data.totalAdmins ?? 0),
      activeLocations: Number(data.activeLocations ?? 0),
      totalWorkforce: Number(data.totalWorkforce ?? 0),
    };
  }, [summaryQuery.data?.data]);

  const meta = listQuery.data?.meta;
  const totalResults = meta?.total ?? 0;
  const totalPages = meta?.totalPages ?? 1;
  const safePage = Math.min(page, totalPages);
  const startIndex = totalResults === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const endIndex =
    totalResults === 0 ? 0 : startIndex + Math.max(rows.length - 1, 0);

  useEffect(() => {
    if (page > totalPages) {
      setPage(Math.max(totalPages, 1));
    }
  }, [page, totalPages]);

  const allVisibleSelected =
    rows.length > 0 && rows.every((r) => selectedIds.includes(r.id));

  function toggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function toggleSelectAllVisible() {
    if (allVisibleSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !rows.some((r) => r.id === id)),
      );
    } else {
      setSelectedIds((prev) => {
        const add = rows.map((r) => r.id).filter((id) => !prev.includes(id));
        return [...prev, ...add];
      });
    }
  }

  const statusMutation = useMutation({
    mutationFn: ({ adminId, isActive }: { adminId: string; isActive: boolean }) =>
      adminStatusService.updateAdminStatus(adminId, { isActive }),
    onSuccess: (response) => {
      toast.success(response.message || "Admin status updated.");
      queryClient.invalidateQueries({ queryKey: ["admin-list"] });
      queryClient.invalidateQueries({ queryKey: ["admin-summary-metrics"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const bulkStatusMutation = useMutation({
    mutationFn: ({ adminIds, isActive }: { adminIds: string[]; isActive: boolean }) =>
      adminBulkStatusService.updateBulkStatus({ adminIds, isActive }),
    onSuccess: (response) => {
      toast.success(response.message || "Bulk status updated.");
      setSelectedIds([]);
      queryClient.invalidateQueries({ queryKey: ["admin-list"] });
      queryClient.invalidateQueries({ queryKey: ["admin-summary-metrics"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (adminId: string) => adminDeleteService.deleteAdmin(adminId),
    onSuccess: (response) => {
      toast.success(response.message || "Admin deleted.");
      queryClient.invalidateQueries({ queryKey: ["admin-list"] });
      queryClient.invalidateQueries({ queryKey: ["admin-summary-metrics"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const updateMutation = useMutation({
    mutationFn: ({ adminId, payload }: { adminId: string; payload: UpdateAdminPayload }) =>
      adminUpdateService.updateAdmin(adminId, payload),
    onSuccess: (response) => {
      toast.success(response.message || "Admin updated.");
      setEditingAdmin(null);
      setOpenEditDialog(false);
      queryClient.invalidateQueries({ queryKey: ["admin-list"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const handleEdit = (id: string) => {
    const match = rows.find((row) => row.id === id);
    if (!match) {
      return;
    }

    setEditingAdmin(match);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = (payload: UpdateAdminPayload) => {
    if (!editingAdmin) {
      return;
    }

    updateMutation.mutate({ adminId: editingAdmin.id, payload });
  };

  const handleDelete = (id: string) => {
    showConfirmToast({
      title: "Delete this admin profile?",
      description: "This action cannot be undone.",
      confirmLabel: "Delete",
      onConfirm: () => deleteMutation.mutate(id),
    });
  };

  const handleKey = (id: string) => {
    const match = rows.find((row) => row.id === id);
    if (!match) return;

    setResetRequestData({
      id: match.id,
      name: match.name,
      adminId: formatDisplayIdSafe("ADM", match.displayId, match.id),
      avatar: match.avatar ?? "",
      time: new Date().toISOString(),
      phone: match.phone ?? "",
      email: match.email ?? "",
      zone: match.assignedLocation ?? "",
    });

    setOpenResetDialog(true);
  };

  const pageButtons = useMemo(() => {
    if (totalPages <= 1) {
      return [safePage];
    }

    return [safePage, safePage + 1, safePage + 2].filter(
      (value) => value <= totalPages,
    );
  }, [safePage, totalPages]);

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
          zone={selectedZone}
          zoneOptions={zoneOptions}
          onZoneChange={setSelectedZone}
          tab={tab}
          onTabChange={setTab}
        />
      </Card>

      {/* table */}
      <div className="border border-gray/15 rounded-lg overflow-hidden">
        <AdminTable
          rows={rows}
          selectedIds={selectedIds}
          allVisibleSelected={allVisibleSelected}
          onToggleAll={toggleSelectAllVisible}
          onToggleOne={toggleSelect}
          onToggleAccount={(id, v) =>
            statusMutation.mutate({ adminId: id, isActive: v })
          }
          onEdit={handleEdit}
            onKey={handleKey}
          onDelete={handleDelete}
        />

        {/* footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray/10 bg-white">
          <p className="text-sm font-medium text-gray">
            {totalResults === 0
              ? "Showing 0 to 0 of 0 results"
              : `Showing ${startIndex} to ${endIndex} of ${totalResults} results`}
          </p>

          <div className="flex items-center gap-0 overflow-hidden rounded-lg border border-gray/15 bg-white">
            <button
              className="h-9 w-9 text-gray hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={safePage <= 1}
            >
              ‹
            </button>
            {pageButtons.map((value) => (
              <button
                key={value}
                onClick={() => setPage(value)}
                className={
                  value === safePage
                    ? "h-9 w-9 bg-primary text-white font-semibold"
                    : "h-9 w-9 text-gray hover:text-primary"
                }
              >
                {value}
              </button>
            ))}
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
          bulkStatusMutation.mutate({
            adminIds: selectedIds,
            isActive: true,
          })
        }
        onTurnOff={() =>
          bulkStatusMutation.mutate({
            adminIds: selectedIds,
            isActive: false,
          })
        }
      />

      <AdminOnBoardDialog
        onOpenChange={setOnBoardDialog}
        open={openOnBoardDialog}
      />

      <EditAdminDialog
        open={openEditDialog}
        onOpenChange={(open) => {
          setOpenEditDialog(open);
          if (!open) {
            setEditingAdmin(null);
          }
        }}
        admin={editingAdmin}
        zones={zoneSelectOptions}
        isSubmitting={updateMutation.isPending}
        onSave={handleSaveEdit}
      />

      {resetRequestData && (
        <AdminResetCredentialsDialog
          open={openResetDialog}
          onOpenChange={(open) => {
            setOpenResetDialog(open);
            if (!open) setResetRequestData(null);
          }}
          data={resetRequestData}
        />
      )}
    </div>
  );
}
