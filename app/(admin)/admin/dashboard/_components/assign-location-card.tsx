"use client";

import React from "react";
import Card from "@/components/cards/card";
import { MapPin } from "lucide-react";

interface AssignedLocationCardProps {
  location: string;
}

export default function AssignedLocationCard({
  location,
}: AssignedLocationCardProps) {
  return (
    <div className="border border-primary/30 bg-secondary p-4 rounded-xl">
      <div className="flex items-start gap-3">
        {/* icon */}
        <div className="mt-0.5 text-primary">
          <MapPin size={18} />
        </div>

        {/* content */}
        <div>
          <p className="text-sm font-extrabold text-gray">
            Assigned Location:
          </p>
          <p className="mt-1 text-sm font-semibold text-gray/70 leading-relaxed">
            {location}
          </p>
        </div>
      </div>
    </div>
  );
}
