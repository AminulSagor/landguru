import Card from "@/components/cards/card";
import { Search, SlidersHorizontal } from "lucide-react";
import type { VerificationStatus } from "@/app/(dashboard)/admin/types/user-lists-types";

export default function UserManagementFilters({
  query,
  onQueryChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  status: "all" | VerificationStatus;
  onStatusChange: (v: "all" | VerificationStatus) => void;
  sort: "newest" | "oldest";
  onSortChange: (v: "newest" | "oldest") => void;
}) {
  return (
    <Card>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* search */}
        <div className="flex items-center gap-2 rounded-lg border border-gray/15 bg-white px-3 h-11 w-full lg:w-105">
          <Search size={16} className="text-gray" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by Name, Phone or User ID"
            className="w-full text-sm outline-none text-black placeholder:text-gray"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          {/* status */}
          <div className="relative">
            <select
              value={status}
              onChange={(e) =>
                onStatusChange(e.target.value as "all" | VerificationStatus)
              }
              className="h-11 rounded-lg border border-gray/15 bg-white px-4 pr-9 text-sm text-black outline-none w-full sm:w-44"
            >
              <option value="all">Status: All</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>
          </div>

          {/* sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) =>
                onSortChange(e.target.value as "newest" | "oldest")
              }
              className="h-11 rounded-lg border border-gray/15 bg-white px-4 pr-9 text-sm text-black outline-none w-full sm:w-56"
            >
              <option value="newest">Sort by: Newest Joined</option>
              <option value="oldest">Sort by: Oldest Joined</option>
            </select>
            <SlidersHorizontal
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
