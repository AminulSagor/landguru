export type AccountSummary = {
  memberSince: string; // "Jan 2026"
  activeDeals: number;
  propertiesListed: number;
};

export type VerificationDoc = {
  id: "nid" | "tin";
  title: string;
  subTitle: string; 
  isVerified: boolean;
};

export type ProfileOverviewData = {
  name: string;
  email: string;
  isVerified: boolean;
  summary: AccountSummary;
  verificationDocs: VerificationDoc[];
};