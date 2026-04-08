"use client";

import React from "react";
import Card from "@/components/cards/card";
import { cn } from "@/lib/utils";
import { Search, ChevronDown } from "lucide-react";
import type {
  AgentSortOrder,
  AgentType,
} from "@/types/admin/agent-list/agent-list.types";

type Option = { label: string; value: string };

interface LabeledSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

function LabeledSelect({
  label,
  options,
  value,
  onChange,
}: LabeledSelectProps) {
  return (
    <div className="flex items-center gap-3">
      <p className="shrink-0 text-sm font-medium text-gray">{label}</p>

      <div className="relative min-w-[165px]">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            "h-10 w-full appearance-none rounded-lg border border-gray/15 bg-white px-3 pr-9 text-sm text-black",
            "focus:outline-none focus:ring-2 focus:ring-primary/15",
          )}
        >
          {options.map((o) => (
            <option key={o.value || o.label} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
      </div>
    </div>
  );
}

interface AgentSearchToolbarProps {
  agentType: AgentType | "";
  sort: AgentSortOrder;
  onAgentTypeChange: (value: AgentType | "") => void;
  onSortChange: (value: AgentSortOrder) => void;
}

export default function AgentSearchToolbar({
  agentType,
  sort,
  onAgentTypeChange,
  onSortChange,
}: AgentSearchToolbarProps) {
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

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
          <LabeledSelect
            label="Role Type:"
            value={agentType}
            onChange={(value) => onAgentTypeChange(value as AgentType | "")}
            options={[
              { label: "All", value: "" },
              { label: "Surveyor", value: "surveyor" },
              { label: "Lawyer", value: "lawyer" },
              { label: "Field Assistant", value: "field_assistant" },
              { label: "Deed Writer", value: "deed_writer" },
            ]}
          />

          <LabeledSelect
            label="Sort by:"
            value={sort}
            onChange={(value) => onSortChange(value as AgentSortOrder)}
            options={[
              { label: "Newest First", value: "ASC" },
              { label: "Oldest", value: "DESC" },
            ]}
          />
        </div>
      </div>
    </Card>
  );
}