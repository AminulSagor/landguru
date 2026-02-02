"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildPagination } from "@/app/(agent)/agent/dashboard/tasks/utils/pagination";

export default function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  const items = buildPagination(page, totalPages);

  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-2 px-3 py-2">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray/15 text-gray/60 hover:bg-secondary disabled:opacity-40"
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          <ChevronLeft size={18} />
        </button>

        {items.map((it, idx) => {
          if (it === "...") {
            return (
              <span key={`e-${idx}`} className="px-2 text-sm font-semibold text-gray/40">
                ...
              </span>
            );
          }

          const active = it === page;

          return (
            <button
              key={it}
              onClick={() => onChange(it)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-extrabold ${
                active
                  ? "bg-primary text-white"
                  : "border border-gray/15 text-gray/70 hover:bg-secondary"
              }`}
            >
              {it}
            </button>
          );
        })}

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray/15 text-gray/60 hover:bg-secondary disabled:opacity-40"
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
