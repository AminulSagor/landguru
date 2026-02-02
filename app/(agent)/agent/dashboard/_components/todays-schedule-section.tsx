"use client";

import Timeline from "@/app/(agent)/agent/dashboard/_components/timeline";
import { ScheduleItem } from "@/app/(agent)/agent/dummy-data/moc-agent-home";

export default function TodaysScheduleSection({
  dateLabel,
  items,
}: {
  dateLabel: string;
  items: ScheduleItem[];
}) {
  return (
    <div className="space-y-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold">Today&apos;s Schedule</h2>

        <span className="rounded-lg border border-primary/15 bg-white px-3 py-1 text-xs font-extrabold text-primary">
          {dateLabel}
        </span>
      </div>

      <Timeline items={items} />
    </div>
  );
}
