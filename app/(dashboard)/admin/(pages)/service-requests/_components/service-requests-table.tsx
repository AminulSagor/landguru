// app/(admin)/admin/dashboard/(pages)/service-request/_components/service-requests-table.tsx
"use client";

import React from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { cn } from "@/lib/utils";
import { MapPin, Plus } from "lucide-react";
import { ServiceRequestListItem } from "@/app/(dashboard)/admin/types/service-request.types";

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((x) => x[0]?.toUpperCase())
    .join("");

  return (
    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-sm font-semibold text-primary">
      {initials}
    </div>
  );
}

function StatusBadge({ status }: { status: ServiceRequestListItem["status"] }) {
  const cfg =
    status === "submitted_for_review"
      ? {
          label: "Submitted For Review",
          cls: "border-primary/15 bg-primary/5 text-primary",
          dot: "bg-primary",
        }
      : status === "in_progress"
        ? {
            label: "In Progress",
            cls: "border-orange-200 bg-orange-50 text-orange-600",
            dot: "bg-orange-500",
          }
        : {
            label: "Pending Assignment",
            cls: "border-gray/15 bg-secondary text-gray",
            dot: "bg-gray",
          };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        cfg.cls,
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", cfg.dot)} />
      {cfg.label}
    </span>
  );
}

function ActionCell({
  item,
  onView,
}: {
  item: ServiceRequestListItem;
  onView: (item: ServiceRequestListItem) => void;
}) {
  if (item.status === "submitted_for_review") {
    return (
      <Button size="sm" className="h-9 px-4" onClick={() => onView(item)}>
        View Details
      </Button>
    );
  }

  if (item.status === "in_progress") {
    return (
      <Button
        size="sm"
        variant="secondary"
        className="h-9 px-4"
        onClick={() => onView(item)}
      >
        Track Progress
      </Button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onView(item)}
      className="text-sm font-semibold text-primary hover:underline"
    >
      View Details
    </button>
  );
}

function AssignAgentPill({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-dashed px-4 py-2 text-xs font-semibold",
        "border-orange-300 text-orange-600 hover:bg-orange-50",
      )}
    >
      <Plus className="h-4 w-4" />
      Assign Agent
    </button>
  );
}

function PageNav({
  page,
  totalPages,
  onPage,
}: {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
}) {
  const safe = (p: number) => Math.max(1, Math.min(totalPages, p));

  const items = (() => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    const set = new Set<number>([
      1,
      2,
      totalPages - 1,
      totalPages,
      page - 1,
      page,
      page + 1,
    ]);
    const arr = [...set]
      .filter((n) => n >= 1 && n <= totalPages)
      .sort((a, b) => a - b);
    return arr;
  })();

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onPage(safe(page - 1))}
        className="grid h-9 w-9 place-items-center rounded-lg border border-gray/15 bg-white text-gray hover:bg-secondary"
      >
        ‹
      </button>

      <div className="flex items-center overflow-hidden rounded-lg border border-gray/15 bg-white">
        {items.map((n, idx) => {
          const prev = items[idx - 1];
          const showEllipsis = prev && n - prev > 1;

          return (
            <React.Fragment key={n}>
              {showEllipsis && (
                <span className="px-3 py-2 text-sm text-gray">…</span>
              )}
              <button
                type="button"
                onClick={() => onPage(n)}
                className={cn(
                  "h-9 min-w-9 px-3 text-sm font-semibold",
                  n === page
                    ? "bg-primary text-white"
                    : "text-black hover:bg-secondary",
                )}
              >
                {n}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onPage(safe(page + 1))}
        className="grid h-9 w-9 place-items-center rounded-lg border border-gray/15 bg-white text-gray hover:bg-secondary"
      >
        ›
      </button>
    </div>
  );
}

export default function ServiceRequestsTable({
  items,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsChange,
  onView,
  onAssignAgent,
}: {
  items: ServiceRequestListItem[];
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (p: number) => void;
  onRowsChange: (n: number) => void;
  onView: (item: ServiceRequestListItem) => void;
  onAssignAgent: (item: ServiceRequestListItem) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(totalCount / rowsPerPage));
  const from = (page - 1) * rowsPerPage + 1;
  const to = Math.min(totalCount, page * rowsPerPage);

  return (
    <div className="overflow-hidden bg-white rounded-md border border-gray/20">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-300">
          <thead>
            <tr className="bg-secondary text-xs font-semibold text-gray">
              <th className="px-6 py-4 text-left">SERVICE NAME &amp; ID</th>
              <th className="px-6 py-4 text-left">
                PARENT POST &amp; LOCATION
              </th>
              <th className="px-6 py-4 text-left">ASSIGNED AGENT</th>
              <th className="px-6 py-4 text-left">STATUS</th>
              <th className="px-6 py-4 text-left">LATEST WORK LOG</th>
              <th className="px-6 py-4 text-left">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-t border-gray/15">
                <td className="px-6 py-5">
                  <div className="font-semibold text-black">
                    {it.serviceName}
                  </div>
                  <div className="mt-1 text-xs text-gray">#{it.id}</div>
                </td>

                <td className="px-6 py-5">
                  <div className="font-semibold text-primary">
                    #{it.parentPostId}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-gray">
                    <MapPin className="h-4 w-4" />
                    {it.locationLine}
                  </div>
                </td>

                <td className="px-6 py-5">
                  {it.assignedAgent?.name ? (
                    <div className="flex items-center gap-3">
                      <Avatar name={it.assignedAgent.name} />
                      <div className="font-semibold text-black">
                        {it.assignedAgent.name}
                      </div>
                    </div>
                  ) : (
                    <AssignAgentPill onClick={() => onAssignAgent(it)} />
                  )}
                </td>

                <td className="px-6 py-5">
                  <StatusBadge status={it.status} />
                </td>

                <td className="px-6 py-5 text-cente">
                  {it.latestWorkLog ? (
                    <div>
                      <div className="font-semibold text-black">
                        {it.latestWorkLog.title}
                      </div>
                      <div className="mt-1 text-xs text-gray">
                        {it.latestWorkLog.timeLabel}
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray">—</div>
                  )}
                </td>

                <td className="px-6 py-5">
                  <ActionCell item={it} onView={onView} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-gray/15 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm text-gray">
          Showing <span className="font-semibold text-black">{from}</span> to{" "}
          <span className="font-semibold text-black">{to}</span> of{" "}
          <span className="font-semibold text-black">{totalCount}</span> results
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => onRowsChange(Number(e.target.value))}
              className="h-9 rounded-lg border border-gray/15 bg-white px-3 text-sm"
            >
              {[5, 10, 20].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <PageNav page={page} totalPages={totalPages} onPage={onPageChange} />
        </div>
      </div>
    </div>
  );
}
