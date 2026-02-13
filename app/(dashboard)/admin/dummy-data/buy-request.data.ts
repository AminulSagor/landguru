import { BuyRequestItem } from "@/app/(dashboard)/admin/types/buy-request.types";

export const demoBuyRequests: BuyRequestItem[] = [
  {
    id: "#BUY-1042",
    title: "3 Bed Ready Flat Needed",
    statusLabel: "Pending",
    createdAgo: "Posted 2h ago",
    user: {
      name: "Farhan",
      avatarUrl: "/images/avatars/avatar.png",
      verified: true,
      phone: "+880 1711-432890",
    },
    locationLine: "Banassree, Ward No. 25, Dhaka South City Corp...",
    tags: [
      { icon: "home", label: "Flat / Apt" },
      { icon: "ruler", label: "Min 1,200 sqft" },
      { icon: "ruler", label: "200m–750m" },
      { icon: "wallet", label: "৳ 30L – 40L", strong: "৳ 30L – 40L" },
    ],
    description:
      "Client is looking for a ready flat in Dhanmondi area. Must have gas connection and south facing balcony preferred. The client is ready to mak...",
  },
  {
    id: "#BUY-1041",
    title: "3 Bed Ready Flat Needed",
    statusLabel: "Pending",
    createdAgo: "Posted 5h ago",
    user: {
      name: "Jamal Sheikh",
      verified: false,
      phone: "+880 1745-123456",
    },
    locationLine: "Banassree, Ward No. 25, Dhaka South City Corp...",
    tags: [
      { icon: "home", label: "Flat / Apt" },
      { icon: "ruler", label: "Min 1,200 sqft" },
      { icon: "ruler", label: "200m–750m" },
      { icon: "wallet", label: "৳ 30L – 40L", strong: "৳ 30L – 40L" },
    ],
    description:
      "Client is looking for a ready flat in Dhanmondi area. Must have gas connection and south facing balcony preferred. The client is ready to mak...",
  },
  {
    id: "#BUY-1040",
    title: "3 Bed Ready Flat Needed",
    statusLabel: "Pending",
    createdAgo: "Posted 2h ago",
    user: {
      name: "Farhan",
      avatarUrl: "/images/avatars/avatar.png",
      verified: true,
      phone: "+880 1711-432890",
    },
    locationLine: "Banassree, Ward No. 25, Dhaka South City Corp...",
    tags: [
      { icon: "home", label: "Flat / Apt" },
      { icon: "ruler", label: "Min 1,200 sqft" },
      { icon: "ruler", label: "200m–750m" },
      { icon: "wallet", label: "৳ 30L – 40L", strong: "৳ 30L – 40L" },
    ],
    description:
      "Client is looking for a ready flat in Dhanmondi area. Must have gas connection and south facing balcony preferred. The client is ready to mak...",
  },
  {
    id: "#BUY-1039",
    title: "3 Bed Ready Flat Needed",
    statusLabel: "Pending",
    createdAgo: "Posted 5h ago",
    user: {
      name: "Jamal Sheikh",
      verified: false,
      phone: "+880 1745-123456",
    },
    locationLine: "Banassree, Ward No. 25, Dhaka South City Corp...",
    tags: [
      { icon: "home", label: "Flat / Apt" },
      { icon: "ruler", label: "Min 1,200 sqft" },
      { icon: "ruler", label: "200m–750m" },
      { icon: "wallet", label: "৳ 30L – 40L", strong: "৳ 30L – 40L" },
    ],
    description:
      "Client is looking for a ready flat in Dhanmondi area. Must have gas connection and south facing balcony preferred. The client is ready to mak...",
  },
];

export const buyRequestTabs = [
  { key: "pending_validation" as const, label: "Pending Validation", count: 8 },
  { key: "active_listings" as const, label: "Active Listings" },
  { key: "archived" as const, label: "Archived" },
];
