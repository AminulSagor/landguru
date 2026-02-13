"use client";

import React, { useMemo, useState } from "react";
import { Search, MapPin, FileText, Calendar, CheckCircle2 } from "lucide-react";
import Dialog from "@/components/dialogs/dialog";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { cn } from "@/lib/utils";

type Agent = {
  id: string;
  name: string;
  role: string;
  phone: string;
  activeJobsText: string;
  activeJobsTone?: "green" | "blue" | "orange";
  matchesZone?: boolean;
  recommended?: boolean;
};

export default function AssignAgentDialog({
  open,
  onOpenChange,
  postId = "POST-1044",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  postId?: string;
}) {
  const [tab, setTab] = useState<"recommended" | "lowest" | "closest">(
    "recommended",
  );
  const [q, setQ] = useState("");

  const agents: Agent[] = useMemo(
    () => [
      {
        id: "1",
        name: "Mr. Karim",
        role: "Senior Surveyor",
        phone: "+880 1711-234567",
        activeJobsText: "Active Jobs: 1 (Low)",
        activeJobsTone: "green",
        matchesZone: true,
        recommended: true,
      },
      {
        id: "2",
        name: "Mr. Ahmed",
        role: "Surveyor",
        phone: "+880 1611-998877",
        activeJobsText: "Active Jobs: 0",
        activeJobsTone: "blue",
      },
      {
        id: "3",
        name: "Mr. Farhan",
        role: "Surveyor",
        phone: "+880 1722-111222",
        activeJobsText: "Active Jobs: 2",
        activeJobsTone: "orange",
      },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    let list = agents.filter(
      (a) =>
        !s ||
        a.name.toLowerCase().includes(s) ||
        a.role.toLowerCase().includes(s),
    );

    if (tab === "recommended")
      list = list.sort(
        (a, b) => Number(!!b.recommended) - Number(!!a.recommended),
      );
    if (tab === "lowest") list = list; // design-only
    if (tab === "closest") list = list; // design-only

    return list;
  }, [agents, q, tab]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="xl">
      <div>
        {/* header */}
        <div className="flex items-start justify-between gap-4 border-b border-gray/10 px-6 py-5">
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray">
              Assign Agent for{" "}
              <span className="text-primary font-semibold">#{postId}</span>
            </p>
            <p className="text-xs text-gray">
              Select the best available agent and specify requirements.
            </p>
          </div>
        </div>

        {/* content */}
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[360px_1fr]">
          {/* left */}
          <div className="border-b border-gray/10 lg:border-b-0 lg:border-r lg:border-gray/10">
            {/* map */}
            <div className="relative h-[200px] w-full bg-gray/5">
              <div className="absolute left-4 top-4 rounded-xl border border-gray/15 bg-white px-3 py-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <p className="text-xs font-semibold text-gray">
                    Block-C, Banani
                  </p>
                </div>
              </div>

              {/* tiny fake map pins */}
              <div className="absolute inset-0 grid place-items-center">
                <p className="text-xs text-gray">Map Preview</p>
              </div>
            </div>

            <div className="space-y-6 px-6 py-5">
              {/* service details */}
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-wide text-gray">
                  SERVICE DETAILS
                </p>

                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray">
                      Pentagraph Map
                    </p>
                    <p className="text-xs text-gray">
                      Detailed overlay of mouza maps with physical plot
                      boundaries.
                    </p>
                  </div>
                </div>
              </div>

              {/* documents */}
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-wide text-gray">
                  PROVIDE DOCUMENTS
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <DocTile selected name="Deed_doc1.pdf" />
                  <DocTile name="Deed_doc2.docx" />
                  <DocTile selected name="CS_Khatian.pdf" />
                  <DocTile name="Deed_doc2.docx" />
                </div>
              </div>

              {/* fees */}
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-wide text-gray">
                  SERVICE FEES
                </p>

                <div className="rounded-xl border border-gray/15 bg-white px-4 py-3">
                  <p className="text-sm font-semibold text-gray">5000</p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray">Deadline</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-[#EF4444]">
                      Oct 28, 2026
                    </p>
                    <Calendar className="h-4 w-4 text-[#EF4444]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="">
            <div className="space-y-4 px-6 py-5">
              {/* search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search agents by name or zone"
                  className="h-10 w-full rounded-xl border border-gray/15 bg-white pl-9 pr-3 text-sm text-gray outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* tabs */}
              <div className="flex flex-wrap items-center gap-2">
                <Pill
                  active={tab === "recommended"}
                  onClick={() => setTab("recommended")}
                >
                  Recommended
                </Pill>
                <Pill
                  active={tab === "lowest"}
                  onClick={() => setTab("lowest")}
                >
                  Lowest Load
                </Pill>
                <Pill
                  active={tab === "closest"}
                  onClick={() => setTab("closest")}
                >
                  Closest Zone
                </Pill>
              </div>

              {/* list */}
              <div className="space-y-3">
                {filtered.map((a, idx) => (
                  <AgentRow key={a.id} agent={a} highlight={idx === 0} />
                ))}
              </div>
            </div>

            {/* bottom section */}
            <div className="border-t border-gray/10 px-6 py-5">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs font-semibold tracking-wide text-gray">
                    ACCEPTANCE DEADLINE
                  </p>

                  <p className="text-xs text-gray">Set Acceptance Timeframe</p>

                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-full items-center gap-2 rounded-xl border border-gray/15 bg-white px-3">
                      <Calendar className="h-4 w-4 text-gray" />
                      <p className="text-sm font-semibold text-gray">
                        28-Oct-2026
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold tracking-wide text-gray">
                    Auto-reassign if not accepted
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="relative h-6 w-11 rounded-full bg-gray/10"
                      aria-label="Toggle auto re-routing"
                    >
                      <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow" />
                    </button>

                    <p className="text-xs text-gray">
                      Enable automatic rerouting
                    </p>
                  </div>

                  <p className="text-xs text-gray">
                    The request will be automatically dispatched to the next
                    best available agent if not accepted within the timeframe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

/* ---------------- tiny ui parts ---------------- */

function Pill({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-8 rounded-full border px-4 text-xs font-semibold",
        active
          ? "border-primary bg-primary text-white"
          : "border-gray/15 bg-gray/5 text-gray",
      )}
    >
      {children}
    </button>
  );
}

function DocTile({ name, selected }: { name: string; selected?: boolean }) {
  return (
    <div
      className={cn(
        "relative rounded-xl border bg-white p-3",
        selected ? "border-primary" : "border-gray/15",
      )}
    >
      {selected && (
        <div className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-primary">
          <CheckCircle2 className="h-4 w-4 text-white" />
        </div>
      )}

      <div className="grid h-16 w-full place-items-center rounded-lg bg-gray/5">
        <FileText
          className={cn("h-7 w-7", selected ? "text-primary" : "text-gray")}
        />
      </div>

      <p className="mt-2 text-xs font-semibold text-gray">{name}</p>
    </div>
  );
}

function TonePill({
  text,
  tone,
}: {
  text: string;
  tone?: "green" | "blue" | "orange";
}) {
  const cls =
    tone === "green"
      ? "border-green/20 bg-green/10 text-green"
      : tone === "orange"
        ? "border-[#F59E0B]/20 bg-[#F59E0B]/10 text-[#F59E0B]"
        : "border-primary/20 bg-primary/10 text-primary";

  return (
    <span
      className={cn("rounded-lg border px-3 py-1 text-xs font-semibold", cls)}
    >
      {text}
    </span>
  );
}

function AgentRow({ agent, highlight }: { agent: Agent; highlight?: boolean }) {
  return (
    <Card
      className={cn(
        "flex items-center justify-between gap-4 rounded-xl border bg-white p-4",
        highlight ? "border-primary/30 bg-primary/5" : "border-gray/15",
      )}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="h-12 w-12 rounded-full bg-gray/10" />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green" />
        </div>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-gray">{agent.name}</p>
            {agent.matchesZone && (
              <span className="rounded-md bg-green/10 px-2 py-1 text-xs font-semibold text-green">
                MATCHES ZONE
              </span>
            )}
          </div>

          <p className="text-xs text-gray">{agent.role}</p>

          <p className="text-xs font-semibold text-primary">{agent.phone}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <TonePill text={agent.activeJobsText} tone={agent.activeJobsTone} />

        <Button
          variant="primary"
          className="h-9 rounded-xl px-4 text-xs font-semibold"
        >
          Assign Now
        </Button>
      </div>
    </Card>
  );
}
