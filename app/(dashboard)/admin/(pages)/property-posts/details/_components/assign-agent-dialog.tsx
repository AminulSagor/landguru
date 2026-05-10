"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, FileText, Calendar, CheckCircle2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Dialog from "@/components/dialogs/dialog";
import Button from "@/components/buttons/button";
import { cn } from "@/lib/utils";
import { serviceRequestAssignmentService } from "@/service/admin/service-requests/service-request-assignment.service";
import type {
  AvailableAgentFilter,
  AvailableAgentItem,
} from "@/types/admin/service-requests/service-request-assignment.types";
import type {
  PropertyDocumentCategory,
  PropertyPostDocument,
} from "@/types/admin/property-post/property.types";

type DocumentOption = {
  id: string;
  name: string;
  url: string;
  category?: PropertyDocumentCategory;
};

const DEFAULT_MAP_EMBED =
  "https://www.google.com/maps?q=Dhaka%20Bangladesh&output=embed";

const SERVICE_DOC_CATEGORIES: Record<string, PropertyDocumentCategory[]> = {
  ownership_history_validation: ["DEED", "KHATIAN"],
  pentagraph_map: ["DEED", "KHATIAN"],
  physical_estimate: ["PHOTO", "VIDEO", "DEED", "KHATIAN", "OTHER"],
  document_organization: ["DEED", "KHATIAN", "OTHER", "PHOTO", "VIDEO"],
};

function toTitleCase(value: string): string {
  return value
    .replace(/[_-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => {
      const head = part.slice(0, 1).toUpperCase();
      const tail = part.slice(1).toLowerCase();
      return `${head}${tail}`;
    })
    .join(" ");
}

function formatDesignation(designation: string): string {
  const cleaned = designation?.trim();
  if (!cleaned) return "";
  return toTitleCase(cleaned);
}

function normalizeActiveJobsLabel(label?: string | null): string | null {
  const cleaned = label?.trim();
  if (!cleaned || cleaned.toLowerCase() === "null") return null;
  return cleaned;
}

function getActiveJobsCount(agent: AvailableAgentItem): number {
  const count = Number(agent.activeJobs ?? 0);
  return Number.isFinite(count) ? count : 0;
}

function getActiveJobsText(agent: AvailableAgentItem): string {
  const count = getActiveJobsCount(agent);
  const label = normalizeActiveJobsLabel(agent.activeJobsLabel);

  if (label) {
    return `Active Jobs: ${count} (${toTitleCase(label)})`;
  }

  return `Active Jobs: ${count}`;
}

function getActiveJobsTone(
  agent: AvailableAgentItem,
): "green" | "blue" | "orange" {
  const count = getActiveJobsCount(agent);
  const label = normalizeActiveJobsLabel(agent.activeJobsLabel)?.toLowerCase();

  if (label === "low") return "green";
  if (label === "high") return "orange";
  if (label === "medium") return "blue";

  if (count === 0) return "blue";
  if (count <= 1) return "green";
  return "orange";
}

function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "";

  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return `${first}${last}`.toUpperCase();
}

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: { data?: { message?: string } } }).response
      ?.data?.message === "string"
  ) {
    return (error as { response?: { data?: { message?: string } } }).response!
      .data!.message!;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Failed to assign agent.";
}

function parseDeadlineDate(value?: string | null): Date | null {
  if (!value) return null;
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

function formatDeadline(value?: string | Date | null): string {
  if (!value) return "Not selected";
  const parsed = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return typeof value === "string" ? value : "Not selected";
  }

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getFileName(fileUrl: string): string {
  const safeUrl = fileUrl.split("?")[0] ?? fileUrl;
  const segments = safeUrl.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? fileUrl;
}

function getDocLabel(name: string): string {
  const trimmed = name.trim();
  const parts = trimmed.split(".");
  const ext = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";

  if (ext === "pdf") return "PDF";
  if (ext === "docx" || ext === "doc") return "DOC";
  return "FILE";
}

function buildMapEmbedUrl(mapEmbedUrl?: string, address?: string): string {
  if (mapEmbedUrl?.trim()) {
    return mapEmbedUrl.trim();
  }

  const cleaned = address?.trim();
  if (cleaned) {
    return `https://www.google.com/maps?q=${encodeURIComponent(
      cleaned,
    )}&output=embed`;
  }

  return DEFAULT_MAP_EMBED;
}

function normalizeDocuments(docs?: PropertyPostDocument[]): DocumentOption[] {
  if (!docs?.length) return [];

  const seen = new Set<string>();
  const result: DocumentOption[] = [];

  docs.forEach((doc) => {
    const url = doc.fileUrl?.trim();
    if (!url || seen.has(url)) return;
    seen.add(url);
    result.push({
      id: doc.id ?? url,
      name: getFileName(url),
      url,
      category: doc.category,
    });
  });

  return result;
}

function filterDocumentsForService(
  docs: DocumentOption[],
  serviceKey?: string,
): DocumentOption[] {
  if (!serviceKey) return docs;
  const normalizedKey = serviceKey.trim().toLowerCase();
  const allowed = SERVICE_DOC_CATEGORIES[normalizedKey];
  if (!allowed) return docs;

  return docs.filter((doc) => {
    if (!doc.category) return allowed.includes("OTHER");
    return allowed.includes(doc.category);
  });
}

export default function AssignAgentDialog({
  open,
  onOpenChange,
  postId = "POST-1044",
  sellPostId,
  serviceKey,
  serviceName,
  serviceDescription,
  feeAmount,
  responseDeadline,
  documents,
  address,
  mapEmbedUrl,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  postId?: string;
  sellPostId?: string;
  serviceKey?: string;
  serviceName?: string;
  serviceDescription?: string;
  feeAmount?: number | null;
  responseDeadline?: string | null;
  documents?: PropertyPostDocument[];
  address?: string;
  mapEmbedUrl?: string;
}) {
  const router = useRouter();

  const [tab, setTab] = useState<"recommended" | "lowest" | "closest">(
    "recommended",
  );
  const [q, setQ] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [feeInput, setFeeInput] = useState(() =>
    typeof feeAmount === "number" && Number.isFinite(feeAmount)
      ? String(feeAmount)
      : "",
  );
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(() =>
    parseDeadlineDate(responseDeadline),
  );
  // const [autoReassign, setAutoReassign] = useState(false);

  const resolvedPostId = postId.startsWith("#") ? postId.slice(1) : postId;
  const resolvedSellPostId = sellPostId?.trim() || resolvedPostId;
  const resolvedServiceKey = serviceKey?.trim();
  const resolvedServiceName = serviceName?.trim();

  const parsedFee = Number(feeInput);
  const resolvedFeeAmount = Number.isFinite(parsedFee)
    ? Math.max(parsedFee, 0)
    : 0;

  const normalizedDocuments = useMemo(
    () => normalizeDocuments(documents),
    [documents],
  );

  const filteredDocuments = useMemo(
    () => filterDocumentsForService(normalizedDocuments, resolvedServiceKey),
    [normalizedDocuments, resolvedServiceKey],
  );

  const selectedDocUrls = Array.from(selectedDocs);

  const hasRequiredPayload = Boolean(
    resolvedSellPostId &&
    resolvedServiceKey &&
    resolvedServiceName &&
    deadlineDate,
  );

  const mapEmbed = buildMapEmbedUrl(mapEmbedUrl, address);
  const activeFilter: AvailableAgentFilter =
    tab === "recommended"
      ? "RECOMMENDED"
      : tab === "lowest"
        ? "LOWEST_LOAD"
        : "CLOSEST_ZONE";

  const postLabel = postId.startsWith("#") ? postId : `#${postId}`;
  const displayServiceTitle = resolvedServiceName || "Service";
  const displayServiceDescription = serviceDescription?.trim();
  const deadlineLabel = formatDeadline(deadlineDate);
  const addressLabel = address?.trim() || "Location unavailable";

  const hasDocuments = filteredDocuments.length > 0;
  const noDocumentsForService =
    normalizedDocuments.length > 0 && filteredDocuments.length === 0;

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(q.trim().toLowerCase());
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [q]);

  React.useEffect(() => {
    if (!open) return;

    setFeeInput(
      typeof feeAmount === "number" && Number.isFinite(feeAmount)
        ? String(feeAmount)
        : "",
    );
  }, [open, feeAmount]);

  React.useEffect(() => {
    if (!open) return;

    setDeadlineDate(parseDeadlineDate(responseDeadline));
  }, [open, responseDeadline]);

  React.useEffect(() => {
    if (!open) return;

    setSelectedDocs(new Set(filteredDocuments.map((doc) => doc.url)));
  }, [open, filteredDocuments]);

  // React.useEffect(() => {
  //   if (!open) return;

  //   setAutoReassign(false);
  // }, [open]);

  const agentsQuery = useQuery({
    queryKey: ["available-agents", resolvedSellPostId, activeFilter],
    queryFn: () =>
      serviceRequestAssignmentService.getAvailableAgents({
        sellPostId: resolvedSellPostId,
        filter: activeFilter,
        page: 1,
        limit: 10,
      }),
    enabled: open && Boolean(resolvedSellPostId),
    placeholderData: (previousData) => previousData,
  });

  const agents = useMemo<AvailableAgentItem[]>(() => {
    const sourceAgents = agentsQuery.data?.data ?? [];
    const normalizedQuery = debouncedQuery;
    let list = sourceAgents;

    if (normalizedQuery) {
      list = list.filter((agent) => {
        const name = agent.name.toLowerCase();
        const role = agent.designation.toLowerCase();
        const phone = agent.phone.toLowerCase();
        const location = agent.location.toLowerCase();

        return (
          name.includes(normalizedQuery) ||
          role.includes(normalizedQuery) ||
          phone.includes(normalizedQuery) ||
          location.includes(normalizedQuery)
        );
      });
    }

    let sorted = list;

    if (tab === "lowest") {
      sorted = [...sorted].sort(
        (a, b) => getActiveJobsCount(a) - getActiveJobsCount(b),
      );
    }

    if (tab === "closest") {
      sorted = [...sorted].sort(
        (a, b) =>
          Number(Boolean(b.matchesZone)) - Number(Boolean(a.matchesZone)),
      );
    }

    return sorted;
  }, [agentsQuery.data?.data, debouncedQuery, tab]);

  const assignMutation = useMutation({
    mutationFn: (agentId: string) => {
      if (!hasRequiredPayload) {
        throw new Error("Missing service assignment details.");
      }

      return serviceRequestAssignmentService.assignAgent({
        sellPostId: resolvedSellPostId,
        agentId,
        serviceKey: resolvedServiceKey as string,
        serviceName: resolvedServiceName as string,
        feeAmount: resolvedFeeAmount,
        responseDeadline: deadlineDate!.toISOString(),
        documents: selectedDocUrls,
        // autoReassign,
      });
    },
    onSuccess: (response) => {
      toast.success(response.message || "Agent assigned successfully.");
      onOpenChange(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const isLoading = agentsQuery.isLoading;
  const hasError = agentsQuery.isError;
  const showEmpty = agentsQuery.isFetched && agents.length === 0;
  const isAssigning = assignMutation.isPending;

  const handleAssign = (agentId: string) => {
    if (!hasRequiredPayload) {
      toast.error("Missing service assignment details.");
      return;
    }

    assignMutation.mutate(agentId);
  };

  const toggleDocument = (url: string) => {
    setSelectedDocs((prev) => {
      const next = new Set(prev);

      if (next.has(url)) {
        next.delete(url);
      } else {
        next.add(url);
      }

      return next;
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      size="xl"
      className="max-w-5xl overflow-hidden"
    >
      <div>
        {/* header */}
        <div className="flex items-start justify-between gap-4 border-b border-gray/15 px-6 py-5">
          <div className="space-y-1">
            <p className="text-lg font-semibold text-[#0F172A]">
              Assign Agent for{" "}
              <span className="font-semibold text-primary">{postLabel}</span>
            </p>
            <p className="text-xs text-gray">
              Select the best available agent and specify requirements.
            </p>
          </div>
        </div>

        {/* content */}
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[360px_1fr]">
          {/* left */}
          <div className="border-b border-gray/15 lg:border-b-0 lg:border-r lg:border-gray/15">
            {/* map */}
            <div className="relative h-[200px] w-full overflow-hidden bg-gray/5">
              <iframe
                title="Property location"
                src={mapEmbed}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              <div className="pointer-events-none absolute left-4 top-4 rounded-lg bg-white px-3 py-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {addressLabel}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 p-5">
              {/* service details */}
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-wide text-gray">
                  SERVICE DETAILS
                </p>

                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[#0F172A]">
                      {displayServiceTitle}
                    </p>

                    {displayServiceDescription ? (
                      <p className="text-xs text-gray">
                        {displayServiceDescription}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* documents */}
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-wide text-gray">
                  PROVIDE DOCUMENTS
                </p>

                {hasDocuments ? (
                  <div className="grid grid-cols-2 gap-3">
                    {filteredDocuments.map((doc) => (
                      <DocTile
                        key={doc.id}
                        name={doc.name}
                        selected={selectedDocs.has(doc.url)}
                        onClick={() => toggleDocument(doc.url)}
                      />
                    ))}
                  </div>
                ) : noDocumentsForService ? (
                  <p className="text-xs text-gray">
                    No documents available for this service.
                  </p>
                ) : (
                  <p className="text-xs text-gray">No documents found.</p>
                )}
              </div>

              {/* fees */}
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-wide text-gray">
                  SERVICE FEES
                </p>

                <div className="flex items-center gap-3 rounded-xl border border-gray/15 bg-white px-3 py-3">
                  <span className="text-sm font-semibold text-gray">৳</span>
                  <input
                    type="number"
                    min={0}
                    inputMode="decimal"
                    value={feeInput}
                    onChange={(event) => setFeeInput(event.target.value)}
                    placeholder="5000"
                    className="w-full bg-transparent text-sm font-semibold text-[#0F172A] outline-none placeholder:text-gray"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-xs text-gray">Deadline</span>
                  <span className="text-xs font-semibold text-[#EF4444]">
                    {deadlineLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="bg-white">
            <div className="space-y-4 p-5">
              {/* search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search agents by name or zone"
                  className="h-10 w-full rounded-xl border border-gray/15 bg-white pl-10 pr-3 text-sm text-[#0F172A] outline-none transition placeholder:text-gray focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
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
                {isLoading ? (
                  <p className="text-xs text-gray">Loading agents...</p>
                ) : null}

                {!isLoading && hasError ? (
                  <p className="text-xs text-[#EF4444]">
                    Unable to load agents.
                  </p>
                ) : null}

                {!isLoading && !hasError && showEmpty ? (
                  <p className="text-xs text-gray">No agents found.</p>
                ) : null}

                {!isLoading && !hasError
                  ? agents.map((agent, index) => (
                      <AgentRow
                        key={agent.id}
                        agent={agent}
                        highlight={Boolean(agent.matchesZone)}
                        onAssign={handleAssign}
                        disabled={isAssigning || !hasRequiredPayload}
                        assigning={isAssigning}
                      />
                    ))
                  : null}
              </div>
            </div>

            {/* bottom deadline section */}
            <div className="border-t border-gray/15 px-6 py-5">
              <p className="text-xs font-semibold tracking-wide text-gray">
                ACCEPTANCE DEADLINE
              </p>

              <div className="mt-4 max-w-[340px]">
                <p className="text-sm font-semibold text-[#0F172A]">
                  Set Acceptance Timeframe
                </p>

                <div className="mt-2 flex h-11 items-center gap-3 rounded-xl border border-gray/15 bg-white px-3">
                  <Calendar className="h-4 w-4 text-gray" />

                  <DatePicker
                    selected={deadlineDate}
                    onChange={(date: Date | null) => setDeadlineDate(date)}
                    placeholderText="Select deadline"
                    dateFormat="dd-MMM-yyyy"
                    minDate={new Date()}
                    popperPlacement="bottom-start"
                    popperClassName="deadline-datepicker-popper"
                    wrapperClassName="w-full"
                    calendarClassName="deadline-datepicker-calendar"
                    className="w-full bg-transparent text-sm font-semibold text-[#0F172A] outline-none placeholder:text-gray"
                  />
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
        "h-8 rounded-full border px-4 text-xs font-semibold transition",
        active
          ? "border-primary bg-primary text-white"
          : "border-gray/15 bg-white text-gray hover:bg-gray/5",
      )}
    >
      {children}
    </button>
  );
}

function DocTile({
  name,
  selected,
  onClick,
}: {
  name: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[92px] flex-col items-center justify-center gap-2 rounded-xl border bg-white p-3 text-center transition",
        selected
          ? "border-primary ring-1 ring-primary/15"
          : "border-gray/15 hover:bg-gray/5",
      )}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.();
        }
      }}
    >
      {selected && (
        <div className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-primary">
          <CheckCircle2 className="h-4 w-4 text-white" />
        </div>
      )}

      <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
        <span className="text-[11px] font-bold">{getDocLabel(name)}</span>
      </div>

      <p className="truncate text-[11px] font-semibold text-[#0F172A]">
        {name}
      </p>
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
      ? "border-[#C4ECD3] bg-[#EAF9F1] text-green"
      : tone === "orange"
        ? "border-[#F6D2B8] bg-[#FFF2E5] text-[#F59E0B]"
        : "border-[#C7D7FF] bg-[#EAF1FF] text-primary";

  return (
    <span
      className={cn(
        "rounded-lg border px-3 py-1 text-[11px] font-semibold",
        cls,
      )}
    >
      {text}
    </span>
  );
}

function AgentRow({
  agent,
  highlight,
  onAssign,
  disabled,
  assigning,
}: {
  agent: AvailableAgentItem;
  highlight?: boolean;
  onAssign?: (agentId: string) => void;
  disabled?: boolean;
  assigning?: boolean;
}) {
  const displayDesignation = formatDesignation(agent.designation) || "Agent";
  const initials = getInitials(agent.name);
  const activeJobsText = getActiveJobsText(agent);
  const activeJobsTone = getActiveJobsTone(agent);
  const avatarUrl = agent.photoUrl?.trim();
  const matchesZone = Boolean(agent.matchesZone);
  // const hasActivity = getActiveJobsCount(agent) > 0;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-2xl border px-4 py-3",
        matchesZone
          ? "border-primary/20 bg-[#F2F6FF]"
          : "border-gray/15 bg-white",
      )}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white bg-gray/10">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={agent.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <span className="text-xs font-semibold text-gray">
                {initials}
              </span>
            )}
          </div>

          {/* <span
            className={cn(
              "absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-full border-2 border-white",
              hasActivity ? "bg-green" : "bg-gray/30",
            )}
          /> */}
        </div>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-[#0F172A]">{agent.name}</p>

            {agent.matchesZone && (
              <span className="rounded-md bg-green/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green">
                MATCHES ZONE
              </span>
            )}
          </div>

          <p className="text-xs text-gray">{displayDesignation}</p>

          <p className="text-xs font-semibold text-primary">{agent.phone}</p>
        </div>
      </div>

      <div className="flex min-w-[132px] flex-col items-end gap-2">
        <TonePill text={activeJobsText} tone={activeJobsTone} />

        <Button
          variant={highlight ? "primary" : "secondary"}
          className={cn(
            "h-8 min-w-[104px] rounded-lg px-4 text-xs font-semibold",
            highlight
              ? ""
              : "border border-primary bg-white text-primary hover:bg-primary/5",
          )}
          disabled={disabled}
          onClick={() => onAssign?.(agent.id)}
        >
          {assigning ? "Assigning..." : "Assign Now"}
        </Button>
      </div>
    </div>
  );
}
