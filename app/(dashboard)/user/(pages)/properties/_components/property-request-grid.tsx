"use client";

import React from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { PropertyRequest } from "@/app/(dashboard)/user/types/property-request";
import PropertyRequestCard from "@/app/(dashboard)/user/(pages)/properties/_components/property-request-list";
import { usePropertyFilters } from "@/app/(dashboard)/user/(pages)/properties/_components/property-filters.context";
import { applyPropertyFiltersToRequests } from "@/utils/property-filters.utils";
import type { BuyPostListMeta } from "@/types/post/buy/wanted-needs.types";

const PAGE_SIZE = 6;

type Props = {
  items: PropertyRequest[];
  meta?: BuyPostListMeta | null;
  page?: number;
  onPageChange?: (n: number) => void;
};

export default function PropertyRequestGrid({
  items,
  meta,
  page,
  onPageChange,
}: Props) {
  const [sort, setSort] = React.useState<"high" | "low">("high");
  const [query, setQuery] = React.useState("");
  const [localPage, setLocalPage] = React.useState(1);
  const { filters, filtersApplied } = usePropertyFilters();

  const currentPage = page ?? localPage;
  const handlePageChange = onPageChange ?? setLocalPage;
  const limit = meta?.limit ?? PAGE_SIZE;

  const locationText = React.useMemo(() => {
    const parts = [
      filters.wardNo ? `Ward ${filters.wardNo}` : "",
      filters.pouroshovaOrUnion,
      filters.upazila?.label,
      filters.district?.label,
      filters.division?.label,
    ].filter((value) => value && String(value).trim().length > 0);

    if (!filtersApplied || parts.length === 0) return "All locations";

    return parts.join(", ");
  }, [filters, filtersApplied]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();

    const baseItems = filtersApplied
      ? applyPropertyFiltersToRequests(items ?? [], filters)
      : items ?? [];

    const data = baseItems.filter((p) => {
      if (!q) return true;
      const hay = `${p.title ?? ""} ${p.location ?? ""}`.toLowerCase();
      return hay.includes(q);
    });

    return data;
  }, [items, query, filtersApplied, filters]);

  const hasSearch = query.trim().length > 0;
  const total = meta?.total ?? filtered.length;
  const displayTotal = filtersApplied || hasSearch ? filtered.length : total;
  const totalPages = Math.max(
    1,
    meta?.totalPages ?? Math.ceil(total / limit),
  );

  const pageItems = React.useMemo(() => {
    if (meta) return filtered;

    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage, meta]);

  React.useEffect(() => {
    if (!meta && currentPage > totalPages) {
      handlePageChange(1);
    }
  }, [currentPage, totalPages, handlePageChange, meta]);

  return (
    <div>
      {/* Title */}
      <div>
        <h2 className="text-xl font-semibold text-black">
          Showing {displayTotal} Properties
        </h2>
        <p className="mt-1 text-sm text-black/55">{locationText}</p>
      </div>

      {/* Sort + Search */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <p className="text-sm text-black/55">Sort by:</p>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as "high" | "low");
              handlePageChange(1);
            }}
            className="h-10 rounded-md border border-black/10 bg-white px-5 text-sm text-black outline-none focus:border-gray/40"
          >
            <option value="high">High to Low</option>
            <option value="low">Low to High</option>
          </select>
        </div>

        <div className="relative w-full sm:max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black/35"
            size={18}
          />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              handlePageChange(1);
            }}
            placeholder="Search location, area"
            className="h-11 w-full rounded-xl border border-black/10 bg-white pl-10 pr-4 text-sm font-semibold text-black outline-none placeholder:text-black/30 focus:border-gray/40"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4">
        {pageItems.map((item, idx) => (
          <div key={`${item.id ?? idx}`}>
            <PropertyRequestCard item={item} />
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-black/50">
          Showing {displayTotal === 0 ? 0 : (currentPage - 1) * limit + 1} to{" "}
          {displayTotal === 0
            ? 0
            : Math.min(currentPage * limit, displayTotal)}{" "}
          of {displayTotal} results
        </p>

        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

//=============pagination==============//

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (n: number) => void;
}) {
  const pages = React.useMemo(() => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    return [1, 2, 3, "dots" as const, totalPages];
  }, [totalPages]);

  return (
    <div className="flex items-center gap-2">
      <button
        className="h-10 w-10 rounded-xl border border-black/10 bg-white hover:bg-black/5 disabled:opacity-40"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous"
      >
        <ChevronLeft className="mx-auto" size={18} />
      </button>

      <div className="flex items-center overflow-hidden rounded-xl border border-black/10 bg-white">
        {pages.map((p, idx) => {
          if (p === "dots") {
            return (
              <div
                key={`dots-${idx}`}
                className="px-4 py-2 text-sm font-bold text-black/40"
              >
                ...
              </div>
            );
          }

          const active = p === page;
          return (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={[
                "min-w-10 px-4 py-2 text-sm font-extrabold transition",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-black/50 hover:bg-black/5",
              ].join(" ")}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        className="h-10 w-10 rounded-xl border border-black/10 bg-white hover:bg-black/5 disabled:opacity-40"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next"
      >
        <ChevronRight className="mx-auto" size={18} />
      </button>
    </div>
  );
}
