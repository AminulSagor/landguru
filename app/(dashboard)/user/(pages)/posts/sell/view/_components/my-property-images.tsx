import { ListingCard } from "@/app/(dashboard)/user/types/my-property-list";
import Card from "@/components/cards/card";
import Image from "next/image";
import React from "react";

const MyPropertyImages = ({ property }: { property: ListingCard }) => {
  const gallery = property.images && property.images.length > 0 ? property.images : [property.image];
  const mainImage = gallery[0] || property.image;

  return (
    <div>
      <div className="overflow-hidden">
        <Image
          src={mainImage}
          className="w-full h-105 rounded-xl"
          alt={property.title}
          height={100}
          width={100}
        />
      </div>

      {/* thumbnails */}
      <div className="mt-4 grid grid-cols-4 gap-4">
        {gallery.slice(1, 5).map((img, i) => (
          <Card key={i} className="overflow-hidden">
            <Image
              src={img}
              className="h-28 w-full object-cover"
              alt={`${property.title} thumbnail ${i + 1}`}
              height={112}
              width={160}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyPropertyImages;
