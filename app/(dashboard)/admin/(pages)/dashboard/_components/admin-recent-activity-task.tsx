"use client";

import React, { useMemo, useState } from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { cn } from "@/lib/utils";
import {
  MoreHorizontal,
  Tag,
  Wrench,
  ShoppingCart,
  FileText,
} from "lucide-react";
import {
  ActivityStatus,
  ActivityTab,
  ActivityType,
} from "@/app/(dashboard)/admin/types/recent-activity-types";
import { recentActivityRows } from "@/app/(dashboard)/admin/dummy-data/recent-activity-data";

/* ---------------- component ---------------- */
export default function AdminRecentActivityTask() {
  const [tab, setTab] = useState<ActivityTab>("all");

  const rows = useMemo(() => {
    if (tab === "all") return recentActivityRows;
    if (tab === "sell")
      return recentActivityRows.filter((r) => r.type === "sell");
    if (tab === "requests")
      return recentActivityRows.filter((r) => r.type === "request");
    return [];
  }, [tab]);

  return (
    <div className="bg-white py-4">
      {/* header */}
      <div className="flex items-center justify-between gap-4 px-4">
        <p className="text-base font-semibold text-black">
          Recent Activity &amp; Tasks
        </p>
        <Tabs value={tab} onChange={setTab} />
      </div>

      <div className="h-px w-full bg-gray/10 mt-4" />

      {/* table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm min-w-242">
          <thead className="bg-secondary/20 text-gray text-xs uppercase">
            <tr className="text-left">
              <th className="p-4">ID</th>
              <th className="p-4">Type</th>
              <th className="p-4">Subject / Location</th>
              <th className="p-4">User</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-t border-gray/15 hover:bg-secondary/20"
              >
                <td className="p-4 text-gray">{r.id}</td>

                <td className="p-4">
                  <TypePill type={r.type} />
                </td>

                <td className="p-4">
                  <p className="text-sm font-semibold text-black">
                    {r.subject}
                  </p>
                  <p className="text-sm text-gray mt-1">{r.location}</p>
                </td>

                <td className="p-4 text-sm text-gray">{r.user}</td>

                <td className="p-4">
                  <StatusCell status={r.status} timeText={r.timeText} />
                </td>

                <td className="p-4 text-right">
                  {r.canReview ? (
                    <Button
                      variant="secondary"
                      className="bg-white border border-primary/20 text-primary hover:bg-secondary h-10 px-5"
                    >
                      <FileText size={16} />
                      Review
                    </Button>
                  ) : (
                    <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray hover:bg-secondary">
                      <MoreHorizontal size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr className="border-t border-gray/15">
                <td colSpan={6} className="p-6 text-center text-sm text-gray">
                  No activity found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* footer link */}
      <div className="border-t border-gray/10 mt-3 pt-4">
        <button className="w-full text-center text-sm font-semibold text-primary hover:underline">
          View All Activity
        </button>
      </div>
    </div>
  );
}

/* ---------------- ui helpers ---------------- */
const tabLabel: Record<ActivityTab, string> = {
  all: "All",
  sell: "Sell Posts",
  requests: "Requests",
  appointments: "Appointments",
};

function TypePill({ type }: { type: ActivityType }) {
  const meta = {
    sell: {
      label: "Sell",
      icon: <Tag size={14} />,
      className: "bg-secondary text-black border border-gray/10",
    },
    service: {
      label: "Service",
      icon: <Wrench size={14} />,
      className: "bg-secondary text-black border border-gray/10",
    },
    request: {
      label: "Request",
      icon: <ShoppingCart size={14} />,
      className: "bg-secondary text-black border border-gray/10",
    },
  }[type];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
        meta.className,
      )}
    >
      <span className="text-gray">{meta.icon}</span>
      {meta.label}
    </span>
  );
}

function StatusCell({
  status,
  timeText,
}: {
  status: ActivityStatus;
  timeText: string;
}) {
  const meta = {
    pending_validation: {
      label: "Pending Validation",
      dot: "bg-[#F59E0B]",
      text: "text-black",
    },
    assigned: {
      label: "Assigned",
      dot: "bg-green",
      text: "text-black",
    },
    new: {
      label: "New",
      dot: "bg-primary",
      text: "text-black",
    },
  }[status];

  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          "inline-flex items-center gap-2 text-sm font-medium",
          meta.text,
        )}
      >
        <span className={cn("h-2 w-2 rounded-full", meta.dot)} />
        {meta.label}
      </div>
      <div className="text-xs text-gray">{timeText}</div>
    </div>
  );
}

function Tabs({
  value,
  onChange,
}: {
  value: ActivityTab;
  onChange: (v: ActivityTab) => void;
}) {
  const tabs: ActivityTab[] = ["all", "sell", "requests", "appointments"];

  return (
    <div className="inline-flex rounded-lg bg-secondary/30 border border-gray/10 p-1">
      {tabs.map((t) => {
        const active = value === t;

        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition",
              active
                ? "bg-white text-black "
                : "text-gray hover:text-black",
            )}
          >
            {tabLabel[t]}
          </button>
        );
      })}
    </div>
  );
}
