"use client";

import React from "react";
import { Ruler, Maximize2, Slice, SlidersHorizontal } from "lucide-react";
import Card from "@/components/cards/card";

const MyPropertyMetrics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
      <MetricCard
        icon={<Ruler size={18} className="text-primary" />}
        topAction="Change Metrics"
        label="Sellable Land Amount"
        value="15 Katha"
      />

      <MetricCard
        icon={<Maximize2 size={18} className="text-primary" />}
        topAction="Change Metrics"
        label="Plot Size"
        value="15 Katha"
      />

      <MetricCard
        icon={<Slice size={18} className="text-primary" />}
        topAction="Change Metrics"
        label="Share Unit"
        value="1 Katha"
      />

      <MetricCard
        icon={<SlidersHorizontal size={18} className="text-primary" />}
        topAction=""
        label="Distance from Road"
        value="200m-750m"
      />
    </div>
  );
};

export default MyPropertyMetrics;

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
