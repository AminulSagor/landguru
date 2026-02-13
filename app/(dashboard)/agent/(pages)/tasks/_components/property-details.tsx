"use client";

import React from "react";
import Card from "@/components/cards/card";
import { Home, Ruler, MapPin, ArrowRightLeft } from "lucide-react";

function Metric({
  icon,
  label,
  value,
  rightAction,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  rightAction?: boolean;
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

      {rightAction ? (
        <button className="text-xs font-extrabold text-primary hover:opacity-80">
          Change Metrics
        </button>
      ) : null}
    </div>
  );
}

export default function PropertyDetails({
  data,
}: {
  data: {
    propertyType: string;
    plotSize: string;
    sellableLand: string;
    roadDistance: string;
    location: string;
  };
}) {
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
          value={data.sellableLand}
          rightAction
        />

        <Metric
          icon={<ArrowRightLeft size={16} className="text-primary" />}
          label="Plot Size"
          value={data.plotSize}
          rightAction
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
