"use client";

import React from "react";
import Dialog from "@/components/dialogs/dialog";
import { notificationsService } from "@/service/notifications/notifications.service";
import type { NotificationApiItem } from "@/types/notifications.types";

export default function NotificationPopup() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [payload, setPayload] = React.useState<Record<string, any> | null>(null);
  const [notification, setNotification] = React.useState<NotificationApiItem | null>(null);

  const showWithData = React.useCallback(async (data: any) => {
    // eslint-disable-next-line no-console
    console.log('[notification-popup] showWithData', data);
    setPayload(data || null);
    setNotification(null);
    // if payload is nested (from agent notifications click), extract it
    const actualData = data?.payload || data;
    if (data?.notificationId) {
      setLoading(true);
      try {
        const res = await notificationsService.getNotificationById(data.notificationId);
        setNotification(res.data || null);
      } catch (e) {
        // fallback to raw data (use actualData for title/message)
        setNotification({
          id: data.notificationId,
          title: actualData?.title || actualData?.notification?.title || actualData?.notificationTitle || "Notification",
          message:
            actualData?.message || actualData?.body || actualData?.notification?.message || actualData?.notification?.body || actualData?.notificationMessage || actualData?.text || "",
          createdAt: data?.createdAt || data?.notification?.createdAt,
        });
      } finally {
        setLoading(false);
      }
    } else {
      // derive title/body from incoming payload (support `message` field)
      setNotification({
        id: actualData?.id || (actualData?.notification && actualData.notification.id) || "",
        title: actualData?.title || actualData?.notification?.title || "Notification",
        message:
          actualData?.message || actualData?.body || actualData?.notification?.message || actualData?.notification?.body || actualData?.text || "",
        createdAt: actualData?.createdAt || actualData?.notification?.createdAt,
      });
    }

    setOpen(true);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Handle messages from the service worker
    function onMessage(event: MessageEvent) {
      // eslint-disable-next-line no-console
      console.log('[notification-popup] received message event', event);
      const data = event?.data;
      if (!data) return;
      if (data.type === "notification:click") {
        // eslint-disable-next-line no-console
        console.log('[notification-popup] message type=notification:click', data.data);
        showWithData(data.data);
      }
    }

    // Attach to navigator.serviceWorker when available
    if (navigator?.serviceWorker?.addEventListener) {
      navigator.serviceWorker.addEventListener("message", onMessage as any);
    }

    // Also listen to window messages for fallback
    window.addEventListener("message", onMessage as any);

    // If opened via deep-link query param ?data=..., open popup
    try {
      const params = new URLSearchParams(window.location.search);
      const raw = params.get("data");
      if (raw) {
        const parsed = JSON.parse(decodeURIComponent(raw));
        // remove param from URL
        const url = new URL(window.location.href);
        url.searchParams.delete("data");
        window.history.replaceState({}, document.title, url.toString());
        showWithData(parsed);
      }
    } catch (e) {
      // ignore
    }

    return () => {
      if (navigator?.serviceWorker?.removeEventListener) {
        navigator.serviceWorker.removeEventListener("message", onMessage as any);
      }
      window.removeEventListener("message", onMessage as any);
    };
  }, [showWithData]);

  return (
    <Dialog open={open} onOpenChange={setOpen} size="md" position="center">
      <div className="space-y-3">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <h3 className="text-lg font-semibold">{notification?.title || "Notification"}</h3>
            <p className="text-sm text-gray-600">{notification?.message}</p>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-100 rounded"
                onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}
