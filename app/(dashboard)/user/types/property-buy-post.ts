import { Option } from "@/bd-location-data/bd-address";

export type PropertyType =
  | "Plain Land"
  | "Flat"
  | "Commercial"
  | "Water Land"
  | "Agro Land"
  | "Blank Roof";

export type Unit = "Katha" | "Decimal";

export type BuyStepOneValues = {
  adTitle: string;
  description: string;

  propertyType: PropertyType;

  minLandSize: number;
  minLandUnit: Unit;

  minPlotSize?: number;
  minPlotUnit: Unit;

  distanceMin: number;
  distanceMax: number;

  budgetMin: number;
  budgetMax: number;

  division: Option | null;
  district: Option | null;
  upazila: Option | null;
  pouroshovaOrUnion: Option | null; // no data yet
  wardNo: Option | null; // no data yet
  postalCode: string;
};
