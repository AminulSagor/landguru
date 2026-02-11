// app/(admin)/admin/dashboard/(pages)/service-request/_components/service-requests-overview.tsx
"use client";

import React from "react";
import Card from "@/components/cards/card";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, MessageSquareText, Table } from "lucide-react";
import { ServiceRequestOverview } from "@/app/(admin)/admin/types/service-request.types";

function StatIcon({
  tone,
  icon,
}: {
  tone: "neutral" | "danger" | "primary" | "success";
  icon: React.ReactNode;
}) {
  const toneCls =
    tone === "danger"
      ? "text-red-500"
      : tone === "primary"
      ? "text-primary"
      : tone === "success"
      ? "text-green"
      : "text-gray";

  return (
    <div className={cn("grid h-7 w-7 place-items-center rounded-md bg-secondary", toneCls)}>
      {icon}
    </div>
  );
}

function StatCard({
  title,
  value,
  tone,
  rightBorder,
  icon,
}: {
  title: string;
  value: string;
  tone: "neutral" | "danger" | "primary" | "success";
  rightBorder?: "danger" | "primary" | "success";
  icon: React.ReactNode;
}) {
  const borderCls =
    rightBorder === "danger"
      ? "border-r-4 border-r-red-500"
      : rightBorder === "primary"
      ? "border-r-4 border-r-primary"
      : rightBorder === "success"
      ? "border-r-4 border-r-green"
      : "";

  const valueCls =
    tone === "danger"
      ? "text-red-500"
      : tone === "primary"
      ? "text-primary"
      : tone === "success"
      ? "text-green"
      : "text-black";

  return (
    <Card className={cn("flex items-center justify-between p-4 border border-gray/15 bg-white", borderCls)}>
      <div>
        <p className="text-xs text-gray">{title}</p>
        <p className={cn("mt-1 text-xl font-semibold leading-none", valueCls)}>{value}</p>
      </div>
      <StatIcon tone={tone} icon={icon} />
    </Card>
  );
}

export default function ServiceRequestsOverview({ stats }: { stats: ServiceRequestOverview }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Requests"
        value={String(stats.totalRequests)}
        tone="neutral"
        icon={<Table className="h-4 w-4" />}
      />
      <StatCard
        title="Unassigned"
        value={stats.unassigned >= 99 ? "99+" : String(stats.unassigned)}
        tone="danger"
        rightBorder="danger"
        icon={<AlertTriangle className="h-4 w-4" />}
      />
      <StatCard
        title="In Review"
        value={String(stats.inReview)}
        tone="primary"
        rightBorder="primary"
        icon={<MessageSquareText className="h-4 w-4" />}
      />
      <StatCard
        title="Completed Today"
        value={String(stats.completedToday)}
        tone="success"
        rightBorder="success"
        icon={<CheckCircle2 className="h-4 w-4" />}
      />
    </div>
  );
}
