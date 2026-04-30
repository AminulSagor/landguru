"use client";

import React, { useState } from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import AssignAgentDialog from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/assign-agent-dialog";
import type { PropertyPostItem } from "@/types/admin/property-post/property.types";

type ProgressStatus = "none" | "pending" | "in_progress" | "submitted" | "verified";

function humanizeServiceKey(serviceKey: string) {
  return serviceKey
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function toServiceProgressStatus(status?: string | null): ProgressStatus {
  const normalized = (status ?? "").toUpperCase();

  if (normalized === "PENDING") return "pending";
  if (normalized === "IN_PROGRESS") return "in_progress";
  if (normalized === "SUBMITTED") return "submitted";
  if (normalized === "VERIFIED" || normalized === "COMPLETED") return "verified";

  return "none";
}

function parseProgressText(value?: string | null) {
  const match = value?.match(/(\d+)\s*\/\s*(\d+)/);

  if (!match) {
    return { done: 0, total: 0 };
  }

  return {
    done: Number.parseInt(match[1], 10) || 0,
    total: Number.parseInt(match[2], 10) || 0,
  };
}


export default function ServiceProgressCard({
  property,
}: {
  property: PropertyPostItem;
}) {
  const [open, setOpen] = useState(false);
  const selectedServices = property.selectedServiceslist?.length
    ? property.selectedServiceslist.map((service) => service.serviceKey)
    : property.selectedServices ?? [];
  const selectedServiceLabels = selectedServices.map((service) =>
    humanizeServiceKey(service),
  );
  const serviceRowsSource =
    property.serviceAssignments && property.serviceAssignments.length > 0
      ? property.serviceAssignments.map((assignment) => ({
          label: assignment.serviceName || humanizeServiceKey(assignment.serviceKey),
          id: assignment.id,
          status: assignment.status,
          hasAgent: Boolean(assignment.agentId),
        }))
      : selectedServiceLabels.map((label) => ({
          label,
          id: undefined,
          status: undefined,
          hasAgent: false,
        }));
  const progressFromApi = parseProgressText(property.servicesProgress);
  const fallbackTotal = serviceRowsSource.length;
  const fallbackDone = serviceRowsSource.filter((row) => {
    const mapped = toServiceProgressStatus(row.status);
    return mapped === "submitted" || mapped === "verified";
  }).length;
  const total = progressFromApi.total > 0 ? progressFromApi.total : fallbackTotal;
  const done = progressFromApi.total > 0 ? progressFromApi.done : fallbackDone;
  const completedText = `(${done}/${total} Completed)`;
  const noteText =
    total > done ? `${total - done} service(s) still pending` : undefined;
  const postRef = `#${property.id.slice(0, 8).toUpperCase()}`;

  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray">Service Progress</p>
        <p className="text-xs font-extrabold text-gray">{completedText}</p>
      </div>

      <div className="mt-3">
        <ProgressBar done={done} total={total} />
        {noteText && (
          <p className="text-xs font-semibold text-[#B91C1C] mt-2">
            {noteText}
          </p>
        )}
      </div>

      <div className="border border-gray/15 rounded-lg bg-white mt-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[760px] w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left text-xs font-extrabold text-gray px-4 py-3">
                  SERVICE TYPE
                </th>
                <th className="text-left text-xs font-extrabold text-gray px-4 py-3">
                  ASSIGNED AGENT
                </th>
                <th className="text-left text-xs font-extrabold text-gray px-4 py-3">
                  PROGRESS
                </th>
                <th className="text-right text-xs font-extrabold text-gray px-4 py-3">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {serviceRowsSource.map((row, idx) => {
                const progressStatus = toServiceProgressStatus(row.status);
                const action = !row.hasAgent
                  ? {
                      kind: "assign" as const,
                      label: "Assign Agent",
                    }
                  : progressStatus === "submitted"
                    ? {
                        kind: "review" as const,
                        label: "Review",
                      }
                    : {
                        kind: "view" as const,
                        label: "View",
                      };
                const disabled = action.kind === "disabled";
                return (
                  <tr
                    key={`${row.label}-${idx}`}
                    className="border-t border-gray/15"
                  >
                    <td className="px-4 py-3">
                      <p className="text-xs font-extrabold text-gray">
                        {row.label}
                      </p>
                      {row.id && (
                        <p className="text-xs font-semibold text-gray">
                          #{row.id.slice(0, 8).toUpperCase()}
                        </p>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <div>
                        <p className="text-xs font-extrabold text-gray">
                          None
                        </p>
                        <p className="text-xs font-semibold text-gray">
                          None
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <ProgressPill status={progressStatus} />
                    </td>

                    <td className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        variant={
                          action.kind === "review" ? "primary" : "secondary"
                        }
                        disabled={disabled}
                        onClick={() => setOpen(true)}
                      >
                        {action.label}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <AssignAgentDialog open={open} onOpenChange={setOpen} postId={postRef} />
    </Card>
  );
}

function ProgressPill({ status }: { status: ProgressStatus }) {
  const map: Record<string, string> = {
    none: "bg-secondary text-gray border border-gray/15",
    pending: "bg-[#FFEAD5] text-[#C2410C] border border-[#FDBA74]",
    in_progress: "bg-[#FEF9C3] text-[#A16207] border border-[#FDE047]",
    submitted: "bg-[#DCFCE7] text-green border border-[#86EFAC]",
    verified: "bg-[#DBEAFE] text-primary border border-[#93C5FD]",
  };

  const label: Record<string, string> = {
    none: "None",
    pending: "Pending",
    in_progress: "In Progress",
    submitted: "Submitted",
    verified: "Verified",
  };

  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${map[status]}`}>
      {label[status]}
    </span>
  );
}

function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total <= 0 ? 0 : Math.min(100, Math.round((done / total) * 100));
  return (
    <div className="h-2 bg-secondary border border-gray/15 rounded-full overflow-hidden">
      <div className="h-full bg-green" style={{ width: `${pct}%` }} />
    </div>
  );
}
