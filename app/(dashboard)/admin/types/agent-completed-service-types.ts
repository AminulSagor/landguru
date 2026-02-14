export type PayoutStatus = "paid" | "processing";

export type ServiceType =
  | "legal_verification"
  | "doc_review"
  | "title_search";

export interface CompletedServiceItem {
  id: string;
  serviceId: string;

  property: {
    title: string;
    postId: string;
    image: string;
  };

  serviceType: ServiceType;

  completionDate: string;
  payoutStatus: PayoutStatus;
  earnedAmount: number;
}
