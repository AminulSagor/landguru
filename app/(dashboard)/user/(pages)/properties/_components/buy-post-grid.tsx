"use client";

import React from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { BuyPost } from "@/app/(dashboard)/user/dummy-data/buy-post-data";
import BuyPostCard from "@/app/(dashboard)/user/(pages)/properties/_components/buy-post-card";
import type { PaginationMetaDto } from "@/types/post/my/mypost.types";

const PAGE_SIZE = 6;

type Props = {
  items: BuyPost[];
  meta?: PaginationMetaDto | null;
  page?: number;
  onPageChange?: (next: number) => void;
  isLoading?: boolean;
};

export default function BuyPostDataGrid({
  items,
  meta,
  page,
  onPageChange,
  isLoading,
}: Props) {
  const [sort, setSort] = React.useState<"high" | "low">("high");
  const [query, setQuery] = React.useState("");
  const [localPage, setLocalPage] = React.useState(1);

  const currentPage = page ?? localPage;
  const handlePageChange = onPageChange ?? setLocalPage;
  const limit = meta?.limit ?? PAGE_SIZE;

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();

    return (items ?? []).filter((p) => {
      if (!q) return true;
      const hay = `${p.title ?? ""} ${p.preferredLocation ?? ""} ${p.id ?? ""}`
        .toLowerCase()
        .trim();

      return hay.includes(q);
    });
  }, [items, query]);

  const hasSearch = query.trim().length > 0;
  const apiTotal = meta?.total ?? filtered.length;
  const displayTotal = hasSearch ? filtered.length : apiTotal;
  const totalPages = Math.max(
    1,
    meta?.totalPages ?? Math.ceil(apiTotal / PAGE_SIZE),
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
      <div>
        <h2 className="text-xl font-semibold text-black">
          Showing {displayTotal} Buy Posts
        </h2>
        <p className="mt-1 text-sm text-black/55">Your property requests</p>
      </div>

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
            placeholder="Search title, location or post id"
            className="h-11 w-full rounded-xl border border-black/10 bg-white pl-10 pr-4 text-sm font-semibold text-black outline-none placeholder:text-black/30 focus:border-gray/40"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4">
        {isLoading && pageItems.length === 0 ? (
          <p className="text-sm text-black/50">Loading buy posts...</p>
        ) : pageItems.length === 0 ? (
          <p className="text-sm text-black/50">No buy posts found.</p>
        ) : (
          pageItems.map((item, idx) => (
            <div key={`${item.id ?? idx}`}>
              <BuyPostCard item={item} />
            </div>
          ))
        )}
      </div>

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