"use client";

import Card from "@/components/cards/card";
import type { UiTaskDetails } from "@/types/agent/task.types";

export default function TaskDetailsHeader({
  data,
}: {
  data: UiTaskDetails;
}) {
  const isPending = data.stage === "pending_accepting";
  const isCompleted = data.stage === "completed";
  const statusLabel = data.statusLabel?.trim();
  const nonPendingLabel = statusLabel && statusLabel.length > 0
    ? statusLabel
    : isCompleted
      ? "COMPLETED"
      : "ACTIVE";
  const nonPendingClass = isCompleted ? "bg-green" : "bg-primary";
  const serviceLabel = data.serviceKey
    ? String(data.serviceKey)
        .split("_")
        .map((s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s))
        .join(" ")
    : "SERVICE TYPE";

  return (
    <Card className="rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold tracking-wider text-gray">
            {serviceLabel}
          </p>
          <h1 className="mt-1 text-xl font-extrabold">{data.title}</h1>
          <p className="mt-1 text-xs font-semibold text-gray">{data.code}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          {isPending ? (
            <>
              <span className="rounded-full bg-pumpkin px-3 py-1 text-[11px] font-extrabold text-white">
                NEW REQUEST
              </span>
              <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-extrabold text-white">
                PENDING ACCEPTING
              </span>
            </>
          ) : (
            <span
              className={`rounded-full ${nonPendingClass} px-3 py-1 text-[11px] font-extrabold text-white`}
            >
              {nonPendingLabel}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 border-t border-gray/10 pt-4">
        {isPending ? (
          <p className="text-xs font-extrabold text-pumpkin">
            {data.acceptBefore}
          </p>
        ) : (
          <p className="text-xs font-semibold text-gray/40">
            {data.updatedAgo}
          </p>
        )}
        <p className="mt-1 text-xs font-semibold text-gray/35">
          {data.postedAgo}
        </p>
      </div>
    </Card>
  );
}
