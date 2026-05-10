"use client";

import React from "react";
import { PropertyRequest } from "@/app/(dashboard)/user/types/property-request";
import Button from "@/components/buttons/button";
import Card from "@/components/cards/card";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  ChevronRight,
  Home,
  MapPin,
  Route,
  Ruler,
  Square,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function PropertyRequestCard({
  item,
}: {
  item: PropertyRequest;
}) {
  const router = useRouter();
  const budgetText = `৳ ${item.budgetMin.toLocaleString()} - ৳ ${item.budgetMax.toLocaleString()}`;
  const href = `/user/properties/request/details/${item.id}`;

  const handleNavigate = () => {
    router.push(href);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleNavigate();
        }
      }}
      className="outline-none"
    >
      <Card
        className={cn(
          "rounded-2xl border bg-secondary",
          "px-6 py-5 md:px-7 md:py-6",
          "shadow-sm transition hover:shadow-md cursor-pointer",
        )}
      >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-xl font-semibold leading-tight text-gray">
            {item.title}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-gray">{item.postedBy}</span>
            <Dot />
            <span className="text-gray/70">Posted: {item.postedAgo}</span>
            <Dot />
            <p
              className={cn(
                "rounded-full border bg-secondary px-2.5 py-0.5",
                "text-gray/70",
              )}
            >
              #{item.code}
            </p>
          </div>
        </div>

        <span
          className={cn(
            "mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full",
            "text-gray/60",
          )}
        >
          <ChevronRight size={18} />
        </span>
      </div>

      {/* Info grid (like screenshot) */}
      <div className="mt-6 grid gap-x-10 gap-y-5 md:grid-cols-2">
        <InfoRow
          icon={<MapPin className="h-5 w-5" />}
          label="Preferred Location"
          value={item.location}
        />
        <InfoRow
          icon={<Home className="h-5 w-5" />}
          label="Property Type"
          value={item.propertyType}
        />
        <InfoRow
          icon={<Ruler className="h-5 w-5" />}
          label="Required Land Size"
          value={item.requiredLandSize}
        />
        <InfoRow
          icon={<Square className="h-5 w-5" />}
          label="Required Plot Size"
          value={item.requiredPlotSize}
        />
        <InfoRow
          icon={<Route className="h-5 w-5" />}
          label="Distance from Road"
          value={item.distanceFromRoad}
        />
        <InfoRow
          icon={<Wallet className="h-5 w-5" />}
          label="Budget Range"
          value={budgetText}
        />
      </div>

      {/* CTA */}
        <div className="mt-6">
          <Button className="w-full" onClick={handleNavigate}>
            <CheckCircle2 className="mr-2 h-5 w-5" />I have this property
          </Button>
        </div>
      </Card>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      {/* icon circle like screenshot */}
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full",
          "bg-primary/10 text-primary",
        )}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-gray/70">{label}</p>
        <p className="mt-0.5 line-clamp-2 text-sm font-semibold text-gray">
          {value}
        </p>
      </div>
    </div>
  );
}

function Dot() {
  return <span className="text-gray/40">•</span>;
}
