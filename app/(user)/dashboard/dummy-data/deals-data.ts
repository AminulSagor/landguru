import { DealItem } from "@/app/(user)/dashboard/types/deals";

export const soldDeals: DealItem[] = [
  {
    id: "s1",
    tag: "sold",
    postId: "#POST-1042",
    title: "5 Katha Plot in Purbachal",
    location: "Purbachal New Town, Sector 4, Dhaka",
    price: "2,00,00,000",
    typeLabel: "Flat",
    status: "sold",
    timeLabel: "Sold: 2h ago",
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "s2",
    tag: "sold",
    postId: "#POST-1043",
    title: "Villa in Kurigram",
    location: "Kurigram Sadar, Residential Area, North Zone",
    price: "4,00,00,000",
    typeLabel: "Flat",
    status: "partially_sold",
    timeLabel: "Sold: 5h ago",
    imageUrl:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80&auto=format&fit=crop",
  },
];

export const boughtDeals: DealItem[] = [
  {
    id: "b1",
    tag: "bought",
    postId: "#POST-1042",
    title: "5 Katha Plot in Purbachal",
    location: "Purbachal New Town, Sector 4, Dhaka",
    price: "2,00,00,000",
    typeLabel: "Flat",
    status: "bought",
    timeLabel: "Bought: 2h ago",
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "b2",
    tag: "bought",
    postId: "#POST-1043",
    title: "Villa in Kurigram",
    location: "Kurigram Sadar, Residential Area, North Zone",
    price: "4,00,00,000",
    typeLabel: "Flat",
    status: "bought",
    timeLabel: "Bought: 2h ago",
    imageUrl:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80&auto=format&fit=crop",
  },
];
