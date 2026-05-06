export type Option = { label: string; value: string };

export type PropertyFiltersState = {
  propertyType: string;
  priceRange: [number, number];
  sellableRange: [number, number];
  plotRange: [number, number];
  roadRange: [number, number];
  division: Option | null;
  district: Option | null;
  upazila: Option | null;
  pouroshovaOrUnion: string;
  wardNo: string;
  minPrice: string;
  maxPrice: string;
};

export const DEFAULT_PROPERTY_FILTERS: PropertyFiltersState = {
  propertyType: "All",
  priceRange: [50, 80],
  sellableRange: [7, 20],
  plotRange: [7, 20],
  roadRange: [200, 750],
  division: null,
  district: null,
  upazila: null,
  pouroshovaOrUnion: "",
  wardNo: "",
  minPrice: "",
  maxPrice: "",
};
