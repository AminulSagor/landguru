// app/(admin)/admin/dashboard/(pages)/service-request/_components/service-requests-toolbar.tsx
"use client";

import React from "react";
import Card from "@/components/cards/card";
import { cn } from "@/lib/utils";
import { Search, ChevronDown } from "lucide-react";

type Option = { label: string; value: string };

function SelectLike({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-10 w-full appearance-none rounded-lg border border-gray/15 bg-white px-3 pr-9 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-primary/15"
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
    </div>
  );
}

export default function ServiceRequestsToolbar({
  search,
  onSearch,
  status,
  onStatus,
  type,
  onType,
  sort,
  onSort,
}: {
  search: string;
  onSearch: (v: string) => void;
  status: string;
  onStatus: (v: string) => void;
  type: string;
  onType: (v: string) => void;
  sort: string;
  onSort: (v: string) => void;
}) {
  return (
    <Card className="border border-gray/15 bg-white p-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-[560px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder=""
            className={cn(
              "h-10 w-full rounded-lg border border-gray/15 bg-white pl-10 pr-3 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary/15"
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex lg:items-center lg:gap-3">
          <SelectLike
            value={status}
            onChange={onStatus}
            placeholder="Status: All"
            options={[
              { label: "All", value: "all" },
              { label: "Submitted For Review", value: "submitted_for_review" },
              { label: "In Progress", value: "in_progress" },
              { label: "Pending Assignment", value: "pending_assignment" },
            ]}
          />
          <SelectLike
            value={type}
            onChange={onType}
            placeholder="Types: All Types"
            options={[
              { label: "All Types", value: "all" },
              { label: "Document Organization", value: "document_organization" },
              { label: "Physical Demarcation", value: "physical_demarcation" },
              { label: "Pentagraph Map", value: "pentagraph_map" },
            ]}
          />
          <SelectLike
            value={sort}
            onChange={onSort}
            placeholder="Sort: Newest"
            options={[
              { label: "Newest", value: "newest" },
              { label: "Oldest", value: "oldest" },
            ]}
          />
        </div>
      </div>
    </Card>
  );
}
