import { LandTypeRow } from "@/app/(dashboard)/admin/types/land-type.types";

export const demoLandTypes: LandTypeRow[] = [
  {
    id: "lt-1",
    typeName: "Agro Land",
    subtitle: "Farming & Cultivation",
    createdAt: "Oct 24, 2023",
    isActive: true,
    icon: "tractor",
    badgeColor: "blue",
  },
  {
    id: "lt-2",
    typeName: "Plain Land",
    subtitle: "General Purpose",
    createdAt: "Oct 25, 2023",
    isActive: true,
    icon: "mountain",
    badgeColor: "green",
  },
  {
    id: "lt-3",
    typeName: "Water Land",
    subtitle: "Fisheries & Ponds",
    createdAt: "Oct 26, 2023",
    isActive: false,
    icon: "waves",
    badgeColor: "teal",
  },
  {
    id: "lt-4",
    typeName: "Flat / Apartment",
    subtitle: "Residential Units",
    createdAt: "Nov 01, 2023",
    isActive: true,
    icon: "building",
    badgeColor: "orange",
  },
  {
    id: "lt-5",
    typeName: "Blank Roof",
    subtitle: "Rooftop Space",
    createdAt: "Nov 10, 2023",
    isActive: true,
    icon: "house",
    badgeColor: "gray",
  },
  {
    id: "lt-6",
    typeName: "Commercial Space",
    subtitle: "Retail & Office",
    createdAt: "Nov 12, 2023",
    isActive: true,
    icon: "store",
    badgeColor: "purple",
  },
];

export const badgeColors = [
  { key: "blue", hex: "#3B82F6" },
  { key: "green", hex: "#22C55E" },
  { key: "orange", hex: "#F97316" },
  { key: "purple", hex: "#A855F7" },
  { key: "red", hex: "#EF4444" },
  { key: "teal", hex: "#14B8A6" },
  { key: "gray", hex: "#6B7280" },
] as const;

export const iconOptions = [
  { key: "building", label: "Building" },
  { key: "tractor", label: "Tractor" },
  { key: "mountain", label: "Mountain" },
  { key: "store", label: "Store" },
  { key: "waves", label: "Waves" },
  { key: "house", label: "House" },
] as const;
