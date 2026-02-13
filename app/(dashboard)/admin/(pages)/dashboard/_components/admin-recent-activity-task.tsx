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

/* ---------------- types ---------------- */

type ActivityTab = "all" | "sell" | "requests" | "appointments";

type ActivityType = "sell" | "service" | "request";

type ActivityStatus = "pending_validation" | "assigned" | "new";

type ActivityRow = {
  id: string;
  type: ActivityType;
  subject: string;
  location: string;
  user: string;
  status: ActivityStatus;
  timeText: string;
  canReview?: boolean;
};

/* ---------------- demo data ---------------- */

const demoRows: ActivityRow[] = [
  {
    id: "#POST-1042",
    type: "sell",
    subject: "5 Katha Land",
    location: "Sector 7, Uttara",
    user: "Mr. Rahman",
    status: "pending_validation",
    timeText: "10 mins ago",
    canReview: true,
  },
  {
    id: "#SERV892-POST-1042",
    type: "service",
    subject: "Ownership History Validation",
    location: "Road 12, House 4",
    user: "Mrs. Salma",
    status: "assigned",
    timeText: "45 mins ago",
  },
  {
    id: "#BUY-2201",
    type: "request",
    subject: "3 Bed Apartment",
    location: "Near Sector 4 Park",
    user: "Mr. Sahil",
    status: "new",
    timeText: "2 hours ago",
  },
  {
    id: "#POST-1041",
    type: "sell",
    subject: "Commercial Space",
    location: "Sector 11",
    user: "Mr. Karim",
    status: "pending_validation",
    timeText: "3 hours ago",
    canReview: true,
  },
];

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
      className:
        "border-purple-200 bg-purple-50 text-purple-700",
    },
    service: {
      label: "Service",
      icon: <Wrench size={14} />,
      className:
        "border-blue-200 bg-blue-50 text-blue-700",
    },
    request: {
      label: "Request",
      icon: <ShoppingCart size={14} />,
      className:
        "border-green-200 bg-green-50 text-green-700",
    },
  }[type];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
        meta.className
      )}
    >
      {meta.icon}
      {meta.label}
    </span>
  );
}

function StatusCell({ status, timeText }: { status: ActivityStatus; timeText: string }) {
  const meta = {
    pending_validation: {
      label: "Pending Validation",
      dot: "bg-orange-500",
      text: "text-orange-600",
    },
    assigned: {
      label: "Assigned",
      dot: "bg-green-500",
      text: "text-green-600",
    },
    new: {
      label: "New",
      dot: "bg-blue-500",
      text: "text-blue-600",
    },
  }[status];

  return (
    <div className="flex flex-col gap-1">
      <div className={cn("inline-flex items-center gap-2 text-sm font-semibold", meta.text)}>
        <span className={cn("h-2 w-2 rounded-full", meta.dot)} />
        {meta.label}
      </div>
      <div className="text-xs text-gray/50">{timeText}</div>
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
    <div className="inline-flex rounded-lg bg-gray/5 p-1">
      {tabs.map((t) => {
        const active = value === t;
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-semibold transition",
              active
                ? "bg-white text-gray shadow-sm"
                : "text-gray/60 hover:text-gray"
            )}
          >
            {tabLabel[t]}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- component ---------------- */

export default function AdminRecentActivityTask() {
  const [tab, setTab] = useState<ActivityTab>("all");

  const rows = useMemo(() => {
    if (tab === "all") return demoRows;
    if (tab === "sell") return demoRows.filter((r) => r.type === "sell");
    if (tab === "requests") return demoRows.filter((r) => r.type === "request");
    // appointments: (no rows in demo)
    return [];
  }, [tab]);

  return (
    <Card className="rounded-2xl p-0 overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <h3 className="text-lg font-extrabold text-gray">
          Recent Activity &amp; Tasks
        </h3>
        <Tabs value={tab} onChange={setTab} />
      </div>

      <div className="h-px w-full bg-gray/10" />

      {/* table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="px-6 py-4 text-xs font-extrabold tracking-wide text-gray/40">
                ID
              </th>
              <th className="px-6 py-4 text-xs font-extrabold tracking-wide text-gray/40">
                TYPE
              </th>
              <th className="px-6 py-4 text-xs font-extrabold tracking-wide text-gray/40">
                SUBJECT / LOCATION
              </th>
              <th className="px-6 py-4 text-xs font-extrabold tracking-wide text-gray/40">
                USER
              </th>
              <th className="px-6 py-4 text-xs font-extrabold tracking-wide text-gray/40">
                STATUS
              </th>
              <th className="px-6 py-4 text-xs font-extrabold tracking-wide text-gray/40 text-right">
                ACTION
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-gray/5">
                {/* id */}
                <td className="px-6 py-5 text-sm font-semibold text-gray/60">
                  {r.id}
                </td>

                {/* type */}
                <td className="px-6 py-5">
                  <TypePill type={r.type} />
                </td>

                {/* subject/location */}
                <td className="px-6 py-5">
                  <div className="text-sm font-extrabold text-gray">
                    {r.subject}
                  </div>
                  <div className="text-sm font-semibold text-gray/50">
                    {r.location}
                  </div>
                </td>

                {/* user */}
                <td className="px-6 py-5 text-sm font-semibold text-gray/70">
                  {r.user}
                </td>

                {/* status */}
                <td className="px-6 py-5">
                  <StatusCell status={r.status} timeText={r.timeText} />
                </td>

                {/* action */}
                <td className="px-6 py-5 text-right">
                  {r.canReview ? (
                    <Button
                      className="h-10 px-5 rounded-lg border border-primary bg-white text-primary hover:bg-primary/5"
                      variant="secondary"
                    >
                      <span className="inline-flex items-center gap-2">
                        <FileText size={16} />
                        Review
                      </span>
                    </Button>
                  ) : (
                    <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray/50 hover:bg-gray/5 hover:text-gray">
                      <MoreHorizontal size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr className="border-t border-gray/5">
                <td colSpan={6} className="px-6 py-10 text-center text-sm font-semibold text-gray/50">
                  No activity found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* footer link */}
      <div className="border-t border-gray/10 px-6 py-4">
        <button className="w-full text-center text-sm font-extrabold text-primary hover:underline">
          View All Activity
        </button>
      </div>
    </Card>
  );
}
