"use client";

import React from "react";
import { Check } from "lucide-react";
import Card from "@/components/cards/card";
import { PropertyDetails } from "@/app/(admin)/admin/types/property.types";

export default function ChosenServicesCard({
  data,
}: {
  data: PropertyDetails["chosenServices"];
}) {
  const total = data.optional.length;
  const selected = data.optional.filter((x) => x.selected).length;

  return (
    <Card>
      <p className="text-sm font-semibold text-gray">User Chosen Services</p>

      <div className="border border-gray/15 rounded-lg p-4 bg-white mt-4">
        <p className="text-xs font-extrabold text-gray mb-3">Mandatory Services</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.mandatory.map((m) => (
            <div key={m.label} className="border border-gray/15 rounded-lg px-3 py-2 bg-white">
              <p className="text-xs font-semibold text-gray">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <p className="text-xs font-extrabold text-gray mb-3">
            Optional Services ({selected}/{total})
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.optional.map((o) => (
              <div
                key={o.label}
                className="border border-gray/15 rounded-lg px-3 py-2 bg-white flex items-center gap-2"
              >
                <div
                  className={`h-4 w-4 rounded border border-gray/15 flex items-center justify-center ${
                    o.selected ? "bg-primary" : "bg-white"
                  }`}
                >
                  {o.selected && <Check size={12} className="text-white" />}
                </div>
                <p className="text-xs font-semibold text-gray">{o.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
