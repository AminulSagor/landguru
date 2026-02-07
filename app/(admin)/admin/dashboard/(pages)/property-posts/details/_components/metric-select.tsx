"use client";
import React from "react";
import { MetricUnit } from "@/app/(admin)/admin/types/property.types";

export default function MetricSelect({
  value,
  onChange,
}: {
  value: MetricUnit;
  onChange: (v: MetricUnit) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-xs font-semibold text-gray">Change Metrics:</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as MetricUnit)}
        className="text-xs font-extrabold text-primary bg-white border border-gray/15 rounded-lg px-3 py-2"
      >
        <option value="Katha">Katha</option>
        <option value="Sqft">Sqft</option>
        <option value="Decimal">Decimal</option>
        <option value="Bigha">Bigha</option>
      </select>
    </div>
  );
}
