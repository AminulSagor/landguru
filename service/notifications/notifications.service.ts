import { serviceClient } from "@/service/base/axios.client";
import type {
  NotificationDetailsResponse,
  NotificationsQueryParams,
  NotificationsResponse,
} from "@/types/notifications.types";

export const notificationsService = {
  async getNotifications(
    params: NotificationsQueryParams = {},
  ): Promise<NotificationsResponse> {
    const response = await serviceClient.get<NotificationsResponse>("/notifications", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 10,
      },
    });

    return response.data;
  },

  async getNotificationById(id: string): Promise<NotificationDetailsResponse> {
    const response = await serviceClient.get<NotificationDetailsResponse>(
      `/notifications/${id}`,
    );

    return response.data;
  },

  async markAllRead() {
    const response = await serviceClient.patch("/notifications/read-all");
    return response.data;
  },

  async markRead(id: string) {
    const response = await serviceClient.patch(`/notifications/${id}/read`);
    return response.data;
  },
};

export default notificationsService;
