import {
  User,
  UserManagementStats,
} from "@/app/(dashboard)/admin/types/user-lists-types";

export const userManagementStats: UserManagementStats = {
  totalUsers: 2405,
  totalUsersChangeText: "+12% from last month",
  pendingVerification: 12,
  pendingSubtitle: "Requires attention",
  verifiedSellers: 850,
  verifiedSubtitle: "High activity rate",
  activeBuyers: 1200,
  activeBuyersSubtitle: "Looking for properties",
};

export const users: User[] = [
  {
    id: "row-1",
    profile: { name: "John Doe", email: "john.doe@example.com" },
    userId: "#ID-8829",
    phone: "+880 1711-432***",
    verificationStatus: "pending",
    activity: { sold: 5, bought: 2 },
    joinedDate: "Oct 24, 2023",
  },
  {
    id: "row-2",
    profile: { name: "Sarah Smith", email: "sarah.s@example.com" },
    userId: "#ID-8830",
    phone: "+880 1711-432***",
    verificationStatus: "verified",
    activity: { sold: 12, bought: 8 },
    joinedDate: "Sep 12, 2023",
  },
  {
    id: "row-3",
    profile: {
      name: "Michael K.",
      email: "mike.k@example.com",
      avatarText: "MK",
    },
    userId: "#ID-8831",
    phone: "+880 1711-432***",
    verificationStatus: "unverified",
    activity: { sold: 0, bought: 0 },
    joinedDate: "Oct 25, 2023",
  },
  {
    id: "row-4",
    profile: { name: "Robert Fox", email: "robert.fox@example.com" },
    userId: "#ID-8832",
    phone: "+880 1711-432***",
    verificationStatus: "verified",
    activity: { sold: 1, bought: 15 },
    joinedDate: "Aug 14, 2023",
  },
  {
    id: "row-5",
    profile: { name: "Jenny Wilson", email: "jenny.w@example.com" },
    userId: "#ID-8833",
    phone: "+880 1711-432***",
    verificationStatus: "pending",
    activity: { sold: 0, bought: 0 },
    joinedDate: "Oct 26, 2023",
  },
];
