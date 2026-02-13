"use client";

import React from "react";
import Card from "@/components/cards/card";
import { FileText } from "lucide-react";

export default function RawDocuments({
  data,
}: {
  data: { rawDocs: { name: string; size: string }[] };
}) {
  return (
    <Card className="rounded-2xl p-6">
      <div className="flex items-center gap-2">
        <FileText size={16} className="text-primary" />
        <h3 className="text-sm font-extrabold text-gray">
          Raw Documents{" "}
          <span className="text-xs font-semibold text-gray/40">(From Client)</span>
        </h3>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.rawDocs.map((d, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-gray/10 bg-white p-4 flex items-start gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <FileText size={16} className="text-primary" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-gray">{d.name}</p>
              <p className="mt-1 text-xs font-semibold text-gray/40">{d.size}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
