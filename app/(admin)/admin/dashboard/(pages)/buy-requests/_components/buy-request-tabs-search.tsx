// app/(admin)/admin/dashboard/(pages)/buy-request/_components/buy-request-tabs-search.tsx
"use client";

import React from "react";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { BuyRequestSortKey, BuyRequestTabKey } from "@/app/(admin)/admin/types/buy-request.types";


type TabItem = { key: BuyRequestTabKey; label: string; count?: number };

function TabButton({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative px-3 py-2 text-xs font-semibold text-gray",
        active && "text-primary",
      )}
    >
      <span className="flex items-center gap-2">
        {label}
        {typeof count === "number" && count > 0 && (
          <span
            className={cn(
              "min-w-5 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
              active ? "bg-primary text-white" : "bg-secondary text-gray",
            )}
          >
            {count}
          </span>
        )}
      </span>

      {active && (
        <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-primary" />
      )}
    </button>
  );
}

export default function BuyRequestTabsSearch({
  tabs,
  tab,
  onTabChange,
  q,
  onQChange,
  sort,
  onSortChange,
}: {
  tabs: TabItem[];
  tab: BuyRequestTabKey;
  onTabChange: (v: BuyRequestTabKey) => void;
  q: string;
  onQChange: (v: string) => void;
  sort: BuyRequestSortKey;
  onSortChange: (v: BuyRequestSortKey) => void;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-gray/15 pb-3 lg:flex-row lg:items-center lg:justify-between mt-10">
      <div className="flex items-center gap-1 whitespace-nowrap">
        {tabs.map((t) => (
          <TabButton
            key={t.key}
            active={tab === t.key}
            label={t.label}
            count={t.count}
            onClick={() => onTabChange(t.key)}
          />
        ))}
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <div className="relative w-full sm:max-w-[360px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray"
          />
          <input
            value={q}
            onChange={(e) => onQChange(e.target.value)}
            placeholder="Search"
            className="w-full rounded-lg border border-gray/15 bg-white py-2 pl-9 pr-3 text-xs font-semibold text-gray outline-none focus:border-primary/40"
          />
        </div>

        <button
          type="button"
          className="flex  items-center justify-between gap-2 rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-semibold text-gray sm:w-[160px]"
          onClick={() =>
            onSortChange(sort === "newest_first" ? "oldest_first" : "newest_first")
          }
        >
          {sort === "newest_first" ? "Newest First" : "Oldest First"}
          <ChevronDown size={16} className="text-gray" />
        </button>
      </div>
    </div>
  );
}
