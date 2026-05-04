import type { PropertyDetails } from "@/types/property/property.details";
import { IMAGE } from "@/constants/image-paths";
import Card from "@/components/cards/card";
import Image from "next/image";

const PropertyImages = ({ property }: { property: PropertyDetails }) => {
  const photos = property.photos?.length ? property.photos : [IMAGE.property];
  const coverImage = photos[0] ?? IMAGE.property;
  const thumbnailImages = photos.slice(1, 4);
  const remainingCount = Math.max(photos.length - 4, 0);

  const normalizedThumbnails = [...thumbnailImages];
  while (normalizedThumbnails.length < 3) {
    normalizedThumbnails.push(coverImage);
  }
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
            <div className="relative h-28">
              <Image
                src={imageUrl}
                alt={`${property.title} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 140px"
              />
            </div>
          </Card>
        ))}
        <Card className="flex items-center justify-center bg-primary/5 text-primary font-extrabold">
          +{remainingCount}
        </Card>
      </div>
    </div>
  );
};

export default PropertyImages;
