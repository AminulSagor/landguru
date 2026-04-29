import { CompletedServiceItem } from "@/app/(dashboard)/admin/types/agent-completed-service-types";
import { IMAGE } from "@/constants/image-paths";

export const CompletedServices: CompletedServiceItem[] = [
  {
    id: "1",
    serviceId: "#SERV893-POST-1044",
    property: {
      title: "5 Katha Plot, Uttara Sector 7",
      postId: "P-1044",
      image: IMAGE.property,
    },
    serviceType: "legal_verification",
    completionDate: "Oct 24, 2024",
    payoutStatus: "paid",
    earnedAmount: 1500,
  },

  {
    id: "2",
    serviceId: "#SERV892-POST-1042",
    property: {
      title: "3 BHK Luxury Apartment, Banani",
      postId: "P-1042",
      image: IMAGE.property,
    },
    serviceType: "doc_review",
    completionDate: "Oct 22, 2024",
    payoutStatus: "processing",
    earnedAmount: 2000,
  },

  {
    id: "3",
    serviceId: "#SERV891-POST-1011",
    property: {
      title: "Commercial Space 2400 sqft,...",
      postId: "P-1011",
      image: IMAGE.property,
    },
    serviceType: "title_search",
    completionDate: "Oct 20, 2024",
    payoutStatus: "paid",
    earnedAmount: 5000,
  },
];

// DEPRECATION NOTICE
// This file contains demo data only. Replace usages with live API calls.
export const __IS_DEMO = true;

export async function getLiveOrDemo(..._args: any[]): Promise<{ completed: CompletedServiceItem[] }> {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.warn("[DEMO] Using CompletedServices demo data — replace with live API.");
  }
  return { completed: CompletedServices };
}
