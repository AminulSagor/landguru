export type AdminActivityStatus = "online" | "offline" | "suspended";

export type AdminRow = {
  id: string; // #ADM-005
  name: string;
  avatar?: string; // optional (can show initials if empty)
  assignedLocation: string; // Dhaka - Uttara
  locationTone: "blue" | "purple" | "gray";
  phone: string;
  email: string;

  workforceCount: number; // 15
  workforceActive: number; // 12
  workforceSuspended: number; // 3

  activityStatus: AdminActivityStatus;
  lastLoginText: string; // "Last login: 5 mins ago"

  accountEnabled: boolean;
};

export type AdminManageStats = {
  totalAdmins: number;
  activeLocations: number;
  totalWorkforce: number;
};
