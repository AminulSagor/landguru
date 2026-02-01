"use client";

import React from "react";
import { ArrowLeft, Trash } from "lucide-react";
import { ListingCard } from "@/app/(user)/dashboard/types/my-property-list";
import Button from "@/components/buttons/button";
import Link from "next/link";

type Props = {
  property: ListingCard;
  isDraft: boolean;
};

const MyPropertyHero = ({ property, isDraft }: Props) => {
  return (
    <div className="space-y-3">
      {/* Back */}
      <Link href={'/dashboard/properties'} className="flex items-center gap-2 text-sm font-semibold text-gray/60 hover:text-gray">
        <ArrowLeft size={16} />
        Back to My Posts
      </Link>

      {/* Hero Row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div>
          <h1 className="text-2xl font-extrabold text-gray">
            {property.title}
          </h1>
          <p className="mt-1 text-sm text-gray/50">#{property.id}</p>
        </div>

        {/* Right Status Pills */}
        <div className="flex flex-wrap items-center gap-3">
          {/* from data */}
          {property.tags?.map((t, i) => (
            <HeroStatusPill
              key={`${t.label}-${i}`}
              label={t.label}
              variant={t.variant}
            />
          ))}

          {/* always show Sell Post like screenshot */}
          <HeroStatusPill label="Sell Post" variant="primary-soft" />

          {isDraft && (
            <div className="flex items-center gap-3">
              <Button>Edit</Button>

              <span className="text-red-500">
                <Trash size={20} />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPropertyHero;

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
    | "secondary"
    | "gray"
    | "green"
    | "danger"
    | "primary-soft";
}) {
  // FLAT
  if (variant === "primary") {
    return (
      <span className="rounded-full bg-primary px-4 py-2 text-xs text-white">
        {label}
      </span>
    );
  }

  // Sell Post (light blue)
  if (variant === "primary-soft") {
    return (
      <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
        {label}
      </span>
    );
  }

  // ACTIVE / VERIFIED
  if (variant === "green") {
    return (
      <span className="rounded-full bg-green/10 px-4 py-2 text-xs font-semibold text-green">
        {label}
      </span>
    );
  }

  // QUOTED (red from ss)
  if (variant === "danger") {
    return (
      <span className="rounded-full bg-[#ffe9ea] px-4 py-2 text-xs font-semibold text-[#d13b3b]">
        {label}
      </span>
    );
  }

  // PENDING REVIEW / DRAFT (gray disabled style)
  return (
    <span className="rounded-full border border-gray/25 bg-secondary px-4 py-2 text-xs font-semibold text-gray/50">
      {label}
    </span>
  );
}
