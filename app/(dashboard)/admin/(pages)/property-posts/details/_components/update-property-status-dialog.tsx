"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Info, Lock } from "lucide-react";
import Dialog from "@/components/dialogs/dialog";
import Button from "@/components/buttons/button";
import { cn } from "@/lib/utils";
import { propertyPostManagementService } from "@/service/admin/property/property-post-management.service";
import {
  PropertyPostStatus,
  UpdatePropertyStatusPayload,
} from "@/types/admin/property-post/property.types";
import { getErrorMessage } from "../../_utils/property-posts.utils";

type StatusKey = "ACTIVE" | "PENDING_ADMIN" | "SOLD" | "REJECTED";

function normalizeInitialStatus(status: PropertyPostStatus): StatusKey {
  const normalized = status.toUpperCase();

  if (
    normalized === "ACTIVE" ||
    normalized === "PENDING_ADMIN" ||
    normalized === "SOLD" ||
    normalized === "REJECTED"
  ) {
    return normalized;
  }

  return "PENDING_ADMIN";
}

export default function UpdatePropertyStatusDialog({
  open,
  onOpenChange,
  postId,
  propertyTitle,
  currentStatus,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  postId: string;
  propertyTitle: string;
  currentStatus: PropertyPostStatus;
}) {
  const router = useRouter();

  const [status, setStatus] = useState<StatusKey>(
    normalizeInitialStatus(currentStatus),
  );
  const [buyerId, setBuyerId] = useState("");
  const [soldPrice, setSoldPrice] = useState("");
  const [saleDate, setSaleDate] = useState("");

  useEffect(() => {
    if (!open) return;

    setStatus(normalizeInitialStatus(currentStatus));
    setBuyerId("");
    setSoldPrice("");
    setSaleDate("");
  }, [open, currentStatus, postId]);

  const updateStatusMutation = useMutation({
    mutationFn: (payload: UpdatePropertyStatusPayload) =>
      propertyPostManagementService.updatePropertyStatus(postId, payload),
    onSuccess: async () => {
      toast.success("Property status updated successfully.");
      onOpenChange(false);
      await Promise.resolve(router.refresh());
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const statusTabs = useMemo(
    () => [
      { key: "ACTIVE" as const, label: "Active" },
      { key: "PENDING_ADMIN" as const, label: "Pending" },
      { key: "SOLD" as const, label: "Sold" },
      { key: "REJECTED" as const, label: "Reject" },
    ],
    [],
  );

  const handleConfirm = () => {
    const payload: UpdatePropertyStatusPayload = {
      status,
    };

    if (status === "SOLD") {
      const parsedSoldPrice = Number(soldPrice);

      if (!buyerId.trim()) {
        toast.error("Buyer ID is required for sold status.");
        return;
      }

      if (!Number.isFinite(parsedSoldPrice) || parsedSoldPrice <= 0) {
        toast.error("Valid sold price is required.");
        return;
      }

      if (!saleDate) {
        toast.error("Sale date is required.");
        return;
      }

      payload.buyers = [
        {
          buyerId: buyerId.trim(),
          soldPrice: parsedSoldPrice,
          saleDate: new Date(saleDate).toISOString(),
        },
      ];
    }

    updateStatusMutation.mutate(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="lg">
      <div>
        <div className="flex items-start justify-between gap-4 border-b border-gray/10 pb-4">
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray">
              Update Property Status
            </p>
            <p className="text-xs text-gray">
              Changing status for{" "}
              <span className="font-semibold text-gray">{propertyTitle}</span>{" "}
              <span className="text-primary"> (#{postId})</span>
            </p>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray">Property Status</p>

            <div className="rounded-xl bg-gray/5 p-1">
              <div className="grid grid-cols-4 gap-1">
                {statusTabs.map((t) => {
                  const active = status === t.key;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setStatus(t.key)}
                      className={cn(
                        "h-10 rounded-lg text-sm font-semibold transition",
                        active
                          ? "bg-primary text-white shadow-sm"
                          : "bg-transparent text-gray hover:bg-white",
                      )}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Info className="mt-[2px] h-4 w-4 text-primary" />
              <p className="text-xs text-gray">
                Marking as sold will remove this listing from public search
                results.
              </p>
            </div>
          </div>

          {status === "SOLD" && (
            <div className="mt-6 space-y-4 rounded-2xl border border-gray/15 bg-gray/5 p-5">
              <p className="text-sm font-semibold text-gray">Sold Buyer Information</p>

              <Field label="Buyer ID">
                <input
                  value={buyerId}
                  onChange={(event) => setBuyerId(event.target.value)}
                  className="h-11 w-full rounded-xl border border-gray/15 bg-white px-3 text-sm text-gray outline-none"
                  placeholder="Enter buyer id"
                />
              </Field>

              <Field label="Final Sold Price">
                <input
                  type="number"
                  value={soldPrice}
                  onChange={(event) => setSoldPrice(event.target.value)}
                  className="h-11 w-full rounded-xl border border-gray/15 bg-white px-3 text-sm text-gray outline-none"
                  placeholder="Enter sold price"
                />
              </Field>

              <Field label="Sale Date">
                <input
                  type="date"
                  value={saleDate}
                  onChange={(event) => setSaleDate(event.target.value)}
                  className="h-11 w-full rounded-xl border border-gray/15 bg-white px-3 text-sm text-gray outline-none"
                />
              </Field>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray/10 bg-gray/5 px-6 py-4">
          <button
            type="button"
            disabled={updateStatusMutation.isPending}
            onClick={() => onOpenChange(false)}
            className="px-3 py-2 text-sm font-semibold text-gray hover:underline"
          >
            Cancel
          </button>

          <Button disabled={updateStatusMutation.isPending} onClick={handleConfirm}>
            <span className="inline-flex items-center gap-2">
              <Lock className="h-4 w-4" />
              {updateStatusMutation.isPending
                ? "Updating Status..."
                : "Confirm Status Update"}
            </span>
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

/* ---------------- parts ---------------- */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-gray">{label}</p>
      {children}
    </div>
  );
}
