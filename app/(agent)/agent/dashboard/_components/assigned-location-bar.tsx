"use client";

import React from "react";
import Card from "@/components/cards/card";
import { MapPin } from "lucide-react";

export default function AssignedLocationBar({ location }: { location: string }) {
  return (
    <Card className="bg-secondary border border-primary/10 rounded-2xl px-5 py-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
          <MapPin size={16} className="text-primary" />
        </div>

        <div className="text-sm text-gray">
          <span className="font-extrabold text-gray">Assigned Location:</span>{" "}
          <span className="text-gray/70">{location}</span>
        </div>
      </div>
    </Card>
  );
}
