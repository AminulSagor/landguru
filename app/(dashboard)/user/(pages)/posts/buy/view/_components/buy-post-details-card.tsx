"use client";

import React from "react";
import {
  MoreHorizontal,
  MapPin,
  Home,
  Ruler,
  TriangleRight,
  Route,
  Wallet,
} from "lucide-react";
import Card from "@/components/cards/card";
import type { BuyPostDetails } from "@/app/(dashboard)/user/dummy-data/buy-post-data";

export default function BuyPostRequestDetailsCard({
  data,
}: {
  data: BuyPostDetails;
}) {
  return (
    <Card className="rounded-2xl border border-gray/15 bg-white p-6">
      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold text-gray">{data.title}</h3>
          <p className="mt-1 text-sm font-semibold text-gray/50">
            #{data.id} <span className="mx-2 text-gray/20">•</span> Posted:{" "}
            {data.postedText}
          </p>
        </div>

        <button
          className="grid h-9 w-9 place-items-center rounded-xl border border-gray/15 bg-white hover:bg-secondary"
          aria-label="More"
        >
          <MoreHorizontal size={18} className="text-gray/60" />
        </button>
      </div>

      <div className="my-5 h-px w-full bg-gray/10" />

      {/* rows */}
      <div className="space-y-5">
        <InfoRow
          icon={<MapPin className="h-5 w-5 text-primary" />}
          label="PREFERRED LOCATION"
          value={data.preferredLocation}
        />

        <InfoRow
          icon={<Home className="h-5 w-5 text-primary" />}
          label="PROPERTY TYPE"
          value={data.propertyType}
        />

        <InfoRow
          icon={<Ruler className="h-5 w-5 text-primary" />}
          label="REQUIRED LAND SIZE"
          value={data.requiredLandSize}
          rightAction="Change Metrics"
        />

        <InfoRow
          icon={<TriangleRight className="h-5 w-5 text-primary" />}
          label="REQUIRED PLOT SIZE"
          value={data.requiredPlotSize}
          rightAction="Change Metrics"
        />

        <InfoRow
          icon={<Route className="h-5 w-5 text-primary" />}
          label="DISTANCE FROM ROAD"
          value={data.distanceFromRoad}
        />

        <InfoRow
          icon={<Wallet className="h-5 w-5 text-primary" />}
          label="BUDGET RANGE"
          value={data.budgetRange}
          valueClassName="text-base"
        />
      </div>

      <div className="my-6 h-px w-full bg-gray/10" />

      {/* description */}
      <div>
        <p className="text-sm font-extrabold text-gray">Description</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-gray/60">
          {data.description || "—"}
        </p>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-wide text-gray/40">
            Status
          </p>
          <span className="mt-2 inline-flex rounded-full bg-green/10 px-3 py-1 text-xs font-extrabold text-green">
            {toStatusLabel(data.status)}
          </span>
        </div>

        <div className="text-right">
          <p className="text-[11px] font-extrabold uppercase tracking-wide text-gray/40">
            Total Offers
          </p>
          <p className="mt-2 text-sm font-extrabold text-gray">
            {data.totalOffers} Received
          </p>
        </div>
      </div>
    </Card>
  );
}

/* =========================
   Row
========================= */

function InfoRow({
  icon,
  label,
  value,
  rightAction,
  valueClassName,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  rightAction?: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      {/* icon (no circle like screenshot) */}
      <div className="mt-0.5 w-6 shrink-0">{icon}</div>

      <div className="flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-extrabold uppercase tracking-wide text-gray/40">
            {label}
          </p>

          {rightAction ? (
            <button className="text-xs font-extrabold text-primary hover:opacity-80">
              {rightAction}
            </button>
          ) : null}
        </div>

        <p
          className={[
            "mt-1 text-sm font-extrabold text-gray",
            valueClassName || "",
          ].join(" ")}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================
   utils
========================= */

function toStatusLabel(s: string) {
  const v = String(s || "")
    .trim()
    .toLowerCase();
  if (v === "pending_admin_review") return "Pending";
  if (v === "draft") return "Draft";
  return "Active";
}
