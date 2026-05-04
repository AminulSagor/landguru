"use client";

import React from "react";
import Card from "@/components/cards/card";
import { MetricUnit } from "@/app/(dashboard)/admin/types/property.types";
import FieldBox from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/field-box";
import type { PropertyPostItem } from "@/types/admin/property-post/property.types";
import { formatBdt } from "@/utils/properties-management-table.utils";
import {
  convertPricePerUnit,
  normalizeLandUnit,
} from "@/utils/land-unit.utils";

export default function PriceCompareCard({
  unit,
  property,
}: {
  unit: MetricUnit;
  property: PropertyPostItem;
}) {
  const baseUnit = property.sellableUnit || property.plotUnit;
  const normalizedBaseUnit = normalizeLandUnit(baseUnit);
  const normalizedSelectedUnit = normalizeLandUnit(unit);
  const canConvert = Boolean(normalizedBaseUnit && normalizedSelectedUnit);
  const askingPerUnitValue = canConvert
    ? convertPricePerUnit(
        property.askingPricePerUnit,
        normalizedBaseUnit,
        normalizedSelectedUnit,
      )
    : property.askingPricePerUnit;
  const validatedPerUnitValue = canConvert
    ? convertPricePerUnit(
        property.validatedPricePerUnit,
        normalizedBaseUnit,
        normalizedSelectedUnit,
      )
    : property.validatedPricePerUnit;

  return (
    <Card>
      <p className="text-sm font-semibold text-gray">
        Asking Price Vs Validated Price
      </p>

      <div className="border border-gray/15 rounded-lg p-4 bg-white mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldBox
            label={`Asking Price per ${unit}:`}
            value={formatBdt(askingPerUnitValue)}
          />
          <FieldBox label="Asking Price:" value={formatBdt(property.askingPrice)} />
          <FieldBox
            label={`Validated Price per ${unit}:`}
            value={formatBdt(validatedPerUnitValue)}
          />
          <FieldBox label="Validated Price:" value={formatBdt(property.validatedPrice)} />
        </div>
      </div>
    </Card>
  );
}
