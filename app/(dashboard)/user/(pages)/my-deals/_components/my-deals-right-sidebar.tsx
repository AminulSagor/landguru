"use client";

import { FC } from "react";
import Card from "@/components/cards/card";
import { MapPin } from "lucide-react";
import { DealItem } from "@/app/(dashboard)/user/types/deals";
import Button from "@/components/buttons/button";
import DealFinalAmountCard from "@/app/(dashboard)/user/(pages)/my-deals/_components/deal-final-amount-card";
import LandDiagramCard from "@/app/(dashboard)/user/(pages)/properties/_components/land-diagram-card";

type Props = {
  property: DealItem;
  isSold: boolean;
  setOpenResell: (v: boolean) => void;
};

const MyDealsRightSidebar: FC<Props> = ({
  property,
  isSold,
  setOpenResell,
}) => {
  return (
    <div className="space-y-5 w-full">
      <DealFinalAmountCard amount="40,00,000" soldOn="23 Jan 2026" />
      <Card>
        <p className="font-extrabold text-black mb-2">Posted By</p>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-black/10" />
          <div>
            <p className="font-extrabold text-black">Farhan</p>
            <p className="text-xs text-black/50">Posted: 2h ago</p>
          </div>
        </div>
      </Card>

      {/* resell section */}
      {!isSold && (
        <Card>
          <Button className="w-full" onClick={() => setOpenResell(true)}>
            Resell this property
          </Button>

          <p className="mt-3 text-xs text-gray">
            You can make changes after 3 days, at 12:00pm, 13 Jan 2026
          </p>
        </Card>
      )}

      <Card>
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={18} className="text-primary" />
          <p className="font-extrabold text-black">Location</p>
        </div>
        <p className="text-sm text-black/60">{property.location}</p>
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

      <LandDiagramCard />
    </div>
  );
};

export default MyDealsRightSidebar;
