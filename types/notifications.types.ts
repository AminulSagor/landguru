export type NotificationApiItem = {
  id: string;
  userId?: string;
  title?: string;
  message?: string;
  type?: string;
  referenceId?: string;
  isRead?: boolean;
  createdAt?: string;
};

export type NotificationsMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  unreadCount?: number;
};

export type NotificationsResponse = {
  success?: boolean;
  data: NotificationApiItem[];
  meta?: NotificationsMeta;
};

export type NotificationDetailsResponse = {
  success?: boolean;
  data: NotificationApiItem;
};

export type NotificationsQueryParams = {
  page?: number;
  limit?: number;
};

export type NotificationKind = "danger" | "success" | "info";

export type AgentNotificationCategory = "all" | "action" | "appointments";

export type AgentUiNotification = {
  id: string;
  title: string;
  messageLeft?: string;
  highlight?: string;
  messageRight?: string;
  time: string;
  unread: boolean;
  kind: NotificationKind;
  category: AgentNotificationCategory;
  raw?: NotificationApiItem;
};
