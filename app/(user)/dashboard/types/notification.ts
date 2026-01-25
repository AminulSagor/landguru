export type NotificationCategory = "action_required" | "appointments" | "general";

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  timeText: string; // e.g. "10m ago", "2h ago", "Yesterday"
  category: NotificationCategory;
  read: boolean;
};
