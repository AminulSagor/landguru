"use client";

import React from "react";
import Card from "@/components/cards/card";
import { MetricUnit, PropertyDetails } from "@/app/(admin)/admin/types/property.types";
import FieldBox from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/field-box";

export default function PriceCompareCard({
  unit,
  data,
}: {
  unit: MetricUnit;
  data: PropertyDetails["askingVsValidated"];
}) {
  return (
    <Card>
      <p className="text-sm font-semibold text-gray">Asking Price Vs Validated Price</p>

      <div className="border border-gray/15 rounded-lg p-4 bg-white mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldBox label={`Asking Price per ${unit}:`} value={data.askingPerUnit} />
          <FieldBox label="Asking Price:" value={data.askingTotal} />
          <FieldBox label={`Validated Price per ${unit}:`} value={data.validatedPerUnit} />
          <FieldBox label="Validated Price:" value={data.validatedTotal} />
        </div>
      </div>
    </Card>
  );
}
