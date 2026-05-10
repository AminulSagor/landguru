"use client";

import React, { FC } from "react";
import Card from "@/components/cards/card";
import { ArrowRight, MapPin } from "lucide-react";
import { ListingCard } from "@/app/(dashboard)/user/types/my-property-list";
import Button from "@/components/buttons/button";
import MyPropertyBillBreakdown from "@/app/(dashboard)/user/(pages)/posts/sell/view/_components/my-property-bill-breakdown";
import { useRouter } from "next/navigation";

type Props = {
  isQuated: boolean;
  isDraft?: boolean;
  editHref?: string;
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
  editHref,
}) => {
  const router = useRouter();

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
        <p className="text-sm text-black/60">{property.location || "N/A"}</p>
      </Card>

      <Card>
        <p className="font-extrabold text-black mb-2">Description</p>
        <p className="text-sm text-black/60 leading-relaxed">
          {property.description || "No description provided."}
        </p>
      </Card>

      <Card>
        <p className="font-extrabold text-black mb-2">Posted By</p>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-black/10" />
          <div>
            <p className="font-extrabold text-black">
              {property.postedByName || "N/A"}
            </p>
            <p className="text-xs text-black/50">Posted: {property.time}</p>
          </div>
        </div>

        {isDraft && (
          <Button
            className="w-full mt-5"
            onClick={() => router.push(editHref || "/user/posts/sell/create")}
          >
            Continue Editing <ArrowRight size={18} />
          </Button>
        )}
      </Card>
    </div>
  );
};

export default MyPropertyRightSidebar;
