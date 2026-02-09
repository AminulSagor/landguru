// app/(admin)/admin/dashboard/(pages)/buy-request/_components/buy-request-pagination.tsx
"use client";

import React from "react";

export default function BuyRequestPagination({
  showingFrom,
  showingTo,
  total,
}: {
  showingFrom: number;
  showingTo: number;
  total: number;
  onToggleAllVisible: () => void;
}) {
  return (
    <div className="mt-5">
      {/* desktop header checkbox row like screenshot */}

      {/* footer */}
      <div className="mt-4 flex flex-col gap-3 text-xs font-semibold text-primary sm:flex-row sm:items-center sm:justify-between">
        <p className="text-light-gray">
          Showing{" "}
          <span className="font-extrabold text-gray">{showingFrom}</span>-{" "}
          <span className="font-extrabold text-gray">{showingTo}</span> of{" "}
          <span className="font-extrabold text-gray">{total}</span> results
        </p>

        <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-end">
          <button className="rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-semibold text-gray opacity-60">
            &lt; Previous
          </button>

          <button className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white">
            1
          </button>
          <button className="rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-semibold text-gray">
            2
          </button>
          <button className="rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-semibold text-gray">
            3
          </button>
          <span className="px-2 text-xs font-semibold text-gray">…</span>
          <button className="rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-semibold text-gray">
            9
          </button>

          <button className="rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-semibold text-gray">
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
