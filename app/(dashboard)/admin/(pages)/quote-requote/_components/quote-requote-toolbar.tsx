"use client";

import React from "react";
import { ChevronDown, Search } from "lucide-react";
import type { QuoteRequoteSortKey } from "@/app/(dashboard)/admin/(pages)/quote-requote/_utils/quote-requote.utils";

type QuoteRequoteToolbarProps = {
  searchInput: string;
  sort: QuoteRequoteSortKey;
  onSearchInputChange: (value: string) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onSortToggle: () => void;
};

export default function QuoteRequoteToolbar({
  searchInput,
  sort,
  onSearchInputChange,
  onSearchSubmit,
  onSortToggle,
}: QuoteRequoteToolbarProps) {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
      <form
        onSubmit={onSearchSubmit}
        className="relative w-full sm:max-w-[240px] lg:max-w-[260px]"
      >
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray"
        />

        <input
          value={searchInput}
          onChange={(event) => onSearchInputChange(event.target.value)}
          placeholder="Search Post"
          className="w-full rounded-lg border border-gray/15 bg-white py-2 pl-9 pr-3 text-xs font-semibold text-gray outline-none focus:border-primary/40"
        />
      </form>

      <div className="flex items-center gap-2 self-start sm:self-auto">
        <p className="shrink-0 text-xs font-semibold text-primary">Sort by</p>

        <button
          type="button"
          onClick={onSortToggle}
          className="flex min-w-[140px] items-center justify-between gap-2 rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-semibold text-gray"
        >
          {sort === "newest_first" ? "Newest First" : "Oldest First"}
          <ChevronDown size={16} className="text-gray" />
        </button>
      </div>
    </div>
  );
}
