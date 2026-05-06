"use client";

import React from "react";

import { myListingsProperty } from "@/app/(dashboard)/user/dummy-data/my-property-list";
import { demoBuyPosts } from "@/app/(dashboard)/user/dummy-data/buy-post-data";
import { OFFER_POSTS } from "@/app/(dashboard)/user/dummy-data/offer-post-data";
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
import { PropertyFiltersProvider } from "@/app/(dashboard)/user/(pages)/properties/_components/property-filters.context";

type TabKey = "for-sale" | "wanted" | "my-posts";

//my post tab types
export type Category = "Sell Posts" | "Buy Posts" | "Offered Posts";
export type Status = "All Status" | "Pending" | "Quoted" | "Active" | "Draft";

const WANTED_PAGE_SIZE = 6;

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
    item.buyer?.fullName ||
    item.buyer?.name ||
    item.buyer?.id ||
    "Unknown"
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
  const safeLimit = Number(meta?.limit ?? limit ?? WANTED_PAGE_SIZE) || WANTED_PAGE_SIZE;
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
  const displayCode = displayId.startsWith("#") ? displayId.slice(1) : displayId;

  return {
    id: resolvedId,
    title: item.title ?? "Untitled request",
    postedBy: resolveBuyerName(item),
    postedAgo: formatTimeAgo(item.updatedAt || item.createdAt) || "Just now",
    code: displayCode,
    location: resolveLocation(item) || "Not specified",
    propertyType: (item.propertyType ?? "Plain Land") as PropertyRequest["propertyType"],
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
                  <MyPropertyGrid items={myListingsProperty} />
                </div>
              ) : category === "Buy Posts" ? (
                <div className="col-span-12 md:col-span-8">
                  <BuyPostDataGrid items={demoBuyPosts} />
                </div>
              ) : (
                <div className="col-span-12 md:col-span-8">
                  <OfferPostGrid items={OFFER_POSTS} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </PropertyFiltersProvider>
  );
}
