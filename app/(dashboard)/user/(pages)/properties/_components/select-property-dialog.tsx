// 1) components/offers/select-property-dialog.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronDown, MapPin, Search } from "lucide-react";

import Button from "@/components/buttons/button";
import Dialog from "@/components/dialogs/dialog";
import { cn } from "@/utils/classnames.utils";
import { formatDisplayId } from "@/utils/id.utils";
import { IMAGE } from "@/constants/image-paths";
import { fetchMyActiveSellPosts } from "@/service/users/properties/properties.services";
import type { MyPostResponseDto } from "@/types/post/buy/wanted-needs.types";

export type ListingStatus = "Active" | "Pending" | "Draft";

export type Listing = {
  id: string;
  postId?: string | null;
  title?: string | null;
  price?: number | string | null;
  status?: ListingStatus | string | null;
  propertyType?: string | null;
  image?: string | null;
  isVerified?: boolean;
  createdAt?: string | null;
  location?: string | null;
};

const normalizeStatus = (value?: string | null): ListingStatus => {
  const normalized = String(value || "").toLowerCase();
  if (normalized === "active") return "Active";
  if (normalized === "draft") return "Draft";
  if (normalized.includes("pending")) return "Pending";
  return "Pending";
};

const toNumberPrice = (value?: number | string | null) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const digits = String(value ?? "").replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
};

const formatPrice = (value?: number | string | null) => {
  const amount = toNumberPrice(value);
  try {
    return amount.toLocaleString("en-IN");
  } catch {
    return String(amount);
  }
};

const mapListing = (post: MyPostResponseDto): Listing | null => {
  const id = post.id || post.postId || "";
  if (!id) return null;

  return {
    id,
    postId: post.postId,
    title: post.title ?? "Untitled",
    price: post.price ?? 0,
    status: normalizeStatus(post.status),
    propertyType: post.propertyType ?? null,
    image: post.image ?? null,
    isVerified: post.isVerified ?? false,
    createdAt: post.createdAt ?? null,
  };
};

const resolveListingSubtitle = (listing: Listing) => {
  if (listing.location) return listing.location;
  if (listing.propertyType) return `Type: ${listing.propertyType}`;
  const displayId = listing.postId ?? listing.id;
  return displayId ? `Post ID: ${formatDisplayId("POST", displayId)}` : "Post";
};

function ListingStatusPill({ status }: { status: ListingStatus }) {
  if (status === "Active") {
    return (
      <span className="inline-flex items-center rounded-full bg-green/10 px-3 py-1 text-xs font-semibold text-green">
        Active
      </span>
    );
  }

  if (status === "Draft") {
    return (
      <span className="inline-flex items-center rounded-full bg-gray/10 px-3 py-1 text-xs font-semibold text-gray/70">
        Draft
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-[#fff7e6] px-3 py-1 text-xs font-semibold text-[#a35b00]">
      Pending
    </span>
  );
}

export default function SelectPropertyDialog({
  open,
  onOpenChange,
  requestTitle,
  requestId,
  onConfirm,
  isSubmitting,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  requestTitle: string;
  requestId: string | number;
  onConfirm: (listing: Listing) => void;
  isSubmitting?: boolean;
}) {
  const [listings, setListings] = React.useState<Listing[]>([]);
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"All" | ListingStatus>("Active");
  const [selectedId, setSelectedId] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;
    setQuery("");
    setStatus("Active");
    setSelectedId("");
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    let active = true;
    const loadListings = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await fetchMyActiveSellPosts({ page: 1, limit: 50 });
        if (!active) return;

        const next = (response.posts ?? [])
          .map(mapListing)
          .filter((item): item is Listing => Boolean(item));

        setListings(next);
      } catch (error) {
        if (!active) return;
        setListings([]);
        setLoadError("Failed to load your active posts.");
      } finally {
        if (active) setIsLoading(false);
      }
    };

    loadListings();

    return () => {
      active = false;
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    if (!listings.length) {
      setSelectedId("");
      return;
    }

    setSelectedId((prev) =>
      listings.some((item) => item.id === prev) ? prev : listings[0].id,
    );
  }, [listings, open]);

  const filtered = listings.filter((l) => {
    const queryText = query.trim().toLowerCase();
    const matchesQuery =
      !queryText ||
      String(l.title ?? "").toLowerCase().includes(queryText) ||
      String(l.id ?? "").toLowerCase().includes(queryText) ||
      String(l.postId ?? "").toLowerCase().includes(queryText);

    const listingStatus = normalizeStatus(
      typeof l.status === "string" ? l.status : String(l.status ?? ""),
    );
    const matchesStatus = status === "All" ? true : listingStatus === status;

    return matchesQuery && matchesStatus;
  });

  const selected =
    filtered.find((item) => item.id === selectedId) ?? filtered[0] ?? null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      size="lg"
      position="center"
      className="rounded-2xl"
    >
      <div className="overflow-hidden rounded-2xl">
        {/* Header */}
        <div className="bg-white px-6 py-5">
          <div className="pr-10">
            <h3 className="text-lg font-semibold text-gray">
              Select Property to Offer
            </h3>

            <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 text-sm text-gray">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                i
              </span>
              <span className="text-gray/80">
                Offering for:{" "}
                <span className="font-semibold text-primary">
                  {requestTitle} (#{requestId})
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="px-6 pt-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray/50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find your listing by title or ID that matches"
                className="h-11 w-full rounded-xl border  pl-10 pr-3 text-sm text-gray outline-none focus:border-primary/40"
              />
            </div>

            <div className="relative w-full md:w-[220px]">
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "All" | ListingStatus)
                }
                className="h-11 w-full appearance-none rounded-xl border bg-white px-3 pr-10 text-sm text-gray outline-none focus:border-primary/40"
              >
                <option value="All">Status: All</option>
                <option value="Active">Status: Active</option>
                <option value="Pending">Status: Pending</option>
                <option value="Draft">Status: Draft</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray/60" />
            </div>
          </div>
        </div>

        {/* List */}
        <div className="px-6 pb-5 pt-4">
          <div className="space-y-3">
            {isLoading ? (
              <div className="rounded-2xl border border-dashed bg-secondary p-10 text-center text-sm text-gray/70">
                Loading your posts...
              </div>
            ) : loadError ? (
              <div className="rounded-2xl border border-dashed bg-secondary p-10 text-center text-sm text-gray/70">
                {loadError}
              </div>
            ) : (
              filtered.map((l) => {
                const isSelected = l.id === selectedId;
                const displayId = l.postId ?? l.id;
                const imageUrl = l.image || IMAGE.property;

                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setSelectedId(l.id)}
                    className={cn(
                      "w-full rounded-2xl border bg-white p-4 text-left transition-all",
                      isSelected
                        ? "border-primary shadow-sm"
                        : "border-gray/20 hover:border-primary/30",
                    )}
                  >
                    <div className="flex items-center gap-4">
                      {/* Thumbnail */}
                      <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-secondary">
                        <Image
                          src={imageUrl}
                          alt={l.title ?? "Listing"}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <p className="truncate text-base font-semibold text-gray">
                            {l.title || "Untitled"}
                          </p>
                          <ListingStatusPill status={normalizeStatus(l.status as string)} />
                        </div>

                        <p className="mt-1 text-xs text-gray/50">
                          {formatDisplayId("POST", displayId)}
                        </p>

                        <div className="mt-1 flex items-center gap-2 text-sm text-gray/70">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">
                            {resolveListingSubtitle(l)}
                          </span>
                        </div>

                        <p className="mt-1 text-sm font-semibold text-primary">
                          ৳ {formatPrice(l.price)}
                        </p>
                      </div>

                      {/* Radio */}
                      <div
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full border",
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-gray/30 bg-white",
                        )}
                      >
                        {isSelected ? (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        ) : null}
                      </div>
                    </div>
                  </button>
                );
              })
            )}

            {!isLoading && !loadError && filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed bg-secondary p-10 text-center text-sm text-gray/70">
                No listings found. Try a different search.
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t bg-white px-6 py-4">
          <Button
            variant="secondary"
            className="h-11 rounded-xl border border-gray/20"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            className="h-11 rounded-xl"
            disabled={!selected || isSubmitting}
            onClick={() => selected && onConfirm(selected)}
          >
            {isSubmitting ? "Submitting..." : "Confirm Offer"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
