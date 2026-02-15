import {
  AdminManageStats,
  AdminRow,
} from "@/app/(dashboard)/admin/types/admin-list-type";
import { IMAGE } from "@/constants/image-paths";

export const demoAdminStats: AdminManageStats = {
  totalAdmins: 12,
  activeLocations: 8,
  totalWorkforce: 145,
};

export const demoAdmins: AdminRow[] = [
  {
    id: "#ADM-005",
    name: "Sarah Khan",
    avatar: IMAGE.avatar,
    assignedLocation: "Dhaka - Uttara",
    locationTone: "blue",
    phone: "+880 1712 345678",
    email: "sarah@landguru.com",
    workforceCount: 15,
    workforceActive: 12,
    workforceSuspended: 3,
    activityStatus: "online",
    lastLoginText: "Last login: 5 mins ago",
    accountEnabled: true,
  },
  {
    id: "#ADM-006",
    name: "New Admin",
    avatar: IMAGE.avatar,
    assignedLocation: "Sylhet - Sadar",
    locationTone: "purple",
    phone: "+880 1812 345678",
    email: "new.admin@landguru.com",
    workforceCount: 0,
    workforceActive: 0,
    workforceSuspended: 0,
    activityStatus: "offline",
    lastLoginText: "Last login: 1 day ago",
    accountEnabled: true,
  },
  {
    id: "#ADM-002",
    name: "Suspended Admin",
    avatar: IMAGE.avatar,
    assignedLocation: "Chittagong - Port",
    locationTone: "gray",
    phone: "+880 1912 345678",
    email: "suspended@landguru.com",
    workforceCount: 5,
    workforceActive: 0,
    workforceSuspended: 5,
    activityStatus: "suspended",
    lastLoginText: "—",
    accountEnabled: false,
  },
];
