/** Step 1 body for the 4-step sell-post draft flow (`/sell-posts/draft`). */
export type createSellPostStepOnePayload = {
  title: string;
  description: string;
  propertyType: string;
  roadDistanceMin?: number;
  roadDistanceMax?: number;
  sellableAmount: number;
  sellableUnit: string;
  plotSize?: number;
  plotUnit?: string;
  isPropertyShareable: boolean;
  shareAmount?: number;
  shareUnit?: string;
  askingPricePerUnit: number;
  askingPrice: number;
  division?: string;
  district?: string;
  upazila?: string;
  unionOrCityCorp?: string;
  wardNo?: string;
  postalCode?: string;
  fullAddress?: string;
};

export type createSellPostStepTwoPayload = {
  photos?: string[];        // public image URLs
  videoUrl?: string;        // public video URL
  deedFiles?: string[];     // signed URLs
  khatianFiles?: string[];  // signed URLs
  otherFiles?: string[];    // signed URLs
};

export type createSellPostStepThreePayload = {
    selectedServices: string[]; // array of service IDs
};
