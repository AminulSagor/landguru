"use client";

import React from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { CheckCircle2, MapPin } from "lucide-react";
import type { PropertyDetails } from "@/types/property/property.details";
import LandDiagramCard from "@/app/(dashboard)/user/(pages)/properties/_components/land-diagram-card";
import Image from "next/image";

const PropertySidebar = ({
  property,
  onRequest,
}: {
  property: PropertyDetails;
  onRequest: () => void;
}) => {
  const address = property.address;
  const locationText =
    address?.fullAddress ||
    [
      address?.unionOrCityCorp,
      address?.wardNo,
      address?.upazila,
      address?.district,
      address?.division,
      address?.postalCode ? `-${address.postalCode}` : null,
    ]
      .filter(Boolean)
      .join(", ");

  const postedOn = formatPostedDate(property.createdAt);
  const sellerName = property.seller?.fullName ?? "N/A";
  const sellerAvatar = property.seller?.photoUrl ?? null;
  const sellerVerified = Boolean(property.seller?.isVerified);
  const sellerInitials = getInitials(sellerName);

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
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-black/10">
            {sellerAvatar ? (
              <Image
                src={sellerAvatar}
                alt={sellerName}
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs font-extrabold text-black/50">
                {sellerInitials}
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-extrabold text-black">{sellerName}</p>
              {sellerVerified ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-extrabold text-primary">
                  <CheckCircle2 size={12} /> Verified
                </span>
              ) : null}
            </div>
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

function getInitials(value: string) {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "N/A") return "NA";

  const parts = trimmed.split(" ").filter(Boolean);
  if (!parts.length) return "NA";

  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";

  return `${first}${last}`.toUpperCase();
}
