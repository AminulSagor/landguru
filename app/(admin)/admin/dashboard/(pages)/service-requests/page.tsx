"use client";

import React, { useMemo, useState } from "react";
import ServiceRequestsOverview from "./_components/service-requests-overview";
import ServiceRequestsToolbar from "./_components/service-requests-toolbar";
import ServiceRequestsTable from "./_components/service-requests-table";
import ServiceDetailsDialog from "./_components/service-details-dialog";
import AssignAgentDialog from "./_components/assign-agent-dialog";

import {
  demoServiceRequestOverview,
  demoServiceRequests,
  demoServiceDetails,
} from "@/app/(admin)/admin/dummy-data/service-requests.data";

import { ServiceRequestListItem } from "@/app/(admin)/admin/types/service-request.types";

import { AssignAgentDialogPayload } from "@/app/(admin)/admin/types/assign-agent.types";

export default function ServiceRequestPage() {
  const stats = useMemo(() => demoServiceRequestOverview, []);

  const [all, setAll] = useState<ServiceRequestListItem[]>(demoServiceRequests);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openDetails, setOpenDetails] = useState(false);
  const [selected, setSelected] = useState<ServiceRequestListItem | null>(null);

  const [openAssign, setOpenAssign] = useState(false);
  const [assignPayload, setAssignPayload] =
    useState<Partial<AssignAgentDialogPayload> | null>(null);

  const onAssignAgent = (item: ServiceRequestListItem) => {
    setAssignPayload({
      postId: item.parentPostId,
      // optional: if you have these fields later, pass them
      // zoneLabel, serviceTitle, documents, agents, etc
    });
    setOpenAssign(true);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    let items = all.filter((x) => {
      const matchQ =
        !q ||
        x.serviceName.toLowerCase().includes(q) ||
        x.id.toLowerCase().includes(q) ||
        x.parentPostId.toLowerCase().includes(q) ||
        x.locationLine.toLowerCase().includes(q) ||
        (x.assignedAgent?.name ?? "").toLowerCase().includes(q);

      const matchStatus = status === "all" || x.status === status;
      const matchType = type === "all" || x.type === type;

      return matchQ && matchStatus && matchType;
    });

    items = items.sort((a, b) => {
      const da = new Date(a.createdAtISO).getTime();
      const db = new Date(b.createdAtISO).getTime();
      return sort === "oldest" ? da - db : db - da;
    });

    return items;
  }, [all, search, status, type, sort]);

  const totalCount = filtered.length;

  const paged = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  const onView = (item: ServiceRequestListItem) => {
    setSelected(item);
    setOpenDetails(true);
  };

  
  const handleAssignNow = (agentId: string) => {
    // for now we’ll assign a readable name from dialog payload (static if missing)
    const agent =
      (assignPayload as any)?.agents?.find?.((a: any) => a.id === agentId) ??
      null;

    const agentName = agent?.name ?? "Assigned Agent";

    setAll((prev) =>
      prev.map((x) => {
        if (x.parentPostId !== assignPayload?.postId) return x;

        return {
          ...x,
          assignedAgent: { name: agentName, avatarUrl: null },
          status: "in_progress",
          latestWorkLog: { title: "Assigned to agent.", timeLabel: "Just now" },
        };
      }),
    );

    setOpenAssign(false);
  };

  return (
    <div className="w-full space-y-4">
      <ServiceRequestsOverview stats={stats} />

      <ServiceRequestsToolbar
        search={search}
        onSearch={(v) => {
          setSearch(v);
          setPage(1);
        }}
        status={status}
        onStatus={(v) => {
          setStatus(v || "all");
          setPage(1);
        }}
        type={type}
        onType={(v) => {
          setType(v || "all");
          setPage(1);
        }}
        sort={sort}
        onSort={(v) => setSort(v || "newest")}
      />

      <ServiceRequestsTable
        items={paged}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        onPageChange={setPage}
        onRowsChange={(n) => {
          setRowsPerPage(n);
          setPage(1);
        }}
        onView={onView}
        onAssignAgent={onAssignAgent}
      />

      <ServiceDetailsDialog
        open={openDetails}
        onOpenChange={setOpenDetails}
        details={{
          ...demoServiceDetails,
          headerTitle: selected
            ? `Service Details: ${selected.serviceName}`
            : demoServiceDetails.headerTitle,
          serviceIdLabel: selected
            ? `#${selected.id}-${selected.parentPostId}`
            : demoServiceDetails.serviceIdLabel,
        }}
      />

      <AssignAgentDialog
        open={openAssign}
        onOpenChange={setOpenAssign}
        payload={assignPayload ?? undefined}
        onAssign={handleAssignNow}
      />
    </div>
  );
}
