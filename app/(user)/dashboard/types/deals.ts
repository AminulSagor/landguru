export type DealTab = "sold" | "bought";

export type DealStatusSold = "sold" | "partially_sold";
export type DealStatusBought = "bought";

export type DealStatus = DealStatusSold | DealStatusBought;

export type DealItem = {
  id: string;
  postId: string;
  title: string;
  location: string;
  price: string;
  imageUrl: string;
  tag : DealTab
  typeLabel: "Flat" | "Apartment";
  status: DealStatus;

  timeLabel: string; // "Sold: 2h ago" / "Bought: 2h ago"
};
