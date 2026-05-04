"use client";

import React from "react";
import { Ruler, Maximize2, Slice, SlidersHorizontal } from "lucide-react";
import Card from "@/components/cards/card";
import type { PropertyDetails } from "@/types/property/property.details";

const PropertyMetrics = ({ property }: { property: PropertyDetails }) => {
  const sellableAmount = formatMetric(
    property.sellableAmount,
    property.sellableUnit,
  );
  const plotSize = formatMetric(property.plotSize, property.plotUnit);
  const shareUnit = formatMetric(property.shareAmount, property.shareUnit);
  const roadDistance = formatDistance(
    property.roadDistanceMin,
    property.roadDistanceMax,
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
      <MetricCard
        icon={<Ruler size={18} className="text-primary" />}
        topAction="Change Metrics"
        label="Sellable Land Amount"
        value={sellableAmount}
      />

      <MetricCard
        icon={<Maximize2 size={18} className="text-primary" />}
        topAction="Change Metrics"
        label="Plot Size"
        value={plotSize}
      />

      <MetricCard
        icon={<Slice size={18} className="text-primary" />}
        topAction="Change Metrics"
        label="Share Unit"
        value={shareUnit}
      />

      <MetricCard
        icon={<SlidersHorizontal size={18} className="text-primary" />}
        topAction=""
        label="Distance from Road"
        value={roadDistance}
      />
    </div>
  );
};

export default PropertyMetrics;

function formatMetric(value: number | null, unit: string | null) {
  if (value == null && !unit) return "N/A";
  if (value == null) return unit ?? "N/A";
  return `${value} ${unit ?? ""}`.trim();
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
  topAction,
  label,
  value,
}: {
  icon: React.ReactNode;
  topAction?: string;
  label: string;
  value: string;
}) {
  return (
    <Card className="shadow-sm rounded-xl">
      <div>
        <div className="flex items-start justify-between">
          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
            {icon}
          </div>

          {topAction ? (
            <button
              type="button"
              className="text-xs font-extrabold text-primary hover:underline"
            >
              {topAction}
            </button>
          ) : (
            <div className="h-5" />
          )}
        </div>

        <p className="mt-4 text-sm font-semibold text-black/50">{label}</p>
        <p className="mt-1 text-lg font-extrabold text-black">{value}</p>
      </div>
    </Card>
  );
}
