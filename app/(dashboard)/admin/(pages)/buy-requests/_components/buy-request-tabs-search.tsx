"use client";

import React from "react";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  BuyRequestSortKey,
  BuyRequestTabItem,
  BuyRequestTabKey,
} from "@/types/admin/buy-requests/buy-requests-list.types";

function TabButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
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
      <span className="flex items-center gap-2">{label}</span>

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
  tabs: BuyRequestTabItem[];
  tab: BuyRequestTabKey;
  onTabChange: (value: BuyRequestTabKey) => void;
  q: string;
  onQChange: (value: string) => void;
  sort: BuyRequestSortKey;
  onSortChange: (value: BuyRequestSortKey) => void;
}) {
  return (
    <div className="mt-10 flex flex-col gap-3 border-b border-gray/15 pb-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-1 whitespace-nowrap">
        {tabs.map((item) => (
          <TabButton
            key={item.key}
            active={tab === item.key}
            label={item.label}
            onClick={() => onTabChange(item.key)}
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
            onChange={(event) => onQChange(event.target.value)}
            placeholder="Search"
            className="w-full rounded-lg border border-gray/15 bg-white py-2 pl-9 pr-3 text-xs font-semibold text-gray outline-none focus:border-primary/40"
          />
        </div>

        <button
          type="button"
          className="flex items-center justify-between gap-2 rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-semibold text-gray sm:w-[160px]"
          onClick={() =>
            onSortChange(
              sort === "newest_first" ? "oldest_first" : "newest_first",
            )
          }
        >
          {sort === "newest_first" ? "Newest First" : "Oldest First"}
          <ChevronDown size={16} className="text-gray" />
        </button>
      </div>
    </div>
  );
}
