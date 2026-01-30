export type BuyPostPropertyType = "Flat" | "Plain Land" | "Villa" | "Agro Land";

export type BuyPostStatus = "active" | "pending_admin_review" | "draft";

type BuyPostAction =
  | { kind: "offers"; count: number } // "5 Offers Received"
  | { kind: "awaiting_approval" } // "Awaiting Approval"
  | { kind: "view_appointment" } // red button
  | { kind: "continue_editing" }; // outline button

export type BuyPost = {
  id: string; // e.g. "BUY-1042"
  title: string;
  postedText: string; // e.g. "2h ago"
  preferredLocation: string;

  propertyType: BuyPostPropertyType;

  requiredLandSize: string; // e.g. "Min 5 Katha"
  requiredPlotSize: string; // e.g. "Min 5 Katha"
  distanceFromRoad: string; // e.g. "200m-750m"
  budgetRange: string; // e.g. "৳ 30,00,000 - ৳ 40,00,000"

  status: BuyPostStatus;

  // left color stripe like the screenshot
  accent?: "red" | "green" | "none";

  // small green pill on bottom-left (accepted offer)
  acceptedOfferNote?: string;

  // bottom-right UI action
  action?: BuyPostAction;
};

export const demoBuyPosts: BuyPost[] = [
  {
    id: "BUY-1042",
    title: "Villa in Banasree",
    postedText: "2h ago",
    preferredLocation:
      "Banasree, Ward No. 25, Dhaka South City Corporation, Khilgaon Thana, Dhaka - 1219",
    propertyType: "Flat",
    requiredLandSize: "Min 5 Katha",
    requiredPlotSize: "Min 5 Katha",
    distanceFromRoad: "200m-750m",
    budgetRange: "৳ 30,00,000 - ৳ 40,00,000",
    status: "active",
    accent: "red",
    action: { kind: "offers", count: 5 },
  },
  {
    id: "BUY-1042",
    title: "Want a Plain Land near Banasree Block C",
    postedText: "2h ago",
    preferredLocation:
      "Banasree, Ward No. 25, Dhaka South City Corporation, Khilgaon Thana, Dhaka - 1219",
    propertyType: "Plain Land",
    requiredLandSize: "Min 5 Katha",
    requiredPlotSize: "Min 5 Katha",
    distanceFromRoad: "200m-750m",
    budgetRange: "৳ 30,00,000 - ৳ 40,00,000",
    status: "active",
    accent: "none",
    action: { kind: "offers", count: 0 },
  },
  {
    id: "BUY-1042",
    title: "Want a Plain Land near Banasree Block C",
    postedText: "2h ago",
    preferredLocation:
      "Banasree, Ward No. 25, Dhaka South City Corporation, Khilgaon Thana, Dhaka - 1219",
    propertyType: "Flat",
    requiredLandSize: "Min 5 Katha",
    requiredPlotSize: "Min 5 Katha",
    distanceFromRoad: "200m-750m",
    budgetRange: "৳ 30,00,000 - ৳ 40,00,000",
    status: "pending_admin_review",
    accent: "none",
    action: { kind: "awaiting_approval" },
  },
  {
    id: "BUY-1042",
    title: "3 Bed Ready Flat Needed",
    postedText: "2h ago",
    preferredLocation:
      "Banasree, Ward No. 25, Dhaka South City Corporation, Khilgaon Thana, Dhaka - 1219",
    propertyType: "Flat",
    requiredLandSize: "Min 5 Katha",
    requiredPlotSize: "Min 5 Katha",
    distanceFromRoad: "200m-750m",
    budgetRange: "৳ 30,00,000 - ৳ 40,00,000",
    status: "active",
    accent: "green",
    acceptedOfferNote: "You accepted a offer",
    action: { kind: "view_appointment" },
  },
  {
    id: "BUY-1042",
    title: "Looking for Agro Land",
    postedText: "2h ago",
    preferredLocation:
      "Banasree, Ward No. 25, Dhaka South City Corporation, Khilgaon Thana, Dhaka - 1219",
    propertyType: "Flat",
    requiredLandSize: "Min 5 Katha",
    requiredPlotSize: "Min 5 Katha",
    distanceFromRoad: "200m-750m",
    budgetRange: "৳ 30,00,000 - ৳ 40,00,000",
    status: "pending_admin_review",
    accent: "green",
    acceptedOfferNote: "You accepted a offer",
    action: { kind: "awaiting_approval" },
  },
  {
    id: "BUY-1042",
    title: "Luxury Flat",
    postedText: "2h ago",
    preferredLocation:
      "Banasree, Ward No. 25, Dhaka South City Corporation, Khilgaon Thana, Dhaka - 1219",
    propertyType: "Flat",
    requiredLandSize: "Min 5 Katha",
    requiredPlotSize: "Min 5 Katha",
    distanceFromRoad: "200m-750m",
    budgetRange: "৳ 30,00,000 - ৳ 40,00,000",
    status: "draft",
    accent: "none",
    action: { kind: "continue_editing" },
  },
];