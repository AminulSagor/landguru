"use client";

import React from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { ListingCard } from "@/app/(dashboard)/user/types/my-property-list";
import Link from "next/link";
import { formatDisplayId } from "@/utils/id.utils";
import type { PaginationMetaDto } from "@/types/post/my/mypost.types";

const PAGE_SIZE = 6;

type Props = {
  items: ListingCard[];
  meta?: PaginationMetaDto | null;
  page?: number;
  onPageChange?: (next: number) => void;
  isLoading?: boolean;
};

export default function MyPropertyGrid({
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

    let data = (items ?? []).filter((p) => {
      if (!q) return true;

      const hay = `${p.title ?? ""} ${p.id ?? ""}`.toLowerCase();
      return hay.includes(q);
    });

    const toNumberPrice = (v: number | string) => {
      if (typeof v === "number") return v;
      const digits = String(v).replace(/[^\d]/g, "");
      return digits ? Number(digits) : 0;
    };

    data = data.sort((a, b) => {
      const pa = toNumberPrice(a.price);
      const pb = toNumberPrice(b.price);
      return sort === "high" ? pb - pa : pa - pb;
    });

    return data;
  }, [items, query, sort]);

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
        <h2 className="text-xl font-semibold text-gray">
          Showing {displayTotal} Properties
        </h2>
        <p className="mt-1 text-sm text-gray/60">Your sell property posts</p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray/60">Sort by:</p>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as "high" | "low");
              handlePageChange(1);
            }}
            className="h-10 rounded-lg border border-gray/15 bg-white px-4 text-sm text-gray outline-none focus:border-primary/40"
          >
            <option value="high">High to Low</option>
            <option value="low">Low to High</option>
          </select>
        </div>

        <div className="relative w-full sm:max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray/40"
            size={18}
          />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              handlePageChange(1);
            }}
            placeholder="Search title or post id"
            className="h-11 w-full rounded-xl border border-gray/15 bg-white pl-10 pr-4 text-sm font-semibold text-gray outline-none placeholder:text-gray/40 focus:border-primary/40"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading && pageItems.length === 0 ? (
          <p className="text-sm text-gray/60">Loading properties...</p>
        ) : pageItems.length === 0 ? (
          <p className="text-sm text-gray/60">No properties found.</p>
        ) : (
          pageItems.map((item, idx) => (
            <MyPropertyCard key={`${item.id ?? idx}`} item={item} />
          ))
        )}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray/60">
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

function MyPropertyCard({ item }: { item: ListingCard }) {
  const priceNumber =
    typeof item.price === "number"
      ? item.price
      : Number(String(item.price).replace(/[^\d]/g, "")) || 0;

  return (
    <Link href={`/user/posts/sell/view/${item.id}`}>
      <div className="overflow-hidden rounded-2xl border border-gray/15 bg-white shadow-xs">
        <div className="relative h-44 w-full bg-secondary">
          {item.image?.trim() ? (
            <img
              src={item.image}
              alt={item.title || "Property image"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary text-sm font-semibold text-gray/60">
              No Image
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray">{item.title}</h3>
          <p className="mt-1 text-xs text-gray/40">
            {formatDisplayId("POST", item.id)}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {item.tags?.map((t, i) => (
              <TagPill
                key={`${t.label}-${i}`}
                label={t.label}
                variant={t.variant}
              />
            ))}
          </div>

          <div className="my-4 h-px w-full bg-gray/10" />

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-gray/50">Price</p>
              <p className="mt-1 text-base font-extrabold text-primary">
                ৳ {priceNumber.toLocaleString()}
              </p>
            </div>

            <p className="text-xs text-gray/35">{item.time}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function TagPill({
  label,
  variant,
}: {
  label: string;
  variant: "primary" | "secondary" | "gray" | "green" | "danger";
}) {
  if (variant === "primary") {
    return (
      <span className="rounded-md bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">
        {label}
      </span>
    );
  }

  if (variant === "green") {
    return (
      <span className="rounded-md bg-green/10 px-2 py-1 text-[10px] font-bold text-green">
        {label}
      </span>
    );
  }

  if (variant === "danger") {
    return (
      <span className="rounded-md bg-[#ffe9ea] px-2 py-1 text-[10px] font-bold text-[#d13b3b]">
        {label}
      </span>
    );
  }

  return (
    <span className="rounded-md bg-secondary px-2 py-1 text-[10px] font-bold text-gray/60">
      {label}
    </span>
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
        className="h-10 w-10 rounded-xl border border-gray/15 bg-white hover:bg-secondary disabled:opacity-40"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous"
      >
        <ChevronLeft className="mx-auto" size={18} />
      </button>

      <div className="flex items-center overflow-hidden rounded-xl border border-gray/15 bg-white">
        {pages.map((p, idx) => {
          if (p === "dots") {
            return (
              <div
                key={`dots-${idx}`}
                className="px-4 py-2 text-sm font-bold text-gray/40"
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
                  : "text-gray/60 hover:bg-secondary",
              ].join(" ")}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        className="h-10 w-10 rounded-xl border border-gray/15 bg-white hover:bg-secondary disabled:opacity-40"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next"
      >
        <ChevronRight className="mx-auto" size={18} />
      </button>
    </div>
  );
}