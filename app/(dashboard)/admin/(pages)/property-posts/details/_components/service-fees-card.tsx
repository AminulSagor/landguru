"use client";

import React from "react";
import Card from "@/components/cards/card";
import FieldBox from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/field-box";
import type { PropertyPostItem } from "@/types/admin/property-post/property.types";
import { formatBdt } from "@/utils/properties-management-table.utils";

export default function ServiceFeesCard({
  property,
}: {
  property: PropertyPostItem;
}) {
  const isPaid =
    property.mandatoryServiceFee !== null ||
    property.optionalServiceFee !== null;

  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-gray">Service Fee & Quote</p>

        {isPaid && (
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#DCFCE7] text-green border border-[#86EFAC]">
            Service Fees Paid
          </span>
        )}
      </div>

      <div className="border border-gray/15 rounded-lg p-4 bg-white mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldBox
            label="Mandatory Services Fee"
            value={formatBdt(property.mandatoryServiceFee)}
          />
          <FieldBox
            label="Optional Services Fee"
            value={formatBdt(property.optionalServiceFee)}
          />
        </div>
      </div>
    </Card>
  );
}
