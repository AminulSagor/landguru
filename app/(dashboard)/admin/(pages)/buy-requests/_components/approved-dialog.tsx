"use client";

import React, { useMemo, useState } from "react";
import Dialog from "@/components/dialogs/dialog";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { cn } from "@/lib/utils";
import { demoBuyRequests } from "@/app/(dashboard)/admin/dummy-data/buy-request.data";
import {
  MapPin,
  Home,
  Ruler,
  Wallet,
  BadgeCheck,
  Phone,
  Check,
} from "lucide-react";
import { BuyRequestTagIconKey } from "@/app/(dashboard)/admin/types/buy-request.types";

type BuyRequestTag = {
  icon: BuyRequestTagIconKey;
  label: string;
  strong?: string;
};

type BuyRequestUser = {
  avatarUrl: string;
  name: string;
  phone: string;
  verified: boolean;
};

type BuyRequestItem = {
  id: string;
  title: string;
  statusLabel: string;
  createdAgo: string;
  description: string;
  locationLine: string;
  tags: BuyRequestTag[];
  user: BuyRequestUser;
};

type Props = {
  openDialog: boolean;
  handleOpenDialog: (v: boolean) => void;
  postId: string | null;
};

/** ✅ matches SS: small icon, no colored square */
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

/** ✅ matches SS tiles (icon top-left, label small, value bold) */
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
        <p className="text-[11px] font-semibold tracking-wide text-gray uppercase">
          {label}
        </p>
      </div>

      <p className="mt-2 text-sm font-semibold text-primary">{value}</p>
    </div>
  );
}

/** ✅ SS pill is small + subtle */
function VerifiedPill({ on }: { on: boolean }) {
  if (!on) return null;
  return (
    <span className="inline-flex items-center rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-[11px] font-semibold text-primary">
      VERIFIED
    </span>
  );
}

/** ✅ matches SS: full-width green rows */
function QuickVerification({
  items,
}: {
  items: { icon: React.ReactNode; label: string; ok: boolean }[];
}) {
  return (
    <Card className="border border-gray/15 bg-white p-4">
      <p className="text-xs font-semibold tracking-wide text-gray uppercase">
        QUICK VERIFICATION
      </p>

      <div className="mt-3 space-y-2">
        {items.map((it, idx) => (
          <div
            key={idx}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-3 py-3",
              it.ok
                ? "border-green/20 bg-green/5"
                : "border-gray/15 bg-secondary",
            )}
          >
            <div
              className={cn(
                "grid h-8 w-8 place-items-center rounded-full",
                it.ok ? "bg-green/10 text-green" : "bg-white text-gray",
              )}
            >
              {it.ok ? <Check className="h-5 w-5" /> : it.icon}
            </div>

            <p
              className={cn(
                "text-sm font-semibold",
                it.ok ? "text-green" : "text-primary",
              )}
            >
              {it.label}
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
  onChange: (v: string) => void;
}) {
  return (
    <Card className="border border-gray/15 bg-white p-4">
      <p className="text-sm font-semibold text-primary">Reason for Action</p>

      <div className="mt-3">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
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

/** ✅ closer to SS map block */
function MapPlaceholder({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-gray/15 bg-secondary p-3">
      <div className="relative h-[170px] w-full overflow-hidden rounded-xl bg-secondary">
        {/* pin */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-sm">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
              <MapPin className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* label */}
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
}: Props) {
  const post = useMemo(
    () =>
      demoBuyRequests.find((p) => p.id === postId) as
        | BuyRequestItem
        | undefined,
    [postId],
  );

  const [reason, setReason] = useState("");

  if (!post) {
    return (
      <Dialog open={openDialog} onOpenChange={handleOpenDialog} size="xl">
        <div className="p-6">
          <p className="text-sm text-gray">No post selected.</p>
        </div>
      </Dialog>
    );
  }

  // ✅ static (not in your post data)
  const quickVerification = [
    {
      icon: <BadgeCheck className="h-5 w-5" />,
      label: "NID Verified",
      ok: true,
    },
    { icon: <Phone className="h-5 w-5" />, label: "Phone Verified", ok: true },
  ];

  const typeTag = post.tags.find((t) => t.icon === "home");
  const sizeTag = post.tags.find((t) => t.label.toLowerCase().includes("sqft"));
  const budgetTag = post.tags.find((t) => t.icon === "wallet");

  // road range (your data uses ruler icon again)
  const roadTag = post.tags.find((t) => t !== sizeTag && t.icon === "ruler");

  const mapLabel = (post.locationLine.split(",")[0] || "Location").trim();

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenDialog} size="xl">
      <div className="w-full">
        {/* Header (match SS: title + subtitle left, close X right) */}
        <div className="flex items-start justify-between gap-4 border-b border-gray/15 px-6 py-5">
          <div className="min-w-0">
            <p className="text-base font-semibold">
              Review Buy Request {post.id}
            </p>

            <div className="mt-1 flex items-center gap-2">
              <p className="text-sm text-gray">
                Posted by{" "}
                <span className="font-semibold">{post.user.name}</span>
              </p>
              <VerifiedPill on={post.user.verified} />
            </div>
          </div>
        </div>

        {/* Body (match SS: vertical divider) */}
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1.65fr_1px_1fr]">
          {/* Left */}
          <div className="px-6 py-6">
            <div className="min-w-0">
              <p className="text-xl font-semibold">{post.title}</p>

              <div className="mt-2 flex items-center gap-2 text-sm text-gray">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{post.locationLine}</span>
              </div>
            </div>

            {/* tiles (match SS spacing) */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoTile
                icon="home"
                label="TYPE"
                value={typeTag?.label ?? "Flat / Apt"}
              />
              <InfoTile
                icon="ruler"
                label="SIZE"
                value={sizeTag?.label ?? "Min 1,200 sqft"}
              />
              <InfoTile
                icon="ruler"
                label="ROAD"
                value={roadTag?.label ?? "200m-750m"}
              />
              <InfoTile
                icon="wallet"
                label="BUDGET"
                value={budgetTag?.strong ?? budgetTag?.label ?? "৳ 30L - 40L"}
                highlight
              />
            </div>

            {/* Description (match SS: title uppercase, box) */}
            <div className="mt-5 rounded-xl border border-gray/15 bg-white p-4">
              <p className="text-xs font-semibold tracking-wide text-gray uppercase">
                DESCRIPTION
              </p>
              <p className="mt-2 text-sm leading-6">{post.description}</p>
            </div>

            {/* Map */}
            <div className="mt-5">
              <MapPlaceholder label={mapLabel} />
            </div>
          </div>

          {/* Divider */}
          <div className="hidden bg-gray/15 lg:block" />

          {/* Right */}
          <div className="px-6 py-6">
            <div className="space-y-4">
              <QuickVerification items={quickVerification} />
              <ReasonBox value={reason} onChange={setReason} />
            </div>
          </div>
        </div>

        {/* Footer (match SS) */}
        <div className="flex items-center justify-between border-t border-gray/15 px-6 py-5">
          <button
            type="button"
            onClick={() => handleOpenDialog(false)}
            className="text-sm font-semibold text-gray hover:text-primary"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              className="border border-red-400 bg-white text-red-400 hover:bg-secondary"
            >
              Reject Post
            </Button>
            <Button>Approve &amp; Publish</Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
