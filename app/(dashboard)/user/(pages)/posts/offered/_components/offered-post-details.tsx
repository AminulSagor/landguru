"use client";

import React from "react";
import OfferedPostRightSidebar from "@/app/(dashboard)/user/(pages)/posts/offered/_components/offed-post-right-sidebar";
import OfferedPostImages from "@/app/(dashboard)/user/(pages)/posts/offered/_components/offerd-post-images";
import OfferedPostHero from "@/app/(dashboard)/user/(pages)/posts/offered/_components/offered-post-hero";
import OfferingWorksStepper from "@/app/(dashboard)/user/(pages)/posts/offered/_components/offering-work-stepper";
import MyPropertyMetrics from "@/app/(dashboard)/user/(pages)/posts/sell/view/_components/my-property-metrics";
import { OfferPostCard } from "@/app/(dashboard)/user/types/offer-post";
import { ListingCard } from "@/app/(dashboard)/user/types/my-property-list";
import { fetchMyOfferedPostDetails } from "@/service/users/properties/mypost.service";
import type {
  ApiDataResponseDto,
  OfferedPostDto,
} from "@/types/post/my/mypost.types";

const OfferedPostDetails = ({
  offeredPropertyId,
}: {
  offeredPropertyId: string;
}) => {
  const [property, setProperty] = React.useState<OfferPostCard | null>(null);
  const [metricsProperty, setMetricsProperty] = React.useState<ListingCard | null>(
    null,
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;

    const toNumberOrZero = (value: unknown) => {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : 0;
    };

    const toNullableNumber = (value: unknown) => {
      if (value == null) return null;
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    };

    const mapCategory = (value?: string | null): OfferPostCard["category"] => {
      if (value === "Flat" || value === "FLAT") return "FLAT";
      if (value === "Villa") return "VILLA";
      return "PLOT";
    };

    const mapOfferStatus = (value?: string | null): OfferPostCard["status"] => {
      if (value === "BUYER_ACCEPTED_OFFER") return "BUYER_ACCEPTED_OFFER";
      if (value === "PENDING_BUYER_REVIEW") return "PENDING_BUYER_REVIEW";
      return "DRAFT";
    };

    const resolveOfferedImage = (post: OfferedPostDto) => {
      return (
        post.image ??
        ""
      );
    };

    const mapOfferedDto = (post: OfferedPostDto): OfferPostCard => {
      const status = mapOfferStatus(post.status);

      return {
        id: String(post.id ?? "UNKNOWN"),
        title: String(post.title ?? "Untitled"),
        image: resolveOfferedImage(post),
        category: mapCategory(post.propertyType),
        status,
        statusLabel: String(post.statusLabel ?? post.status ?? ""),
        askingPrice: toNumberOrZero(post.askingPrice ?? post.price),
        timeAgo: "Just now",
      };
    };

    const mapOfferedDtoToMetrics = (post: OfferedPostDto): ListingCard => {
      const status = String(post.statusLabel ?? post.status ?? "");
      const statusVariant =
        post.status === "BUYER_ACCEPTED_OFFER" ? "green" : "gray";

      return {
        id: String(post.id ?? "UNKNOWN"),
        title: String(post.title ?? "Untitled"),
        type: String(post.propertyType ?? "N/A"),
        price: toNumberOrZero(post.askingPrice ?? post.price),
        time: "Just now",
        image: resolveOfferedImage(post),
        sellableAmount: toNullableNumber(post.sellableAmount),
        sellableUnit: post.sellableUnit ?? null,
        plotSize: toNullableNumber(post.plotSize),
        plotUnit: post.plotUnit ?? null,
        shareAmount: toNullableNumber(post.shareAmount),
        shareUnit: post.shareUnit ?? null,
        roadDistanceMin: toNullableNumber(post.roadDistanceMin),
        roadDistanceMax: toNullableNumber(post.roadDistanceMax),
        tags: [{ label: status, variant: statusVariant }],
      };
    };

    const load = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const response = await fetchMyOfferedPostDetails(offeredPropertyId);
        const maybeWrapped = response as ApiDataResponseDto<OfferedPostDto>;
        const dto =
          maybeWrapped && typeof maybeWrapped === "object" && "data" in maybeWrapped
            ? maybeWrapped.data
            : (response as OfferedPostDto);

        if (!active) return;
        setProperty(mapOfferedDto(dto));
        setMetricsProperty(mapOfferedDtoToMetrics(dto));
      } catch {
        if (!active) return;
        setProperty(null);
        setMetricsProperty(null);
        setLoadError("Failed to load offered post details.");
      } finally {
        if (active) setIsLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [offeredPropertyId]);

  if (isLoading) {
    return <div className="py-24 text-center text-black/60">Loading offered post...</div>;
  }

  if (!property || !metricsProperty || loadError) {
    return (
      <div className="py-24 text-center text-black/60">
        {loadError || "Property not found"}
      </div>
    );
  }

  return (
    <div className="py-20">
      <OfferedPostHero property={property} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14">
        <div className="col-span-12 lg:col-span-8 mt-5 space-y-10">
          <OfferedPostImages property={property} />
          <MyPropertyMetrics property={metricsProperty} />
          <OfferingWorksStepper />
        </div>

        <div className="col-span-12 lg:col-span-4 mt-5">
          <OfferedPostRightSidebar property={property} />
        </div>
      </div>
    </div>
  );
};

export default OfferedPostDetails;
