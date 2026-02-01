"use client";

import React, { FC } from "react";
import Card from "@/components/cards/card";
import { ArrowRight, MapPin } from "lucide-react";
import { ListingCard } from "@/app/(user)/dashboard/types/my-property-list";
import MyPropertyBillBreakdown from "@/app/(user)/dashboard/(pages)/posts/sell/view/_components/my-property-bill-breakdown";
import Button from "@/components/buttons/button";

type Props = {
  isQuated: boolean;
  isDraft?: boolean;
  property: ListingCard;
  setOpenRequote: (d: boolean) => void;
  setOpenPay: (d: boolean) => void;
};

const MyPropertyRightSidebar: FC<Props> = ({
  isQuated,
  property,
  setOpenRequote,
  setOpenPay,
  isDraft = false,
}) => {
  return (
    <div className="space-y-5 w-full">
      <Card>
        <p className="text-sm font-bold text-black/50">Asking Price</p>
        <p className="mt-1 text-xl font-extrabold text-primary">
          {"৳"} {property.price.toLocaleString("en-IN")}
        </p>
      </Card>

      {isQuated && (
        <MyPropertyBillBreakdown
          onRequote={() => setOpenRequote(true)}
          onPay={() => setOpenPay(true)}
        />
      )}

      <Card>
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={18} className="text-primary" />
          <p className="font-extrabold text-black">Location</p>
        </div>
        <p className="text-sm text-black/60">{property.type}</p>
      </Card>

      <Card>
        <p className="font-extrabold text-black mb-2">Description</p>
        <p className="text-sm text-black/60 leading-relaxed">
          A stunning newly renovated villa featuring an open-concept living
          area, chef kitchen with top-tier appliances, and a private backyard
          oasis...
        </p>
        <button className="mt-2 text-sm font-bold text-primary">
          Read more
        </button>
      </Card>

      <Card>
        <p className="font-extrabold text-black mb-2">Posted By</p>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-black/10" />
          <div>
            <p className="font-extrabold text-black">Farhan</p>
            <p className="text-xs text-black/50">Posted: 2h ago</p>
          </div>
        </div>

        {isDraft && (
          <Button className="w-full mt-5">
            Continue Editing <ArrowRight size={18} />
          </Button>
        )}
      </Card>
    </div>
  );
};

export default MyPropertyRightSidebar;
