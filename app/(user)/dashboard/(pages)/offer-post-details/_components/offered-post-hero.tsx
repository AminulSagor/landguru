"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { OfferPostCard } from "@/app/(user)/dashboard/types/offer-post";

type Props = {
  property: OfferPostCard;
};

const OfferedPostHero = ({ property }: Props) => {
  const isAccepted = property.status === "BUYER_ACCEPTED_OFFER";
  return (
    <div className="space-y-4">
      {/* Back (like ss) */}
      <Link
        href={"/dashboard/properties"}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray/60 hover:text-gray"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      {/* Hero row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="min-w-0">
          <h1 className="truncate text-3xl font-extrabold text-gray">
            {property.title}
          </h1>
          <p className="mt-1 text-sm font-semibold text-gray/50">
            #{property.id}
          </p>
        </div>

        {/* Right pills (exact like ss) */}
        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          <HeroStatusPill label="Flat" variant="primary" />
          <HeroStatusPill label="Offer Post" variant="primary-soft" />
          <HeroStatusPill
            label={property.statusLabel}
            variant={`${isAccepted ? "danger-solid" : "gray"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default OfferedPostHero;

/* ======================
   Hero Status Pills
====================== */

function HeroStatusPill({
  label,
  variant,
}: {
  label: string;
  variant:
    | "primary"
    | "primary-soft"
    | "green"
    | "danger"
    | "danger-solid"
    | "secondary"
    | "gray";
}) {
  // Flat (solid blue)
  if (variant === "primary") {
    return (
      <span className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-white">
        {label}
      </span>
    );
  }

  // Offer Post (soft blue)
  if (variant === "primary-soft") {
    return (
      <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-bold text-primary">
        {label}
      </span>
    );
  }

  // Buyer accepted your offer (solid red like ss)
  if (variant === "danger-solid") {
    return (
      <span className="rounded-full bg-[#ef4444] px-4 py-2 text-xs font-bold text-white">
        {label}
      </span>
    );
  }

  // green (soft)
  if (variant === "green") {
    return (
      <span className="rounded-full bg-green/10 px-4 py-2 text-xs font-bold text-green">
        {label}
      </span>
    );
  }

  // danger (soft)
  if (variant === "danger") {
    return (
      <span className="rounded-full bg-[#ffe9ea] px-4 py-2 text-xs font-bold text-[#d13b3b]">
        {label}
      </span>
    );
  }

  // default gray/secondary
  return (
    <span className="rounded-full border border-gray/25 bg-gray/20 px-4 py-2 text-xs font-bold text-gray/50">
      {label}
    </span>
  );
}
