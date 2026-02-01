
export type OfferPostCategory = "FLAT" | "PLOT" | "VILLA";

export type OfferPostStatus =
  | "BUYER_ACCEPTED_OFFER"
  | "DRAFT"
  | "PENDING_BUYER_REVIEW";

export type OfferPostCard = {
  id: string;           // "POST-1044"
  title: string;        // "Modern Duplex Villa"
  image: string;        // url
  category: OfferPostCategory;

  status: OfferPostStatus;
  statusLabel: string;  // "Buyer accepted your offer" / "DRAFT" / "PENDING BUYER REVIEW"

  askingPrice: number;  // 4000000 etc
  timeAgo: string;      // "2h ago"

  highlight?: boolean;  // red outline like first card
};
