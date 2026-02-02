"use client";

import RequestCard from "@/app/(agent)/agent/dashboard/_components/request-card";
import { RequestItem } from "@/app/(agent)/agent/dummy-data/moc-agent-home";
import React from "react";


export default function RequiresAcceptingSection({ items }: { items: RequestItem[] }) {
  return (
    <div className="space-y-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold">Requires Accepting</h2>
        <button className="text-sm font-extrabold text-primary hover:opacity-80">
          See All
        </button>
      </div>

      <div className="space-y-5">
        {items.map((it) => (
          <RequestCard key={it.id} item={it} />
        ))}
      </div>
    </div>
  );
}
