// app/(admin)/admin/dashboard/(pages)/buy-request/_components/buy-request-state-overview.tsx
"use client";

import React from "react";
import { FileText, Globe, CheckCircle2 } from "lucide-react";
import Card from "@/components/cards/card";
import { cn } from "@/utils/classnames.utils";

type OverviewItem = {
  key: "pending_review" | "active_published" | "closed_fulfilled";
  label: string;
  value: string | number;
  tone: "danger" | "primary" | "green";
};

const demoOverview: OverviewItem[] = [
  { key: "pending_review", label: "Pending Review", value: "99+", tone: "danger" },
  { key: "active_published", label: "Active/Published", value: 40, tone: "primary" },
  { key: "closed_fulfilled", label: "Closed/Fulfilled", value: 125, tone: "green" },
];

function ToneIcon({ tone }: { tone: OverviewItem["tone"] }) {
  const base =
    "flex h-7 w-7 items-center justify-center rounded-full border border-gray/15";
  const cls =
    tone === "danger"
      ? "bg-[#ff3b30]/10 text-[#ff3b30]"
      : tone === "green"
        ? "bg-green/10 text-green"
        : "bg-primary/10 text-primary";

  const Icon =
    tone === "danger" ? FileText : tone === "green" ? CheckCircle2 : Globe;

  return (
    <div className={cn(base, cls)}>
      <Icon size={16} />
    </div>
  );
}

function ToneValue({
  tone,
  children,
}: {
  tone: OverviewItem["tone"];
  children: React.ReactNode;
}) {
  const cls =
    tone === "danger"
      ? "text-[#ff3b30]"
      : tone === "green"
        ? "text-gray"
        : "text-primary";

  return <p className={cn("text-2xl font-extrabold", cls)}>{children}</p>;
}

export default function BuyRequestStateOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {demoOverview.map((it) => (
        <Card
          key={it.key}
          className="relative border border-gray/15 bg-white p-4"
        >
          <div className="absolute right-4 top-4">
            <ToneIcon tone={it.tone} />
          </div>

          <p className="text-xs font-semibold text-light-gray">{it.label}</p>

          <div className="mt-2">
            <ToneValue tone={it.tone}>{it.value}</ToneValue>
          </div>
        </Card>
      ))}
    </div>
  );
}
