import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import {
  ArrowLeft,
  Download,
  Filter,
  Pencil,
  Search,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ServiceHistoryHeader({
  agentName,
  total,
  query,
  onQueryChange,
  sort,
  onSortChange,
}: {
  agentName: string;
  total: number;
  query: string;
  onQueryChange: (v: string) => void;
  sort: "newest" | "oldest";
  onSortChange?: (v: "newest" | "oldest") => void;
}) {
  const router = useRouter();

  return (
    <>
      {/* breadcrumb bar */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-gray hover:text-black"
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-gray">Agent Workforce</span>
              <span className="text-gray">{">"}</span>
              <span className="text-gray">{agentName}</span>
              <span className="text-gray">{">"}</span>
              <span className="text-black">Completed Services History</span>
            </div>
          </div>

          <Button variant="secondary" className="bg-secondary text-primary">
            <Pencil size={18} /> Edit Agent
          </Button>
        </div>
      </Card>

      {/* title + controls */}
      <div className="px-1">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-2xl font-semibold text-black">
              Completed Services History
            </p>
            <div className="mt-1 flex items-center gap-2 text-sm">
              <span className="text-gray">Agent: {agentName}</span>
              <span className="px-3 py-1 rounded-full text-xs bg-secondary text-primary border border-gray/10">
                Total: {total} Services
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {/* search */}
            <div className="flex items-center gap-2 rounded-lg border border-gray/15 bg-white px-3 h-10 w-full sm:w-64">
              <Search size={16} className="text-gray" />
              <input
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search service ID"
                className="w-full text-sm outline-none text-black placeholder:text-gray"
              />
            </div>

            {/* sort */}
            <div className="relative">
              <select
                value={sort}
                className="h-10 w-full sm:w-44 rounded-lg border border-gray/15 bg-white px-3 pr-9 text-sm text-black outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {/* export */}
            <button
              type="button"
              className="h-10 rounded-lg border border-gray/15 bg-white px-4 text-sm text-black flex items-center gap-2 hover:bg-secondary"
              onClick={() => alert("Export CSV (static)")}
            >
              <Download size={16} className="text-gray" />
              Export CSV
            </button>

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
      </div>
    </>
  );
}
