"use client";

import React from "react";

import PropertyTabs from "@/app/(dashboard)/user/(pages)/properties/_components/property-tabs-header";
import PropertyFilters from "@/app/(dashboard)/user/(pages)/properties/_components/property-filters-sidebar";
import PropertyGrid from "@/app/(dashboard)/user/(pages)/properties/_components/property-grid";
import PropertyRequestGrid from "@/app/(dashboard)/user/(pages)/properties/_components/property-request-grid";
import MYPropertyFilters from "@/app/(dashboard)/user/(pages)/properties/_components/my-property-filter-sidebar";
import MyPropertyGrid from "@/app/(dashboard)/user/(pages)/properties/_components/my-property-grid";
import BuyPostDataGrid from "@/app/(dashboard)/user/(pages)/properties/_components/buy-post-grid";
import OfferPostGrid from "@/app/(dashboard)/user/(pages)/properties/_components/offer-post-grid";
import {
  fetchSellPostListings,
  fetchWantedPosts,
} from "@/service/users/properties/properties.services";
import {
  fetchMySellPosts,
  fetchMyBuyPosts,
  fetchMyOfferedPosts,
} from "@/service/users/properties/mypost.service";
import { formatDisplayId } from "@/utils/id.utils";
import type { PropertyRequest } from "@/app/(dashboard)/user/types/property-request";
import type {
  PropertyListing,
  SellPostListingMeta,
} from "@/types/property/property.listing";
import type {
  AddressParts,
  BuyPostListItem,
  BuyPostListMeta,
} from "@/types/post/buy/wanted-needs.types";
import type {
  SellPostDto,
  BuyPostDto,
  OfferedPostDto,
  PaginationMetaDto,
  MySellPostTabDto,
  MyBuyPostTabDto,
} from "@/types/post/my/mypost.types";
import { PropertyFiltersProvider } from "@/app/(dashboard)/user/(pages)/properties/_components/property-filters.context";

type TabKey = "for-sale" | "wanted" | "my-posts";

//my post tab types
export type Category = "Sell Posts" | "Buy Posts" | "Offered Posts";
export type Status =
  | "All Status"
  | "Offers"
  | "Active"
  | "In Review"
  | "Accepted"
  | "Draft";

const WANTED_PAGE_SIZE = 6;
const MY_POSTS_PAGE_SIZE = 6;

const resolveImageUrl = (...values: Array<string | null | undefined>) => {
  return (
    values
      .find((value) => typeof value === "string" && value.trim().length > 0)
      ?.trim() ?? ""
  );
};

const mapMySellPostTabStatus = (status: Status): MySellPostTabDto => {
  const statusMap: Record<Status, MySellPostTabDto> = {
    "All Status": "ALL",
    Offers: "QUOTED",
    Active: "ACTIVE",
    "In Review": "PENDING",
    Accepted: "ACTIVE",
    Draft: "DRAFT",
  };
  return statusMap[status];
};

const mapMyBuyPostTabStatus = (status: Status): MyBuyPostTabDto => {
  const statusMap: Record<Status, MyBuyPostTabDto> = {
    "All Status": "ALL",
    Offers: "OFFERS",
    Active: "ACTIVE",
    "In Review": "IN_REVIEW",
    Accepted: "ACCEPTED",
    Draft: "DRAFT",
  };
  return statusMap[status];
};

// Mapping functions for DTOs to component types
const mapSellPostToListingCard = (post: SellPostDto) => {
  const id = post.id || post.postId || post.shortId || "UNKNOWN";

  const getStatusTag = (status?: string | null) => {
    switch (status) {
      case "ACTIVE":
        return { label: "Active", variant: "green" as const };
      case "QUOTED":
        return { label: "Quoted", variant: "danger" as const };
      case "PENDING":
      case "PENDING_ADMIN":
      case "PENDING_ADMIN_REVIEW":
        return { label: "Pending", variant: "gray" as const };
      case "DRAFT":
        return { label: "Draft", variant: "gray" as const };
      default:
        return { label: status || "N/A", variant: "secondary" as const };
    }
  };

  return {
    id,
    title: post.title || "Untitled",
    type: post.propertyType || "Plain Land",
    price: Number(post.askingPrice ?? post.price ?? 0),
    time: formatTimeAgo(post.updatedAt || post.createdAt) || "Just now",
    image: resolveImageUrl(
      post.imageUrl,
      post.thumbnail,
      post.coverImage,
      post.image,
      post.photo,
      post.photos?.[0],
      post.images?.[0],
    ),
    tags: [getStatusTag(post.status)],
  };
};

const mapBuyPostToBuyPost = (post: BuyPostDto) => {
  const id = post.id || post.postId || post.shortId || "UNKNOWN";

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

  const statusMap: Record<string, "active" | "pending_admin_review" | "draft"> =
    {
      ACTIVE: "active",
      PENDING: "pending_admin_review",
      PENDING_ADMIN: "pending_admin_review",
      PENDING_ADMIN_REVIEW: "pending_admin_review",
      DRAFT: "draft",
    };

  return {
    id,
    title: post.title || "Untitled request",
    postedText: formatTimeAgo(post.updatedAt || post.createdAt) || "Just now",
    preferredLocation:
      post.location || post.preferredLocation || "Not specified",
    propertyType: (post.propertyType || "Plain Land") as any,
    requiredLandSize: formatMinSize(
      Number(post.landSizeMin) || undefined,
      post.landSizeUnit || undefined,
    ),
    requiredPlotSize: formatMinSize(
      Number(post.plotSizeMin) || undefined,
      post.plotSizeUnit || undefined,
    ),
    distanceFromRoad: formatDistanceRange(
      Number(post.roadDistanceMin) || undefined,
      Number(post.roadDistanceMax) || undefined,
    ),
    budgetRange: formatBudgetRange(post.budgetMin, post.budgetMax),
    status: statusMap[post.status ?? "ACTIVE"] || "active",
    action:
      Number(post.offersReceived ?? post.offers?.length ?? 0) > 0
        ? {
            kind: "offers" as const,
            count: Number(post.offersReceived ?? post.offers?.length ?? 0),
          }
        : undefined,
  };
};

const mapOfferedPostToOfferPostCard = (post: OfferedPostDto) => {
  const id = post.id || post.offerId || post.shortId || "UNKNOWN";

  const sourcePost = post.yourOffer || post.offerPost;

  const propertyType =
    post.propertyType || sourcePost?.propertyType || "Plain Land";

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

  const statusLabelMap: Record<string, string> = {
    BUYER_ACCEPTED_OFFER: "Buyer accepted your offer",
    BUYER_ACCEPTED: "Buyer accepted your offer",
    PENDING_BUYER_REVIEW: "PENDING BUYER REVIEW",
    PENDING_ADMIN_REVIEW: "PENDING ADMIN REVIEW",
    PENDING_ADMIN: "PENDING ADMIN REVIEW",
    DRAFT: "DRAFT",
    PENDING: "PENDING BUYER REVIEW",
  };

  return {
    id,
    title: post.title || sourcePost?.title || "Untitled",
    image: resolveImageUrl(
      post.imageUrl,
      post.thumbnail,
      post.image,
      post.photo,
      post.photos?.[0],
      sourcePost?.imageUrl,
      sourcePost?.thumbnail,
      sourcePost?.coverImage,
      sourcePost?.image,
      sourcePost?.photo,
      sourcePost?.photos?.[0],
      sourcePost?.images?.[0],
    ),
    category: categoryMap[propertyType] || "PLOT",
    status: (post.status || "DRAFT") as any,
    statusLabel: statusLabelMap[post.status ?? "DRAFT"] || post.status || "N/A",
    askingPrice: Number(
      post.askingPrice ??
        post.price ??
        sourcePost?.askingPrice ??
        sourcePost?.price ??
        0,
    ),
    timeAgo:
      formatTimeAgo(post.updatedAt || post.createdAt || post.offeredAt) ||
      "Just now",
  };
};

const normalizeAddressValue = (value?: string | null) => {
  const trimmed = (value ?? "").trim();
  if (!trimmed) return "";

  const lowered = trimmed.toLowerCase();
  if (lowered === "n/a" || lowered === "na" || lowered === "none") {
    return "";
  }

  return trimmed;
};

const formatAddressParts = (parts?: AddressParts | null) => {
  if (!parts) return "";

  const ward = normalizeAddressValue(parts.wardNo);

  const segments = [
    ward ? `Ward ${ward}` : "",
    normalizeAddressValue(parts.unionOrCityCorp),
    normalizeAddressValue(parts.upazila),
    normalizeAddressValue(parts.district),
    normalizeAddressValue(parts.division),
    normalizeAddressValue(parts.postalCode),
  ].filter((value) => value && String(value).trim().length > 0);

  return segments.join(", ");
};

const resolveLocation = (item: BuyPostListItem) => {
  const address = item.address;

  if (typeof address === "string") {
    return address;
  }

  if (address && typeof address === "object") {
    return formatAddressParts(address);
  }

  return "";
};

const formatTimeAgo = (iso?: string) => {
  if (!iso) return "";

  const timestamp = new Date(iso).getTime();
  if (Number.isNaN(timestamp)) return "";

  const diffMs = Math.max(Date.now() - timestamp, 0);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 60) return `${diffMinutes || 1}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

const formatMinSize = (value?: number, unit?: string) => {
  if (!Number.isFinite(value)) return "N/A";
  const unitText = unit ? ` ${unit}` : "";
  return `Min ${value}${unitText}`;
};

const formatDistanceRange = (min?: number, max?: number) => {
  const hasMin = Number.isFinite(min);
  const hasMax = Number.isFinite(max);

  if (hasMin && hasMax) return `${min}m-${max}m`;
  if (hasMin) return `>= ${min}m`;
  if (hasMax) return `<= ${max}m`;
  return "N/A";
};

const resolveBuyerName = (item: BuyPostListItem) => {
  return (
    item.buyer?.fullName || item.buyer?.name || item.buyer?.id || "Unknown"
  );
};

const buildWantedMeta = (
  meta:
    | {
        total?: number;
        page?: number;
        limit?: number;
        totalPages?: number;
      }
    | undefined,
  page: number,
  limit: number,
  fallbackTotal: number,
): BuyPostListMeta => {
  const total = Number(meta?.total ?? fallbackTotal ?? 0);
  const safeLimit =
    Number(meta?.limit ?? limit ?? WANTED_PAGE_SIZE) || WANTED_PAGE_SIZE;
  const totalPages = Number(
    meta?.totalPages ?? Math.max(1, Math.ceil(total / safeLimit)),
  );
  const safePage = Number(meta?.page ?? page) || page;

  return {
    total,
    page: safePage,
    limit: safeLimit,
    totalPages,
  };
};

const mapWantedPostItem = (item: BuyPostListItem): PropertyRequest => {
  const resolvedId = item.id || "";
  const displayId = formatDisplayId("REQ", resolvedId) || "N/A";
  const displayCode = displayId.startsWith("#")
    ? displayId.slice(1)
    : displayId;

  return {
    id: resolvedId,
    title: item.title ?? "Untitled request",
    postedBy: resolveBuyerName(item),
    postedAgo: formatTimeAgo(item.updatedAt || item.createdAt) || "Just now",
    code: displayCode,
    location: resolveLocation(item) || "Not specified",
    propertyType: (item.propertyType ??
      "Plain Land") as PropertyRequest["propertyType"],
    requiredLandSize: formatMinSize(
      item.landSizeMin ?? undefined,
      item.landSizeUnit ?? undefined,
    ),
    requiredPlotSize: formatMinSize(
      item.plotSizeMin ?? undefined,
      item.plotSizeUnit ?? undefined,
    ),
    distanceFromRoad: formatDistanceRange(
      item.roadDistanceMin ?? undefined,
      item.roadDistanceMax ?? undefined,
    ),
    budgetMin: Number.isFinite(item.budgetMin) ? Number(item.budgetMin) : 0,
    budgetMax: Number.isFinite(item.budgetMax) ? Number(item.budgetMax) : 0,
  };
};

export default function PropertiesPage() {
  const [activeTab, setActiveTab] = React.useState<TabKey>("for-sale");
  const [category, setCategory] = React.useState<Category>("Sell Posts");
  const [status, setStatus] = React.useState<Status>("All Status");
  const [sellPosts, setSellPosts] = React.useState<PropertyListing[]>([]);
  const [sellPostsMeta, setSellPostsMeta] =
    React.useState<SellPostListingMeta | null>(null);
  const [sellPostsPage, setSellPostsPage] = React.useState(1);
  const [isSellPostsLoading, setIsSellPostsLoading] = React.useState(false);
  const [wantedPosts, setWantedPosts] = React.useState<PropertyRequest[]>([]);
  const [wantedPostsMeta, setWantedPostsMeta] =
    React.useState<BuyPostListMeta | null>(null);
  const [wantedPostsPage, setWantedPostsPage] = React.useState(1);

  // My Posts State
  const [mySellPosts, setMySellPosts] = React.useState<SellPostDto[]>([]);
  const [mySellPostsMeta, setMySellPostsMeta] =
    React.useState<PaginationMetaDto | null>(null);
  const [mySellPostsPage, setMySellPostsPage] = React.useState(1);
  const [isMySellPostsLoading, setIsMySellPostsLoading] = React.useState(false);

  const [myBuyPosts, setMyBuyPosts] = React.useState<BuyPostDto[]>([]);
  const [myBuyPostsMeta, setMyBuyPostsMeta] =
    React.useState<PaginationMetaDto | null>(null);
  const [myBuyPostsPage, setMyBuyPostsPage] = React.useState(1);
  const [isMyBuyPostsLoading, setIsMyBuyPostsLoading] = React.useState(false);

  const [myOfferedPosts, setMyOfferedPosts] = React.useState<OfferedPostDto[]>(
    [],
  );
  const [myOfferedPostsMeta, setMyOfferedPostsMeta] =
    React.useState<PaginationMetaDto | null>(null);
  const [myOfferedPostsPage, setMyOfferedPostsPage] = React.useState(1);
  const [isMyOfferedPostsLoading, setIsMyOfferedPostsLoading] =
    React.useState(false);

  React.useEffect(() => {
    if (activeTab !== "for-sale") return;

    let active = true;

    const loadSellPosts = async () => {
      setIsSellPostsLoading(true);
      try {
        const response = await fetchSellPostListings({
          page: sellPostsPage,
          limit: 6,
        });

        if (!active) return;

        setSellPosts(response.data ?? []);
        setSellPostsMeta(response.meta ?? null);
      } catch (error) {
        if (active) {
          setSellPosts([]);
          setSellPostsMeta(null);
        }
        console.error("Failed to load sell posts", error);
      } finally {
        if (active) {
          setIsSellPostsLoading(false);
        }
      }
    };

    loadSellPosts();

    return () => {
      active = false;
    };
  }, [activeTab, sellPostsPage]);

  React.useEffect(() => {
    if (activeTab !== "wanted") return;

    let active = true;

    const loadWantedPosts = async () => {
      try {
        const response = await fetchWantedPosts({
          page: wantedPostsPage,
          limit: WANTED_PAGE_SIZE,
        });

        if (!active) return;

        const mapped = (response.data ?? []).map(mapWantedPostItem);
        setWantedPosts(mapped);
        setWantedPostsMeta(
          buildWantedMeta(
            response.meta,
            wantedPostsPage,
            WANTED_PAGE_SIZE,
            mapped.length,
          ),
        );
      } catch (error) {
        if (active) {
          setWantedPosts([]);
          setWantedPostsMeta(null);
        }
        console.error("Failed to load wanted posts", error);
      }
    };

    loadWantedPosts();

    return () => {
      active = false;
    };
  }, [activeTab, wantedPostsPage]);

  // Load my sell posts
  React.useEffect(() => {
    if (activeTab !== "my-posts" || category !== "Sell Posts") return;

    let active = true;

    const loadMySellPosts = async () => {
      setIsMySellPostsLoading(true);
      try {
        const response = await fetchMySellPosts({
          page: mySellPostsPage,
          limit: MY_POSTS_PAGE_SIZE,
          tab: mapMySellPostTabStatus(status),
        });

        if (!active) return;

        // const mapped = (response.data ?? []).map(mapSellPostToListingCard);
        setMySellPosts(response.data ?? []);
        setMySellPostsMeta(response.meta ?? null);
      } catch (error) {
        if (active) {
          setMySellPosts([]);
          setMySellPostsMeta(null);
        }
        console.error("Failed to load my sell posts", error);
      } finally {
        if (active) {
          setIsMySellPostsLoading(false);
        }
      }
    };

    loadMySellPosts();

    return () => {
      active = false;
    };
  }, [activeTab, category, mySellPostsPage, status]);

  // Load my buy posts
  React.useEffect(() => {
    if (activeTab !== "my-posts" || category !== "Buy Posts") return;

    let active = true;

    const loadMyBuyPosts = async () => {
      setIsMyBuyPostsLoading(true);
      try {
        const response = await fetchMyBuyPosts({
          page: myBuyPostsPage,
          limit: MY_POSTS_PAGE_SIZE,
          tab: mapMyBuyPostTabStatus(status),
        });

        if (!active) return;

        setMyBuyPosts(response.data ?? []);
        setMyBuyPostsMeta(response.meta ?? null);
      } catch (error) {
        if (active) {
          setMyBuyPosts([]);
          setMyBuyPostsMeta(null);
        }
        console.error("Failed to load my buy posts", error);
      } finally {
        if (active) {
          setIsMyBuyPostsLoading(false);
        }
      }
    };

    loadMyBuyPosts();

    return () => {
      active = false;
    };
  }, [activeTab, category, myBuyPostsPage, status]);

  // Load my offered posts
  React.useEffect(() => {
    if (activeTab !== "my-posts" || category !== "Offered Posts") return;

    let active = true;

    const loadMyOfferedPosts = async () => {
      setIsMyOfferedPostsLoading(true);
      try {
        const response = await fetchMyOfferedPosts({
          page: myOfferedPostsPage,
          limit: MY_POSTS_PAGE_SIZE,
          filter: "ALL",
        });

        if (!active) return;

        setMyOfferedPosts(response.data ?? []);
        setMyOfferedPostsMeta(response.meta ?? null);
      } catch (error) {
        if (active) {
          setMyOfferedPosts([]);
          setMyOfferedPostsMeta(null);
        }
        console.error("Failed to load my offered posts", error);
      } finally {
        if (active) {
          setIsMyOfferedPostsLoading(false);
        }
      }
    };

    loadMyOfferedPosts();

    return () => {
      active = false;
    };
  }, [activeTab, category, myOfferedPostsPage]);

  return (
    <PropertyFiltersProvider>
      <div className="w-full py-24">
        <PropertyTabs activeTab={activeTab} onChange={setActiveTab} />
        {activeTab === "for-sale" ? (
          <div className="pb-10 pt-6">
            <div className="grid grid-cols-12 gap-6 md:gap-8">
              {/* LEFT */}
              <div className="col-span-12 md:col-span-4">
                <PropertyFilters />
              </div>

              {/* RIGHT */}
              <div className="col-span-12 md:col-span-8">
                <PropertyGrid
                  items={sellPosts}
                  meta={sellPostsMeta}
                  page={sellPostsPage}
                  onPageChange={setSellPostsPage}
                  isLoading={isSellPostsLoading}
                />
              </div>
            </div>
          </div>
        ) : activeTab === "wanted" ? (
          <div className="pb-10 pt-6">
            <div className="grid grid-cols-12 gap-6 md:gap-8">
              {/* LEFT */}
              <div className="col-span-12 md:col-span-4">
                <PropertyFilters />
              </div>

              {/* RIGHT */}
              <div className="space-y-4 col-span-12 md:col-span-8">
                <PropertyRequestGrid
                  items={wantedPosts}
                  meta={wantedPostsMeta}
                  page={wantedPostsPage}
                  onPageChange={setWantedPostsPage}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="pb-10 pt-6">
            <div className="grid grid-cols-12 gap-6 md:gap-8">
              {/* LEFT */}
              <div className="col-span-12 md:col-span-4">
                <MYPropertyFilters
                  status={status}
                  category={category}
                  setCategory={setCategory}
                  setStatus={setStatus}
                />
              </div>

              {/* RIGHT */}
              {category === "Sell Posts" ? (
                <div className="col-span-12 md:col-span-8">
                  <MyPropertyGrid
                    items={mySellPosts.map(mapSellPostToListingCard)}
                    meta={mySellPostsMeta}
                    page={mySellPostsPage}
                    onPageChange={setMySellPostsPage}
                    isLoading={isMySellPostsLoading}
                  />
                </div>
              ) : category === "Buy Posts" ? (
                <div className="col-span-12 md:col-span-8">
                  <BuyPostDataGrid
                    items={myBuyPosts.map(mapBuyPostToBuyPost) as any}
                    meta={myBuyPostsMeta}
                    page={myBuyPostsPage}
                    onPageChange={setMyBuyPostsPage}
                    isLoading={isMyBuyPostsLoading}
                  />
                </div>
              ) : (
                <div className="col-span-12 md:col-span-8">
                  <OfferPostGrid
                    items={
                      myOfferedPosts.map(mapOfferedPostToOfferPostCard) as any
                    }
                    meta={myOfferedPostsMeta}
                    page={myOfferedPostsPage}
                    onPageChange={setMyOfferedPostsPage}
                    isLoading={isMyOfferedPostsLoading}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </PropertyFiltersProvider>
  );
}
