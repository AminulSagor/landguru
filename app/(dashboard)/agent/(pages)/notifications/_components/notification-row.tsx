"use client";

import React from "react";
import { AlertTriangle, CalendarDays, Info } from "lucide-react";
import { NotificationItem } from "@/app/(dashboard)/agent/dummy-data/mock-notifications";

const iconByKind = {
  danger: AlertTriangle,
  success: CalendarDays,
  info: Info,
};

export default function NotificationRow({ item }: { item: NotificationItem }) {
  const Icon = iconByKind[item.kind];

  const leftStrip =
    item.unread && item.kind === "danger" ? "bg-pumpkin" : "bg-transparent";

  const iconWrap =
    item.kind === "danger"
      ? "bg-pumpkin/10"
      : item.kind === "success"
        ? "bg-green/10"
        : "bg-gray/10";

  const iconColor =
    item.kind === "danger"
      ? "text-pumpkin"
      : item.kind === "success"
        ? "text-green"
        : "text-gray/70";

  return (
    <div className="relative">
      {/* left strip */}
      <div className={`absolute left-0 top-0 h-full w-1 ${leftStrip}`} />

      <div className="flex gap-4 px-6 py-6">
        {/* icon */}
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconWrap}`}
        >
          <Icon size={18} className={iconColor} />
        </div>

        {/* content */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-sm font-extrabold text-gray">{item.title}</h3>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray/50">
                {item.time}
              </span>
              {item.unread ? (
                <span className="h-2 w-2 rounded-full bg-primary" />
              ) : null}
            </div>
          </div>

          <p className="mt-1 text-sm leading-6 text-gray/60">
            {item.messageLeft ? <span>{item.messageLeft} </span> : null}
            <span className="font-extrabold text-gray">
              {item.highlight}
            </span>{" "}
            {item.messageRight ? <span>{item.messageRight}</span> : null}
          </p>
        </div>
      </div>
    </div>
  );
}
