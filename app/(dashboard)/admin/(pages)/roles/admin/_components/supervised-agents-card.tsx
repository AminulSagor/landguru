"use client";

import React, { useEffect, useState } from "react";
import { SupervisedAgentRow } from "@/app/(dashboard)/admin/types/admin-details-type";

export default function SupervisedAgentsCard({
  adminId,
  initialBlock,
}: {
  adminId: string;
  initialBlock: { count: number; rows: SupervisedAgentRow[] };
}) {
  const [block, setBlock] = useState(initialBlock);
  const [role, setRole] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBlock(initialBlock);
  }, [initialBlock]);

  async function fetchAgents() {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      q.set("page", "1");
      q.set("limit", "10");
      if (role) q.set("role", role);
      if (search) q.set("search", search);

      const res = await fetch(`/api/admin/${encodeURIComponent(adminId)}/agents?${q.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const rows = (data.rows ?? []).map((a: any) => ({
        id: a.id,
        name: a.name ?? "",
        email: a.email ?? "",
        role: (a.role ?? "Surveyor") as "Surveyor" | "Lawyer",
        currentLoadLabel: `Active Jobs: ${a.currentActiveJobs ?? 0}`,
        currentLoadValue: a.currentActiveJobs ?? 0,
        currentLoadMax: a.currentActiveJobsMax ?? 6,
        loadTone: (a.currentActiveJobs ?? 0) > ((a.currentActiveJobsMax ?? 6) - 1) ? "red" : "blue",
        tasksCompleted: a.tasksCompleted ?? 0,
        earnings: typeof a.earnings === "number" ? `৳ ${a.earnings.toLocaleString()}` : a.earnings ?? "",
        enabled: !(a.status && a.status.toLowerCase() === "inactive"),
      }));

      setBlock({ count: data.meta?.total ?? rows.length, rows });
    } catch (e) {
      // keep existing block on error
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="overflow-hidden  border border-gray/15 rounded-lg bg-white">
      <div className="flex items-start justify-between px-5 py-4 border-b border-gray/10">
        <div>
          <p className="text-lg font-semibold">Supervised Agents ({block.count})</p>
          <p className="text-sm font-medium text-gray">Manage field agents under this zone</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="h-10 rounded-xl border border-gray/15 bg-white px-3 text-sm font-semibold text-gray"
          >
            <option value="">All Roles</option>
            <option value="Surveyor">Surveyor</option>
            <option value="Lawyer">Lawyer</option>
          </select>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search agents"
            className="h-10 rounded-xl border border-gray/15 bg-white px-3 text-sm text-gray"
          />

          <button
            onClick={fetchAgents}
            disabled={loading}
            className="h-10 rounded-xl border border-gray/15 bg-white px-4 text-sm font-semibold text-gray flex items-center gap-2"
          >
            {loading ? "Loading..." : "Apply"}
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-secondary/20 border-b border-gray/10">
              <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray">AGENT PROFILE</th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray">ROLE</th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray">CURRENT LOAD</th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray">TASKS COMPLETED</th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray">EARNINGS</th>
              <th className="px-5 py-4 text-right text-[11px] font-semibold tracking-widest text-gray">STATUS</th>
            </tr>
          </thead>

          <tbody>
            {block.rows.map((r) => {
              const pct = Math.min(100, Math.round((r.currentLoadValue / r.currentLoadMax) * 100));
              const bar = r.loadTone === "red" ? "bg-[#EF4444]" : "bg-primary";
              const chip = r.role === "Surveyor" ? "bg-[#FFE8D6] text-[#9A3412]" : "bg-[#DBEAFE] text-[#1D4ED8]";

              return (
                <tr key={r.id} className="border-b border-gray/10 bg-white">
                  <td className="px-5 py-5 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-secondary" />
                      <div>
                        <p className="text-sm font-semibold">{r.name}</p>
                        <p className="text-xs font-medium text-gray">{r.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-5 align-middle">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${chip}`}>{r.role}</span>
                  </td>

                  <td className="px-5 py-5 align-middle">
                    <p className="text-xs font-medium text-gray">{r.currentLoadLabel}</p>
                    <div className="mt-2 h-2 w-[160px] rounded-full bg-secondary overflow-hidden">
                      <div className={`h-full ${bar}`} style={{ width: `${pct}%` }} />
                    </div>
                  </td>

                  <td className="px-5 py-5 align-middle text-sm font-semibold text-primary">{r.tasksCompleted}</td>

                  <td className="px-5 py-5 align-middle text-sm font-semibold text-primary">{r.earnings}</td>

                  <td className="px-5 py-5 align-middle">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className={[
                          "relative h-5 w-10 rounded-full transition-all",
                          r.enabled ? "bg-primary" : "bg-secondary border border-gray/20",
                        ].join(" ")}
                      >
                        <span className={["absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all shadow-xs", r.enabled ? "left-5" : "left-0.5"].join(" ")} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="py-4 text-center">
        <button className="text-sm font-semibold text-primary">View All Agents</button>
      </div>
    </div>
  );
}
