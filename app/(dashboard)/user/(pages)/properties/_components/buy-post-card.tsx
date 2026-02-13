// components/buy-posts/BuyPostList.tsx
"use client";

import React from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import {
  ChevronRight,
  Home,
  MapPin,
  Pencil,
  Route,
  Ruler,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import {
  BuyPost,
  BuyPostStatus,
} from "@/app/(dashboard)/user/dummy-data/buy-post-data";
import Link from "next/link";

function StatusText({ status }: { status: BuyPostStatus }) {
  if (status === "active") {
    return <span className="text-sm font-semibold text-green">Active</span>;
  }
  if (status === "pending_admin_review") {
    return (
      <span className="text-sm font-semibold text-gray">
        Pending Admin Review
      </span>
    );
  }
  return <span className="text-sm font-semibold text-gray">Draft</span>;
}

function Pill({
  children,
  tone = "gray",
}: {
  children: React.ReactNode;
  tone?: "gray" | "red" | "green";
}) {
  const cls =
    tone === "red"
      ? "bg-red-500 text-white"
      : tone === "green"
        ? "bg-green-50 text-green border border-green/20"
        : "bg-gray/5 text-gray border border-gray/15";

  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-bold ${cls}`}
    >
      {children}
    </span>
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
    <div className="flex gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray/70">{label}</p>
        <p className="mt-0.5 text-sm font-extrabold text-gray">{value}</p>
      </div>
    </div>
  );
}

function accentClass(accent?: BuyPost["accent"]) {
  if (accent === "red") return "before:bg-red-500";
  if (accent === "green") return "before:bg-green";
  return "before:bg-transparent";
}

export default function BuyPostCard({
  item,
  onOpen,
}: {
  item: BuyPost;
  onOpen?: (item: BuyPost) => void;
}) {
  return (
    <Card className={`relative overflow-hidden !p-0`}>
      {/* left accent border */}
      <div
        className={`absolute left-0 top-0 h-full w-[5px] ${
          item.accent === "red"
            ? "bg-red-500"
            : item.accent === "green"
              ? "bg-green"
              : "bg-transparent"
        }`}
      />

      <div className="p-6">
        {/* header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-xl font-extrabold text-gray">{item.title}</h3>
            <p className="mt-1 text-sm font-semibold text-gray/70">
              Posted: {item.postedText} <span className="mx-2">•</span> #
              {item.id}
            </p>
          </div>

          <p
            className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-gray/15 bg-white text-gray/70 hover:bg-secondary"
            aria-label="Open details"
          >
            <Link href={`/user/posts/buy/view/${item.id}`}>
              <ChevronRight size={18} />
            </Link>
          </p>
        </div>

        {/* info grid */}
        <div className="mt-5 grid gap-x-10 gap-y-5 border-t border-gray/10 pt-5 md:grid-cols-2">
          <div className="space-y-5">
            <InfoRow
              icon={<MapPin size={18} />}
              label="Preferred Location"
              value={item.preferredLocation}
            />
            <InfoRow
              icon={<Ruler size={18} />}
              label="Required Land Size"
              value={item.requiredLandSize}
            />
            <InfoRow
              icon={<Route size={18} />}
              label="Distance from Road"
              value={item.distanceFromRoad}
            />
          </div>

          <div className="space-y-5">
            <InfoRow
              icon={<Home size={18} />}
              label="Property Type"
              value={item.propertyType}
            />
            <InfoRow
              icon={<Ruler size={18} />}
              label="Required Plot Size"
              value={item.requiredPlotSize}
            />
            <InfoRow
              icon={<Wallet size={18} />}
              label="Budget Range"
              value={item.budgetRange}
            />
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="flex flex-col gap-3 border-t border-gray/10 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold text-gray/70">
            Status: <StatusText status={item.status} />
          </p>

          {item.acceptedOfferNote ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-bold text-green">
              <CheckCircle2 size={16} />
              {item.acceptedOfferNote}
            </span>
          ) : null}
        </div>

        <div className="flex items-center justify-start gap-3 md:justify-end">
          {item.action?.kind === "offers" ? (
            <Pill tone={item.action.count > 0 ? "red" : "gray"}>
              {item.action.count} Offers Received
            </Pill>
          ) : null}

          {item.action?.kind === "awaiting_approval" ? (
            <Pill tone="gray">Awaiting Approval</Pill>
          ) : null}

          {item.action?.kind === "view_appointment" ? (
            <Button
              className="rounded-full bg-red-500 px-6 py-2 text-sm font-bold text-white hover:bg-red-600"
              onClick={() => onOpen?.(item)}
            >
              View Appointment
            </Button>
          ) : null}

          {item.action?.kind === "continue_editing" ? (
            <Button
              variant="secondary"
              className="rounded-full px-5"
              onClick={() => onOpen?.(item)}
            >
              <Pencil size={16} />
              Continue Editing
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
