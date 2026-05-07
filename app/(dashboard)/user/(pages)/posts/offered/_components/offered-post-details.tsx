"use client";

import React from "react";
import OfferedPostRightSidebar from "@/app/(dashboard)/user/(pages)/posts/offered/_components/offed-post-right-sidebar";
import OfferedPostImages from "@/app/(dashboard)/user/(pages)/posts/offered/_components/offerd-post-images";
import OfferedPostHero from "@/app/(dashboard)/user/(pages)/posts/offered/_components/offered-post-hero";
import OfferingWorksStepper from "@/app/(dashboard)/user/(pages)/posts/offered/_components/offering-work-stepper";
import MyPropertyMetrics from "@/app/(dashboard)/user/(pages)/posts/sell/view/_components/my-property-metrics";
import { OfferPostCard } from "@/app/(dashboard)/user/types/offer-post";
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
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;

    const mapOfferedDto = (post: OfferedPostDto): OfferPostCard => {
      const sourcePost = post.yourOffer || post.offerPost;
      const type = String(post.propertyType || sourcePost?.propertyType || "Plain Land");
      const categoryMap: Record<string, "FLAT" | "PLOT" | "VILLA"> = {
        Flat: "FLAT",
        FLAT: "FLAT",
        Villa: "VILLA",
        Plain: "PLOT",
        "Plain Land": "PLOT",
        PLAIN_LAND: "PLOT",
        plainLand: "PLOT",
        "Water Land": "PLOT",
        WATER_LAND: "PLOT",
        waterLand: "PLOT",
        "Agro Land": "PLOT",
        AGRO_LAND: "PLOT",
        agroLand: "PLOT",
      };

      return {
        id: String(post.id || post.offerId || post.shortId || "UNKNOWN"),
        title: String(post.title || sourcePost?.title || "Untitled"),
        image:
          post.imageUrl ||
          post.thumbnail ||
          post.image ||
          post.photo ||
          post.photos?.[0] ||
          sourcePost?.imageUrl ||
          sourcePost?.thumbnail ||
          sourcePost?.coverImage ||
          sourcePost?.image ||
          sourcePost?.photo ||
          sourcePost?.photos?.[0] ||
          sourcePost?.images?.[0] ||
          "",
        category: categoryMap[type] || "PLOT",
        status: (post.status as OfferPostCard["status"]) || "DRAFT",
        statusLabel: String(post.status || "N/A"),
        askingPrice: Number(
          post.askingPrice ??
            post.price ??
            sourcePost?.askingPrice ??
            sourcePost?.price ??
            0,
        ),
        timeAgo: "Just now",
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
      } catch {
        if (!active) return;
        setProperty(null);
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

  if (!property || loadError) {
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
          <MyPropertyMetrics />
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
