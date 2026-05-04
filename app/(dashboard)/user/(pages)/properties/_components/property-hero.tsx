"use client";

import React from "react";
import { ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import type { PropertyDetails } from "@/types/property/property.details";
import Button from "@/components/buttons/button";
import { useRouter } from "next/navigation";
import { formatDisplayId } from "@/utils/id.utils";

type Props = {
  property: PropertyDetails;
  onRequest: () => void;
};

const PropertyHero = ({ property, onRequest }: Props) => {
  const router = useRouter();
  return (
    <div>
      <button
        className="mb-4 flex items-center gap-2 text-sm font-semibold text-black/50 hover:text-black"
        onClick={() => router.back()}
      >
        <ArrowLeft size={16} /> Back to Listings
      </button>

      <div className="flex flex-col lg:flex-row gap-3 justify-between items-start">
        <div>
          <h1 className="text-2xl font-extrabold text-black">
            {property.title}
          </h1>
          <p className="text-sm text-black/40 mt-4">
            {formatDisplayId("POST", property.id)}
          </p>
        </div>
        <div className="flex flex-col xl:flex-row gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <Tag>{property.propertyType}</Tag>
            <Tag light>Sell Post</Tag>
            {property.seller?.isVerified && (
              <Tag verified>
                <CheckCircle2 size={14} /> Verified
              </Tag>
            )}
            <Tag locked>
              <Lock size={14} /> Locked Features
            </Tag>
          </div>
          <Button onClick={onRequest}>Request for Appointment →</Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyHero;

const Tag = ({
  children,
  light,
  verified,
  locked,
}: {
  children: React.ReactNode;
  light?: boolean;
  verified?: boolean;
  locked?: boolean;
}) => {
  let cls =
    "flex items-center gap-1 rounded-full px-4 py-1 text-xs font-extrabold";

  if (light) cls += " bg-primary/10 text-primary";
  else if (verified) cls += " bg-primary text-white";
  else if (locked) cls += " bg-black/5 text-black/50";
  else cls += " bg-primary text-white";

  return <span className={cls}>{children}</span>;
};
