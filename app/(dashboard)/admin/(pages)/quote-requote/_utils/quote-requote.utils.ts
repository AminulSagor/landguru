import type {
  SellPostNegotiationItem,
  SellPostNegotiationTab,
} from "@/types/admin/sell-post-negotiations.types";

export type QuoteRequoteSortKey = "newest_first" | "oldest_first";

export const NEGOTIATION_TABS: Array<{
  key: SellPostNegotiationTab;
  label: string;
}> = [
  { key: "ADMIN_TO_RESPOND", label: "Admin to Respond" },
  { key: "WAITING_FOR_USER", label: "Waiting for User" },
  { key: "CLOSED", label: "Closed/Agreed" },
];

export const isValidNegotiationTab = (
  value: string | undefined,
): value is SellPostNegotiationTab => {
  return (
    value === "ADMIN_TO_RESPOND" ||
    value === "WAITING_FOR_USER" ||
    value === "CLOSED"
  );
};

export const getSafeNegotiationTab = (
  value: string | undefined,
): SellPostNegotiationTab => {
  return isValidNegotiationTab(value) ? value : "ADMIN_TO_RESPOND";
};

export const getSafePositiveNumber = (
  value: string | undefined,
  fallback: number,
): number => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
};

export const buildQueryString = (params: {
  tab: SellPostNegotiationTab;
  page: number;
  limit: number;
  search: string;
  sort: QuoteRequoteSortKey;
}): string => {
  const query = new URLSearchParams();

  query.set("tab", params.tab);
  query.set("page", String(params.page));
  query.set("limit", String(params.limit));
  query.set("sort", params.sort);

  if (params.search.trim()) {
    query.set("search", params.search.trim());
  }

  return query.toString();
};

export const formatCurrency = (amount: number | null, symbol = "৳"): string => {
  if (amount === null) {
    return `${symbol} 0`;
  }

  return `${symbol} ${amount.toLocaleString()}`;
};

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
};

export const getStatusLabel = (status: string): string => {
  return status
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

export const getReviewButtonLabel = (item: SellPostNegotiationItem): string => {
  if (item.isActionRequired) {
    return "Review & Respond";
  }

  return "View Details";
};

export const filterNegotiationItems = (
  items: SellPostNegotiationItem[],
  search: string,
): SellPostNegotiationItem[] => {
  const normalizedSearch = search.trim().toLowerCase();

  if (!normalizedSearch) {
    return items;
  }

  return items.filter((item) =>
    [
      item.negotiationId,
      item.status,
      item.post.title,
      item.post.location,
      item.seller.name,
      item.seller.phone,
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch),
  );
};

export const sortNegotiationItems = (
  items: SellPostNegotiationItem[],
  sort: QuoteRequoteSortKey,
): SellPostNegotiationItem[] => {
  return [...items].sort((firstItem, secondItem) => {
    const firstTime = new Date(firstItem.lastActionAt).getTime();
    const secondTime = new Date(secondItem.lastActionAt).getTime();

    return sort === "newest_first"
      ? secondTime - firstTime
      : firstTime - secondTime;
  });
};
