"use client";

import React from "react";
import Card from "@/components/cards/card";
import { cn } from "@/lib/utils";
import { Search, ChevronDown, Check } from "lucide-react";

type Option = { label: string; value: string };

function DropdownSelect({
  value,
  onChange,
  options,
  baseLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  baseLabel: string;
}) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);
  const buttonLabel = selectedOption
    ? `${baseLabel}: ${selectedOption.label}`
    : baseLabel;

  return (
    <div ref={containerRef} className="relative min-w-[170px]">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-lg border border-gray/15 bg-white px-3 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-primary/15",
        )}
      >
        <span className="truncate text-left text-black">{buttonLabel}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-gray transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-full rounded-xl border border-gray/15 bg-white p-1 shadow-lg">
          {options.map((option) => {
            const isActive = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition",
                  isActive
                    ? "bg-primary/8 font-medium text-primary"
                    : "text-black hover:bg-secondary",
                )}
              >
                <span>{option.label}</span>
                {isActive ? <Check className="h-4 w-4" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
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
  typeOptions,
  sort,
  onSort,
}: {
  search: string;
  onSearch: (value: string) => void;
  status: string;
  onStatus: (value: string) => void;
  type: string;
  onType: (value: string) => void;
  typeOptions: Option[];
  sort: string;
  onSort: (value: string) => void;
}) {
  return (
    <Card className="border border-gray/15 bg-white p-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-[560px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
          <input
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search service requests"
            className={cn(
              "h-10 w-full rounded-lg border border-gray/15 bg-white pl-10 pr-3 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary/15",
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex lg:items-center lg:gap-3">
          <DropdownSelect
            value={status}
            onChange={onStatus}
            baseLabel="Status"
            options={[
              { label: "All", value: "all" },
              { label: "Unassigned", value: "UNASSIGNED" },
              { label: "Submitted", value: "SUBMITTED" },
              { label: "In Progress", value: "IN_PROGRESS" },
              { label: "Expired", value: "EXPIRED" },
            ]}
          />

          <DropdownSelect
            value={type}
            onChange={onType}
            baseLabel="Types"
            options={[{ label: "All Types", value: "all" }, ...typeOptions]}
          />

          <DropdownSelect
            value={sort}
            onChange={onSort}
            baseLabel="Sort"
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
