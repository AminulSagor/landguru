"use client";

import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import type { PropertyDetails } from "@/types/property/property.details";
import { IMAGE } from "@/constants/image-paths";
import Dialog from "@/components/dialogs/dialog";
import Image from "next/image";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: PropertyDetails;
};

const SuccessModal = ({ open, onOpenChange, property }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} position="top">
      <div className="text-center">
        <div className="flex justify-center">
          <Image
            src={"/images/submit-success.png"}
            height={100}
            width={100}
            alt="success-photo"
          />
        </div>

        <h2 className="mt-4 text-xl font-extrabold text-black">
          Request Submitted
        </h2>

        <p className="mt-2 text-sm text-primary font-semibold">
          You will be notified for appointment soon.
        </p>
        <p className="mt-1 text-xs text-black/50">
          It may take up to 1-3 business days for reviewing
        </p>

        <Card className="mt-5 p-4 text-left">
          <div className="flex gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={property.photos?.[0] ?? IMAGE.property}
              alt={property.title}
              className="h-16 w-16 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <p className="font-extrabold text-black truncate">
                {property.title}
              </p>
              <p className="text-sm text-black/50">
                Price: ৳ {property.askingPrice.toLocaleString("en-IN")}
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-primary text-white">
                  {property.propertyType}
                </span>
                {property.seller?.isVerified && (
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-primary/10 text-primary">
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-extrabold text-black/40">Status</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-extrabold bg-black/10 text-black/50">
              Pending Admin Review
            </span>
          </div>
        </Card>

        <Button
          className="w-full mt-6 h-12 rounded-xl"
          onClick={() => onOpenChange(false)}
        >
          Close
        </Button>
      </div>
    </Dialog>
  );
};

export default SuccessModal;
