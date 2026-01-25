import { Option } from "@/bd-location-data/bd-address";

export type PropertyType =
  | "Plain Land"
  | "Flat"
  | "Commercial"
  | "Water Land"
  | "Agro Land"
  | "Blank Roof";

export type Unit = "Katha" | "Decimal";

export type StepOneValues = {
  adTitle: string;
  description: string;

  propertyType: PropertyType;

  // distance range (meters)
  distanceMin: number;
  distanceMax: number;

  sellableAmount: number;
  sellableUnit: Unit;

  plotSize?: number;
  plotSizeUnit: Unit;

  shareUnitEnabled: boolean;
  shareUnitAmount?: number;
  shareUnitUnit: Unit;

  pricePerKatha: number;

  division: Option | null;
  district: Option | null;
  upazila: Option | null;
  pouroshovaOrUnion: Option | null; // no data yet
  wardNo: Option | null; // no data yet
  postalCode: string;
  fullAddress: string;
};

export type StepTwoValues = {
  photos: File[]; // max 5
  video: File | null; // max 1

  deedDocuments: File[]; // pdf/docx
  khatianDocuments: File[]; // pdf/docx
  otherDocuments: File[]; // pdf/docx
};

export type StepThreeValues = {
  // mandatory are fixed + always selected
  mandatoryServiceIds: string[];
  optionalServiceIds: string[];
};

export type StepFourValues = {
  data : any
};