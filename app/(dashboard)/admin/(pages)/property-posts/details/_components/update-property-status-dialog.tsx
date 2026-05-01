"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Info, Check, Calendar, Mail, Phone, Lock } from "lucide-react";
import Dialog from "@/components/dialogs/dialog";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { cn } from "@/utils/classnames.utils";
import { propertyPostManagementService } from "@/service/admin/property/property-post-management.service";
import {
  PropertyPostStatus,
  UpdatePropertyStatusPayload,
} from "@/types/admin/property-post/property.types";
import { getErrorMessage } from "../../_utils/property-posts.utils";

type StatusKey = "active" | "pending" | "sold" | "reject";

function toDialogStatus(status: PropertyPostStatus): StatusKey {
  const normalized = status.toUpperCase();

  if (normalized === "ACTIVE") return "active";
  if (normalized === "SOLD" || normalized === "PARTIAL_SOLD") return "sold";
  if (normalized === "REJECTED") return "reject";

  return "pending";
}

function toBackendStatus(status: StatusKey): PropertyPostStatus {
  if (status === "active") return "ACTIVE";
  if (status === "sold") return "SOLD";
  if (status === "reject") return "REJECTED";

  return "PENDING_ADMIN";
}

export default function UpdatePropertyStatusDialog({
  open,
  onOpenChange,
  postId,
  propertyTitle,
  currentStatus,
  selectedBuyerId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  postId: string;
  propertyTitle: string;
  currentStatus: PropertyPostStatus;
  selectedBuyerId?: string;
}) {
  const router = useRouter();

  const [status, setStatus] = useState<StatusKey>(toDialogStatus(currentStatus));
  const [soldPrice, setSoldPrice] = useState("");
  const [saleDate, setSaleDate] = useState("");

  useEffect(() => {
    if (!open) return;

    setStatus(toDialogStatus(currentStatus));
    setSoldPrice("");
    setSaleDate("");
  }, [open, currentStatus, postId]);

  const statusTabs = useMemo(
    () => [
      { key: "active" as const, label: "Active" },
      { key: "pending" as const, label: "Pending" },
      { key: "sold" as const, label: "Sold" },
      { key: "reject" as const, label: "Reject" },
    ],
    [],
  );

const getPotentialBuyersQuery = useQuery({
  queryKey: ["potential-buyers", postId],
  queryFn: async () => {
    const data =
      await propertyPostManagementService.getPotentialBuyers(postId);

    console.log("Potential buyers response:", data);
    return data;
  },
  enabled: open && !!postId,
});
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

  const handleConfirm = () => {
    const payload: UpdatePropertyStatusPayload = {
      status: toBackendStatus(status),
    };

    if (status === "sold") {
      const parsedSoldPrice = Number(soldPrice);

      if (!Number.isFinite(parsedSoldPrice) || parsedSoldPrice <= 0) {
        toast.error("Please provide a valid sold price.");
        return;
      }

      if (!saleDate) {
        toast.error("Please provide the sale date.");
        return;
      }

      if (selectedBuyerId) {
        payload.buyers = [
          {
            buyerId: selectedBuyerId,
            soldPrice: parsedSoldPrice,
            saleDate: new Date(saleDate).toISOString(),
          },
        ];
      }
    }

    updateStatusMutation.mutate(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="lg">
      <div>
        {/* header */}
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

        {/* body */}
        <div className="px-6 py-6">
          {/* status */}
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
                      {active && t.key === "sold" ? (
                        <span className="inline-flex items-center justify-center gap-2">
                          <span className="grid h-5 w-5 place-items-center rounded-full border border-white/30">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          {t.label}
                        </span>
                      ) : (
                        t.label
                      )}
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

          {/* buyers */}
          <Card className="mt-6 rounded-2xl border border-gray/15 bg-gray/5 p-0">
            <div className="px-5 py-4">
              <p className="text-sm font-semibold text-gray">
                Selected Buyer(s)
              </p>
            </div>

            <div className="px-5 pb-5">
              <div className="rounded-xl border border-gray/15 bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gray/10" />

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-gray">
                          Mr. Abul Hasan
                        </p>
                        <p className="text-xs text-gray">
                          <span className="text-gray">ID:</span> #4421
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray">
                        <span className="inline-flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5" />
                          +88017...12
                        </span>
                        <span className="text-gray/20">•</span>
                        <span className="inline-flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5" />
                          abul.h@example.com
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* small badge */}
                  <div className="grid h-6 w-6 place-items-center rounded-full border border-primary/20 bg-primary/10">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Final Sold Price">
                    <div className="flex h-11 items-center gap-2 rounded-xl border border-gray/15 bg-white px-3">
                      <span className="text-sm font-semibold text-gray">৳</span>
                      <input
                        value={soldPrice}
                        onChange={(event) => setSoldPrice(event.target.value)}
                        className="h-full w-full bg-transparent text-sm text-gray outline-none"
                        placeholder=""
                      />
                    </div>
                  </Field>

                  <Field label="Sale Date">
                    <div className="flex h-11 items-center gap-2 rounded-xl border border-gray/15 bg-white px-3">
                      <Calendar className="h-4 w-4 text-gray" />
                      <input
                        type="date"
                        value={saleDate}
                        onChange={(event) => setSaleDate(event.target.value)}
                        className="h-full w-full bg-transparent text-sm text-gray outline-none"
                        placeholder=""
                      />
                    </div>
                  </Field>
                </div>
              </div>

              {/* add another buyer */}

              <button
                onClick={() => getPotentialBuyersQuery.refetch()}
                disabled={getPotentialBuyersQuery.isFetching}
                type="button"
                className={cn(
                  "mt-4 w-full rounded-xl border-2 border-dashed px-4 py-6 text-center",
                  "border-primary/40 text-sm font-semibold text-primary hover:bg-primary/5",
                )}
              >
                {getPotentialBuyersQuery.isFetching
                  ? "Loading..."
                  : "Add Another Buyer"}
              </button>
            </div>
          </Card>

          {/* history */}
          <div className="mt-6 space-y-3">
            <p className="text-xs font-semibold tracking-wide text-gray">
              APPOINTMENT &amp; VISIT HISTORY OF THE SELECTED BUYER
            </p>

            <Card className="rounded-2xl border border-gray/15 bg-white p-4">
              <TimelineItem
                title="Follow-up Inspection - Completed"
                date="Oct 20"
                done
              />
              <div className="my-3 h-px bg-gray/10" />
              <TimelineItem
                title="First Site Visit - Completed"
                date="Oct 12"
              />
            </Card>
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray/10 bg-gray/5 px-6 py-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-3 py-2 text-sm font-semibold text-gray hover:underline"
            disabled={updateStatusMutation.isPending}
          >
            Cancel
          </button>

          <Button
            onClick={handleConfirm}
            disabled={updateStatusMutation.isPending}
          >
            <span className="inline-flex items-center gap-2">
              <Lock className="h-4 w-4" />
              {updateStatusMutation.isPending
                ? "Updating Status..."
                : "Confirm Sale & Close Post"}
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

function TimelineItem({
  title,
  date,
  done,
}: {
  title: string;
  date: string;
  done?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 grid h-7 w-7 place-items-center rounded-full bg-gray/5">
        {done ? (
          <Check className="h-4 w-4 text-primary" />
        ) : (
          <span className="h-2 w-2 rounded-full bg-gray/30" />
        )}
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray">{title}</p>
        <p className="text-xs text-gray">{date}</p>
      </div>
    </div>
  );
}
