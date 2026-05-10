"use client";

import React, { useEffect, useState } from "react";
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
import { fetchMySellPostDetails } from "@/service/users/properties/mypost.service";
import type {
  ApiDataResponseDto,
  SellPostDto,
} from "@/types/post/my/mypost.types";


const MYPropertyDetails = ({ propertyId }: { propertyId: string }) => {
  const [openRequote, setOpenRequote] = useState(false);
  const [openRequoteSuccess, setOpenRequoteSuccess] = useState(false);
  const [openPay, setOpenPay] = useState(false);
  const [openSubmitted, setOpenSubmitted] = useState(false);
  const [openPaySuccess, setOpenPaySuccess] = useState(false);
  const [property, setProperty] = useState<ListingCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const toNumber = (value: unknown, fallback = 0): number => {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : fallback;
    };
    const toNullableNumber = (value: unknown): number | null => {
      if (value === null || value === undefined) return null;
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    };

    const formatRange = (min?: unknown, max?: unknown) => {
      const minValue = min === null || min === undefined ? null : Number(min);
      const maxValue = max === null || max === undefined ? null : Number(max);
      if (Number.isFinite(minValue) && Number.isFinite(maxValue)) {
        return `${minValue}m-${maxValue}m`;
      }
      if (Number.isFinite(minValue)) return `${minValue}m`;
      if (Number.isFinite(maxValue)) return `${maxValue}m`;
      return "N/A";
    };

    const mapSellPostToListing = (post: SellPostDto): ListingCard => {
      const id = post.id || post.postId || post.shortId || "UNKNOWN";
      const images = [...(post.photos || []), ...(post.images || [])].filter(Boolean);
      const image =
        post.imageUrl ||
        post.thumbnail ||
        post.coverImage ||
        post.image ||
        post.photo ||
        images[0] ||
        "";
      const price = toNumber(post.askingPrice ?? post.price, 0);
      const statusLabel = post.status || "N/A";
      const statusVariant =
        post.status === "ACTIVE"
          ? "green"
          : post.status === "QUOTED"
            ? "danger"
            : "gray";
      const addressObj = typeof post.address === "string" ? null : post.address;
      const location =
        addressObj?.fullAddress ||
        post.location ||
        [
          addressObj?.wardNo,
          addressObj?.unionOrCityCorp,
          addressObj?.upazila,
          addressObj?.district,
          addressObj?.division,
        ]
          .filter(Boolean)
          .join(", ");

      return {
        id,
        title: post.title || "Untitled",
        type: String(post.propertyType || "Plain Land"),
        price,
        time: post.updatedAt || post.createdAt || "N/A",
        image,
        images,
        description: post.description || "",
        location: location || "N/A",
        postedByName: post.seller?.fullName || post.seller?.name || "N/A",
        postedByImage:
          post.seller?.photoUrl ||
          post.seller?.imageUrl ||
          post.seller?.image ||
          "",
        sellableAmount: toNullableNumber(post.sellableAmount),
        sellableUnit: post.sellableUnit ?? null,
        plotSize: toNullableNumber(post.plotSize),
        plotUnit: post.plotUnit ?? null,
        shareAmount: toNullableNumber(post.shareAmount),
        shareUnit: post.shareUnit ?? null,
        roadDistanceMin: toNullableNumber(post.roadDistanceMin),
        roadDistanceMax: toNullableNumber(post.roadDistanceMax),
        sellableAmountText: `${toNumber(post.sellableAmount, 0)} ${post.sellableUnit || ""}`.trim(),
        plotSizeText: `${toNumber(post.plotSize, 0)} ${post.plotUnit || ""}`.trim(),
        shareAmountText:
          post.shareAmount && post.shareUnit
            ? `${toNumber(post.shareAmount, 0)} ${post.shareUnit}`
            : "N/A",
        roadDistanceText: formatRange(post.roadDistanceMin, post.roadDistanceMax),
        lastCompletedStep: toNullableNumber(post.lastCompletedStep),
        tags: [{ label: statusLabel, variant: statusVariant }],
      };
    };

    const load = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const response = await fetchMySellPostDetails(propertyId);
        const maybeWrapped = response as ApiDataResponseDto<SellPostDto>;
        const dto =
          maybeWrapped && typeof maybeWrapped === "object" && "data" in maybeWrapped
            ? maybeWrapped.data
            : (response as SellPostDto);

        if (!active) return;
        setProperty(mapSellPostToListing(dto));
      } catch (error) {
        if (!active) return;
        setProperty(null);
        setLoadError("Failed to load property details.");
      } finally {
        if (active) setIsLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [propertyId]);

  if (isLoading) {
    return <div className="py-24 text-center text-black/60">Loading property...</div>;
  }

  if (!property || loadError) {
    return (
      <div className="py-24 text-center text-black/60">
        {loadError || "Property not found"}
      </div>
    );
  }

  const isQuated = property?.tags.some((tag) => tag.label === "QUOTED");

  const isActive = property?.tags.some((tag) => tag.label === "ACTIVE");

  const isDraft = property?.tags.some((tag) => tag.label === "DRAFT");
  const resolveEditStep = (lastCompletedStep?: number | null) => {
    const numericStep = Number(lastCompletedStep);
    if (!Number.isFinite(numericStep)) return 1;
    return Math.min(4, Math.max(1, Math.floor(numericStep) + 1));
  };
  const editStep = resolveEditStep(property.lastCompletedStep);
  const editHref = `/user/posts/sell/create?draftId=${property.id}&step=${editStep}`;

  return (
    <div className="py-20">
      <MyPropertyHero property={property} isDraft={isDraft} editHref={editHref} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14">
        <div className="col-span-12 lg:col-span-8 mt-5 space-y-10">
          <MyPropertyImages property={property} />
          <MyPropertyMetrics property={property} />

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
            editHref={editHref}
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
