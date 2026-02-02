"use client";

import React from "react";
import Card from "@/components/cards/card";
import { MapPin } from "lucide-react";

export default function AssignedLocationBar({ location }: { location: string }) {
  return (
    <Card className="rounded-2xl bg-primary/5 border border-primary/10 px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
          <MapPin size={16} className="text-primary" />
        </div>

        <p className="text-sm text-gray">
          <span className="font-extrabold text-primary">Assigned Location:</span>{" "}
          <span className="text-gray/70">{location}</span>
        </p>
      </div>
    </Card>
  );
}
