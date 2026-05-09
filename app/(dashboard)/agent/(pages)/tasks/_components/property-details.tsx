"use client";

import React from "react";
import Card from "@/components/cards/card";
import { Home, Ruler, MapPin, ArrowRightLeft } from "lucide-react";

type MetricUnit = "Katha" | "Sqft" | "Decimal" | "Acre" | "Bigha";

const METRIC_OPTIONS: MetricUnit[] = ["Sqft", "Katha", "Decimal", "Acre", "Bigha"];

const KATHA_TO_SQFT = 720;
const DECIMAL_TO_SQFT = 435.6;
const ACRE_TO_SQFT = 43560;
const BIGHA_TO_KATHA = 20;

const toKatha = (value: number, unit: string | undefined) => {
  const u = (unit || "Katha").toLowerCase();
  if (u === "katha") return value;
  if (u === "sqft" || u === "sq ft") return value / KATHA_TO_SQFT;
  if (u === "decimal") return (value * DECIMAL_TO_SQFT) / KATHA_TO_SQFT;
  if (u === "acre") return (value * ACRE_TO_SQFT) / KATHA_TO_SQFT;
  if (u === "bigha") return value * BIGHA_TO_KATHA;
  return value;
};

const fromKatha = (valueKatha: number, unit: MetricUnit) => {
  switch (unit) {
    case "Sqft":
      return valueKatha * KATHA_TO_SQFT;
    case "Decimal":
      return (valueKatha * KATHA_TO_SQFT) / DECIMAL_TO_SQFT;
    case "Bigha":
      return valueKatha / BIGHA_TO_KATHA;
    case "Acre":
      return (valueKatha * KATHA_TO_SQFT) / ACRE_TO_SQFT;
    case "Katha":
    default:
      return valueKatha;
  }
};

const formatMetricValue = (value: number, unit: MetricUnit) => {
  const decimals = unit === "Sqft" ? 0 : 2;
  const raw = value.toFixed(decimals);
  const trimmed = raw.replace(/\.00$/, "").replace(/\.(\d)0$/, ".$1");
  return `${trimmed} ${unit}`;
};

function Metric({
  icon,
  label,
  value,
  action,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          {icon}
        </div>
        <div>
          <p className="text-xs font-semibold text-gray/50">{label}</p>
          <p className="text-sm font-extrabold text-primary">{value}</p>
        </div>
      </div>

      {action ? <div className="relative">{action}</div> : null}
    </div>
  );
}

export default function PropertyDetails({
  data,
}: {
  data: {
    propertyType: string;
    plotSize: string;
    plotSizeValue?: number;
    sellableLand: string;
    sellableLandValue?: number;
    landUnit?: string;
    roadDistance: string;
    location: string;
  };
}) {
  const [plotMetricUnit, setPlotMetricUnit] = React.useState<MetricUnit>("Katha");
  const [sellableMetricUnit, setSellableMetricUnit] = React.useState<MetricUnit>("Katha");
  const [openMenu, setOpenMenu] = React.useState<"plot" | "sellable" | null>(null);

  const baseUnit = data.landUnit ?? "Katha";
  const plotBase = (data.plotSizeValue ?? parseFloat(data.plotSize || "0")) || 0;
  const sellableBase = (data.sellableLandValue ?? parseFloat(data.sellableLand || "0")) || 0;
  const plotKatha = toKatha(plotBase, baseUnit);
  const sellableKatha = toKatha(sellableBase, baseUnit);

  const plotDisplay = plotKatha
    ? formatMetricValue(fromKatha(plotKatha, plotMetricUnit), plotMetricUnit)
    : "—";
  const sellableDisplay = sellableKatha
    ? formatMetricValue(fromKatha(sellableKatha, sellableMetricUnit), sellableMetricUnit)
    : "—";

  const renderMetricMenu = (target: "plot" | "sellable") => (
    <div className="relative">
      <button
        type="button"
        className="text-xs font-extrabold text-primary hover:opacity-80"
        onClick={() => setOpenMenu((prev) => (prev === target ? null : target))}
      >
        Change Metrics
      </button>

      {openMenu === target ? (
        <div className="absolute right-0 mt-2 w-36 rounded-lg border border-gray/10 bg-white shadow-lg z-10">
          {METRIC_OPTIONS.map((unit) => (
            <button
              key={unit}
              type="button"
              onClick={() => {
                if (target === "plot") {
                  setPlotMetricUnit(unit);
                } else {
                  setSellableMetricUnit(unit);
                }
                setOpenMenu(null);
              }}
              className={`block w-full px-3 py-2 text-left text-xs font-semibold hover:bg-secondary ${
                unit === (target === "plot" ? plotMetricUnit : sellableMetricUnit)
                  ? "text-primary"
                  : "text-gray/70"
              }`}
            >
              {unit}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );

  return (
    <Card className="rounded-2xl p-6">
      <h3 className="text-sm font-extrabold text-gray">Property Details</h3>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Metric
          icon={<Home size={16} className="text-primary" />}
          label="Property Type"
          value={data.propertyType}
        />
        <Metric
          icon={<Ruler size={16} className="text-primary" />}
          label="Sellable Land Amount"
          value={sellableDisplay}
          action={renderMetricMenu("sellable")}
        />

        <Metric
          icon={<ArrowRightLeft size={16} className="text-primary" />}
          label="Plot Size"
          value={plotDisplay}
          action={renderMetricMenu("plot")}
        />
        <Metric
          icon={<ArrowRightLeft size={16} className="text-primary" />}
          label="Distance from Road"
          value={data.roadDistance}
        />
      </div>

      <div className="mt-5 flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <MapPin size={16} className="text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray/50">Location</p>
          <p className="mt-1 text-sm font-semibold text-gray/60 leading-6">
            {data.location}
          </p>
        </div>
      </div>
    </Card>
  );
}
