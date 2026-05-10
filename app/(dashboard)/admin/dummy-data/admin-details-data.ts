import { AdminDetailsStatic } from "@/app/(dashboard)/admin/types/admin-details-type";
import { IMAGE } from "@/constants/image-paths";

export const adminDetailsDemo: AdminDetailsStatic = {
  breadcrumbName: "Mr. Rahim Ahmed",
  profile: {
    name: "Mr. Rahim Ahmed",
    adminId: "#ADM-005",
    roleText: "Admin",
    email: "rahim.ahmed@landguru.com",
    phone: "+880 1700-123456",
    joinedText: "Joined: Oct 24, 2026",
    address: "House 12, Road 4, Sector 7, Uttara, Dhaka",
    avatarUrl: IMAGE.avatar,
  },
  metrics: [
    {
      id: "inventory",
      title: "Property Inventory",
      value: "142",
      helperLeft: "45 Live",
      helperRight: "85 Sold",
      accent: "blue",
    },
    {
      id: "txn",
      title: "Transaction Volume",
      value: "৳ 22.7 Cr",
      helperLeft: "Sold",
      helperRight: "Bought",
      accent: "purple",
    },
    {
      id: "services",
      title: "Services Status",
      value: "3 Days",
      helperLeft: "320 Provided",
      helperRight: "12 Ongoing",
      accent: "orange",
    },
    {
      id: "revenue",
      title: "Revenue Generated",
      value: "৳ 4.5 Lakh",
      helperLeft: "Net Fees (Month)",
      helperRight: "↑ 12% vs last month",
      accent: "green",
    },
  ],
  topSellers: [
    {
      id: "s1",
      name: "Mr. Khan",
      sold: 12,
      volume: "৳ 2.4 Cr",
      avatarUrl: "/images/avatar.png",
    },
    {
      id: "s2",
      name: "Mrs. Akhter",
      sold: 8,
      volume: "৳ 1.8 Cr",
      avatarUrl: "/images/avatar.png",
    },
  ],
  topBuyers: [
    {
      id: "b1",
      name: "ABC Developers",
      avatarText: "ABC",
      properties: 5,
      spent: "৳ 5.2 Cr",
    },
    {
      id: "b2",
      name: "Invest Corp",
      avatarText: "IC",
      properties: 3,
      spent: "৳ 3.1 Cr",
    },
  ],
  supervisedAgents: {
    count: 15,
    rows: [
      {
        id: "a1",
        name: "Rafiq Islam",
        email: "rafiq@landguru.com",
        role: "Surveyor",
        currentLoadLabel: "Active Jobs: 3",
        currentLoadValue: 3,
        currentLoadMax: 6,
        loadTone: "blue",
        tasksCompleted: 42,
        earnings: "৳ 45,000",
        enabled: true,
      },
      {
        id: "a2",
        name: "Sumaiya Khan",
        email: "sumaiya@landguru.com",
        role: "Lawyer",
        currentLoadLabel: "Active Jobs: 1",
        currentLoadValue: 1,
        currentLoadMax: 6,
        loadTone: "blue",
        tasksCompleted: 28,
        earnings: "৳ 62,500",
        enabled: true,
      },
      {
        id: "a3",
        name: "Karim Ullah",
        email: "karim@landguru.com",
        role: "Surveyor",
        currentLoadLabel: "Active Jobs: 5",
        currentLoadValue: 5,
        currentLoadMax: 6,
        loadTone: "red",
        tasksCompleted: 15,
        earnings: "৳ 32,200",
        enabled: false,
      },
    ],
  },
  activity: [
    {
      id: "l1",
      title: "Approved Property ID-992",
      desc: "Verified documents for Plot #45, Sector 4.",
      timeText: "2 hours ago",
      tone: "blue",
    },
    {
      id: "l2",
      title: "Assigned Surveyor Rafiq to Job #J-204",
      desc: "Land measurement request for Client ABC Developers.",
      timeText: "Yesterday, 4:30 PM",
      tone: "gray",
    },
    {
      id: "l3",
      title: "Updated Zone Pricing Metrics",
      desc: "Adjusted base price per decimal for Uttara Sector 10.",
      timeText: "Oct 26, 9:15 AM",
      tone: "gray",
    },
  ],
};

// DEPRECATION NOTICE
// This file contains demo data only. Replace usages with live API calls.
export const __IS_DEMO = true;

export async function getLiveOrDemo(..._args: any[]): Promise<AdminDetailsStatic> {
  if (typeof window !== "undefined") {
    // client-side warning
    // eslint-disable-next-line no-console
    console.warn("[DEMO] Using adminDetailsDemo from admin-details-data.ts — replace with live API.");
  }
  return adminDetailsDemo;
}
