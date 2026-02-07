"use client";

import { Play } from "lucide-react";
import Card from "@/components/cards/card";

import { PropertyDetails } from "@/app/(admin)/admin/types/property.types";
import Avatar from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/avatar";

export default function PostInformationCard({
  title,
  data,
}: {
  title: string;
  data: PropertyDetails["postInformation"];
}) {
  return (
    <Card>
      <p className="text-sm font-extrabold text-primary">{title}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div>
          <p className="text-xs font-semibold text-gray mb-2">Posted By</p>
          <div className="flex items-center gap-3">
            <Avatar url={data.postedBy.avatarUrl} name={data.postedBy.name} />
            <div>
              <p className="text-xs font-extrabold text-gray">{data.postedBy.name}</p>
              <p className="text-xs font-semibold text-gray">{data.postedBy.phone}</p>
              <p className="text-xs font-semibold text-gray">ID: {data.postedBy.uid}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray mb-2">Asking Price</p>
          <p className="text-xs font-extrabold text-primary">{data.askingPrice}</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray mb-2">Location</p>
          <p className="text-xs font-semibold text-gray">{data.locationText}</p>
        </div>
      </div>

      {data.facts?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {data.facts.map((f) => (
            <div key={f.label} className="border border-gray/15 rounded-lg p-3 bg-white">
              <p className="text-xs font-semibold text-gray">{f.label}</p>
              <p className="text-xs font-extrabold text-primary mt-1">{f.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <p className="text-xs font-semibold text-gray mb-2">Description</p>
        <p className="text-xs font-semibold text-gray">{data.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div>
          <p className="text-xs font-extrabold text-gray mb-3">Property Photos</p>
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {data.media.photos.map((p, idx) => (
              <div
                key={idx}
                className="h-16 w-24 rounded-lg overflow-hidden border border-gray/15 bg-secondary shrink-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={`photo-${idx}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-extrabold text-gray mb-3">Property Video</p>
          <div className="h-20 max-w-54 rounded-lg border border-gray/15 bg-secondary flex items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <Play size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
