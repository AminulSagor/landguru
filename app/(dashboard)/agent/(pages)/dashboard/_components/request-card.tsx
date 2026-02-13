"use client";

import React from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { MapPin } from "lucide-react";
import { RequestItem } from "@/app/(dashboard)/agent/dummy-data/moc-agent-home";

export default function RequestCard({ item }: { item: RequestItem }) {
  return (
    <Card className="rounded-2xl p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex rounded-lg bg-pumpkin px-3 py-1 text-xs font-extrabold text-white">
          {item.badge}
        </span>

        <p className="text-xs font-semibold text-gray/50">{item.assignedAgo}</p>
      </div>

      <h3 className="mt-4 text-base font-extrabold">{item.title}</h3>
      <p className="mt-1 text-sm font-semibold text-gray/50">{item.code}</p>

      <div className="mt-4 flex items-start gap-2 text-sm text-gray/60">
        <MapPin size={16} className="mt-0.5 text-gray/40" />
        <p className="leading-6">{item.address}</p>
      </div>

      <p className="mt-4 text-sm font-extrabold text-pumpkin">
        {item.acceptBefore}
      </p>

      <Button className="w-full mt-5 bg-pumpkin hover:opacity-95 text-white">
        View Details
      </Button>
    </Card>
  );
}
