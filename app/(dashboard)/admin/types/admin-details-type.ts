export type AdminMiniStat = {
  id: "inventory" | "txn" | "services" | "revenue";
  title: string;
  value: string;
  helperLeft?: string;
  helperRight?: string;
  accent?: "blue" | "purple" | "orange" | "green";
  // optional backend-provided numeric fields for richer display
  soldAmount?: number; // for `txn` card
  boughtAmount?: number; // for `txn` card
  providedCount?: number; // for `services` card
  ongoingCount?: number; // for `services` card
};

export type LeaderRow = {
  id: string;
  name: string;
  avatarText?: string; // for initials (ABC)
  avatarUrl?: string;
  sold?: number;
  properties?: number;
  volume?: string; // ৳ 2.4 Cr
  spent?: string; // ৳ 5.2 Cr
};

export type SupervisedAgentRow = {
  id: string;
  name: string;
  email: string;
  role: "Surveyor" | "Lawyer";
  currentLoadLabel: string; // "Active Jobs: 3"
  currentLoadValue: number; // 3
  currentLoadMax: number; // 6
  loadTone: "blue" | "red";
  tasksCompleted: number;
  earnings: string;
  enabled: boolean;
};

export type ActivityLogRow = {
  id: string;
  title: string;
  desc: string;
  timeText: string;
  tone: "blue" | "gray";
};

export type AdminDetailsStatic = {
  breadcrumbName: string;
  profile: {
    name: string;
    adminId: string;
    roleText: string;
    email: string;
    phone: string;
    joinedText: string;
    address: string;
    avatarUrl?: string;
  };
  metrics: AdminMiniStat[];
  topSellers: LeaderRow[];
  topBuyers: LeaderRow[];
  supervisedAgents: {
    count: number;
    rows: SupervisedAgentRow[];
  };
  activity: ActivityLogRow[];
};
