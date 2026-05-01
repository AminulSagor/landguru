"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import type { DealItem } from "@/app/(dashboard)/user/types/deals";
import { formatDisplayId } from "@/utils/id.utils";

type Props = {
  property: DealItem;
};

export default function MyDealsHeader({ property }: Props) {
  return (
    <div className="space-y-4">
      {/* Back */}
      <Link
        href="/user/my-deals"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray/60 hover:text-gray transition"
      >
        <ArrowLeft size={16} />
        Back to Listings
      </Link>

      {/* Title row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="min-w-0">
          <h1 className="text-3xl font-extrabold text-gray truncate">
            {property.title}
          </h1>
          <p className="mt-1 text-sm font-semibold text-gray/50">
            {formatDisplayId("POST", property.postId || property.id)}
          </p>
        </div>

        {/* Right pills (exact order like SS) */}
        <div className="flex flex-wrap items-center justify-start lg:justify-end gap-3">
          <HeroPill label="Flat" variant="flat" />
          <HeroPill label="Sell Post" variant="sell" />
          <HeroPill label="Sold" variant="sold" />
          <HeroPill label="Unlocked" variant="unlocked" />
        </div>
      </div>
    </div>
  );
}

/* ======================
   Pills (match SS)
====================== */

function HeroPill({
  label,
  variant,
}: {
  label: string;
  variant: "flat" | "sell" | "sold" | "unlocked";
}) {
  // Flat (soft blue)
  if (variant === "flat") {
    return (
      <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-xs font-extrabold text-primary">
        {label}
      </span>
    );
  }

  // Sell Post (soft blue like SS, same as Flat)
  if (variant === "sell") {
    return (
      <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-xs font-extrabold text-primary">
        {label}
      </span>
    );
  }

  // Sold (green with check icon)
  if (variant === "sold") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-green/15 px-4 py-2 text-xs font-extrabold text-green">
        <CheckCircle2 size={16} className="text-green" />
        {label}
      </span>
    );
  }

  // Unlocked (green, lock icon, slightly stronger fill)
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-green/15 px-4 py-2 text-xs font-extrabold text-green">
      <Lock size={16} className="text-green" />
      {label}
    </span>
  );
}
