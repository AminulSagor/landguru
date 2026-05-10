"use client";

import React from "react";
import { Ruler, Maximize2, Slice, SlidersHorizontal } from "lucide-react";
import Card from "@/components/cards/card";
import type { PropertyDetails } from "@/types/property/property.details";
import {
  convertLandAmount,
  LAND_UNITS,
  normalizeLandUnit,
  type LandUnit,
} from "@/utils/land-unit.utils";

const PropertyMetrics = ({ property }: { property: PropertyDetails }) => {
  const defaultUnit = React.useMemo<LandUnit>(() => {
    return (
      normalizeLandUnit(property.sellableUnit) ||
      normalizeLandUnit(property.plotUnit) ||
      normalizeLandUnit(property.shareUnit) ||
      "Katha"
    );
  }, [property.plotUnit, property.sellableUnit, property.shareUnit]);

  const [unit, setUnit] = React.useState<LandUnit>(defaultUnit);

  React.useEffect(() => {
    setUnit(defaultUnit);
  }, [defaultUnit]);

  const handleChangeUnit = React.useCallback(() => {
    setUnit((current) => {
      const index = LAND_UNITS.indexOf(current);
      const nextIndex = index >= 0 ? (index + 1) % LAND_UNITS.length : 0;
      return LAND_UNITS[nextIndex];
    });
  }, []);

  const sellableAmount = formatLandMetric(
    property.sellableAmount,
    property.sellableUnit,
    unit,
  );
  const plotSize = formatLandMetric(property.plotSize, property.plotUnit, unit);
  const shareUnit = formatLandMetric(
    property.shareAmount,
    property.shareUnit,
    unit,
  );
  const roadDistance = formatDistance(
    property.roadDistanceMin,
    property.roadDistanceMax,
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
      <MetricCard
        icon={<Ruler size={18} className="text-primary" />}
        actionLabel="Change Metrics"
        onAction={handleChangeUnit}
        label="Sellable Land Amount"
        value={sellableAmount}
      />

      <MetricCard
        icon={<Maximize2 size={18} className="text-primary" />}
        actionLabel="Change Metrics"
        onAction={handleChangeUnit}
        label="Plot Size"
        value={plotSize}
      />

      <MetricCard
        icon={<Slice size={18} className="text-primary" />}
        actionLabel="Change Metrics"
        onAction={handleChangeUnit}
        label="Share Unit"
        value={shareUnit}
      />

      <MetricCard
        icon={<SlidersHorizontal size={18} className="text-primary" />}
        label="Distance from Road"
        value={roadDistance}
      />
    </div>
  );
};

export default PropertyMetrics;

function formatLandMetric(
  value: number | null,
  unit: string | null,
  targetUnit: LandUnit,
) {
  if (value == null && !unit) return "N/A";
  if (value == null) return unit ?? "N/A";

  const normalizedFrom = normalizeLandUnit(unit);
  const normalizedTo = normalizeLandUnit(targetUnit);

  if (!normalizedFrom || !normalizedTo) {
    return `${formatLandValue(value)} ${unit ?? ""}`.trim();
  }

  const converted = convertLandAmount(value, normalizedFrom, normalizedTo);
  if (converted == null) return "N/A";

  return `${formatLandValue(converted)} ${normalizedTo}`.trim();
}

function formatDistance(minValue: number | null, maxValue: number | null) {
  if (minValue == null && maxValue == null) return "N/A";
  if (minValue != null && maxValue != null) {
    return `${minValue}m-${maxValue}m`;
  }
  if (minValue != null) return `${minValue}m`;
  return `${maxValue ?? 0}m`;
}

function MetricCard({
  icon,
  actionLabel,
  onAction,
  label,
  value,
}: {
  icon: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  label: string;
  value: string;
}) {
  return (
    <Card className="h-full rounded-xl shadow-sm">
      <div className="flex h-full flex-col">
        <div className="flex h-9 items-center justify-between gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            {icon}
          </div>

          {actionLabel ? (
            <button
              type="button"
              onClick={onAction}
              className="flex h-9 items-center text-xs font-extrabold text-primary hover:underline"
            >
              {actionLabel}
            </button>
          ) : (
            <div className="h-9" />
          )}
        </div>

        <div className="mt-4">
          <p className="text-sm font-semibold leading-5 text-black/50">
            {label}
          </p>
          <p className="mt-1 text-lg font-extrabold leading-6 text-black">
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
}

function formatLandValue(value: number) {
  return value.toLocaleString("en-IN", {
    maximumFractionDigits: 4,
  });
}
