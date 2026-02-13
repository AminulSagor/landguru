import { Property } from "@/app/(dashboard)/user/types/property";
import Card from "@/components/cards/card";
import Image from "next/image";
import React from "react";

const PropertyImages = ({ property }: { property: Property }) => {
  return (
    <div>
      <div className="overflow-hidden">
        <Image
          src={property.coverImage}
          className="w-full h-105 rounded-xl"
          alt={property.title}
          height={100}
          width={100}
        />
      </div>

      {/* thumbnails */}
      <div className="mt-4 grid grid-cols-4 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-28 bg-black/5" />
          </Card>
        ))}
        <Card className="flex items-center justify-center bg-primary/5 text-primary font-extrabold">
          +7
        </Card>
      </div>
    </div>
  );
};

export default PropertyImages;
