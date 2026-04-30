"use client";

import React from "react";
import { Check } from "lucide-react";
import Card from "@/components/cards/card";
import type { PropertyPostItem } from "@/types/admin/property-post/property.types";

function humanizeServiceKey(serviceKey: string) {
  return serviceKey
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function ChosenServicesCard({
  property,
}: {
  property: PropertyPostItem;
}) {
  const selectedServices = property.selectedServiceslist?.length
    ? property.selectedServiceslist.map((service) => service.serviceKey)
    : property.selectedServices ?? [];
  const mandatoryLabels: string[] = [];
  const optionalLabels = selectedServices.map((service) => humanizeServiceKey(service));
  const total = optionalLabels.length;
  const selected = optionalLabels.length;

  return (
    <Card>
      <p className="text-sm font-semibold text-gray">User Chosen Services</p>

      <div className="border border-gray/15 rounded-lg p-4 bg-white mt-4">
        <p className="text-xs font-extrabold text-gray mb-3">
          Mandatory Services
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mandatoryLabels.map((label) => (
            <div
              key={label}
              className="border border-gray/15 rounded-lg px-3 py-2 bg-white"
            >
              <p className="text-xs font-semibold text-gray">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <p className="text-xs font-extrabold text-gray mb-3">
            Optional Services ({selected}/{total})
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {optionalLabels.map((label) => (
              <div
                key={label}
                className="border border-gray/15 rounded-lg px-3 py-2 bg-white flex items-center gap-2"
              >
                <div
                  className={`h-4 w-4 rounded border border-gray/15 flex items-center justify-center ${
                    "bg-primary"
                  }`}
                >
                  <Check size={12} className="text-white" />
                </div>
                <p className="text-xs font-semibold text-gray">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
