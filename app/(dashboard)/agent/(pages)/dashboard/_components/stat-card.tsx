"use client";

import Card from "@/components/cards/card";
import { ClipboardList, CalendarCheck2, CheckCircle2 } from "lucide-react";
import { StatItem } from "@/app/(dashboard)/agent/dummy-data/moc-agent-home";

const iconByType = {
  new: ClipboardList,
  active: CalendarCheck2,
  done: CheckCircle2,
};

export default function StatCard({ item }: { item: StatItem }) {
  const Icon = iconByType[item.type];

  const wrapClass =
    item.type === "new"
      ? "bg-pumpkin text-white border-transparent"
      : item.type === "active"
        ? "bg-secondary border border-primary/10"
        : "bg-green/10 border border-green/15";

  const titleClass =
    item.type === "new"
      ? "text-white/90"
      : item.type === "active"
        ? "text-primary"
        : "text-green";

  const valueClass =
    item.type === "new"
      ? "text-white"
      : item.type === "active"
        ? "text-primary"
        : "text-green";

  return (
    <div className={`rounded-2xl p-6 ${wrapClass}`}>
      <div className="flex items-start justify-between">
        <p className={`text-xs font-extrabold tracking-wide ${titleClass}`}>
          {item.title}
        </p>

        <div>
          <Icon
            size={18}
            className={
              item.type === "done"
                ? "text-green"
                : item.type === "active"
                  ? "text-primary"
                  : "text-white"
            }
          />
        </div>
      </div>

      <div className="mt-5">
        <p className={`text-5xl font-extrabold leading-none ${valueClass}`}>
          {item.value}
        </p>
        <p
          className={`mt-2 text-sm font-semibold ${item.type === "new" ? "text-white/90" : "text-gray/60"}`}
        >
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}
