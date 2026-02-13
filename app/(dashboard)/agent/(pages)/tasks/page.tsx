"use client";

import React from "react";
import AssignedLocationBar from "./_components/assigned-location-bar";
import TaskToolbar, { TaskTabKey } from "./_components/task-toolbar";
import TaskGrid from "./_components/task-grid";
import Pagination from "./_components/pagination";
import { mockTasks } from "@/app/(dashboard)/agent/dummy-data/mock-tasks";

const PAGE_SIZE = 6;

export default function TasksPage() {
  const [tab, setTab] = React.useState<TaskTabKey>("new");
  const [serviceType, setServiceType] = React.useState<string>("all");
  const [q, setQ] = React.useState("");
  const [page, setPage] = React.useState(1);

  // reset page on filter changes (senior UX)
  React.useEffect(() => setPage(1), [tab, serviceType, q]);

  const filtered = React.useMemo(() => {
    const t = tab;
    const query = q.trim().toLowerCase();

    return mockTasks
      .filter((x) => x.status === t)
      .filter((x) =>
        serviceType === "all" ? true : x.serviceType === serviceType,
      )
      .filter((x) => {
        if (!query) return true;
        return (
          x.title.toLowerCase().includes(query) ||
          x.location.toLowerCase().includes(query) ||
          x.client.toLowerCase().includes(query)
        );
      });
  }, [tab, serviceType, q]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const pageItems = React.useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const counts = React.useMemo(() => {
    const c = { new: 0, active: 0, review: 0, done: 0 } as Record<
      TaskTabKey,
      number
    >;
    for (const t of mockTasks) c[t.status]++;
    return c;
  }, []);

  const allServiceTypes = React.useMemo(() => {
    const s = new Set<string>();
    for (const t of mockTasks) s.add(t.serviceType);
    return ["all", ...Array.from(s)];
  }, []);

  return (
    <div className="min-h-screen">
      <div className="w-full space-y-6">
        <TaskToolbar
          tab={tab}
          onChangeTab={setTab}
          counts={counts}
          showingCount={total}
          serviceType={serviceType}
          onChangeServiceType={setServiceType}
          serviceTypes={allServiceTypes}
          q={q}
          onChangeQ={setQ}
        />

        <AssignedLocationBar location="Banani, Banani Thana, Dhaka North City Corporation, Dhaka-1213, Dhaka, Bangladesh." />

        <TaskGrid items={pageItems} />

        <div className="pt-2">
          <Pagination
            page={safePage}
            totalPages={totalPages}
            onChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
