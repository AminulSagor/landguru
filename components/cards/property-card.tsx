"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { PropertyListing } from "@/types/property/property.listing";
import Link from "next/link";

function formatBDT(n: number) {
  // 20000000 => "2,00,00,000"
  return n.toLocaleString("en-IN");
}

function TagPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

export default function PropertyCard({
  property,
}: {
  property: PropertyListing;
  onViewDetails?: (id: string) => void;
}) {
  const imageUrl =
    "image" in property && property.image
      ? property.image
      : "coverImage" in property && property.coverImage
        ? property.coverImage
        : "/images/properties/demo-property.avif";
  const tag =
    "propertyType" in property ? property.propertyType : property.tag;
  const mode = "status" in property ? property.status : property.mode;
  const locationText =
    "location" in property
      ? property.location ?? ""
      : property.locationText ?? "";
  const currency =
    "currencySymbol" in property && property.currencySymbol
      ? property.currencySymbol
      : "৳";

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      {/* image */}
      <div className="relative h-44 w-full">
        <Image
          src={imageUrl}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* pills */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {tag && (
            <TagPill className="bg-blue-600 text-white">{tag}</TagPill>
          )}
          {mode && (
            <TagPill className="bg-white/90 text-blue-700 ring-1 ring-blue-200">
              {mode}
            </TagPill>
          )}
          {"verified" in property && property.verified && (
            <TagPill className="bg-emerald-600 text-white">Verified</TagPill>
          )}
        </div>
      </div>

      {/* content */}
      <div className="p-4">
        <h3 className="text-sm font-extrabold text-black">{property.title}</h3>

        <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
          <MapPin size={14} />
          <span>{locationText}</span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <p className="text-sm font-extrabold text-blue-700">
            {currency} {formatBDT(property.price)}
          </p>

          <button
            type="button"
            className="text-xs font-semibold text-gray-500 hover:text-gray-700"
          >
            <Link href={`/user/properties/details/${property.id}`}>
              {" "}
              View Details
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
