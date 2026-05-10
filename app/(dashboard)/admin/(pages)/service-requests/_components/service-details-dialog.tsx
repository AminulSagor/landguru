"use client";

import React, { useMemo, useState } from "react";
import Dialog from "@/components/dialogs/dialog";
import Card from "@/components/cards/card";
import { cn } from "@/lib/utils";
import { Download, Eye } from "lucide-react";
import { ServiceDetails } from "@/app/(dashboard)/admin/types/service-request.types";

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((x) => x[0]?.toUpperCase())
    .join("");

  return (
    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-sm font-semibold text-primary">
      {initials}
    </div>
  );
}

function TimelineDot() {
  return (
    <div className="relative mt-1">
      <div className="h-4 w-4 rounded-full bg-primary/15 ring-2 ring-primary/20" />
      <div className="absolute left-1/2 top-4 h-full w-px -translate-x-1/2 bg-gray/15" />
    </div>
  );
}

function TimelineRow({
  left,
  right,
  children,
  hideLine,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  children: React.ReactNode;
  hideLine?: boolean;
}) {
  return (
    <div className="grid grid-cols-[24px_1fr_auto] gap-3">
      <div className="relative">
        <div
          className={cn(
            "mt-1 h-4 w-4 rounded-full bg-primary/15 ring-2 ring-primary/20",
          )}
        />
        {!hideLine && (
          <div className="absolute left-1/2 top-6 h-full w-px -translate-x-1/2 bg-gray/15" />
        )}
      </div>

      <div className="min-w-0">{children}</div>
      <div className="text-xs text-gray">{right}</div>
    </div>
  );
}

function ActivityItem({
  item,
  isLast,
}: {
  item: ServiceDetails["activityLog"][number];
  isLast: boolean;
}) {
  if (item.kind === "note") {
    return (
      <TimelineRow
        right={item.timeLabel}
        hideLine={isLast}
        left={<TimelineDot />}
      >
        <div className="font-semibold text-black">{item.title}</div>
        <div className="mt-2 rounded-lg border border-gray/15 bg-secondary px-4 py-3 text-sm text-gray">
          {item.body}
        </div>
      </TimelineRow>
    );
  }

  if (item.kind === "file") {
    return (
      <TimelineRow
        right={item.timeLabel}
        hideLine={isLast}
        left={<TimelineDot />}
      >
        <div className="font-semibold text-black">{item.title}</div>
        <div className="mt-1 text-xs text-gray">{item.fileName}</div>
      </TimelineRow>
    );
  }

  return (
    <TimelineRow
      right={item.timeLabel}
      hideLine={isLast}
      left={<TimelineDot />}
    >
      <div className="font-semibold text-black">{item.title}</div>
      {item.subtitle ? (
        <div className="mt-1 text-xs text-gray">{item.subtitle}</div>
      ) : null}
    </TimelineRow>
  );
}

export default function ServiceDetailsDialog({
  open,
  onOpenChange,
  details,
  onRequestRevision,
  onApprove,
  isSubmitting,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  details: ServiceDetails;
  onRequestRevision?: (feedback: string) => void;
  onApprove?: () => void;
  isSubmitting?: boolean;
}) {
  const [feedback, setFeedback] = useState("");
  const deliverableUrl = details.finalDeliverable.fileUrl;
  const actionClassName =
    "grid h-9 w-9 place-items-center rounded-lg border border-gray/15 bg-white text-gray hover:bg-secondary";

  const header = useMemo(() => {
    return (
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-black">
            {details.headerTitle}
          </h3>
          <div className="mt-1 flex items-center gap-3">
            <p className="text-sm text-gray">{details.serviceIdLabel}</p>
            <span className="rounded-md bg-green/15 px-2 py-1 text-xs font-semibold text-green">
              {details.statusChipLabel}
            </span>
          </div>
        </div>
      </div>
    );
  }, [details, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="xl">
      <div className="p-5">{header}</div>

      <div className="px-5 pb-5">
        <Card className="border border-gray/15 bg-secondary p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar name={details.agent.name} />
              <div>
                <p className="font-semibold text-black">{details.agent.name}</p>
                <p className="text-sm text-gray">{details.agent.role}</p>
                <p className="mt-1 text-sm font-semibold text-primary">
                  {details.agent.phone}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 text-xs text-gray">
              <span>{details.agent.startedAtLabel}</span>
              <span>{details.agent.lastActiveLabel}</span>
            </div>
          </div>
        </Card>

        <div className="mt-5">
          <h4 className="text-sm font-semibold text-black">Activity Log</h4>

          <div className="mt-4 space-y-5">
            {details.activityLog.map((it, idx) => (
              <ActivityItem
                key={idx}
                item={it}
                isLast={idx === details.activityLog.length - 1}
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-semibold text-black">
            Final Deliverable
          </h4>

          <Card className="mt-3 border border-gray/15 bg-white p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-black">
                  {details.finalDeliverable.fileName}
                </p>
                <p className="mt-1 text-xs text-gray">
                  {details.finalDeliverable.meta}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {deliverableUrl ? (
                  <a
                    href={deliverableUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={actionClassName}
                    aria-label="Preview"
                  >
                    <Eye className="h-4 w-4" />
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className={cn(actionClassName, "cursor-not-allowed opacity-50")}
                    aria-label="Preview"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                )}
                {deliverableUrl ? (
                  <a
                    href={deliverableUrl}
                    download={details.finalDeliverable.fileName}
                    className={actionClassName}
                    aria-label="Download"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className={cn(actionClassName, "cursor-not-allowed opacity-50")}
                    aria-label="Download"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-semibold text-black">
            Admin Feedback / Revision Request
          </h4>

          {details.lastFeedback ? (
            <Card className="mt-3 border border-gray/15 bg-white p-4">
              <div className="text-xs font-semibold text-gray">Last feedback</div>
              <p className="mt-2 text-sm text-black">
                {details.lastFeedback.message}
              </p>
              <p className="mt-2 text-xs text-gray">
                {details.lastFeedback.timeLabel}
              </p>
            </Card>
          ) : null}

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className={cn(
              "mt-3 h-28 w-full resize-none rounded-lg border border-gray/15 bg-white px-3 py-3 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary/15",
            )}
          />
        </div>

        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => onRequestRevision?.(feedback)}
            disabled={isSubmitting}
            className={cn(
              "h-10 rounded-lg border px-4 text-sm font-semibold transition",
              "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60",
            )}
          >
            Send feedback →
          </button>

          <button
            type="button"
            onClick={() => onApprove?.()}
            disabled={isSubmitting}
            className={cn(
              "h-10 rounded-lg px-4 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60",
              "bg-green hover:opacity-95",
            )}
          >
            Approve &amp; Mark Verified
          </button>
        </div>
      </div>
    </Dialog>
  );
}
