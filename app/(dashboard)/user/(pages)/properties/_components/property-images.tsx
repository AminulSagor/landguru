"use client";

import React from "react";
import type { PropertyDetails } from "@/types/property/property.details";
import { IMAGE } from "@/constants/image-paths";
import Card from "@/components/cards/card";
import Image from "next/image";

const PropertyImages = ({ property }: { property: PropertyDetails }) => {
  const photos = property.photos?.length ? property.photos : [IMAGE.property];
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [property.id]);

  const coverImage = photos[activeIndex] ?? photos[0] ?? IMAGE.property;
  const thumbnailImages = photos.filter((_, index) => index !== activeIndex);
  const visibleThumbnails = thumbnailImages.slice(0, 3);
  const remainingCount = Math.max(
    thumbnailImages.length - visibleThumbnails.length,
    0,
  );

  const normalizedThumbnails = visibleThumbnails;
  return (
    <div>
      <div className="overflow-hidden">
        <div className="h-105 rounded-lg overflow-hidden relative">
          <Image
            src={coverImage}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      {/* thumbnails */}
      <div className="mt-4 grid grid-cols-4 gap-4">
        {normalizedThumbnails.map((imageUrl, index) => (
          <Card key={`${imageUrl}-${index}`} className="overflow-hidden">
            <button
              type="button"
              className="relative h-28 w-full"
              onClick={() => {
                const nextIndex = photos.indexOf(imageUrl);
                if (nextIndex >= 0) setActiveIndex(nextIndex);
              }}
            >
              <Image
                src={imageUrl}
                alt={`${property.title} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 140px"
              />
            </button>
          </Card>
        ))}
        {remainingCount > 0 ? (
          <Card className="flex items-center justify-center bg-primary/5 text-primary font-extrabold">
            +{remainingCount}
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default PropertyImages;
