"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { SellPostNegotiationTab } from "@/types/admin/quote-requote/sell-post-negotiations.types";
import { NEGOTIATION_TABS } from "@/app/(dashboard)/admin/(pages)/quote-requote/_utils/quote-requote.utils";

type QuoteRequoteTabsProps = {
  activeTab: SellPostNegotiationTab;
  activeCount: number;
  onChange: (tab: SellPostNegotiationTab) => void;
};

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
        "relative shrink-0 px-1 py-3 text-sm font-semibold transition-colors",
        active ? "text-primary" : "text-[#3B82C4]",
      )}
    >
      <span className="flex items-center gap-1.5">
        {label}

        {typeof count === "number" && (
          <span
            className={cn(
              "inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none",
              active ? "bg-[#FF5A5F] text-white" : "bg-secondary text-gray",
            )}
          >
            {count}
          </span>
        )}
      </span>

      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-primary" />
      )}
    </button>
  );
}

export default function QuoteRequoteTabs({
  activeTab,
  activeCount,
  onChange,
}: QuoteRequoteTabsProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex min-w-max items-center gap-6">
        {NEGOTIATION_TABS.map((tab) => (
          <TabButton
            key={tab.key}
            active={activeTab === tab.key}
            label={tab.label}
            count={activeTab === tab.key ? activeCount : undefined}
            onClick={() => onChange(tab.key)}
          />
        ))}
      </div>
    </div>
  );
}
