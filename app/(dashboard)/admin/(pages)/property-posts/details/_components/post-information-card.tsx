"use client";

import { Play, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import Card from "@/components/cards/card";
import Avatar from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/avatar";
import type { PropertyPostItem } from "@/types/admin/property-post/property.types";
import { formatBdt } from "@/app/(dashboard)/admin/(pages)/property-posts/_utils/properties-management-table.utils";
import { MetricUnit } from "@/app/(dashboard)/admin/types/property.types";
import {
  convertLandAmount,
  normalizeLandUnit,
} from "@/app/(dashboard)/admin/(pages)/property-posts/_utils/land-unit.utils";

function getAddressText(property: PropertyPostItem) {
  if (property.address?.fullAddress?.trim()) {
    return property.address.fullAddress;
  }

  if (property.fullAddress?.trim()) {
    return property.fullAddress;
  }

  const locationParts = [
    property.address?.upazila ?? property.upazila,
    property.address?.district ?? property.district,
    property.address?.division ?? property.division,
  ].filter(Boolean);

  if (locationParts.length === 0) return "Location unavailable";

  return locationParts.join(", ");
}

function resolveVideoUrl(property: PropertyPostItem) {
  if (property.videoUrl) return property.videoUrl;

  const videoDoc = property.documents?.find((doc) => doc.category === "VIDEO");
  return videoDoc?.fileUrl;
}

function formatLandAmount(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return "N/A";
  }

  return new Intl.NumberFormat("en-BD", {
    maximumFractionDigits: 2,
  }).format(value);
}

export default function PostInformationCard({
  property,
  selectedUnit,
}: {
  property: PropertyPostItem;
  selectedUnit?: MetricUnit;
}) {
  const sellerName =
    property.seller.name ?? property.seller.fullName ?? "Unknown Seller";
  const sellerPhone = property.seller.phone ?? "N/A";
  const sellerId = property.seller.id ?? property.sellerId ?? "N/A";
  const sellerUid = sellerId === "N/A" ? "N/A" : sellerId.slice(0, 8).toUpperCase();
  const sellerAvatar = property.seller.photoUrl ?? property.seller.avatar ?? "";
  const addressText = getAddressText(property);
  const photos = (property.photos ?? []).map((url) => ({ url }));
  const videoUrl = resolveVideoUrl(property);
  const selectedUnitNormalized = normalizeLandUnit(selectedUnit);
  const sellableUnitNormalized = normalizeLandUnit(property.sellableUnit);
  const plotUnitNormalized = normalizeLandUnit(property.plotUnit);
  const canConvertSellable = Boolean(sellableUnitNormalized && selectedUnitNormalized);
  const canConvertPlot = Boolean(plotUnitNormalized && selectedUnitNormalized);
  const sellableAmountValue = canConvertSellable
    ? convertLandAmount(
        property.sellableAmount,
        sellableUnitNormalized,
        selectedUnitNormalized,
      )
    : property.sellableAmount;
  const plotSizeValue = canConvertPlot
    ? convertLandAmount(
        property.plotSize,
        plotUnitNormalized,
        selectedUnitNormalized,
      )
    : property.plotSize;
  const sellableUnitLabel = canConvertSellable
    ? (selectedUnit as string)
    : property.sellableUnit;
  const plotUnitLabel = canConvertPlot
    ? (selectedUnit as string)
    : property.plotUnit;
  const facts = [
    {
      label: "Property Type",
      value: property.propertyType,
    },
    {
      label: "Sellable Amount",
      value: `${formatLandAmount(sellableAmountValue)} ${sellableUnitLabel}`,
    },
    {
      label: "Plot Size",
      value: `${formatLandAmount(plotSizeValue)} ${plotUnitLabel}`,
    },
    {
      label: "Road Distance",
      value:
        property.roadDistanceMin !== null && property.roadDistanceMax !== null
          ? `${property.roadDistanceMin} - ${property.roadDistanceMax} ft`
          : "N/A",
    },
  ];

  return (
    <Card>
      <p className="text-sm font-extrabold text-primary">{property.title}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div>
          <p className="text-xs font-semibold text-gray mb-2">Posted By</p>
          <div className="flex items-center gap-3">
            <Avatar url={sellerAvatar} name={sellerName} />
            <div>
              <p className="text-xs font-extrabold text-gray">
                {sellerName}
              </p>
              <p className="text-xs font-semibold text-gray">
                {sellerPhone}
              </p>
              <p className="text-xs font-semibold text-gray">
                ID: {sellerUid}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray mb-2">Asking Price</p>
          <p className="text-xs font-extrabold text-primary">
            {formatBdt(property.askingPrice)}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray mb-2">Location</p>
          <p className="text-xs font-semibold text-gray">{addressText}</p>
        </div>
      </div>

      {facts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {facts.map((f) => (
            <div
              key={f.label}
              className="border border-gray/15 rounded-lg p-3 bg-white"
            >
              <p className="text-xs font-semibold text-gray">{f.label}</p>
              <p className="text-xs font-extrabold text-primary mt-1">
                {f.value}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <p className="text-xs font-semibold text-gray mb-2">Description</p>
        <p className="text-xs font-semibold text-gray">
          {property.description ?? "No description available."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div>
          <p className="text-xs font-extrabold text-gray mb-3">Property Photos</p>
          {photos.length > 0 ? (
            <PhotosGallery photos={photos} />
          ) : (
            <div className="h-48 w-full rounded-lg border border-gray/15 bg-secondary flex items-center justify-center text-sm text-gray">
              <div className="flex items-center gap-2">
                <ImageIcon size={18} />
                <span>No images available</span>
              </div>
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-extrabold text-gray mb-3">Property Video</p>
          {videoUrl ? (
            <div className="h-40 w-full rounded-lg border border-gray/15 bg-black overflow-hidden flex items-center justify-center">
              <video
                controls
                src={videoUrl}
                poster={photos[0]?.url}
                className="h-full w-full object-contain bg-black"
              />
            </div>
          ) : (
            <div className="h-20 max-w-54 rounded-lg border border-gray/15 bg-secondary flex items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-gray">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <Play size={16} className="text-white" />
                </div>
                <span>No video available</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function PhotosGallery({ photos }: { photos: { url: string }[] }) {
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center gap-3 overflow-x-auto pb-1 mt-3">
        {photos.map((p, idx) => (
          <button
            key={idx}
            onClick={() => setModalIndex(idx)}
            className="h-16 w-24 rounded-lg overflow-hidden border border-gray/15 bg-secondary shrink-0 focus:outline-none"
            aria-label={`Open photo ${idx + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.url} alt={`thumb-${idx}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {modalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          role="dialog"
          aria-modal="true"
          onClick={() => setModalIndex(null)}
        >
          <div className="relative max-w-[90%] max-h-[90%]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setModalIndex(null)}
              className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white flex items-center justify-center text-gray shadow"
              aria-label="Close"
            >
              ×
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[modalIndex].url}
              alt={`photo-${modalIndex}`}
              className="max-h-[80vh] max-w-[90vw] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
