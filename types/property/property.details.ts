export type PropertySeller = {
  fullName: string;
  id: string;
  photoUrl: string | null;
  isVerified: boolean;
};

export type PropertyAddress = {
  id: string;
  sellPostId: string;
  division: string | null;
  district: string | null;
  upazila: string | null;
  unionOrCityCorp: string | null;
  wardNo: string | null;
  postalCode: string | null;
  fullAddress: string | null;
};

export type PropertyDetails = {
  id: string;
  sellPostId: string;
  previousTransactionId: string | null;
  sellerId: string;
  seller: PropertySeller;
  status: string;
  isResell: boolean;
  title: string;
  description: string;
  propertyType: string;
  roadDistanceMin: number | null;
  roadDistanceMax: number | null;
  sellableAmount: number | null;
  sellableUnit: string | null;
  plotSize: number | null;
  plotUnit: string | null;
  isPropertyShareable: boolean;
  shareAmount: number | null;
  shareUnit: string | null;
  askingPricePerUnit: number | null;
  askingPrice: number;
  validatedPrice: number | null;
  validatedPricePerUnit: number | null;
  mandatoryServiceFee: number | null;
  optionalServiceFee: number | null;
  rejectionReason: string | null;
  address: PropertyAddress | null;
  photos: string[];
  videoUrl: string | null;
  deedFiles: string[];
  khatianFiles: string[];
  otherFiles: string[];
  selectedServices: string[];
  lastCompletedStep: number | null;
  createdAt: string;
  updatedAt: string;
};