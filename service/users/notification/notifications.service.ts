import { serviceClient } from "@/service/base/axios.client";
import type {
  NotificationReadResponse,
  NotificationsListResponse,
} from "@/types/notifications/notifications.types";

export type NotificationsQueryParams = {
  page?: number;
  limit?: number;
};

export const userNotificationsService = {
  async getNotifications(
    params: NotificationsQueryParams,
  ): Promise<NotificationsListResponse> {
    const response = await serviceClient.get<NotificationsListResponse>(
      "/notifications",
      {
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 10,
        },
      },
    );

    return response.data;
  },

  async markAllRead(): Promise<NotificationReadResponse> {
    const response = await serviceClient.patch<NotificationReadResponse>(
      "/notifications/read-all",
    );

    return response.data;
  },

  async markRead(notificationId: string): Promise<NotificationReadResponse> {
    const response = await serviceClient.patch<NotificationReadResponse>(
      `/notifications/${notificationId}/read`,
    );

    return response.data;
  },
};
