// app/(admin)/admin/dashboard/(pages)/service-request/_components/assign-agent-dialog.tsx
"use client";

import React, { useMemo, useState } from "react";
import Dialog from "@/components/dialogs/dialog";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { cn } from "@/lib/utils";
import { Calendar, Check, MapPin, Search, X } from "lucide-react";

import {
  AssignAgentDialogPayload,
  AssignAgentTab,
  AssignAgentAgent,
  AssignAgentDocument,
} from "@/app/(admin)/admin/types/assign-agent.types";
import { demoAssignAgentDialog } from "@/app/(admin)/admin/dummy-data/assign-agent.data";

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((x) => x[0]?.toUpperCase())
    .join("");

  return (
    <div className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-sm font-semibold text-primary">
      {initials}
    </div>
  );
}

function OnlineDot() {
  return (
    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green ring-2 ring-white" />
  );
}

function Pill({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-8 rounded-full px-4 text-sm font-semibold transition",
        active
          ? "bg-primary text-white"
          : "bg-secondary text-gray hover:text-black",
      )}
    >
      {children}
    </button>
  );
}

function AgentLoadPill({ agent }: { agent: AssignAgentAgent }) {
  const cls =
    agent.activeTone === "green"
      ? "border-green/25 bg-green/10 text-green"
      : agent.activeTone === "orange"
        ? "border-orange-200 bg-orange-50 text-orange-600"
        : "border-primary/15 bg-primary/5 text-primary";

  return (
    <div
      className={cn("rounded-md border px-3 py-1 text-xs font-semibold", cls)}
    >
      {agent.activeJobsLabel}
    </div>
  );
}

function MatchesZoneBadge() {
  return (
    <span className="rounded-md bg-green/10 px-2 py-1 text-[11px] font-semibold text-green">
      MATCHES ZONE
    </span>
  );
}

function DocIcon({ type }: { type: "pdf" | "docx" }) {
  return (
    <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
      <span className="text-xs font-bold">{type.toUpperCase()}</span>
    </div>
  );
}

function DocumentTile({
  doc,
  onToggle,
}: {
  doc: AssignAgentDocument;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "relative flex h-[92px] w-full flex-col items-center justify-center gap-2 rounded-xl border bg-white p-3 text-center transition",
        doc.selected
          ? "border-primary ring-1 ring-primary/15"
          : "border-gray/15 hover:bg-secondary",
      )}
    >
      {doc.selected ? (
        <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-primary text-white">
          <Check className="h-3 w-3" />
        </span>
      ) : null}

      <DocIcon type={doc.type} />
      <span className="truncate text-xs font-medium text-black">
        {doc.fileName}
      </span>
    </button>
  );
}

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={cn(
        "relative h-6 w-12 rounded-full border border-gray/15 transition",
        on ? "bg-primary" : "bg-secondary",
      )}
      aria-pressed={on}
    >
      <span
        className={cn(
          "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow-sm transition",
          on ? "left-[26px]" : "left-1",
        )}
      />
    </button>
  );
}

export default function AssignAgentDialog({
  open,
  onOpenChange,
  payload,
  onAssign,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  payload?: Partial<AssignAgentDialogPayload>;
  onAssign?: (agentId: string) => void;
}) {
  const data: AssignAgentDialogPayload = useMemo(() => {
    const p = payload ?? {};
    return {
      ...demoAssignAgentDialog,
      ...p,
      documents: p.documents ?? demoAssignAgentDialog.documents,
      agents: p.agents ?? demoAssignAgentDialog.agents,
    };
  }, [payload]);

  const [tab, setTab] = useState<AssignAgentTab>("recommended");
  const [q, setQ] = useState("");
  const [docs, setDocs] = useState<AssignAgentDocument[]>(data.documents);

  const [fee, setFee] = useState<number>(data.serviceFeeBDT);
  const [deadline, setDeadline] = useState<string>(data.deadlineLabel);
  const [autoReassign, setAutoReassign] = useState(false);

  const agents = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = data.agents.filter((a) => {
      if (!query) return true;
      return (
        a.name.toLowerCase().includes(query) ||
        a.role.toLowerCase().includes(query) ||
        a.phone.toLowerCase().includes(query)
      );
    });

    if (tab === "lowest_load") {
      list = [...list].sort((a, b) =>
        a.activeJobsLabel.localeCompare(b.activeJobsLabel),
      );
    } else if (tab === "closest_zone") {
      list = [...list].sort(
        (a, b) =>
          Number(Boolean(b.matchesZone)) - Number(Boolean(a.matchesZone)),
      );
    }

    return list;
  }, [data.agents, q, tab]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="xl">
      <div className="flex items-start justify-between border-b border-gray/15 px-6 py-4">
        <div>
          <h3 className="text-lg font-semibold text-black">
            Assign Agent for{" "}
            <span className="text-primary">#{data.postId}</span>
          </h3>
          <p className="mt-1 text-sm text-gray">
            Select the best available agent and specify requirements.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[360px_1fr]">
        {/* LEFT */}
        <div className="border-r border-gray/15 bg-white">
          {/* Map */}
          <div className="relative h-[210px] bg-secondary">
            <div className="absolute inset-0 bg-secondary" />
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm">
              <MapPin className="h-4 w-4 text-red-500" />
              <span className="text-sm font-semibold text-black">
                {data.zoneLabel}
              </span>
            </div>
          </div>

          <div className="space-y-6 p-5">
            {/* Service details */}
            <div>
              <p className="text-xs font-semibold tracking-wide text-gray">
                SERVICE DETAILS
              </p>
              <div className="mt-3 flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  ⟡
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-black">
                    {data.serviceTitle}
                  </p>
                  <p className="mt-1 text-sm text-gray">{data.serviceDesc}</p>
                </div>
              </div>
            </div>

            {/* Docs */}
            <div>
              <p className="text-xs font-semibold tracking-wide text-gray">
                PROVIDE DOCUMENTS
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {docs.map((d) => (
                  <DocumentTile
                    key={d.id}
                    doc={d}
                    onToggle={() =>
                      setDocs((p) =>
                        p.map((x) =>
                          x.id === d.id ? { ...x, selected: !x.selected } : x,
                        ),
                      )
                    }
                  />
                ))}
              </div>
            </div>

            {/* Fee */}
            <div>
              <p className="text-xs font-semibold tracking-wide text-gray">
                SERVICE FEES
              </p>
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-gray/15 bg-white px-3 py-3">
                <span className="text-sm font-semibold text-gray">৳</span>
                <input
                  value={fee}
                  onChange={(e) => setFee(Number(e.target.value || 0))}
                  className="w-full bg-transparent text-sm font-semibold text-black outline-none"
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-gray">Deadline</span>
                <span className="font-semibold text-red-500">{deadline}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white">
          <div className="p-5">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search agents by name or zone"
                className={cn(
                  "h-10 w-full rounded-xl border border-gray/15 bg-white pl-10 pr-3 text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-primary/15",
                )}
              />
            </div>

            {/* Tabs */}
            <div className="mt-3 flex items-center gap-2">
              <Pill
                active={tab === "recommended"}
                onClick={() => setTab("recommended")}
              >
                Recommended
              </Pill>
              <Pill
                active={tab === "lowest_load"}
                onClick={() => setTab("lowest_load")}
              >
                Lowest Load
              </Pill>
              <Pill
                active={tab === "closest_zone"}
                onClick={() => setTab("closest_zone")}
              >
                Closest Zone
              </Pill>
            </div>

            {/* Agent list */}
            <div className="mt-4 space-y-3">
              {agents.map((a, idx) => {
                const isHighlighted = idx === 0 && tab === "recommended";
                return (
                  <Card
                    key={a.id}
                    className={cn(
                      "border border-gray/15 bg-white p-4",
                      isHighlighted
                        ? "bg-primary/3 ring-1 ring-primary/10"
                        : "",
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar name={a.name} />
                          {a.online ? <OnlineDot /> : null}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-black">{a.name}</p>
                            {a.matchesZone ? <MatchesZoneBadge /> : null}
                          </div>
                          <p className="text-sm text-gray">{a.role}</p>
                          <p className="text-sm font-semibold text-primary">
                            {a.phone}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <AgentLoadPill agent={a} />
                        <Button
                          size="sm"
                          className="h-9 px-4"
                          onClick={() => onAssign?.(a.id)}
                        >
                          Assign Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-2 border-t border-gray/15 bg-white px-4 py-4 sm:px-6">
            <p className="text-xs font-semibold tracking-wide text-gray">
              ACCEPTANCE DEADLINE
            </p>

            <div className="mt-3 flex flex-col gap-4">
              {/* Left: date */}
              <div className="col-span-12 lg:col-span-7">
                <p className="text-sm font-semibold text-black">
                  Set Acceptance Timeframe
                </p>

                <div className="mt-2 flex h-11 items-center gap-3 rounded-xl border border-gray/15 bg-white px-3">
                  <Calendar className="h-4 w-4 text-gray" />
                  <input
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-black outline-none placeholder:text-gray"
                  />
                </div>
              </div>

              {/* Right: toggle */}
              <div className="">
                <div className="flex justify-between gap-4">
                  <div className="lg:mr-4 lg:text-right">
                    <p className="text-sm font-semibold text-black">
                      Auto-reassign if not accepted
                    </p>
                    <p className="mt-1 text-sm text-gray">
                      Enable automatic rerouting
                    </p>
                  </div>

                  <Toggle on={autoReassign} onChange={setAutoReassign} />
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs text-gray">
              The request will be automatically dispatched to the next best
              available agent if not accepted within the timeframe.
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
