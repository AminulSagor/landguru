"use client";

import React from "react";
import Card from "@/components/cards/card";
import { cn } from "@/utils/classnames.utils";
import {
  AlertTriangle,
  CheckCircle2,
  MessageSquareText,
  Table,
} from "lucide-react";
import type { ServiceRequestsSummaryData } from "@/types/admin/service-requests/service-requests-summary.types";

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
    <div
      className={cn(
        "grid h-7 w-7 place-items-center rounded-md bg-secondary",
        toneCls,
      )}
    >
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
    <Card
      className={cn(
        "flex items-center justify-between border border-gray/15 bg-white p-4",
        borderCls,
      )}
    >
      <div>
        <p className="text-xs text-gray">{title}</p>
        <p className={cn("mt-1 text-xl font-semibold leading-none", valueCls)}>
          {value}
        </p>
      </div>
      <StatIcon tone={tone} icon={icon} />
    </Card>
  );
}

export default function ServiceRequestsOverview({
  stats,
  isLoading,
}: {
  stats: ServiceRequestsSummaryData;
  isLoading?: boolean;
}) {
  const totalRequests = isLoading ? "..." : String(stats.totalRequests);
  const unassigned = isLoading
    ? "..."
    : stats.unassigned >= 99
      ? "99+"
      : String(stats.unassigned);
  const inReview = isLoading ? "..." : String(stats.inReview);
  const completedToday = isLoading ? "..." : String(stats.completedToday);

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Requests"
        value={totalRequests}
        tone="neutral"
        icon={<Table className="h-4 w-4" />}
      />
      <StatCard
        title="Unassigned"
        value={unassigned}
        tone="danger"
        rightBorder="danger"
        icon={<AlertTriangle className="h-4 w-4" />}
      />
      <StatCard
        title="In Review"
        value={inReview}
        tone="primary"
        rightBorder="primary"
        icon={<MessageSquareText className="h-4 w-4" />}
      />
      <StatCard
        title="Completed Today"
        value={completedToday}
        tone="success"
        rightBorder="success"
        icon={<CheckCircle2 className="h-4 w-4" />}
      />
    </div>
  );
}
