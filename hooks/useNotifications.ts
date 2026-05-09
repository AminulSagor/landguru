"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import notificationsService from "@/service/notifications/notifications.service";
import { formatApiError } from "@/lib/format-api-error";
import type {
  NotificationApiItem,
  NotificationsMeta,
  NotificationsQueryParams,
  NotificationsResponse,
} from "@/types/notifications.types";

export type NotificationMapper<T> = (item: NotificationApiItem) => T;

export type UseNotificationsOptions<T> = NotificationsQueryParams & {
  enabled?: boolean;
  mapper?: NotificationMapper<T>;
};

const normalizeListResponse = (
  payload: NotificationsResponse | any,
): { data: NotificationApiItem[]; meta: NotificationsMeta | null } => {
  if (!payload) return { data: [], meta: null };
  const hasNested =
    payload?.data &&
    !Array.isArray(payload.data) &&
    (Array.isArray(payload.data.data) || payload.data.meta);
  const root = hasNested ? payload.data : payload;
  const data = Array.isArray(root?.data) ? root.data : [];
  const meta = root?.meta ?? null;
  return { data, meta };
};

export const useNotifications = <T = NotificationApiItem>(
  options: UseNotificationsOptions<T> = {},
) => {
  const { enabled = true, mapper, page, limit } = options;
  const [rawItems, setRawItems] = useState<NotificationApiItem[]>([]);
  const [meta, setMeta] = useState<NotificationsMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const mapItem: NotificationMapper<T> = useMemo(() => {
    if (mapper) return mapper;
    return ((item: NotificationApiItem) => item as unknown as T) as NotificationMapper<T>;
  }, [mapper]);

  const fetchNotifications = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError(null);

    try {
      const response = await notificationsService.getNotifications({ page, limit });
      if (requestId !== requestIdRef.current) return;
      const normalized = normalizeListResponse(response);
      setRawItems(normalized.data);
      setMeta(normalized.meta);
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      const formatted = formatApiError(err);
      setError(formatted.message);
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    if (!enabled) return;
    fetchNotifications();
  }, [enabled, fetchNotifications]);

  // Listen for external refresh requests (e.g. foreground FCM messages)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      if (!enabled) return;
      fetchNotifications();
    };
    window.addEventListener("notifications:refresh", handler);
    return () => window.removeEventListener("notifications:refresh", handler);
  }, [enabled, fetchNotifications]);

  const items = useMemo(() => rawItems.map(mapItem), [rawItems, mapItem]);

  const unreadCount = useMemo(() => {
    if (meta?.unreadCount !== undefined) return meta.unreadCount;
    return rawItems.filter((n) => !n.isRead).length;
  }, [meta, rawItems]);

  const markAllRead = useCallback(async () => {
    try {
      await notificationsService.markAllRead();
      setRawItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setMeta((prev) => (prev ? { ...prev, unreadCount: 0 } : prev));
    } catch (err) {
      const formatted = formatApiError(err);
      setError(formatted.message);
    }
  }, []);

  const markRead = useCallback(async (id: string) => {
    try {
      await notificationsService.markRead(id);
      setRawItems((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
      setMeta((prev) =>
        prev ? { ...prev, unreadCount: Math.max(0, (prev.unreadCount ?? 0) - 1) } : prev,
      );
    } catch (err) {
      const formatted = formatApiError(err);
      setError(formatted.message);
    }
  }, []);

  return {
    items,
    rawItems,
    meta,
    loading,
    error,
    unreadCount,
    refresh: fetchNotifications,
    markAllRead,
    markRead,
  };
};

export default useNotifications;
