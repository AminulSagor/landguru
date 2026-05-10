"use client";

import type { PropertyPostItem } from "@/types/admin/property-post/property.types";

import PropertyPostsPagination from "./property-posts-pagination";
import PropertyPostsTableRow from "./property-posts-table-row";

import { getTableRange } from "../../../../../../utils/properties-management-table.utils";

type PropertiesManagementTableProps = {
  rows: PropertyPostItem[];
  currentPage: number;
  total: number;
  totalPages: number;
  isLoading: boolean;
  isFetching: boolean;
  onPageChange: (page: number) => void;
};

const PAGE_SIZE = 8;

function LoadingRows() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <tr key={`loading-row-${index}`} className="border-t border-gray/15">
          <td className="px-6 py-6">
            <div className="h-14 w-14 animate-pulse rounded-lg bg-secondary" />
          </td>

          <td className="px-6 py-6">
            <div className="space-y-3">
              <div className="h-4 w-56 animate-pulse rounded bg-secondary" />
              <div className="h-3 w-72 animate-pulse rounded bg-secondary" />
              <div className="h-3 w-60 animate-pulse rounded bg-secondary" />
            </div>
          </td>

          <td className="px-6 py-6">
            <div className="space-y-3">
              <div className="h-3 w-20 animate-pulse rounded bg-secondary" />
              <div className="h-3 w-24 animate-pulse rounded bg-secondary" />
            </div>
          </td>

          <td className="px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-secondary" />
              <div className="space-y-2">
                <div className="h-3 w-24 animate-pulse rounded bg-secondary" />
                <div className="h-3 w-20 animate-pulse rounded bg-secondary" />
              </div>
            </div>
          </td>

          <td className="px-6 py-6">
            <div className="space-y-3">
              <div className="h-3 w-24 animate-pulse rounded bg-secondary" />
              <div className="h-2 w-32 animate-pulse rounded bg-secondary" />
            </div>
          </td>

          <td className="px-6 py-6">
            <div className="mx-auto h-7 w-28 animate-pulse rounded-full bg-secondary" />
          </td>

          <td className="px-6 py-6">
            <div className="ml-auto h-9 w-28 animate-pulse rounded-lg bg-secondary" />
          </td>
        </tr>
      ))}
    </>
  );
}

function EmptyStateRow() {
  return (
    <tr className="border-t border-gray/15">
      <td colSpan={7} className="px-6 py-16 text-center">
        <div className="space-y-2">
          <p className="text-base font-bold text-gray">
            No property posts found
          </p>
          <p className="text-sm text-gray">
            Try changing your search or filter values.
          </p>
        </div>
      </td>
    </tr>
  );
}

export default function PropertiesManagementTable({
  rows,
  currentPage,
  total,
  totalPages,
  isLoading,
  isFetching,
  onPageChange,
}: PropertiesManagementTableProps) {
  const { startIndex, endIndex } = getTableRange(
    currentPage,
    PAGE_SIZE,
    rows.length,
    total,
  );

  return (
    <div className="overflow-hidden rounded-lg border border-gray/20 bg-white">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1180px]">
          <thead>
            <tr className="bg-secondary/60">
              {[
                "PROPERTY",
                "DETAILS",
                "PRICING",
                "OWNER",
                "SERVICES PROGRESS",
                "STATUS",
                "ACTIONS",
              ].map((header) => (
                <th
                  key={header}
                  className={`px-6 py-4 text-xs font-extrabold tracking-wider text-gray ${
                    header === "STATUS" || header === "ACTIONS"
                      ? "text-center"
                      : "text-left"
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <LoadingRows />
            ) : rows.length === 0 ? (
              <EmptyStateRow />
            ) : (
              rows.map((property) => (
                <PropertyPostsTableRow key={property.id} property={property} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-gray/15 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-gray">
            Showing {startIndex} to {endIndex} of {total} results
          </p>

          {isFetching && !isLoading && (
            <span className="text-xs font-semibold text-primary">
              Updating...
            </span>
          )}
        </div>

        <PropertyPostsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
