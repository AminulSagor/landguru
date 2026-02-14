"use client";

import React from "react";
import Card from "@/components/cards/card";
import { cn } from "@/lib/utils";
import { Search, ChevronDown } from "lucide-react";

type Option = { label: string; value: string };

function SelectLike({
  placeholder,
  options,
}: {
  placeholder: string;
  options: Option[];
}) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-10 w-full appearance-none rounded-lg border border-gray/15 bg-white px-3 pr-9 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-primary/15",
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

export default function AgentSearchToolbar() {
  return (
    <Card className="border border-gray/15 bg-white p-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-140">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
          <input
            placeholder="Search by Agent Name, ID"
            className={cn(
              "h-10 w-full rounded-lg border border-gray/15 bg-white pl-10 pr-3 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary/15",
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex lg:items-center lg:gap-3">
          <SelectLike
            placeholder="Role Type:"
            options={[
              { label: "All", value: "all" },
              { label: "Surveyor", value: "surveyor" },
              { label: "Lawyer", value: "lawyer" },
              { label: "Field Assistant", value: "field_assistant" },
              {
                label: "Deed Writer",
                value: "deed_writer",
              },
            ]}
          />

          <SelectLike
            placeholder="Sort by:"
            options={[
              { label: "Newest First", value: "newest" },
              { label: "Oldest", value: "oldest" },
            ]}
          />
        </div>
      </div>
    </Card>
  );
}
