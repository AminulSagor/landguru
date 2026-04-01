"use client";

import React from "react";
import { cn } from "@/lib/utils";

type QuoteRequotePaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getVisiblePages(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5];
  }

  if (currentPage >= totalPages - 2) {
    return [
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ];
}

export default function QuoteRequotePagination({
  currentPage,
  totalPages,
  onPageChange,
}: QuoteRequotePaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1);
  const visiblePages = getVisiblePages(currentPage, safeTotalPages);
  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= safeTotalPages;

  return (
    <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-end">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isPreviousDisabled}
        className="rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-semibold text-gray disabled:cursor-not-allowed disabled:opacity-60"
      >
        &lt; Previous
      </button>

      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          disabled={pageNumber === currentPage}
          className={cn(
            "rounded-lg px-3 py-2 text-xs font-bold",
            pageNumber === currentPage
              ? "bg-primary text-white"
              : "border border-gray/15 bg-white text-gray",
          )}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
        className="rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-semibold text-gray disabled:cursor-not-allowed disabled:opacity-60"
      >
        Next &gt;
      </button>
    </div>
  );
}