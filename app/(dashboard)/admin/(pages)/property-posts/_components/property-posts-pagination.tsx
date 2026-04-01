"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { buildPaginationItems } from "../_utils/properties-management-table.utils";

type PropertyPostsPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function PropertyPostsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PropertyPostsPaginationProps) {
  if (totalPages <= 0) return null;

  const paginationItems = buildPaginationItems(currentPage, totalPages);

  return (
    <div className="flex items-center justify-end gap-1.5">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray/15 bg-white text-gray disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={16} />
      </button>

      {paginationItems.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-xs font-extrabold text-gray"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            className={`h-8 min-w-8 rounded-md border px-2 text-xs font-extrabold ${
              item === currentPage
                ? "border-primary bg-primary text-white"
                : "border-gray/15 bg-white text-gray"
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray/15 bg-white text-gray disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}