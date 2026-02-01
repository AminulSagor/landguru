"use client";

import React, { useState } from "react";
import MyPropertyMetrics from "@/app/(user)/dashboard/(pages)/posts/sell/view/_components/my-property-metrics";
import RequoteDialog from "@/app/(user)/dashboard/(pages)/posts/sell/view/_components/requote-dialog";
import RequoteSuccessDialog from "@/app/(user)/dashboard/(pages)/posts/sell/view/_components/requote-success-dialog";
import PayDialog from "@/app/(user)/dashboard/(pages)/posts/sell/view/_components/pay-dialog";
import RequoteSubmittedDialog from "@/app/(user)/dashboard/(pages)/posts/sell/view/_components/requote-submitted-dialog";
import PaySuccessDialog from "@/app/(user)/dashboard/(pages)/posts/sell/view/_components/pay-successful-dialog";
import MyDealsHeader from "@/app/(user)/dashboard/(pages)/my-deals/_components/my-deals-header";
import {
  boughtDeals,
  soldDeals,
} from "@/app/(user)/dashboard/dummy-data/deals-data";
import { DealItem } from "@/app/(user)/dashboard/types/deals";
import MyDealsImages from "@/app/(user)/dashboard/(pages)/my-deals/_components/my-deals-images";
import MyDealsRightSidebar from "@/app/(user)/dashboard/(pages)/my-deals/_components/my-deals-right-sidebar";
import MyDealsPropertyUnlocked from "@/app/(user)/dashboard/(pages)/my-deals/_components/my-deals-unlock";
import ResellOptionsDialog from "@/app/(user)/dashboard/(pages)/my-deals/_components/resell-options-dialog";
import ResellUpdatePriceDialog from "@/app/(user)/dashboard/(pages)/my-deals/_components/resell-update-price-dialog";
import ResellSubmittedDialog from "@/app/(user)/dashboard/(pages)/my-deals/_components/resell-submitted-dialog";

const MYDealsDetails = ({ propertyId }: { propertyId: string }) => {
  const [openResellOptions, setOpenResellOptions] = useState(false);
  const [openResellUpdate, setOpenResellUpdate] = useState(false);
  const [openResellSubmitted, setOpenResellSubmitted] = useState(false);
  const [resellOption, setResellOption] = useState<"update" | "keep">("update");

  const property = [...soldDeals, ...boughtDeals].find(
    (p: DealItem) => p.id === propertyId,
  );

  if (!property) {
    return (
      <div className="py-24 text-center text-black/60">Property not found</div>
    );
  }

  const isSold = property.tag === "sold";

  return (
    <div className="py-20">
      <MyDealsHeader property={property} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14">
        <div className="col-span-12 lg:col-span-8 mt-5 space-y-10">
          <MyDealsImages property={property} />
          <MyPropertyMetrics />
          <MyDealsPropertyUnlocked />
        </div>

        <div className="col-span-12 lg:col-span-4 mt-5">
          <MyDealsRightSidebar
            property={property}
            isSold={isSold}
            setOpenResell={setOpenResellOptions}
          />
        </div>
      </div>

      <ResellOptionsDialog
        open={openResellOptions}
        onOpenChange={setOpenResellOptions}
        selected={resellOption}
        onChangeSelected={setResellOption}
        onNext={() => {
          setOpenResellOptions(false);
          setOpenResellUpdate(true);
        }}
        onKeepSubmit={() => {
          setOpenResellOptions(false);
          setOpenResellSubmitted(true);
        }}
      />

      <ResellUpdatePriceDialog
        open={openResellUpdate}
        onOpenChange={setOpenResellUpdate}
        onBack={() => {
          setOpenResellUpdate(false);
          setOpenResellOptions(true);
        }}
        landSize={5}
        previousPriceText="৳ 40,00,000"
        onSubmit={() => {
          setOpenResellUpdate(false);
          setOpenResellSubmitted(true);
        }}
      />

      <ResellSubmittedDialog
        open={openResellSubmitted}
        onOpenChange={setOpenResellSubmitted}
        title={property.title}
        imageUrl={property.imageUrl ?? ""}
        tagText="Flat"
        priceText="৳ 40,00,000"
      />
    </div>
  );
};

export default MYDealsDetails;
