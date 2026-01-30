import { ProfileOverviewData } from "@/app/(user)/dashboard/types/profile";

export const demoProfileOverview: ProfileOverviewData = {
  name: "User Name",
  email: "username@email.com",
  isVerified: true,
  summary: {
    memberSince: "Jan 2026",
    activeDeals: 3,
    propertiesListed: 12,
  },
  verificationDocs: [
    {
      id: "nid",
      title: "National ID (NID)",
      subTitle: "ID: 89***321",
      isVerified: true,
    },
    {
      id: "tin",
      title: "Tin Certificate",
      subTitle: "Tax ID: 44***99",
      isVerified: true,
    },
  ],
};