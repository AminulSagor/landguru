"use client";

import ScheduleCard from "@/app/(agent)/agent/dashboard/_components/schedule-card";
import { ScheduleItem } from "@/app/(agent)/agent/dummy-data/moc-agent-home";
import React from "react";


export default function Timeline({ items }: { items: ScheduleItem[] }) {
  return (
    <div className="relative space-y-6">
      {/* vertical line */}
      <div className="absolute left-[13px] top-2 h-[calc(100%-8px)] w-[2px] bg-primary/20" />

      {items.map((it, idx) => (
        <div key={idx} className="relative pl-10">
          {/* dot */}
          <div className="absolute left-[6px] top-8 h-4 w-4 rounded-full border-2 border-primary bg-white" />
          <ScheduleCard item={it} />
        </div>
      ))}
    </div>
  );
}
