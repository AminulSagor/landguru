"use client";

import React from "react";
import {
  AlertTriangle,
  Hammer,
  FileText,
  CalendarCheck,
  BadgeCheck,
  Tag,
} from "lucide-react";
import { NotificationItem } from "@/app/(dashboard)/user/types/notification";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getMeta(n: NotificationItem) {
  // Match screenshot: action required -> red left bar
  const isAction = n.category === "action_required";

  const leftBar = isAction ? "bg-red-500" : "bg-transparent";

  // Icon + soft background per kind
  if (n.title.toLowerCase().includes("offer")) {
    return {
      icon: <AlertTriangle size={18} />,
      iconBg: "bg-red-100 text-red-600",
      leftBar,
    };
  }
  if (n.title.toLowerCase().includes("quoted")) {
    return {
      icon: <Hammer size={18} />,
      iconBg: "bg-red-100 text-red-600",
      leftBar,
    };
  }
  if (n.title.toLowerCase().includes("service")) {
    return {
      icon: <FileText size={18} />,
      iconBg: "bg-blue-100 text-blue-600",
      leftBar,
    };
  }
  if (n.title.toLowerCase().includes("appointment")) {
    return {
      icon: <CalendarCheck size={18} />,
      iconBg: "bg-emerald-100 text-emerald-700",
      leftBar,
    };
  }
  if (n.title.toLowerCase().includes("verified")) {
    return {
      icon: <BadgeCheck size={18} />,
      iconBg: "bg-gray-100 text-gray-700",
      leftBar,
    };
  }
  return {
    icon: <Tag size={18} />,
    iconBg: "bg-purple-100 text-purple-700",
    leftBar,
  };
}

export default function NotificationRow({
  item,
  onClick,
}: {
  item: NotificationItem;
  onClick?: (id: string) => void;
}) {
  const meta = getMeta(item);

  return (
    <button
      type="button"
      onClick={() => onClick?.(item.id)}
      className={cx(
        "w-full text-left",
        "relative overflow-hidden rounded-2xl bg-white",
        "shadow-sm ring-1 ring-black/5",
        "hover:bg-gray-50 transition",
      )}
    >
      {/* Left indicator bar */}
      <span className={cx("absolute left-0 top-0 h-full w-1", meta.leftBar)} />

      <div className="flex items-start gap-4 p-5 pl-6">
        {/* Icon bubble */}
        <div
          className={cx(
            "h-10 w-10 rounded-full flex items-center justify-center",
            meta.iconBg,
          )}
        >
          {meta.icon}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <p className="font-extrabold text-sm text-black">{item.title}</p>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-gray-500">{item.timeText}</span>
              {!item.read && (
                <span className="h-2 w-2 rounded-full bg-blue-600" />
              )}
            </div>
          </div>

          <p className="mt-1 text-xs leading-relaxed text-gray-500 line-clamp-2">
            {item.message}
          </p>
        </div>
      </div>
    </button>
  );
}
