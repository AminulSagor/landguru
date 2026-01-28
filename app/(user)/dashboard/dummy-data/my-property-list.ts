// demo data for "existing posts" (matches screenshot structure + tokens logic)

import { ListingCard } from "@/app/(user)/dashboard/types/my-property-list";

export const myListingsProperty: ListingCard[] = [
  {
    id: "POST-1042",
    title: "5 Katha Plot in Purbachal",
    type: "Flat",
    price: 20000000,
    time: "2h ago",
    image: "/images/properties/purbachal.png", // placeholder
    tags: [
      { label: "FLAT", variant: "primary" },
      { label: "PENDING REVIEW", variant: "gray" },
    ],
  },
  {
    id: "POST-1043",
    title: "Villa in Kurigram",
    type: "Flat",
    price: 40000000,
    time: "2h ago",
    image: "/images/properties/kurigram.png",
    tags: [
      { label: "FLAT", variant: "primary" },
      { label: "QUOTED", variant: "danger" },
    ],
  },
  {
    id: "POST-1044",
    title: "Modern Duplex Villa",
    type: "Flat",
    price: 4000000,
    time: "2h ago",
    image: "/images/properties/duplex.jpg",
    tags: [
      { label: "FLAT", variant: "primary" },
      { label: "ACTIVE", variant: "green" },
      { label: "VERIFIED", variant: "green" },
    ],
  },
  {
    id: "POST-1045",
    title: "Gazipur Water Zone",
    type: "Flat",
    price: 9512000,
    time: "2h ago",
    image: "/images/properties/water.png",
    tags: [
      { label: "FLAT", variant: "primary" },
      { label: "DRAFT", variant: "gray" },
    ],
  },
];
