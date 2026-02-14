export type VerificationStatus = "pending" | "verified" | "unverified";

export interface User {
  id: string;
  profile: {
    name: string;
    email: string;
    avatarText?: string;
    avatarImage?: string;
  };
  userId: string;
  phone: string;
  verificationStatus: VerificationStatus;
  activity: {
    sold: number;
    bought: number;
  };
  joinedDate: string; // "Oct 24, 2023"
}

export interface UserManagementStats {
  totalUsers: number;
  totalUsersChangeText: string;
  pendingVerification: number;
  pendingSubtitle: string;
  verifiedSellers: number;
  verifiedSubtitle: string;
  activeBuyers: number;
  activeBuyersSubtitle: string;
}
