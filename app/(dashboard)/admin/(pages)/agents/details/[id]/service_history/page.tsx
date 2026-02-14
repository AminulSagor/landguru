"use client";

import { useMemo, useState } from "react";
import { CompletedServices } from "@/app/(dashboard)/admin/dummy-data/agent-completed-service-data";
import { CompletedServiceItem } from "@/app/(dashboard)/admin/types/agent-completed-service-types";
import ServiceHistoryHeader from "@/app/(dashboard)/admin/(pages)/agents/_components/service-history-header";
import ServiceHistoryTable from "@/app/(dashboard)/admin/(pages)/agents/_components/service-history-table";

const PAGE_SIZE = 6;

const AgentServiceHistoryPage = () => {
  const agentName = "Adv. Sahil";

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const base = CompletedServices.filter((item) => {
      if (!q) return true;
      return item.serviceId.toLowerCase().includes(q);
    });

    const sorted = [...base].sort((a, b) => {
      const da = new Date(a.completionDate).getTime();
      const db = new Date(b.completionDate).getTime();
      return sort === "newest" ? db - da : da - db;
    });

    return sorted;
  }, [query, sort]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const currentData: CompletedServiceItem[] = filtered.slice(start, end);

  // keep page valid when filtering
  if (page > totalPages) setPage(totalPages);

  return (
    <div className="space-y-4">
      <ServiceHistoryHeader
        agentName={agentName}
        total={total}
        query={query}
        onQueryChange={(v) => {
          setQuery(v);
          setPage(1);
        }}
        sort={sort}
        onSortChange={(v) => {
          setSort(v);
          setPage(1);
        }}
      />

      <ServiceHistoryTable
        rows={currentData}
        total={total}
        page={page}
        totalPages={totalPages}
        start={start}
        end={end}
        onPageChange={setPage}
      />
    </div>
  );
};

export default AgentServiceHistoryPage;
