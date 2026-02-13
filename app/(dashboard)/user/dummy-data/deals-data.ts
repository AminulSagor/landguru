import { DealItem } from "@/app/(dashboard)/user/types/deals";
import { IMAGE } from "@/constants/image-paths";

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
    imageUrl: IMAGE.property,
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
    imageUrl: IMAGE.property,
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
    imageUrl: IMAGE.property,
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
    imageUrl: IMAGE.property,
  },
];
