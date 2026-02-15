export type ActivityTab = "all" | "sell" | "requests" | "appointments";

export type ActivityType = "sell" | "service" | "request";

export type ActivityStatus = "pending_validation" | "assigned" | "new";

export type ActivityRow = {
  id: string;
  type: ActivityType;
  subject: string;
  location: string;
  user: string;
  status: ActivityStatus;
  timeText: string;
  canReview?: boolean;
};
