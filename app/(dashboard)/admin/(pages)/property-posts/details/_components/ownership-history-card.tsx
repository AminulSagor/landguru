"use client";

import React from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import type { PropertyPostItem } from "@/types/admin/property-post/property.types";

export default function OwnershipHistoryCard({
  property,
}: {
  property: PropertyPostItem;
}) {
  const owners =
    property.ownershipHistory?.map((owner) => ({
      name: owner.ownerName ?? owner.name ?? "N/A",
      dateRange: owner.duration ?? owner.dateRange ?? "N/A",
      isCurrent: owner.isCurrent,
    })) ?? [];
  const canEdit = true;

  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-gray">Ownership History</p>

        {canEdit && (
          <Button size="sm" variant="primary">
            Edit Status
          </Button>
        )}
      </div>

      <div className="border border-gray/15 rounded-lg p-4 bg-white mt-4">
        <div className="flex items-center gap-2 mb-4">
          <p className="text-xs font-extrabold text-gray">Ownership History</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {owners.map((o, idx) => (
            <div
              key={`${o.name}-${o.dateRange}-${idx}`}
              className="border border-gray/15 rounded-lg p-4 bg-white"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-extrabold text-gray">{o.name}</p>

                {o.isCurrent && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#DBEAFE] text-primary border border-[#93C5FD]">
                    Current
                  </span>
                )}
              </div>

              <p className="text-xs font-extrabold text-primary mt-1">
                {o.dateRange}
              </p>
            </div>
          ))}

          {/* optional "+ Add new" tile (matches screenshot) */}
          <div className="border border-gray/15 rounded-lg p-4 bg-white flex items-center justify-center">
            <p className="text-xs font-extrabold text-gray">+ Add new</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
