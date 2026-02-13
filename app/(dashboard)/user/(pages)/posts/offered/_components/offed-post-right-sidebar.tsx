"use client";

import React, { FC } from "react";
import Card from "@/components/cards/card";
import { ArrowRight, MapPin } from "lucide-react";
import Button from "@/components/buttons/button";
import { OfferPostCard } from "@/app/(dashboard)/user/types/offer-post";

type Props = {
  property: OfferPostCard;
};

const OfferedPostRightSidebar: FC<Props> = ({ property }) => {
  const isAccepted = property.status === "BUYER_ACCEPTED_OFFER";

  return (
    <div className="space-y-5 w-full">
      <Card>
        <p className="text-sm font-bold text-black/50">Asking Price</p>
        <p className="mt-1 text-xl font-extrabold text-primary">
          {"৳"} {property.askingPrice.toLocaleString("en-IN")}
        </p>
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={18} className="text-primary" />
          <p className="font-extrabold text-black">Location</p>
        </div>
        <p className="text-sm text-black/60">
          Block-C, Banani, Banani Thana, Dhaka North City Corporation,
          Dhaka-1213, Dhaka, Bangladesh.
        </p>
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
        <p className="font-extrabold text-black mb-2">Offerd To</p>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-black/10" />
          <div>
            <div className="flex gap-2 items-center">
              <p className="font-extrabold text-black text-xl">Farhan</p>
              <p className="bg-green-400 p-0.5 px-2 rounded-full text-xs text-white">
                {" "}
                Verified
              </p>
            </div>
            <p className="text-xs text-black/50">Posted: 2h ago</p>
          </div>
        </div>

        {isAccepted ? (
          <Button className="w-full mt-5">Complete this post</Button>
        ) : (
          <Button className="w-full mt-5">Make this a sell post instead</Button>
        )}

        <p className="text-xs text-gray mt-4 text-center">
          You can make changes after 3 days, at 12:00pm, 13 Jan 2026
        </p>
      </Card>
    </div>
  );
};

export default OfferedPostRightSidebar;
