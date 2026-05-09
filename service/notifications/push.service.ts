import { serviceClient } from "@/service/base/axios.client";

export const pushService = {
  registerDevice(fcmToken: string, deviceType = "web") {
    return serviceClient.post("/notifications/device/fcm-token", {
      fcmToken,
      deviceType,
    });
  },

  unregisterDevice(fcmToken: string) {
    return serviceClient.delete(`/notifications/device/fcm/${encodeURIComponent(fcmToken)}`);
  },
};

export default pushService;
