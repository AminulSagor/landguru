"use client";

import React from "react";
import { ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import { Property } from "@/app/(dashboard)/user/types/property";
import Button from "@/components/buttons/button";

type Props = {
  property: Property;
  onRequest: () => void;
};

const PropertyHero = ({ property, onRequest }: Props) => {
  return (
    <div>
      <button className="mb-4 flex items-center gap-2 text-sm font-semibold text-black/50 hover:text-black">
        <ArrowLeft size={16} /> Back to Listings
      </button>

      <div className="flex flex-col lg:flex-row gap-3 justify-between items-start">
        <div>
          <h1 className="text-2xl font-extrabold text-black">
            {property.title}
          </h1>
          <p className="text-sm text-black/40 mt-4">#POST-{property.id}</p>
        </div>
        <div className="flex flex-col xl:flex-row gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <Tag>{property.tag}</Tag>
            <Tag light>{property.mode}</Tag>
            {property.verified && (
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
