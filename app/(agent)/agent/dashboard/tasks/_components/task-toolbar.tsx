"use client";

import React from "react";
import { Tab, type TabConfig } from "@/components/tabs/tab";
import { ChevronDown, Search } from "lucide-react";

export type TaskTabKey = "new" | "active" | "review" | "done";

export default function TaskToolbar({
  tab,
  onChangeTab,
  counts,
  showingCount,
  serviceType,
  onChangeServiceType,
  serviceTypes,
  q,
  onChangeQ,
}: {
  tab: TaskTabKey;
  onChangeTab: (v: TaskTabKey) => void;
  counts: Record<TaskTabKey, number>;
  showingCount: number;
  serviceType: string;
  onChangeServiceType: (v: string) => void;
  serviceTypes: string[];
  q: string;
  onChangeQ: (v: string) => void;
}) {
  const tabs: TabConfig<TaskTabKey>[] = [
    {
      key: "new",
      label: (
        <span className="flex items-center gap-2">
          New
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-pumpkin px-2 text-[11px] font-extrabold text-white">
            {counts.new}
          </span>
        </span>
      ),
    },
    { key: "active", label: "Active" },
    { key: "review", label: "In Review" },
    { key: "done", label: "Done" },
  ];

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {/* left: tabs */}
      <div className="w-full max-w-md">
        <Tab<TaskTabKey>
          tabs={tabs}
          tabKey={tab}
          onChangeTabKey={onChangeTab}
        />
      </div>

      {/* right: showing + filter + search */}
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <p className="text-sm font-semibold text-gray/70">
          <span className="text-gray font-extrabold">
            Showing {showingCount}
          </span>{" "}
          Tasks
        </p>

        {/* service type select */}
        <div className="relative">
          <select
            value={serviceType}
            onChange={(e) => onChangeServiceType(e.target.value)}
            className="h-10 rounded-lg border border-gray/15 bg-white pl-4 pr-10 text-sm font-semibold text-gray/70 outline-none focus:border-primary/30"
          >
            {serviceTypes.map((t) => (
              <option key={t} value={t}>
                {t === "all" ? "Service Type: All" : t}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray/40"
          />
        </div>

        {/* search */}
        <div className="relative w-full sm:w-[260px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray/40"
          />
          <input
            value={q}
            onChange={(e) => onChangeQ(e.target.value)}
            placeholder="Search location, area"
            className="h-10 w-full rounded-lg border border-gray/15 bg-white pl-10 pr-3 text-sm font-semibold text-gray/70 outline-none placeholder:text-gray/30 focus:border-primary/30"
          />
        </div>
      </div>
    </div>
  );
}
