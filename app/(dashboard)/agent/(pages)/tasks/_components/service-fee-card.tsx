"use client";

import React from "react";
import Card from "@/components/cards/card";

export default function ServiceFeeCard({ fee }: { fee: number }) {
  return (
    <Card className="rounded-2xl p-5">
      <h3 className="text-sm font-extrabold text-gray">Assigned Service Fee</h3>

      <div className="mt-3 rounded-lg bg-gray/10 px-4 py-3 text-sm font-semibold text-gray/60">
        ৳ {fee}
      </div>
    </Card>
  );
}
