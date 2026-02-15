import Image from "next/image";
import Button from "@/components/buttons/button";
import type { ResetRequestRow } from "@/app/(dashboard)/admin/types/reset-requests-types";
import { Search, Filter, KeyRound, Phone, BadgeCheck } from "lucide-react";

const roleChip: Record<string, string> = {
  Surveyor: "bg-[#fff7ed] text-[#c2410c]",
  Lawyer: "bg-[#EFF6FF] text-primary border border-primary/15",
  "Deed Writer": "bg-[#F3E8FF] text-[#7c3aed]",
  "Field Assistant": "bg-secondary text-green border border-gray/10",
};

export default function ResetRequestsTable({
  rows,
  query,
  onQueryChange,
  setSelectedRow,
  setDialogOpen,
}: {
  rows: ResetRequestRow[];
  query: string;
  onQueryChange: (v: string) => void;
  setSelectedRow: (v: ResetRequestRow) => void;
  setDialogOpen: (v: boolean) => void;
}) {
  return (
    <div className="border border-gray/20 rounded-md py-4 bg-white">
      <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between px-4">
        <p className="text-base font-semibold text-black">Active Requests</p>

        <div className="flex items-center gap-3">
          {/* search */}
          <div className="flex items-center gap-2 rounded-lg border border-gray/15 bg-white px-3 h-10 w-64">
            <Search size={16} className="text-gray" />
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search by agents, request ID"
              className="w-full text-sm outline-none text-black placeholder:text-gray"
            />
          </div>

          {/* filter */}
          <button
            type="button"
            className="h-10 rounded-lg border border-gray/15 bg-white px-4 text-sm text-black flex items-center gap-2 hover:bg-secondary"
            onClick={() => alert("Filter (static)")}
          >
            <Filter size={16} className="text-gray" />
            Filter
          </button>
        </div>
      </div>

      <div className="mt-4 bg-white overflow-x-auto">
        <table className="w-full text-sm min-w-242">
          <thead className="bg-secondary/40 text-gray text-xs uppercase">
            <tr>
              <th className="p-4 text-left">Request ID</th>
              <th className="p-4 text-left">Agent Identity</th>
              <th className="p-4 text-left">Agent Details</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-t border-t-gray/15 hover:bg-secondary"
              >
                <td className="p-4 text-gray">{r.requestId}</td>

                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full overflow-hidden border border-gray/10 bg-secondary">
                        <Image
                          src={r.agent.avatar}
                          alt={r.agent.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      {r.agent.isOnline ? (
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green border-2 border-white" />
                      ) : null}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-black">
                        {r.agent.name}
                      </p>
                      <span
                        className={`inline-flex mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                          roleChip[r.agent.role] ||
                          "bg-secondary text-gray border border-gray/10"
                        }`}
                      >
                        {r.agent.role}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <BadgeCheck size={16} className="text-gray" />
                      <span className="text-primary font-medium">
                        {r.details.agentId}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={16} className="text-gray" />
                      <span className="text-gray">{r.details.phone}</span>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-[#FEF9C3] text-[#92400E] border border-[#FDE68A]">
                    <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                    Pending Action
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => {
                        setSelectedRow(r);
                        setDialogOpen(true);
                      }}
                    >
                      <KeyRound size={16} /> Generate Password
                    </Button>

                    <button
                      type="button"
                      className="text-xs text-gray hover:text-black"
                      onClick={() => alert("Reject / Ignore (static)")}
                    >
                      Reject / Ignore Request
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr className="border-t border-t-gray/15">
                <td colSpan={5} className="p-6 text-center text-gray">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-4 py-3 border-t border-gray/15 text-sm">
          <p className="text-gray">
            Showing {rows.length} of {rows.length} pending requests
          </p>

          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 rounded-md border border-gray/15 text-gray disabled:opacity-40"
              disabled
            >
              Previous
            </button>
            <button
              className="px-3 py-1 rounded-md border border-gray/15 text-gray disabled:opacity-40"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
