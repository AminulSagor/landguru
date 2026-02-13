"use client";

import React from "react";
import Card from "@/components/cards/card";
import { Check, Loader2, Eye } from "lucide-react";

type StepKey = "accepted" | "processing" | "review";
type StepState = "idle" | "active" | "done";

function StatusStep({
  label,
  state,
  icon,
}: {
  label: string;
  state: StepState;
  icon: React.ReactNode;
}) {
  const wrap =
    state === "done"
      ? "bg-green text-white border-green"
      : state === "active"
      ? "bg-primary text-white border-primary"
      : "bg-gray/10 text-gray/40 border-gray/15";

  const text =
    state === "done"
      ? "text-green"
      : state === "active"
      ? "text-primary"
      : "text-gray/40";

  return (
    <div className="flex flex-col items-center gap-2 relative z-10">
      {/* step circle */}
      <div className="relative">
        {/* solid mask to block the line underneath */}
        <div className="absolute inset-0 rounded-full bg-white z-0" />

        <div
          className={`relative z-10 h-9 w-9 rounded-full border flex items-center justify-center ${wrap}`}
        >
          {icon}
        </div>
      </div>

      <p className={`text-[11px] font-semibold ${text}`}>{label}</p>
    </div>
  );
}

export default function TaskStatusCard({
  stage,
}: {
  stage: "pending_accepting" | "active";
}) {
  const stepState: Record<StepKey, StepState> =
    stage === "pending_accepting"
      ? { accepted: "idle", processing: "idle", review: "idle" }
      : { accepted: "done", processing: "active", review: "idle" };

  const progressLineClass = stage === "active" ? "bg-primary" : "bg-gray/15";
  const progressWidth = stage === "active" ? "50%" : "0%";

  return (
    <Card className="rounded-2xl p-5">
      <h3 className="text-sm font-extrabold text-gray">Task Status</h3>

      <div className="mt-4 relative">
        {/* base line */}
        <div className="absolute left-0 right-0 top-[18px] h-[2px] bg-gray/15 z-0" />

        {/* progress line */}
        <div
          className={`absolute left-0 top-[18px] h-[2px] ${progressLineClass} z-0`}
          style={{ width: progressWidth }}
        />

        {/* steps */}
        <div className="grid grid-cols-3 relative z-10">
          <StatusStep
            label="Accepted"
            state={stepState.accepted}
            icon={<Check size={16} />}
          />

          <StatusStep
            label="Processing"
            state={stepState.processing}
            icon={
              <Loader2
                size={16}
                className={
                  stepState.processing === "active" ? "animate-spin" : ""
                }
              />
            }
          />

          <StatusStep
            label="In Review"
            state={stepState.review}
            icon={<Eye size={16} />}
          />
        </div>
      </div>
    </Card>
  );
}
