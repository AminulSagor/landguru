// app/(admin)/admin/dashboard/(pages)/property-posts/_components/property-posts-list.tsx
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { cn } from "@/lib/utils";
import {
  demoPosts,
  PostListItem,
  PostTabKey,
  postTabs,
} from "@/app/(admin)/admin/dummy-data/quote-requote-data";
import ReviewQutationDialog from "@/app/(admin)/admin/dashboard/(pages)/quote-requote/_components/review-quotation-dialog";
import QuotationSentSuccessDialog from "@/app/(admin)/admin/dashboard/(pages)/quote-requote/_components/quotation-sent-success-dialog";

type SortKey = "newest_first" | "oldest_first";

function formatCurrency(symbol: string, amount: number) {
  return `${symbol} ${amount}`;
}

function TabButton({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative px-3 py-2 text-xs font-semibold text-gray",
        active && "text-primary",
      )}
    >
      <span className="flex items-center gap-2">
        {label}
        {typeof count === "number" && count > 0 && (
          <span
            className={cn(
              "min-w-5 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
              active ? "bg-primary text-white" : "bg-secondary text-gray",
            )}
          >
            {count}
          </span>
        )}
      </span>

      {active && (
        <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-primary" />
      )}
    </button>
  );
}

function RequoteBadge({ requote }: { requote: PostListItem["requote"] }) {
  const isAlert = !!requote.isAlert;

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div
        className={cn(
          "rounded-lg px-3 py-2 text-center",
          isAlert ? "bg-[#ff3b30]/10" : "bg-secondary",
        )}
      >
        <p
          className={cn(
            "text-[10px] font-bold",
            isAlert ? "text-[#ff3b30]" : "text-gray",
          )}
        >
          REQUOTES
        </p>
        <p
          className={cn(
            "mt-0.5 text-sm font-extrabold tabular-nums",
            isAlert ? "text-[#ff3b30]" : "text-gray",
          )}
        >
          {requote.count}
        </p>
      </div>

      <p className="text-[10px] font-semibold text-gray">
        {requote.timeAgoLabel}
      </p>
    </div>
  );
}

function SellerBlock({ seller }: { seller: PostListItem["seller"] }) {
  const initials = seller.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("");

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray/15 bg-secondary">
        {seller.avatarUrl ? (
          <Image
            src={seller.avatarUrl}
            alt={seller.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-bold text-gray">
            {initials}
          </div>
        )}
      </div>

      <div className="min-w-0">
        <p className="truncate text-xs font-bold text-gray">{seller.name}</p>
        <p className="text-[10px] font-semibold text-primary">
          {seller.roleLabel}
        </p>
        <p className="text-[10px] font-semibold text-primary">
          {seller.phoneMasked}
        </p>
      </div>
    </div>
  );
}

function PostLeftBlock({ post }: { post: PostListItem }) {
  const hasThumb = !!post.thumbnailUrl;

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-gray/15 bg-secondary">
        {hasThumb ? (
          <Image
            src={post.thumbnailUrl!}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full" />
        )}
      </div>

      <div className="min-w-0">
        <span className="inline-flex rounded-md bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">
          {post.badge.label}
        </span>

        <p className="mt-1 truncate text-sm font-extrabold text-gray">
          {post.title}
        </p>

        <p className="text-[10px] font-semibold text-primary">{post.id}</p>
      </div>
    </div>
  );
}

function QuoteBlock({ quote }: { quote: PostListItem["quote"] }) {
  const sym = quote.currencySymbol || "৳";
  return (
    <div className="space-y-1">
      <div>
        <p className="text-[10px] font-bold text-primary">ADMIN LAST QUOTE</p>
        <p className="text-xs font-bold text-primary tabular-nums">
          {formatCurrency(sym, quote.adminLastQuote)}
        </p>
      </div>

      <div>
        <p className="text-[10px] font-bold text-[#ff6a00]">USER NEW COUNTER</p>
        <p className="text-sm font-extrabold text-gray tabular-nums">
          {formatCurrency(sym, quote.userNewCounter)}
        </p>
      </div>
    </div>
  );
}

export default function PropertyPostsList() {
  const [activeTab, setActiveTab] = useState<PostTabKey>("admin_to_respond");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("newest_first");
  const [reviewDialog, setReviewDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostListItem | null>(null);
  const [success, setSuccess] = useState(false);

  const filtered = useMemo(() => {
    const base = demoPosts.filter((p) =>
      `${p.title} ${p.id} ${p.seller.name}`
        .toLowerCase()
        .includes(q.toLowerCase()),
    );

    const copy = [...base];
    if (sort === "oldest_first") copy.reverse();
    return copy;
  }, [q, sort]);

  return (
    <div className="w-full">
      {/* top bar */}
      <div className="flex flex-col gap-3 border-b border-gray/15 pb-3 lg:flex-row lg:items-center lg:justify-between">
        {/* tabs */}
        <div className="flex items-center gap-1 whitespace-nowrap">
          {postTabs.map((t) => (
            <TabButton
              key={t.key}
              active={activeTab === t.key}
              label={t.label}
              count={t.count}
              onClick={() => setActiveTab(t.key)}
            />
          ))}
        </div>

        {/* search + sort */}
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          {/* search */}
          <div className="relative w-full sm:max-w-[360px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray"
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search Post"
              className="w-full rounded-lg border border-gray/15 bg-white py-2 pl-9 pr-3 text-xs font-semibold text-gray outline-none focus:border-primary/40"
            />
          </div>

          {/* sort */}
          <div className="flex items-center gap-2">
            <p className="shrink-0 text-xs font-semibold text-primary">
              Sort by
            </p>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-semibold text-gray sm:w-auto"
              onClick={() =>
                setSort((s) =>
                  s === "newest_first" ? "oldest_first" : "newest_first",
                )
              }
            >
              {sort === "newest_first" ? "Newest First" : "Oldest First"}
              <ChevronDown size={16} className="text-gray" />
            </button>
          </div>
        </div>
      </div>

      {/* rows */}
      <div className="mt-4 space-y-3">
        {filtered.map((post) => (
          <Card key={post.id} className="border border-gray/15 bg-white p-4">
            {/* Desktop (lg+): keep exact grid */}
            <div className="hidden lg:grid gap-4 lg:grid-cols-[1.55fr_1px_1.1fr_1px_1.1fr_1px_.75fr_.9fr] lg:items-center">
              <div className="min-w-0">
                <PostLeftBlock post={post} />
              </div>

              <div className="hidden h-12 w-px bg-gray/15 lg:block" />

              <div className="min-w-0">
                <SellerBlock seller={post.seller} />
              </div>

              <div className="hidden h-12 w-px bg-gray/15 lg:block" />

              <div className="min-w-0">
                <QuoteBlock quote={post.quote} />
              </div>

              <div className="hidden h-12 w-px bg-gray/15 lg:block" />

              <div className="flex justify-center">
                <RequoteBadge requote={post.requote} />
              </div>

              <div className="flex gap-3 lg:flex-col lg:items-end lg:justify-center">
                <Button
                  size="sm"
                  className="py-2 rounded-md"
                  onClick={() => {
                    setReviewDialog(true);
                    setSelectedPost(post);
                  }}
                >
                  Review &amp; Respond
                </Button>

                <Button
                  size="md"
                  className="bg-green/90 px-5 py-2 text-xs text-white hover:opacity-90"
                  onClick={() => alert(`Quick Accept: ${post.id} (demo)`)}
                >
                  Quick Accept
                </Button>
              </div>
            </div>

            {/* Mobile/Tablet (<lg): responsive layout */}
            <div className="lg:hidden">
              {/* top row: left content + right badge/actions */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                <div className="space-y-3">
                  <PostLeftBlock post={post} />
                  <div className="h-px w-full bg-gray/15" />
                  <SellerBlock seller={post.seller} />
                </div>

                <div className="flex items-start justify-between gap-3 sm:flex-col sm:items-end">
                  <RequoteBadge requote={post.requote} />

                  <div className="flex flex-1 justify-end gap-2 sm:w-[180px] sm:flex-col">
                    <Button
                      size="md"
                      onClick={() =>
                        alert(`Review & Respond: ${post.id} (demo)`)
                      }
                    >
                      Review &amp; Respond
                    </Button>

                    <Button
                      size="md"
                      className="bg-green px-4 py-2 text-xs text-white hover:opacity-90"
                      onClick={() => alert(`Quick Accept: ${post.id} (demo)`)}
                    >
                      Quick Accept
                    </Button>
                  </div>
                </div>
              </div>

              {/* quote section full width */}
              <div className="mt-4 rounded-lg bg-secondary p-3">
                <QuoteBlock quote={post.quote} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* footer */}
      <div className="mt-4 flex flex-col gap-3 text-xs font-semibold text-primary sm:flex-row sm:items-center sm:justify-between">
        <p>
          Showing <span className="font-bold">1</span>-
          <span className="font-bold">{Math.min(filtered.length, 5)}</span> of{" "}
          <span className="font-bold">42</span> results
        </p>

        {/* make pagination wrap nicely */}
        <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-end">
          <button className="rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-semibold text-gray opacity-60">
            &lt; Previous
          </button>

          <button className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white">
            1
          </button>
          <button className="rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-semibold text-gray">
            2
          </button>
          <button className="rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-semibold text-gray">
            3
          </button>
          <span className="px-2 text-xs font-semibold text-gray">…</span>
          <button className="rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-semibold text-gray">
            9
          </button>

          <button className="rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-semibold text-gray">
            Next &gt;
          </button>
        </div>
      </div>

      {/* dialogs trigger */}
      {reviewDialog && (
        <ReviewQutationDialog
          setSuccessDialog={setSuccess}
          open={reviewDialog}
          onControl={setReviewDialog}
          post={selectedPost}
        />
      )}
      <QuotationSentSuccessDialog
        open={success}
        onControl={setSuccess}
        postId={selectedPost?.id}
        sellerName={selectedPost?.seller.name}
        mandatoryFee={3000}
        optionalFee={3000}
        currencySymbol="৳"
      />
    </div>
  );
}
