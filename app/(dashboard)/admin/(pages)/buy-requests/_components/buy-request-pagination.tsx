"use client";

import React from "react";
import { cn } from "@/utils/classnames.utils";

function buildVisiblePages(currentPage: number, totalPages: number): Array<number | string> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "…", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "…", currentPage - 1, currentPage, currentPage + 1, "…", totalPages];
}

export default function BuyRequestPagination({
  showingFrom,
  showingTo,
  total,
  currentPage,
  totalPages,
  onPageChange,
}: {
  showingFrom: number;
  showingTo: number;
  total: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const visiblePages = React.useMemo(
    () => buildVisiblePages(currentPage, totalPages),
    [currentPage, totalPages],
  );

  if (total <= 0) {
    return null;
  }

  return (
    <div className="mt-5">
      <div className="mt-4 flex flex-col gap-3 text-xs font-semibold text-primary sm:flex-row sm:items-center sm:justify-between">
        <p className="text-light-gray">
          Showing <span className="font-extrabold text-gray">{showingFrom}</span>-{" "}
          <span className="font-extrabold text-gray">{showingTo}</span> of{" "}
          <span className="font-extrabold text-gray">{total}</span> results
        </p>

        <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={cn(
              "rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-semibold text-gray",
              currentPage <= 1 && "cursor-not-allowed opacity-60",
            )}
          >
            &lt; Previous
          </button>

          {visiblePages.map((page, index) => {
            if (typeof page !== "number") {
              return (
                <span key={`ellipsis-${index}`} className="px-2 text-xs font-semibold text-gray">
                  {page}
                </span>
              );
            }

            const isActive = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-xs font-semibold",
                  isActive
                    ? "border-primary bg-primary text-white"
                    : "border-gray/15 bg-white text-gray",
                )}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={cn(
              "rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-semibold text-gray",
              currentPage >= totalPages && "cursor-not-allowed opacity-60",
            )}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
