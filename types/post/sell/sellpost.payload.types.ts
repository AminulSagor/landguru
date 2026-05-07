import type { CreateOfferDraftStep1Request } from "@/types/post/buy/wanted-needs.types";

export type createSellPostStepOnePayload = CreateOfferDraftStep1Request;

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