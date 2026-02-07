"use client";

import React from "react";
import Card from "@/components/cards/card";
import Avatar from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/avatar";

export default function BuyerBars({
  buyer,
  finalDeal,
}: {
  buyer?: {
    name: string;
    buyerId: string;
    phone: string;
    email: string;
    avatarUrl: string;
  };
  finalDeal?: { label: string; soldOn: string; amount: string };
}) {
  return (
    <>
      {finalDeal && (
        <div className="border border-[#86EFAC] bg-[#DCFCE7] rounded-lg p-5">
          <p className="text-xs font-extrabold text-gray text-center">{finalDeal.label}</p>
          <p className="text-xs font-semibold text-gray text-center">
            SOLD ON: {finalDeal.soldOn}
          </p>
          <p className="text-xl font-extrabold text-green mt-2 text-center">
            {finalDeal.amount}
          </p>
        </div>
      )}
      {buyer && (
        <Card className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar url={buyer.avatarUrl} name={buyer.name} />
            <div>
              <p className="text-xs font-extrabold text-gray">{buyer.name}</p>
              <p className="text-xs font-semibold text-gray">{buyer.buyerId}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <p className="text-xs font-semibold text-gray">{buyer.phone}</p>
            <p className="text-xs font-semibold text-gray">{buyer.email}</p>
          </div>
        </Card>
      )}
    </>
  );
}
