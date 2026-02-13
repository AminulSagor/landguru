"use client";

import React from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { MapPin, User } from "lucide-react";
import { ScheduleItem } from "@/app/(dashboard)/agent/dummy-data/moc-agent-home";

export default function ScheduleCard({ item }: { item: ScheduleItem }) {
  return (
    <Card className="rounded-2xl p-6">
      <p className="text-sm font-extrabold text-primary">{item.time}</p>

      <h3 className="mt-1 text-base font-extrabold">{item.title}</h3>
      <p className="mt-1 text-sm font-semibold text-gray/50">{item.code}</p>

      <div className="mt-4 flex items-center gap-2 text-sm text-gray/70">
        <User size={16} className="text-gray/40" />
        <p>
          Client:{" "}
          <span className="font-extrabold text-gray">{item.client}</span>
        </p>
      </div>

      <div className="mt-3 flex items-start gap-2 text-sm text-gray/60">
        <MapPin size={16} className="mt-0.5 text-gray/40" />
        <p className="leading-6">{item.address}</p>

        <button className="ml-auto text-gray/40 hover:text-gray/70">⌄</button>
      </div>

      <Button variant="secondary" className="w-full mt-5">
        View Details
      </Button>
    </Card>
  );
}
