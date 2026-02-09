export type BuyRequestTabKey =
  | "pending_validation"
  | "active_listings"
  | "archived";
export type BuyRequestSortKey = "newest_first" | "oldest_first";

export type BuyRequestStatusLabel = "Pending" | "Active" | "Archived";

export type BuyRequestTagIconKey = "home" | "ruler" | "wallet";

export type BuyRequestTag = {
  icon: BuyRequestTagIconKey;
  label: string;
  strong?: string;
};

export type BuyRequestUser = {
  name: string;
  avatarUrl?: string;
  verified?: boolean;
  phone: string;
};

export type BuyRequestItem = {
  id: string; // "#BUY-1042"
  title: string;
  statusLabel: BuyRequestStatusLabel;
  createdAgo: string; // "Posted 2h ago"
  user: BuyRequestUser;
  locationLine: string;
  tags: BuyRequestTag[];
  description: string;
};
