"use client";

import React, { useState } from "react";
import { myListingsProperty } from "@/app/(dashboard)/user/dummy-data/my-property-list";
import { ListingCard } from "@/app/(dashboard)/user/types/my-property-list";
import MyPropertyHero from "@/app/(dashboard)/user/(pages)/posts/sell/view/_components/my-property-hero";
import MyPropertyImages from "@/app/(dashboard)/user/(pages)/posts/sell/view/_components/my-property-images";
import MyPropertyMetrics from "@/app/(dashboard)/user/(pages)/posts/sell/view/_components/my-property-metrics";
import MyPropertyUnlocked from "@/app/(dashboard)/user/(pages)/posts/sell/view/_components/my-property-unlock";
import PropertyMediaAndLegalDocsSection from "@/app/(dashboard)/user/(pages)/posts/sell/view/_components/PropertyMediaAndLegalDocsSection";
import MyPropertyRightSidebar from "@/app/(dashboard)/user/(pages)/posts/sell/view/_components/my-property-right-sidebar";
import RequoteDialog from "@/app/(dashboard)/user/(pages)/posts/sell/view/_components/requote-dialog";
import RequoteSuccessDialog from "@/app/(dashboard)/user/(pages)/posts/sell/view/_components/requote-success-dialog";
import RequoteSubmittedDialog from "@/app/(dashboard)/user/(pages)/posts/sell/view/_components/requote-submitted-dialog";
import PayDialog from "@/app/(dashboard)/user/(pages)/posts/sell/view/_components/pay-dialog";
import PaySuccessDialog from "@/app/(dashboard)/user/(pages)/posts/sell/view/_components/pay-successful-dialog";


const MYPropertyDetails = ({ propertyId }: { propertyId: string }) => {
  const [openRequote, setOpenRequote] = useState(false);
  const [openRequoteSuccess, setOpenRequoteSuccess] = useState(false);
  const [openPay, setOpenPay] = useState(false);
  const [openSubmitted, setOpenSubmitted] = useState(false);
  const [openPaySuccess, setOpenPaySuccess] = useState(false);

  const property = myListingsProperty.find(
    (p: ListingCard) => p.id === propertyId,
  );

  if (!property) {
    return (
      <div className="py-24 text-center text-black/60">Property not found</div>
    );
  }

  const isQuated = property?.tags.some((tag) => tag.label === "QUOTED");

  const isActive = property?.tags.some((tag) => tag.label === "ACTIVE");

  const isDraft = property?.tags.some((tag) => tag.label === "DRAFT");

  return (
    <div className="py-20">
      <MyPropertyHero property={property} isDraft={isDraft} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14">
        <div className="col-span-12 lg:col-span-8 mt-5 space-y-10">
          <MyPropertyImages property={property} />
          <MyPropertyMetrics />

          {isActive ? (
            <MyPropertyUnlocked />
          ) : (
            <PropertyMediaAndLegalDocsSection
              deedDocs={[
                { name: "Deed document 1.pdf", size: "1.5MB", ext: "pdf" },
                { name: "Deed document 2.docx", size: "2.2MB", ext: "docx" },
              ]}
              khatianDocs={[
                { name: "CS Khatian.pdf", size: "1.5MB", ext: "pdf" },
                { name: "SA Khatian.docx", size: "2.2MB", ext: "docx" },
                { name: "RS Khatian.pdf", size: "3.5MB", ext: "pdf" },
              ]}
            />
          )}
        </div>

        <div className="col-span-12 lg:col-span-4 mt-5">
          <MyPropertyRightSidebar
            property={property}
            isQuated={isQuated}
            setOpenRequote={setOpenRequote}
            setOpenPay={setOpenPay}
            isDraft={isDraft}
          />
        </div>
      </div>

      <RequoteDialog
        open={openRequote}
        onOpenChange={setOpenRequote}
        mandatoryFee={2000}
        optionalFee={2000}
        onSubmit={() => {
          setOpenSubmitted(true);
        }}
      />

      <RequoteSuccessDialog
        open={openRequoteSuccess}
        onOpenChange={setOpenRequoteSuccess}
        amount={4000}
        times={1}
      />

      <RequoteSubmittedDialog
        open={openSubmitted}
        onOpenChange={setOpenSubmitted}
        title={property.title}
        amount={4000}
        times={1}
      />

      <PayDialog
        open={openPay}
        onOpenChange={setOpenPay}
        total={6000}
        onPay={() => {
          setOpenPaySuccess(true);
        }}
      />

      <PaySuccessDialog
        open={openPaySuccess}
        onOpenChange={setOpenPaySuccess}
        amount={6000}
        title={property.title}
        priceText="৳ 40,00,000"
        image={property.image}
        tagText="Flat"
      />
    </div>
  );
};

export default MYPropertyDetails;
