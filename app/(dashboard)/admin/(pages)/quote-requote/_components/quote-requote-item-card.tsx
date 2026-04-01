"use client";

import React from "react";
import Button from "@/components/buttons/button";
import { cn } from "@/lib/utils";
import type { SellPostNegotiationItem } from "@/types/admin/sell-post-negotiations.types";
import {
  formatCurrency,
  getInitials,
} from "@/app/(dashboard)/admin/(pages)/quote-requote/_utils/quote-requote.utils";
import { CircleCheck, Clock3 } from "lucide-react";

function RemoteImage({
  src,
  alt,
  className,
}: {
  src?: string | null;
  alt: string;
  className?: string;
}) {
  const [hasError, setHasError] = React.useState(false);

  if (!src || hasError) {
    return (
      <div
        className={cn(
          "h-full w-full bg-gradient-to-br from-[#E9D6C7] via-[#F3C28D] to-[#D9E6D1]",
          className,
        )}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn("h-full w-full object-cover", className)}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
    />
  );
}

function formatTimeAgo(dateString: string): string {
  const now = new Date().getTime();
  const target = new Date(dateString).getTime();

  if (Number.isNaN(target)) {
    return "";
  }

  const diffMs = Math.max(now - target, 0);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 60) {
    return `${diffMinutes || 1} mins ago`;
  }

  if (diffHours < 24) {
    return `${diffHours} hrs ago`;
  }

  return `${diffDays} days ago`;
}

function getRequoteBadgeClasses(requoteCount: number) {
  if (requoteCount >= 3) {
    return {
      boxClass: "bg-[#FEEDED]",
      textClass: "text-[#F04438]",
      countClass: "text-[#F04438]",
    };
  }

  return {
    boxClass: "bg-[#F2F4F7]",
    textClass: "text-[#667085]",
    countClass: "text-[#344054]",
  };
}

function PostCell({ item }: { item: SellPostNegotiationItem }) {
  return (
    <div className="flex min-w-[280px] items-center gap-3">
      <div className="relative h-[54px] w-[54px] shrink-0 overflow-hidden rounded-lg border border-gray/10 bg-secondary">
        <RemoteImage src={item.post.image} alt={item.post.title} />
      </div>

      <div className="min-w-0">
        <span className="inline-flex rounded-[4px] bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase leading-none text-primary">
          Sell Post
        </span>

        <p className="mt-2 line-clamp-1 text-[15px] font-bold leading-5 text-gray">
          {item.post.title}
        </p>

        <p className="mt-1 line-clamp-1 text-xs font-medium text-primary">
          #{item.post.id}
        </p>
      </div>
    </div>
  );
}

function SellerCell({ item }: { item: SellPostNegotiationItem }) {
  return (
    <div className="flex min-w-[220px] items-center gap-3">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray/10 bg-secondary">
        {item.seller.image ? (
          <RemoteImage src={item.seller.image} alt={item.seller.name} />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-bold text-gray">
            {getInitials(item.seller.name)}
          </div>
        )}
      </div>

      <div className="min-w-0">
        <p className="line-clamp-1 text-sm font-bold leading-5 text-gray">
          {item.seller.name}
        </p>
        <p className="text-xs font-semibold text-primary">Seller</p>
        <p className="line-clamp-1 text-[11px] font-medium text-primary/80">
          {item.seller.phone}
        </p>
      </div>
    </div>
  );
}

function QuoteCell({ item }: { item: SellPostNegotiationItem }) {
  return (
    <div className="min-w-[220px] space-y-2">
      <div>
        <p className="text-[11px] font-medium uppercase leading-4 text-primary/80">
          Admin Last Quote
        </p>
        <p className="mt-0.5 text-lg font-semibold leading-none text-primary">
          {formatCurrency(item.pricing.adminLastQuote)}
        </p>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase leading-4 text-[#FF6B00]">
          User New Counter
        </p>
        <p className="mt-1 text-[18px] font-extrabold leading-none text-gray">
          {formatCurrency(item.pricing.userNewCounter)}
        </p>
      </div>
    </div>
  );
}

function RequoteCell({ item }: { item: SellPostNegotiationItem }) {
  const badgeStyles = getRequoteBadgeClasses(item.requoteCount);

  return (
    <div className="flex min-w-[120px] flex-col items-center justify-center">
      <div
        className={cn(
          "flex min-w-[66px] flex-col items-center rounded-lg px-3 py-2",
          badgeStyles.boxClass,
        )}
      >
        <p
          className={cn(
            "text-[9px] font-bold uppercase",
            badgeStyles.textClass,
          )}
        >
          Requotes
        </p>
        <p
          className={cn(
            "mt-1 text-[30px] font-extrabold leading-none",
            badgeStyles.countClass,
          )}
        >
          {item.requoteCount}
        </p>
      </div>

      <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-primary/80">
        <Clock3 size={12} />
        <span>{formatTimeAgo(item.lastActionAt)}</span>
      </div>
    </div>
  );
}

function ActionCell({ item }: { item: SellPostNegotiationItem }) {
  const isDisabled = !item.isActionRequired;

  return (
    <div className="flex min-w-[170px] flex-col gap-2">
      <Button size="base" className="w-full" disabled={isDisabled}>
        Review &amp; Respond
      </Button>

      <button
        type="button"
        disabled={isDisabled}
        className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#B7E4C7] bg-[#EAF9EF] px-4 text-sm font-semibold text-[#157F3D] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <CircleCheck size={16} />
        <span>Quick Accept</span>
      </button>
    </div>
  );
}

type QuoteRequoteItemCardProps = {
  item: SellPostNegotiationItem;
};

export default function QuoteRequoteItemCard({
  item,
}: QuoteRequoteItemCardProps) {
  return (
    <tr className="border-b border-gray/15 last:border-b-0">
      <td className="px-4 py-4 align-middle">
        <PostCell item={item} />
      </td>

      <td className="px-4 py-4 align-middle">
        <SellerCell item={item} />
      </td>

      <td className="px-4 py-4 align-middle">
        <QuoteCell item={item} />
      </td>

      <td className="px-4 py-4 align-middle text-center">
        <RequoteCell item={item} />
      </td>

      <td className="px-4 py-4 align-middle">
        <ActionCell item={item} />
      </td>
    </tr>
  );
}
