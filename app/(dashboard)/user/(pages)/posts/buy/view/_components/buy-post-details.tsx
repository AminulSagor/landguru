"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import type {
  BuyPostDetails,
  BuyPostOffer,
  BuyPostPropertyType,
  BuyPostStatus,
} from "@/app/(dashboard)/user/dummy-data/buy-post-data";
import BuyPostRequestDetailsCard from "@/app/(dashboard)/user/(pages)/posts/buy/view/_components/buy-post-details-card";
import OffersPanel from "@/app/(dashboard)/user/(pages)/posts/buy/view/_components/offer-panel";
import { fetchMyBuyPostDetails } from "@/service/users/properties/mypost.service";
import type {
  ApiDataResponseDto,
  BuyPostDto,
  OfferReceivedDto,
} from "@/types/post/my/mypost.types";

const formatTimeAgo = (iso?: string) => {
  if (!iso) return "Just now";
  const timestamp = new Date(iso).getTime();
  if (Number.isNaN(timestamp)) return "Just now";
  const diffMs = Math.max(Date.now() - timestamp, 0);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMinutes < 60) return `${diffMinutes || 1}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

const formatSize = (value?: number | string | null, unit?: string | null) => {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return "N/A";
  return `Min ${num}${unit ? ` ${unit}` : ""}`;
};

const formatDistance = (
  min?: number | string | null,
  max?: number | string | null,
) => {
  const minNum = Number(min);
  const maxNum = Number(max);
  const hasMin = Number.isFinite(minNum) && minNum > 0;
  const hasMax = Number.isFinite(maxNum) && maxNum > 0;
  if (hasMin && hasMax) return `${minNum}m-${maxNum}m`;
  if (hasMin) return `>= ${minNum}m`;
  if (hasMax) return `<= ${maxNum}m`;
  return "N/A";
};

const formatBudgetRange = (
  min?: number | string | null,
  max?: number | string | null,
) => {
  const hasMin = Number.isFinite(Number(min));
  const hasMax = Number.isFinite(Number(max));
  if (hasMin && hasMax) {
    return `৳ ${Number(min).toLocaleString()} - ৳ ${Number(max).toLocaleString()}`;
  }
  if (hasMin) return `৳ ${Number(min).toLocaleString()}+`;
  if (hasMax) return `Up to ৳ ${Number(max).toLocaleString()}`;
  return "Not specified";
};

const mapStatus = (status?: string | null): BuyPostStatus => {
  if (status === "DRAFT") return "draft";
  if (status === "PENDING" || status === "PENDING_ADMIN" || status === "PENDING_ADMIN_REVIEW") {
    return "pending_admin_review";
  }
  return "active";
};

const mapPropertyType = (value?: string | null): BuyPostPropertyType => {
  if (value === "Flat" || value === "FLAT") return "Flat";
  if (value === "Villa") return "Villa";
  if (value === "Agro Land" || value === "AGRO_LAND") return "Agro Land";
  return "Plain Land";
};

const mapOffer = (offer: OfferReceivedDto, idx: number): BuyPostOffer => {
  const post = offer.property || offer.offerPost || offer.yourOffer;
  return {
    id: String(offer.id || offer.offerId || idx),
    title: String(offer.title || offer.propertyTitle || post?.title || "Untitled"),
    image:
      offer.imageUrl ||
      offer.thumbnail ||
      offer.image ||
      offer.photo ||
      offer.images?.[0] ||
      offer.photos?.[0] ||
      post?.imageUrl ||
      post?.thumbnail ||
      post?.coverImage ||
      post?.image ||
      post?.photo ||
      post?.images?.[0] ||
      post?.photos?.[0] ||
      "/images/properties/purbachal.png",
    propertyType: mapPropertyType(String(offer.propertyType || post?.propertyType || "Flat")),
    askingPrice: Number(offer.askingPrice ?? offer.price ?? post?.askingPrice ?? post?.price ?? 0),
    offeredText: formatTimeAgo(offer.updatedAt || offer.createdAt || offer.offeredAt),
    offeredAt: offer.updatedAt || offer.createdAt || offer.offeredAt,
    targetPostId: String(post?.id || post?.postId || post?.shortId || ""),
  };
};

const mapToBuyDetails = (post: BuyPostDto): BuyPostDetails => {
  const offers = (post.offers ?? []).map(mapOffer);
  const offersCount = Number(post.offersReceived ?? offers.length ?? 0);

  return {
    id: String(post.id || post.postId || post.shortId || "UNKNOWN"),
    title: String(post.title || "Untitled request"),
    postedText: formatTimeAgo(post.updatedAt || post.createdAt),
    preferredLocation: String(post.location || post.preferredLocation || "Not specified"),
    propertyType: mapPropertyType(String(post.propertyType || "Plain Land")),
    requiredLandSize: formatSize(post.landSizeMin, post.landSizeUnit),
    requiredPlotSize: formatSize(post.plotSizeMin, post.plotSizeUnit),
    distanceFromRoad: formatDistance(post.roadDistanceMin, post.roadDistanceMax),
    requiredLandSizeValue: Number.isFinite(Number(post.landSizeMin))
      ? Number(post.landSizeMin)
      : null,
    requiredLandSizeUnit: post.landSizeUnit ?? null,
    requiredPlotSizeValue: Number.isFinite(Number(post.plotSizeMin))
      ? Number(post.plotSizeMin)
      : null,
    requiredPlotSizeUnit: post.plotSizeUnit ?? null,
    roadDistanceMin: Number.isFinite(Number(post.roadDistanceMin))
      ? Number(post.roadDistanceMin)
      : null,
    roadDistanceMax: Number.isFinite(Number(post.roadDistanceMax))
      ? Number(post.roadDistanceMax)
      : null,
    budgetRange: formatBudgetRange(post.budgetMin, post.budgetMax),
    status: mapStatus(post.status),
    description: String(post.description || ""),
    totalOffers: offersCount,
    offers,
    action:
      offersCount > 0
        ? { kind: "offers", count: offersCount }
        : undefined,
  };
};

export default function BuyPostDetails({ buyPostId }: { buyPostId: string }) {
  const [data, setData] = React.useState<BuyPostDetails | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;
    const load = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const response = await fetchMyBuyPostDetails(buyPostId);
        const maybeWrapped = response as ApiDataResponseDto<BuyPostDto>;
        const dto =
          maybeWrapped && typeof maybeWrapped === "object" && "data" in maybeWrapped
            ? maybeWrapped.data
            : (response as BuyPostDto);
        if (!active) return;
        setData(mapToBuyDetails(dto));
      } catch {
        if (!active) return;
        setData(null);
        setLoadError("Failed to load buy post details.");
      } finally {
        if (active) setIsLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [buyPostId]);

  if (isLoading) {
    return <div className="py-24 text-center text-black/60">Loading buy post details...</div>;
  }

  if (!data || loadError) {
    return (
      <div className="py-24 text-center text-black/60">
        {loadError || "Buy post not found"}
      </div>
    );
  }

  return (
    <div className="py-24 space-y-3">
      <Link
        href="/user/properties"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray/60 hover:text-gray"
      >
        <ChevronLeft size={18} />
        Back to My Posts (Buys Posts)
      </Link>

      <h1 className="text-2xl font-extrabold text-gray">Manage Request</h1>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[480px_1fr]">
        <BuyPostRequestDetailsCard data={data} />
        <OffersPanel data={data} />
      </div>
    </div>
  );
}
