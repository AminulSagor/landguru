import {
  ResetRequest,
  ResetStat,
} from "@/app/(dashboard)/admin/types/admin-reset-types";
import { IMAGE } from "@/constants/image-paths";

export const demoStats: ResetStat[] = [
  { id: "pending", title: "Pending Resets", value: 4, status: "critical" },
  { id: "processed", title: "Processed Today", value: 1, status: "ok" },
  { id: "active", title: "Total Admins Active", value: 12, status: "info" },
];

export const demoRequests: ResetRequest[] = [
  {
    id: "#REQ-ADM-04",
    name: "Ms. Sarah Khan",
    adminId: "#ADM-005",
    avatar: IMAGE.avatar,
    time: "45m ago",
    phone: "+880 1712-345678",
    email: "sarah.k@landguru.com",
    zone: "Dhaka - Uttara Zone",
    actionRequired: true,
  },
];
