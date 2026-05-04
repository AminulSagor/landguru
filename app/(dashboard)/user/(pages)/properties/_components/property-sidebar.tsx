"use client";

import React from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { MapPin } from "lucide-react";
import type { PropertyDetails } from "@/types/property/property.details";
import LandDiagramCard from "@/app/(dashboard)/user/(pages)/properties/_components/land-diagram-card";

const PropertySidebar = ({
  property,
  onRequest,
}: {
  property: PropertyDetails;
  onRequest: () => void;
}) => {
  const locationText =
    property.fullAddress ||
    [
      property.unionOrCityCorp,
      property.wardNo,
      property.upazila,
      property.district,
      property.division,
      property.postalCode ? `-${property.postalCode}` : null,
    ]
      .filter(Boolean)
      .join(", ");

  const postedOn = formatPostedDate(property.createdAt);

  return (
    <div className="space-y-5 w-full">
      <Card className="p-5">
        <p className="text-sm font-bold text-black/50">Asking Price</p>
        <p className="mt-1 text-xl font-extrabold text-primary">
          ৳ {property.askingPrice.toLocaleString("en-IN")}
        </p>
      </Card>

      <Card className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={18} className="text-primary" />
          <p className="font-extrabold text-black">Location</p>
        </div>
        <p className="text-sm text-black/60">
          {locationText || "N/A"}
        </p>
      </Card>

      <Card className="p-5">
        <p className="font-extrabold text-black mb-2">Description</p>
        <p className="text-sm text-black/60 leading-relaxed">
          {property.description}
        </p>
        <button className="mt-2 text-sm font-bold text-primary">
          Read more
        </button>
      </Card>

      <LandDiagramCard />

      <Card className="p-5">
        <p className="font-extrabold text-black mb-2">Posted By</p>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-black/10" />
          <div>
            <p className="font-extrabold text-black">
              {property.seller?.name ?? "N/A"}
            </p>
            <p className="text-xs text-black/50">Posted: {postedOn}</p>
          </div>
        </div>

        <Button className="w-full mt-4" onClick={onRequest}>
          Request for Appointment →
        </Button>
      </Card>
    </div>
  );
};

export default PropertySidebar;

function formatPostedDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "N/A";

  return parsed.toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
