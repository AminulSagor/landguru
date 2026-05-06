export type createSellPostStepOnePayload = {
    title: string;
    description: string;
    propertyType: string;
    isPropertyShareable: boolean;
    sellableAmount: number;
    sellableUnit: string;
    askingPricePerUnit: number;
    askingPrice: number;
    roadDistanceMin?: number;
    roadDistanceMax?: number;
    plotSize?: number;
    plotUnit?: string;
    shareAmount?: number;
    shareUnit?: string;
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