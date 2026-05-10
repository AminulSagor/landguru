"use client";

import React from "react";
import { notificationsService } from "@/service/notifications/notifications.service";
import type { NotificationApiItem } from "@/types/notifications.types";

export default function NotificationDetail({ id }: { id: string }) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [notification, setNotification] = React.useState<NotificationApiItem | null>(null);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    notificationsService
      .getNotificationById(id)
      .then((res) => {
        if (!mounted) return;
        setNotification(res.data || null);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message || "Failed to load notification");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="p-6">Loading notification...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!notification) return <div className="p-6">Notification not found.</div>;

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold">{notification.title || "Notification"}</h1>
        <p className="mt-3 text-sm text-gray-700">{notification.message}</p>
        <div className="mt-4 text-xs text-gray-400">{notification.createdAt}</div>
      </div>
    </div>
  );
}
