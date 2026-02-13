"use client";

import { Search, ChevronDown } from "lucide-react";

export default function PropertyFiltersStaticExact() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center max-w-4xl">
      {/* Search */}
      <div className="relative w-full lg:flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray"
        />
        <input
          placeholder="Search by Plot #, User Name, or Price"
          className="
            h-11 w-full rounded-xl border border-gray/15 bg-white
            pl-11 pr-4 text-sm font-medium text-gray
            placeholder:text-gray outline-none
          "
        />
      </div>

      {/* Filters */}
      <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
        <FilterBox label="Property Type:" />
        <FilterBox label="Service Type:" />
        <FilterBox label="Status:" />
      </div>
    </div>
  );
}

function FilterBox({ label }: { label: string }) {
  return (
    <div
      className="
        flex h-11 items-center gap-1.5 rounded-xl
        border border-gray/15 bg-white px-4
      "
    >
      {/* label */}
      <span className="text-sm font-medium text-gray">
        {label}
      </span>

      {/* value (blue in screenshot) */}
      <span className="text-sm font-semibold text-primary">
        All
      </span>

      <ChevronDown size={16} className="ml-1 text-gray" />
    </div>
  );
}
