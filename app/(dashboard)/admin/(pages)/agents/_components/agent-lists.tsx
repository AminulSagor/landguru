"use client";

import Image from "next/image";
import { useState } from "react";
import { Agents } from "@/app/(dashboard)/admin/dummy-data/agent-list-data";
import { useRouter } from "next/navigation";

const roleColor: Record<string, string> = {
  Surveyor: "bg-orange-100 text-orange-700",
  Lawyer: "bg-blue-100 text-blue-700",
  "Field Assistant": "bg-green-100 text-green-700",
  "Deed Writer": "bg-teal-100 text-teal-700",
};

const PAGE_SIZE = 4;

const AgentLists = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const total = Agents.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const currentData = Agents.slice(start, end);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray/20 overflow-x-auto">
      <table className="w-full text-sm min-w-242">
        {/* header */}
        <thead className="bg-gray-50 text-gray text-xs uppercase">
          <tr>
            <th className="p-4 text-left w-10">
              <input type="checkbox" />
            </th>
            <th className="p-4 text-left">Profile</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Assigned Zone</th>
            <th className="p-4 text-left">Contact</th>
            <th className="p-4 text-left">Performance</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        {/* body */}
        <tbody>
          {currentData.map((agent) => (
            <tr
              key={agent.id}
              className="border-t border-t-gray/20 hover:bg-gray-50"
              onClick={() => router.push(`/admin/agents/details/${agent.id}`)}
            >
              <td className="p-4">
                <div>
                  <input type="checkbox" />
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={agent.profile.image}
                    alt={agent.profile.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {agent.profile.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {agent.profile.profileId}
                    </p>
                  </div>
                </div>
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    roleColor[agent.role] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {agent.role}
                </span>
              </td>

              <td className="p-4 text-gray-600">{agent.assigned_zone}</td>
              <td className="p-4 text-gray-600">{agent.contact}</td>

              <td className="p-4">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                  {agent.perfomance}
                </span>
              </td>

              <td className="p-4">
                <div
                  className={`w-10 h-5 rounded-full relative transition ${
                    agent.status === "on" ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition ${
                      agent.status === "on" ? "right-0.5" : "left-0.5"
                    }`}
                  />
                </div>
              </td>

              <td className="p-4">
                <button className="text-gray-400 hover:text-gray-700">
                  ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* footer pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray/20 text-sm">
        <p className="text-gray-500">
          Showing {start + 1} to {Math.min(end, total)} of {total} results
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-md border border-gray/20 text-gray-600 disabled:opacity-40"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            const active = p === page;

            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded-md border border-gray/20 ${
                  active
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            );
          })}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-md border border-gray/20 text-gray-600 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentLists;
