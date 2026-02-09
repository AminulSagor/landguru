export type PostTabKey = "admin_to_respond" | "waiting_for_user" | "closed_agreed";

export type PostBadge = {
  label: string; // e.g. "SELL POST"
};

export type QuoteInfo = {
  adminLastQuote: number; // 6000
  userNewCounter: number; // 4000
  currencySymbol?: string; // default: "৳"
};

export type RequoteInfo = {
  count: number; // 3
  timeAgoLabel: string; // "2 hrs ago"
  isAlert?: boolean; // red badge style
};

export type SellerInfo = {
  name: string;
  roleLabel: string; // "Seller"
  phoneMasked: string; // "+880 1711-234XXX"
  avatarUrl?: string;
};

export type PostListItem = {
  id: string; // "#POST-1044"
  title: string; // "5 Katha Plot, Uttara Sec 7"
  thumbnailUrl?: string;
  badge: PostBadge;
  seller: SellerInfo;
  quote: QuoteInfo;
  requote: RequoteInfo;
};

export const postTabs: { key: PostTabKey; label: string; count?: number }[] = [
  { key: "admin_to_respond", label: "Admin to Respond", count: 5 },
  { key: "waiting_for_user", label: "Waiting for User" },
  { key: "closed_agreed", label: "Closed/Agreed" },
];

export const demoPosts: PostListItem[] = [
  {
    id: "#POST-1044",
    title: "5 Katha Plot, Uttara Sec 7",
    thumbnailUrl: "",
    badge: { label: "SELL POST" },
    seller: {
      name: "Mr. Rahman",
      roleLabel: "Seller",
      phoneMasked: "+880 1711-234XXX",
      avatarUrl: "",
    },
    quote: { adminLastQuote: 6000, userNewCounter: 4000, currencySymbol: "৳" },
    requote: { count: 3, timeAgoLabel: "2 hrs ago", isAlert: true },
  },
  {
    id: "#POST-2091",
    title: "3BHK Apartment, Dhanmondi",
    thumbnailUrl: "",
    badge: { label: "SELL POST" },
    seller: {
      name: "Ms. Karim",
      roleLabel: "Seller",
      phoneMasked: "+880 1822-555XXX",
      avatarUrl: "",
    },
    quote: { adminLastQuote: 6000, userNewCounter: 4000, currencySymbol: "৳" },
    requote: { count: 1, timeAgoLabel: "15 mins ago" },
  },
  {
    id: "#POST-0982",
    title: "10 Decimal Land, Gazipur",
    thumbnailUrl: "",
    badge: { label: "SELL POST" },
    seller: {
      name: "Zayed Khan",
      roleLabel: "Seller",
      phoneMasked: "+880 1912-888XXX",
      avatarUrl: "",
    },
    quote: { adminLastQuote: 6000, userNewCounter: 4000, currencySymbol: "৳" },
    requote: { count: 5, timeAgoLabel: "1 hr ago", isAlert: true },
  },
  {
    id: "#POST-3052",
    title: "Luxury Villa, Gulshan",
    thumbnailUrl: "",
    badge: { label: "SELL POST" },
    seller: {
      name: "Mr. Ahmed",
      roleLabel: "Seller",
      phoneMasked: "+880 1712-444XXX",
      avatarUrl: "",
    },
    quote: { adminLastQuote: 6000, userNewCounter: 4000, currencySymbol: "৳" },
    requote: { count: 2, timeAgoLabel: "45 mins ago" },
  },
  {
    id: "#POST-1120",
    title: "3 Katha Land, Banasree",
    thumbnailUrl: "",
    badge: { label: "SELL POST" },
    seller: {
      name: "Ms. Sultana",
      roleLabel: "Seller",
      phoneMasked: "+880 1611-999XXX",
      avatarUrl: "",
    },
    quote: { adminLastQuote: 6000, userNewCounter: 4000, currencySymbol: "৳" },
    requote: { count: 4, timeAgoLabel: "3 hrs ago", isAlert: true },
  },
];