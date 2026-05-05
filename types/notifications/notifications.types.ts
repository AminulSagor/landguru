export type NotificationApiItem = {
  id: string;
  userId: string;
  title: string;
  type: string;
  referenceId?: string | null;
  isRead: boolean;
  createdAt: string;
};

export type NotificationsMeta = {
  total: number;
  unreadCount: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type NotificationsListResponse = {
  success: boolean;
  data: NotificationApiItem[];
  meta: NotificationsMeta;
};

export type NotificationReadResponse = {
  success: boolean;
  message?: string;
};
