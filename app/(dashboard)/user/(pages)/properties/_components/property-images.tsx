import { Property } from "@/app/(dashboard)/user/types/property";
import Card from "@/components/cards/card";
import Image from "next/image";

const PropertyImages = ({ property }: { property: Property }) => {
  return (
    <div>
      <div className="overflow-hidden">
        <div className="h-105 rounded-lg overflow-hidden relative">
          <Image
            src={property.coverImage}
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
