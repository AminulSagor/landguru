"use client";

import React from "react";
import Card from "@/components/cards/card";
import { CheckCircle2 } from "lucide-react";

export default function PropertyClientInfo({
  data,
}: {
  data: { clientName: string; verified: boolean };
}) {
  return (
    <Card className="rounded-2xl p-6">
      <h3 className="text-sm font-extrabold">Property & Client Info</h3>

      <div className="mt-4 rounded-xl bg-secondary/10 px-4 py-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray/10 overflow-hidden flex items-center justify-center">
          <span className="text-sm font-extrabold text-gray">F</span>
        </div>

        <div>
          <p className="text-sm font-extrabold text-gray">{data.clientName}</p>
          {data.verified ? (
            <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-green">
              <CheckCircle2 size={14} className="text-green" /> Verified
            </p>
          ) : (
            <p className="mt-0.5 text-xs font-semibold text-gray/50">Not verified</p>
          )}
        </div>
      </div>
    </Card>
  );
}
