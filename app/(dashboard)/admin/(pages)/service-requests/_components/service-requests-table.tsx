// app/(admin)/admin/dashboard/(pages)/service-request/_components/service-requests-table.tsx
"use client";

import React from "react";
import Button from "@/components/buttons/button";
import { cn } from "@/utils/classnames.utils";
import { formatDisplayIdSafe } from "@/utils/id.utils";
import { MapPin, Plus, Loader2 } from "lucide-react";
import type { ServiceRequestListItem } from "@/types/admin/service-requests/service-requests-list.types";

function AgentAvatar({
  name,
  photoUrl,
}: {
  name: string;
  photoUrl?: string | null;
}) {
  const [failed, setFailed] = React.useState(false);

  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((value) => value[0]?.toUpperCase())
    .join("");

  if (!photoUrl || failed) {
    return (
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-sm font-semibold text-primary">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={photoUrl}
      alt={name}
      className="h-9 w-9 shrink-0 rounded-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

function StatusBadge({ status }: { status: ServiceRequestListItem["status"] }) {
  const normalizedStatus = status.toUpperCase();

  const cfg =
    normalizedStatus === "SUBMITTED"
      ? {
          label: "Submitted",
          cls: "border-primary/15 bg-primary/5 text-primary",
          dot: "bg-primary",
        }
      : normalizedStatus === "IN_PROGRESS"
        ? {
            label: "In Progress",
            cls: "border-orange-200 bg-orange-50 text-orange-600",
            dot: "bg-orange-500",
          }
        : normalizedStatus === "EXPIRED"
          ? {
              label: "Expired",
              cls: "border-red-200 bg-red-50 text-red-500",
              dot: "bg-red-500",
            }
          : normalizedStatus === "COMPLETED"
            ? {
                label: "Completed",
                cls: "border-green/25 bg-green/10 text-green",
                dot: "bg-green",
              }
          : {
              label: "Unassigned",
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
  const status = item.status.toUpperCase();

  if (status === "SUBMITTED" || status === "COMPLETED") {
    return (
      <Button size="sm" className="h-9 px-4" onClick={() => onView(item)}>
        View Details
      </Button>
    );
  }

  if (status === "IN_PROGRESS") {
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

function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
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
  onPage: (page: number) => void;
}) {
  const safePage = (nextPage: number) => Math.max(1, Math.min(totalPages, nextPage));

  const items = (() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const values = new Set<number>([
      1,
      2,
      totalPages - 1,
      totalPages,
      page - 1,
      page,
      page + 1,
    ]);

    return [...values]
      .filter((value) => value >= 1 && value <= totalPages)
      .sort((left, right) => left - right);
  })();

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onPage(safePage(page - 1))}
        disabled={page <= 1}
        className="grid h-9 w-9 place-items-center rounded-lg border border-gray/15 bg-white text-gray hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
      >
        ‹
      </button>

      <div className="flex items-center overflow-hidden rounded-lg border border-gray/15 bg-white">
        {items.map((value, index) => {
          const previousValue = items[index - 1];
          const showEllipsis = previousValue && value - previousValue > 1;

          return (
            <React.Fragment key={value}>
              {showEllipsis ? (
                <span className="px-3 py-2 text-sm text-gray">…</span>
              ) : null}
              <button
                type="button"
                onClick={() => onPage(value)}
                className={cn(
                  "h-9 min-w-9 px-3 text-sm font-semibold",
                  value === page
                    ? "bg-primary text-white"
                    : "text-black hover:bg-secondary",
                )}
              >
                {value}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onPage(safePage(page + 1))}
        disabled={page >= totalPages}
        className="grid h-9 w-9 place-items-center rounded-lg border border-gray/15 bg-white text-gray hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
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
  totalPages,
  isLoading,
  isFetching,
  onPageChange,
  onRowsChange,
  onView,
  onAssignAgent,
}: {
  items: ServiceRequestListItem[];
  page: number;
  rowsPerPage: number;
  totalCount: number;
  totalPages: number;
  isLoading?: boolean;
  isFetching?: boolean;
  onPageChange: (page: number) => void;
  onRowsChange: (rows: number) => void;
  onView: (item: ServiceRequestListItem) => void;
  onAssignAgent: (item: ServiceRequestListItem) => void;
}) {
  const safeTotalPages = Math.max(totalPages, 1);
  const from = totalCount === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const to = totalCount === 0 ? 0 : Math.min(totalCount, page * rowsPerPage);

  return (
    <div className="overflow-hidden rounded-md border border-gray/20 bg-white">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead>
            <tr className="bg-secondary/50 text-xs font-semibold text-gray">
              <th className="px-6 py-4 text-left">SERVICE NAME &amp; ID</th>
              <th className="px-6 py-4 text-left">PARENT POST &amp; LOCATION</th>
              <th className="px-6 py-4 text-left">ASSIGNED AGENT</th>
              <th className="px-6 py-4 text-left">STATUS</th>
              <th className="px-6 py-4 text-left">LATEST WORK LOG</th>
              <th className="px-6 py-4 text-left">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray">
                  Loading service requests...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray">
                  No service requests found.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.service.id} className="border-t border-gray/15">
                  <td className="px-6 py-5">
                    <div className="text-sm text-black">{item.service.name}</div>
                    <div className="mt-1 text-xs text-gray">
                      {formatDisplayIdSafe(
                        "SRV",
                        item.service.displayId,
                        item.service.id,
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="text-primary">
                      {formatDisplayIdSafe(
                        "POST",
                        item.parentPost.displayId,
                        item.parentPost.id,
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray">
                      <MapPin className="h-4 w-4" />
                      {item.parentPost.location}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    {item.assignedAgent?.name ? (
                      <div className="flex items-center gap-3">
                        <AgentAvatar
                          name={item.assignedAgent.name}
                          photoUrl={item.assignedAgent.photoUrl}
                        />
                        <div className="text-black">{item.assignedAgent.name}</div>
                      </div>
                    ) : (
                      <AssignAgentPill onClick={() => onAssignAgent(item)} />
                    )}
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={item.status} />
                  </td>

                  <td className="px-6 py-5">
                    {item.latestWorkLog ? (
                      <div>
                        <div className="text-sm text-black">
                          {item.latestWorkLog.title}
                        </div>
                        <div className="mt-1 text-xs text-gray">
                          {formatDateTime(item.latestWorkLog.createdAt)}
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray">—</div>
                    )}
                  </td>

                  <td className="px-6 py-5">
                    <ActionCell item={item} onView={onView} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-gray/15 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2 text-sm text-gray">
          <span>
            Showing <span className="font-semibold text-black">{from}</span> to{" "}
            <span className="font-semibold text-black">{to}</span> of{" "}
            <span className="font-semibold text-black">{totalCount}</span> results
          </span>
          {isFetching && !isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(event) => onRowsChange(Number(event.target.value))}
              className="h-9 rounded-lg border border-gray/15 bg-white px-3 text-sm"
            >
              {[5, 10, 20].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <PageNav
            page={page}
            totalPages={safeTotalPages}
            onPage={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
