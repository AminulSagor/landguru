"use client";

import React from "react";
import Card from "@/components/cards/card";
import { Image as ImageIcon } from "lucide-react";

export default function PropertyPhotos({
  data,
}: {
  data: { photos: string[]; morePhotosCount: number };
}) {
  return (
    <Card className="rounded-2xl p-6">
      <div className="flex items-center gap-2">
        <ImageIcon size={16} className="text-primary" />
        <h3 className="text-sm font-extrabold text-gray">Property Photos</h3>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4">
        {data.photos.slice(0, 3).map((src, idx) => (
          <div key={idx} className="overflow-hidden rounded-xl border border-gray/10 bg-secondary">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="photo" className="h-24 w-full object-cover" />
          </div>
        ))}

        {/* +2 tile */}
        <div className="flex h-24 items-center justify-center rounded-xl border border-gray/10 bg-primary/5 text-primary font-extrabold">
          +{data.morePhotosCount}
        </div>
      </div>
    </Card>
  );
}
