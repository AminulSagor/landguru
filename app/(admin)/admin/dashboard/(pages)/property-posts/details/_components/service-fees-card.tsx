"use client";

import React from "react";
import Card from "@/components/cards/card";
import { PropertyDetails } from "@/app/(admin)/admin/types/property.types";
import FieldBox from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/field-box";

export default function ServiceFeesCard({
  data,
}: {
  data: PropertyDetails["serviceFees"];
}) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-gray">Service Fee & Quote</p>

        {data.isPaid && (
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#DCFCE7] text-green border border-[#86EFAC]">
            Service Fees Paid
          </span>
        )}
      </div>

      <div className="border border-gray/15 rounded-lg p-4 bg-white mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldBox label="Mandatory Services Fee" value={data.mandatoryFee} />
          <FieldBox label="Optional Services Fee" value={data.optionalFee} />
        </div>
      </div>
    </Card>
  );
}
