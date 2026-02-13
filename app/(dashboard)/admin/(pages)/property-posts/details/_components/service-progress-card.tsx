"use client";

import React, { useState } from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { PropertyDetails } from "@/app/(dashboard)/admin/types/property.types";
import Avatar from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/avatar";
import AssignAgentDialog from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/assign-agent-dialog";


export default function ServiceProgressCard({
  data,
}: {
  data: NonNullable<PropertyDetails["serviceProgress"]>;
}) {
  const [open, setOpen] = useState(false);
  const match = data.completedText.match(/\((\d+)\/(\d+)/);
  const done = match ? Number(match[1]) : 0;
  const total = match ? Number(match[2]) : 0;

  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray">Service Progress</p>
        <p className="text-xs font-extrabold text-gray">{data.completedText}</p>
      </div>

      <div className="mt-3">
        <ProgressBar done={done} total={total} />
        {data.noteText && (
          <p className="text-xs font-semibold text-[#B91C1C] mt-2">
            {data.noteText}
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
              {data.rows.map((r, idx) => {
                const disabled = r.action.kind === "disabled";
                return (
                  <tr
                    key={`${r.serviceType}-${idx}`}
                    className="border-t border-gray/15"
                  >
                    <td className="px-4 py-3">
                      <p className="text-xs font-extrabold text-gray">
                        {r.serviceType}
                      </p>
                      {r.serviceRef && (
                        <p className="text-xs font-semibold text-gray">
                          {r.serviceRef}
                        </p>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {r.assignedAgent ? (
                        <div className="flex items-center gap-3">
                          <Avatar
                            url={r.assignedAgent.avatarUrl}
                            name={r.assignedAgent.name}
                          />
                          <div>
                            <p className="text-xs font-extrabold text-gray">
                              {r.assignedAgent.name}
                            </p>
                            <p className="text-xs font-semibold text-gray">
                              {r.assignedAgent.role}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs font-extrabold text-gray">
                            None
                          </p>
                          <p className="text-xs font-semibold text-gray">
                            None
                          </p>
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <ProgressPill status={r.progressStatus} />
                    </td>

                    <td className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        variant={
                          r.action.kind === "review" ? "primary" : "secondary"
                        }
                        disabled={disabled}
                        onClick={() => setOpen(true)}
                      >
                        {r.action.label}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <AssignAgentDialog open={open} onOpenChange={setOpen} />
    </Card>
  );
}

function ProgressPill({
  status,
}: {
  status: NonNullable<
    PropertyDetails["serviceProgress"]
  >["rows"][number]["progressStatus"];
}) {
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
