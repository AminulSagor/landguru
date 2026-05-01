"use client";

import React from "react";
import Button from "@/components/buttons/button";
import { Pencil, RotateCcw, Ban, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { adminDeleteService } from "@/service/admin/admin-list/admin-delete.service";
import { adminStatusService } from "@/service/admin/admin-list/admin-status.service";

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

export default function AdminDetailsHeader({
  breadcrumbName,
  adminId,
  adminEmail,
  adminPhone,
  adminZone,
  adminAvatarUrl,
}: {
  breadcrumbName: string;
  adminId?: string;
  adminEmail: string;
  adminPhone: string;
  adminZone: string;
  adminAvatarUrl: string;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminDeleteService.deleteAdmin(id),
    onSuccess: (res) => {
      toast.success(res?.message ?? "Admin deleted.");
      queryClient.invalidateQueries({ queryKey: ["admin-list"] });
      queryClient.invalidateQueries({ queryKey: ["admin-summary-metrics"] });
      router.push("/admin/roles/admin");
    },
    onError: (err: unknown) => {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error(
        (err as any)?.response?.data?.message ?? "Failed to delete admin.",
      );
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      adminStatusService.updateAdminStatus(id, { isActive }),
    onSuccess: (res) => {
      toast.success(res?.message ?? "Admin status updated.");
      queryClient.invalidateQueries({ queryKey: ["admin-list"] });
      queryClient.invalidateQueries({ queryKey: ["admin-summary-metrics"] });
      router.refresh();
    },
    onError: (err: unknown) => {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error(
        (err as any)?.response?.data?.message ?? "Failed to update status.",
      );
    },
  });

  function handleDelete() {
    if (!adminId) return toast.error("Missing admin id.");
    showConfirmToast({
      title: "Delete this admin profile?",
      description: "This action cannot be undone.",
      confirmLabel: "Delete",
      onConfirm: () => deleteMutation.mutate(adminId),
    });
  }

  function handleSuspend() {
    if (!adminId) return toast.error("Missing admin id.");
    showConfirmToast({
      title: "Suspend this admin account?",
      description: "This will cascade to supervised agents.",
      confirmLabel: "Suspend",
      onConfirm: () => statusMutation.mutate({ id: adminId, isActive: false }),
    });
  }

  function handleResetPassword() {
    if (!adminId) return toast.error("Missing admin id.");

    const params = new URLSearchParams({
      adminId,
      name: breadcrumbName,
      email: adminEmail ?? "",
      phone: adminPhone ?? "",
      zone: adminZone ?? "",
      avatar: adminAvatarUrl ?? "",
    });

    router.push(`/admin/reset-requests/admin?${params.toString()}`);
  }
  return (
    <div className="flex flex-col gap-2 md:flex-row  md:items-center justify-between">
      <div className="text-sm font-medium text-gray">
        <span className="text-primary">Admins</span>
        <span className="mx-2">/</span>
        <span className="text-primary">{breadcrumbName}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <button
          className="text-[#EF4444] hover:opacity-90"
          aria-label="Delete"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          <Trash2 className="h-4 w-4" />
        </button>

        <Button
          variant="primary"
          size="base"
          onClick={() => router.push(`/admin/roles/admin/${adminId}/edit`)}
        >
          <Pencil className="h-4 w-4" />
          Edit Profile
        </Button>

        {/* <Button variant="secondary" size="base">
          <RotateCcw className="h-4 w-4" />
          Reset Password
        </Button> */}
        <Button variant="secondary" size="base" onClick={handleResetPassword}>
          <RotateCcw className="h-4 w-4" />
          Reset Password
        </Button>

        <Button
          variant="primary"
          size="base"
          className="bg-[#EF4444] hover:bg-[#d83b3b] text-white"
          onClick={handleSuspend}
          disabled={statusMutation.isPending}
        >
          <Ban className="h-4 w-4" />
          Suspend Account
        </Button>
      </div>
    </div>
  );
}
