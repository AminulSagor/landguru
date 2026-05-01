"use client";

import React from "react";
import Link from "next/link";
import Card from "@/components/cards/card";
import { cn } from "@/utils/classnames.utils";

type Status = "active" | "warning" | "inactive";

type LocationRow = {
  zone: string;
  admin: string;
  posts: number;
  revenue: string;
  status: Status;
};

const demoRows: LocationRow[] = [
  {
    zone: "Dhaka North",
    admin: "Rahim Ahmed",
    posts: 1204,
    revenue: "৳ 1.2 Cr",
    status: "active",
  },
  {
    zone: "Dhaka South",
    admin: "Selim Khan",
    posts: 980,
    revenue: "৳ 85 Lakh",
    status: "active",
  },
  {
    zone: "Chittagong",
    admin: "Kamal Hossain",
    posts: 450,
    revenue: "৳ 45 Lakh",
    status: "warning",
  },
  {
    zone: "Sylhet",
    admin: "Nora Islam",
    posts: 320,
    revenue: "৳ 30 Lakh",
    status: "active",
  },
  {
    zone: "Rajshahi",
    admin: "Tariqul Islam",
    posts: 150,
    revenue: "৳ 12 Lakh",
    status: "inactive",
  },
];

function StatusPill({ status }: { status: Status }) {
  const map: Record<Status, { label: string; cls: string }> = {
    active: {
      label: "Active",
      cls: "bg-green/10 text-green border-green/15",
    },
    warning: {
      label: "Warning",
      cls: "bg-pumpkin/10 text-pumpkin border-pumpkin/15",
    },
    inactive: {
      label: "Inactive",
      cls: "bg-gray/10 text-gray/60 border-gray/15",
    },
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        map[status].cls,
      )}
    >
      {map[status].label}
    </span>
  );
}

export default function LocationPerformanceTable({
  rows = demoRows,
  onViewFullReportHref = "#",
}: {
  rows?: LocationRow[];
  onViewFullReportHref?: string;
}) {
  return (
    <div className="bg-white border border-gray/15 rounded-lg">
      {/* header */}
      <div className="flex items-center justify-between px-6 py-5">
        <h3 className="text-sm font-extrabold text-gray">
          Location Performance Overview
        </h3>

        <Link
          href={onViewFullReportHref}
          className="text-sm font-semibold text-primary hover:opacity-90"
        >
          View Full Report
        </Link>
      </div>

      {/* table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[820px] w-full border-collapse">
          <thead>
            <tr className="bg-secondary/40">
              {["ZONE", "ADMIN", "POSTS", "REVENUE", "STATUS"].map((h) => (
                <th
                  key={h}
                  className="border-t border-gray/10 px-6 py-4 text-left text-xs font-semibold tracking-wide"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} className="border-t border-gray/10">
                <td className="px-6 py-5 text-sm font-semibold text-gray">
                  {r.zone}
                </td>
                <td className="px-6 py-5 text-sm ">{r.admin}</td>
                <td className="px-6 py-5 text-sm">
                  {r.posts.toLocaleString()}
                </td>
                <td className="px-6 py-5 text-sm">
                  {r.revenue}
                </td>
                <td className="px-6 py-5">
                  <StatusPill status={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* mobile hint */}
      <div className="px-6 pb-5 pt-3 text-xs text-gray/40 md:hidden">
        Swipe horizontally to view all columns
      </div>
    </div>
  );
}
