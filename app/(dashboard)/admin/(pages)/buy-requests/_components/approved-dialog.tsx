"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Dialog from "@/components/dialogs/dialog";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Home,
  Ruler,
  Wallet,
  BadgeCheck,
  Phone,
  Check,
} from "lucide-react";
import { buyRequestDetailService } from "@/service/admin/buy-requests/buy-request-detail.service";
import { buyRequestApproveService } from "@/service/admin/buy-requests/buy-request-approve.service";
import { buyRequestRejectService } from "@/service/admin/buy-requests/buy-request-reject.service";
import type {
  BuyRequestDetailData,
  BuyRequestDialogFallbackData,
} from "@/types/admin/buy-requests/buy-request-detail.types";
import type { BuyRequestTagIconKey } from "@/types/admin/buy-requests/buy-requests-list.types";

type BuyRequestActionType = "approve" | "reject";

type Props = {
  openDialog: boolean;
  handleOpenDialog: (value: boolean) => void;
  postId: string | null;
  selectedRequest?: BuyRequestDialogFallbackData | null;
  actionType?: BuyRequestActionType;
  onActionSuccess?: () => void;
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

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Action failed. Please try again.";
}

function SmallTagIcon({
  icon,
  active,
}: {
  icon: BuyRequestTagIconKey;
  active?: boolean;
}) {
  const Icon = icon === "home" ? Home : icon === "wallet" ? Wallet : Ruler;

  return (
    <span
      className={cn(
        "inline-flex items-center",
        active ? "text-primary" : "text-gray",
      )}
    >
      <Icon className="h-4 w-4" />
    </span>
  );
}

function InfoTile({
  icon,
  label,
  value,
  highlight,
}: {
  icon: BuyRequestTagIconKey;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        highlight
          ? "border-primary/20 bg-primary/5"
          : "border-gray/15 bg-white",
      )}
    >
      <div className="flex items-center gap-2">
        <SmallTagIcon icon={icon} active={highlight} />
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray">
          {label}
        </p>
      </div>

      <p className="mt-2 text-sm font-semibold text-primary">{value}</p>
    </div>
  );
}

function VerifiedPill({ on }: { on: boolean }) {
  if (!on) {
    return null;
  }

  return (
    <span className="inline-flex items-center rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-[11px] font-semibold text-primary">
      VERIFIED
    </span>
  );
}

function QuickVerification({
  items,
}: {
  items: { icon: React.ReactNode; label: string; ok: boolean }[];
}) {
  return (
    <Card className="border border-gray/15 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray">
        QUICK VERIFICATION
      </p>

      <div className="mt-3 space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-3 py-3",
              item.ok
                ? "border-green/20 bg-green/5"
                : "border-gray/15 bg-secondary",
            )}
          >
            <div
              className={cn(
                "grid h-8 w-8 place-items-center rounded-full",
                item.ok ? "bg-green/10 text-green" : "bg-white text-gray",
              )}
            >
              {item.ok ? <Check className="h-5 w-5" /> : item.icon}
            </div>

            <p
              className={cn(
                "text-sm font-semibold",
                item.ok ? "text-green" : "text-primary",
              )}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ReasonBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Card className="border border-gray/15 bg-white p-4">
      <p className="text-sm font-semibold text-primary">Reason for Action</p>

      <div className="mt-3">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Write your reason"
          className={cn(
            "min-h-[360px] w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-primary outline-none",
            "border-gray/15 focus:border-primary/30",
          )}
        />
      </div>
    </Card>
  );
}

function MapPlaceholder({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-gray/15 bg-secondary p-3">
      <div className="relative h-[170px] w-full overflow-hidden rounded-xl bg-secondary">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-sm">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
              <MapPin className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 right-3 rounded-md border border-gray/15 bg-white px-2 py-1 text-[11px] font-semibold text-primary">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function ApprovedDialog({
  openDialog,
  handleOpenDialog,
  postId,
  selectedRequest,
  actionType = "approve",
  onActionSuccess,
}: Props) {
  const [reason, setReason] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (openDialog) {
      setReason("");
    }
  }, [openDialog, postId, actionType]);

  const detailQuery = useQuery({
    queryKey: ["admin-buy-request-detail", postId],
    queryFn: () => buyRequestDetailService.getBuyRequestDetail(postId as string),
    enabled: openDialog && Boolean(postId),
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => buyRequestApproveService.approveBuyRequest(id),
    onSuccess: async () => {
      toast.success("Buy post approved successfully.");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-buy-requests"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-buy-request-detail", postId] }),
      ]);
      handleOpenDialog(false);
      onActionSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, rejectionReason }: { id: string; rejectionReason: string }) =>
      buyRequestRejectService.rejectBuyRequest(id, { rejectionReason }),
    onSuccess: async () => {
      toast.success("Buy post rejected successfully.");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-buy-requests"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-buy-request-detail", postId] }),
      ]);
      handleOpenDialog(false);
      onActionSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const post = useMemo(() => {
    if (detailQuery.data) {
      return detailQuery.data;
    }

    if (!selectedRequest) {
      return null;
    }

    const fallback: BuyRequestDetailData = {
      id: selectedRequest.id,
      title: selectedRequest.title,
      status: "PENDING_ADMIN",
      statusLabel: selectedRequest.statusLabel,
      description: selectedRequest.description,
      locationLine: selectedRequest.locationLine,
      tags: selectedRequest.tags,
      user: {
        id: "",
        avatarUrl: selectedRequest.user.avatarUrl,
        name: selectedRequest.user.name,
        phone: selectedRequest.user.phone,
        verified: selectedRequest.user.verified,
        nidVerified: false,
      },
      rejectionReason: null,
      addressObject: null,
    };

    return fallback;
  }, [detailQuery.data, selectedRequest]);

  const isSubmitting = approveMutation.isPending || rejectMutation.isPending;

  const handleApprove = () => {
    if (!postId) {
      toast.error("Buy post is missing.");
      return;
    }

    approveMutation.mutate(postId);
  };

  const handleReject = () => {
    if (!postId) {
      toast.error("Buy post is missing.");
      return;
    }

    const trimmedReason = reason.trim();

    if (!trimmedReason) {
      toast.error("Please provide a reason for rejection.");
      return;
    }

    rejectMutation.mutate({ id: postId, rejectionReason: trimmedReason });
  };

  if (!post) {
    return (
      <Dialog open={openDialog} onOpenChange={handleOpenDialog} size="xl">
        <div className="p-6">
          <p className="text-sm text-gray">No post selected.</p>
        </div>
      </Dialog>
    );
  }

  const quickVerification = [
    {
      icon: <BadgeCheck className="h-5 w-5" />,
      label: "NID Verified",
      ok: post.user.nidVerified,
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone Verified",
      ok: post.user.verified,
    },
  ];

  const typeTag = post.tags.find((tag) => tag.icon === "home");
  const priceTag = post.tags.find((tag) => tag.icon === "wallet");
  const rulerTags = post.tags.filter((tag) => tag.icon === "ruler");
  const roadTag = rulerTags[0];
  const sizeTag = rulerTags[1];
  const mapLabel = (post.locationLine.split(",")[0] || "Location").trim();

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenDialog} size="xl">
      <div className="w-full">
        <div className="flex items-start justify-between gap-4 border-b border-gray/15 px-6 py-5">
          <div className="min-w-0">
            <p className="text-base font-semibold">Review Buy Request {post.id}</p>

            <div className="mt-1 flex items-center gap-2">
              <p className="text-sm text-gray">
                Posted by <span className="font-semibold">{post.user.name}</span>
              </p>
              <VerifiedPill on={post.user.verified} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1.65fr_1px_1fr]">
          <div className="px-6 py-6">
            {detailQuery.isLoading && !detailQuery.data ? (
              <p className="mb-4 text-sm text-gray">Loading request details...</p>
            ) : null}

            <div className="min-w-0">
              <p className="text-xl font-semibold">{post.title}</p>

              <div className="mt-2 flex items-center gap-2 text-sm text-gray">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{post.locationLine}</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoTile icon="home" label="TYPE" value={typeTag?.label ?? "-"} />
              <InfoTile icon="ruler" label="SIZE" value={sizeTag?.label ?? "-"} />
              <InfoTile icon="ruler" label="ROAD" value={roadTag?.label ?? "-"} />
              <InfoTile
                icon="wallet"
                label="BUDGET"
                value={priceTag?.strong ?? priceTag?.label ?? "-"}
                highlight
              />
            </div>

            <div className="mt-5 rounded-xl border border-gray/15 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray">
                DESCRIPTION
              </p>
              <p className="mt-2 text-sm leading-6">{post.description}</p>
            </div>

            <div className="mt-5">
              <MapPlaceholder label={mapLabel} />
            </div>
          </div>

          <div className="hidden bg-gray/15 lg:block" />

          <div className="px-6 py-6">
            <div className="space-y-4">
              <QuickVerification items={quickVerification} />
              <ReasonBox value={reason} onChange={setReason} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray/15 px-6 py-5">
          <button
            type="button"
            onClick={() => handleOpenDialog(false)}
            className="text-sm font-semibold text-gray hover:text-primary"
            disabled={isSubmitting}
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <Button
              variant={actionType === "reject" ? undefined : "secondary"}
              className={cn(
                actionType === "reject"
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "border border-red-400 bg-white text-red-400 hover:bg-secondary",
              )}
              onClick={handleReject}
              disabled={isSubmitting}
            >
              {rejectMutation.isPending ? "Rejecting..." : "Reject Post"}
            </Button>
            <Button
              variant={actionType === "approve" ? undefined : "secondary"}
              className={cn(
                actionType !== "approve" && "border border-primary/20 bg-white text-primary",
              )}
              onClick={handleApprove}
              disabled={isSubmitting}
            >
              {approveMutation.isPending ? "Approving..." : "Approve & Publish"}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
