"use client";

import React from "react";
import { cn } from "@/lib/utils"; // if you have it, else remove cn and use template strings

export type NotiFilter = "all" | "action" | "appointments";

const tabs: { key: NotiFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "action", label: "Action Required" },
  { key: "appointments", label: "Appointments" },
];

export default function NotificationsFilters({
  value,
  onChange,
}: {
  value: NotiFilter;
  onChange: (v: NotiFilter) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {tabs.map((t) => {
        const active = value === t.key;

        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={
              active
                ? "rounded-full bg-primary px-5 py-2 text-sm font-extrabold text-white shadow-sm"
                : "rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray/70 border border-gray/10 hover:bg-secondary"
            }
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
