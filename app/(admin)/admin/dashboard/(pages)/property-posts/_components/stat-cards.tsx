"use client";

import React from "react";
import Card from "@/components/cards/card";
import { cn } from "@/lib/utils";
import { ClipboardList, UserPlus, CheckCircle2, Ban, PackageCheck } from "lucide-react";

type StatKey = "pending_review" | "pending_assign" | "active_live" | "rejected" | "sold";

type StatItem = {
  key: StatKey;
  label: string;
  value: number | string;
};

const demoStats: StatItem[] = [
  { key: "pending_review", label: "Pending Review", value: 12 },
  { key: "pending_assign", label: "Pending Assign Agents", value: 1 },
  { key: "active_live", label: "Active/Live", value: 45 },
  { key: "rejected", label: "Rejected", value: 7 },
  { key: "sold", label: "Sold", value: 110 },
];

const meta: Record<
  StatKey,
  { icon: any; accent: string; iconCls: string; labelCls: string }
> = {
  pending_review: {
    icon: ClipboardList,
    accent: "bg-pumpkin",
    iconCls: "text-pumpkin",
    labelCls: "text-pumpkin",
  },
  pending_assign: {
    icon: UserPlus,
    accent: "bg-red",
    iconCls: "text-red",
    labelCls: "text-red",
  },
  active_live: {
    icon: CheckCircle2,
    accent: "bg-green",
    iconCls: "text-green",
    labelCls: "text-green",
  },
  rejected: {
    icon: Ban,
    accent: "bg-red",
    iconCls: "text-red",
    labelCls: "text-red",
  },
  sold: {
    icon: PackageCheck,
    accent: "bg-primary",
    iconCls: "text-primary",
    labelCls: "text-primary",
  },
};

function StatCard({ item }: { item: StatItem }) {
  const m = meta[item.key];
  const Icon = m.icon;

  return (
    <Card className="relative overflow-hidden rounded-2xl border border-gray/15 bg-white px-5 py-4">
      {/* right accent bar */}
      <span className={cn("absolute right-0 top-0 h-full w-1.5", m.accent)} />

      <div className="flex items-start gap-2.5">
        <Icon size={18} className={cn("mt-0.5", m.iconCls)} />
        <p className={cn("text-sm font-semibold", m.labelCls)}>{item.label}</p>
      </div>

      <p className="mt-3 text-3xl font-extrabold text-gray">{item.value}</p>
    </Card>
  );
}

export default function StatusSummaryCards({
  stats = demoStats,
}: {
  stats?: StatItem[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((s) => (
        <StatCard key={s.key} item={s} />
      ))}
    </div>
  );
}
