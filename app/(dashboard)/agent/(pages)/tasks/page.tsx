"use client";

import React from "react";
import AssignedLocationBar from "./_components/assigned-location-bar";
import TaskToolbar, { TaskTabKey } from "./_components/task-toolbar";
import TaskGrid from "./_components/task-grid";
import Pagination from "./_components/pagination";
import { TaskItem } from "@/app/(dashboard)/agent/dummy-data/mock-tasks";
import { serviceClient } from "@/service/base/axios.client";
import agentDashboardService from "@/service/agent/agent-dashboard.service";

const PAGE_SIZE = 6;

const mapTabToApi = (t: TaskTabKey) => {
  if (t === "new") return "NEW";
  if (t === "active") return "ACTIVE";
  if (t === "review") return "IN_REVIEW";
  if (t === "done") return "DONE";
  return "NEW";
};

export default function TasksPage() {
  const [tab, setTab] = React.useState<TaskTabKey>("new");
  const [serviceType, setServiceType] = React.useState<string>("all");
  const [q, setQ] = React.useState("");
  const [page, setPage] = React.useState(1);

  const [items, setItems] = React.useState<TaskItem[]>([]);
  const [meta, setMeta] = React.useState<{ total?: number; page?: number; limit?: number; totalPages?: number } | null>(null);
  const [counts, setCounts] = React.useState<Record<TaskTabKey, number>>({ new: 0, active: 0, review: 0, done: 0 });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [assignedLocation, setAssignedLocation] = React.useState<string>("");

  // reset page on filter changes (senior UX)
  React.useEffect(() => setPage(1), [tab, serviceType, q]);

  React.useEffect(() => {
    let mounted = true;

    const fetchTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiTab = mapTabToApi(tab);
        const res = await serviceClient.get("/agents/agent-task", {
          params: { tab: apiTab, page, limit: PAGE_SIZE },
        });

        const payload = res.data ?? {};
        const rawItems = payload?.data ?? [];

        const mapped: TaskItem[] = (rawItems as any[]).map((it: any) => ({
          id: it.assignmentId ?? "",
          title: it.serviceName ?? "",
          code: it.assignmentId ? `#${String(it.assignmentId).slice(0, 8)}` : "",
          client: it.clientName ?? "",
          location: it.location ?? "",
          assignedAgo: it.assignedAt ?? it.createdAt ?? "",
          status: tab,
          serviceType: it.serviceName ?? "all",
          acceptBefore: it.acceptDeadline ? `Accept Before: ${it.acceptDeadline}` : undefined,
          lastUpdate: it.lastUpdate ?? it.submittedAt ?? undefined,
          completedTag: it.status ?? (apiTab === "DONE" ? "COMPLETED" : undefined),
        }));

        if (!mounted) return;

        // apply client-side filters
        const query = q.trim().toLowerCase();
        const filtered = mapped
          .filter((x) => (serviceType === "all" ? true : x.serviceType === serviceType))
          .filter((x) => {
            if (!query) return true;
            return (
              x.title.toLowerCase().includes(query) ||
              x.location.toLowerCase().includes(query) ||
              x.client.toLowerCase().includes(query)
            );
          });

        setItems(filtered);
        setMeta(payload?.meta ?? null);

        // try to set counts from meta when available, otherwise use current lengths
        const newCounts: Record<TaskTabKey, number> = { new: 0, active: 0, review: 0, done: 0 };
        const totalForTab = payload?.meta?.total ?? mapped.length;
        newCounts[tab] = totalForTab;
        setCounts(newCounts);
      } catch (err: any) {
        setError(err?.message ?? "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();

    return () => {
      mounted = false;
    };
  }, [tab, page, serviceType, q]);

  React.useEffect(() => {
    let mounted = true;

    const fetchAssignedLocation = async () => {
      try {
        const location = await agentDashboardService.getAssignedLocation();
        if (!mounted) return;
        setAssignedLocation(location || "—");
      } catch (err) {
        if (!mounted) return;
        setAssignedLocation("—");
      }
    };

    fetchAssignedLocation();

    return () => {
      mounted = false;
    };
  }, []);

  const allServiceTypes = React.useMemo(() => {
    const s = new Set<string>();
    for (const t of items) s.add(t.serviceType || "all");
    return ["all", ...Array.from(s)];
  }, [items]);

  const total = meta?.total ?? items.length;
  const totalPages = Math.max(1, Math.ceil((total ?? 0) / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const pageItems = React.useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, safePage]);

  return (
    <div className="min-h-screen">
      <div className="w-full space-y-6">
        <TaskToolbar
          tab={tab}
          onChangeTab={setTab}
          counts={counts}
          showingCount={items.length}
          serviceType={serviceType}
          onChangeServiceType={setServiceType}
          serviceTypes={allServiceTypes}
          q={q}
          onChangeQ={setQ}
        />

        <AssignedLocationBar location={assignedLocation || "—"} />

        {loading ? <div>Loading...</div> : <TaskGrid items={pageItems} />}

        <div className="pt-2">
          <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}
