"use client";

import React from "react";
import NotificationsHeader from "./_components/notifications-header";
import NotificationsFilters, {
  NotiFilter,
} from "./_components/notifications-filters";
import NotificationsCard from "./_components/notifications-card";
import NotificationsEmptyState from "./_components/notifications-empty-state";
import useNotifications from "@/hooks/useNotifications";
import type {
  AgentNotificationCategory,
  AgentUiNotification,
  NotificationApiItem,
  NotificationKind,
} from "@/types/notifications.types";

export default function NotificationsPage() {
  const [filter, setFilter] = React.useState<NotiFilter>("all");
  const [page, setPage] = React.useState(1);
  const [items, setItems] = React.useState<AgentUiNotification[]>([]);

  const toRelativeTime = (iso?: string) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    const diff = Date.now() - d.getTime();
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diff < minute) return "Just now";
    if (diff < hour) return `${Math.floor(diff / minute)}m ago`;
    if (diff < day) return `${Math.floor(diff / hour)}h ago`;
    if (diff < day * 2) return "Yesterday";
    if (diff < day * 7) return `${Math.floor(diff / day)}d ago`;

    return d.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTypeLabel = (type?: string) => {
    if (!type) return "";
    return type
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (m) => m.toUpperCase());
  };

  const mapCategory = (n: NotificationApiItem): AgentNotificationCategory => {
    const title = (n.title ?? "").toLowerCase();
    const type = (n.type ?? "").toLowerCase();
    if (title.includes("appointment") || type.includes("appointment")) return "appointments";
    if (
      title.includes("assigned") ||
      title.includes("request") ||
      title.includes("action") ||
      type.includes("task") ||
      type.includes("request") ||
      type.includes("action")
    ) {
      return "action";
    }
    return "all";
  };

  const mapKind = (category: AgentNotificationCategory): NotificationKind => {
    if (category === "appointments") return "success";
    if (category === "action") return "danger";
    return "info";
  };

  const toAgentUi = React.useCallback(
    (n: NotificationApiItem): AgentUiNotification => {
      const category = mapCategory(n);
      const message = n.message?.trim() ?? "";
      const typeLabel = formatTypeLabel(n.type);
      const highlight = n.referenceId
        ? `#${String(n.referenceId).slice(0, 8)}`
        : "";

      return {
        id: n.id,
        title: n.title ?? "Notification",
        messageLeft: message || typeLabel,
        highlight: message ? "" : highlight,
        messageRight: "",
        time: toRelativeTime(n.createdAt),
        unread: !n.isRead,
        kind: mapKind(category),
        category,
        raw: n,
      };
    },
    [],
  );

  const {
    items: fetched,
    meta,
    loading,
    error,
    markAllRead,
    markRead,
  } = useNotifications<AgentUiNotification>({
    page,
    limit: 10,
    mapper: toAgentUi,
  });

  React.useEffect(() => {
    setItems((prev) => {
      if (page === 1) return fetched;
      const seen = new Set(prev.map((n) => n.id));
      const merged = [...prev];
      for (const item of fetched) {
        if (!seen.has(item.id)) merged.push(item);
      }
      return merged;
    });
  }, [fetched, page]);

  const filtered = React.useMemo(() => {
    if (filter === "all") return items;
    return items.filter((n) => n.category === filter);
  }, [filter, items]);

  const onMarkAllRead = async () => {
    await markAllRead();
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const onOpenNotification = async (id: string) => {
    await markRead(id);
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
    // Trigger the global notification popup (also used by SW message handler)
    try {
      // eslint-disable-next-line no-console
      console.log('[agent notifications] opening popup for', id);
      if (typeof window !== 'undefined' && window.postMessage) {
        // include the local item raw payload when available so popup can show details immediately
        const local = items.find((it) => it.id === id)?.raw || null;
        const payload = local ? { notificationId: id, payload: local } : { notificationId: id };
        window.postMessage({ type: 'notification:click', data: payload }, window.location.origin);
      }
    } catch (e) {
      // fallback: dispatch a message event
      try {
        const local = items.find((it) => it.id === id)?.raw || null;
        const payload = local ? { notificationId: id, payload: local } : { notificationId: id };
        window.dispatchEvent(new MessageEvent('message', { data: { type: 'notification:click', data: payload } }));
      } catch (err) {
        // ignore
      }
    }
  };

  const totalPages = meta?.totalPages ?? 1;
  const hasMore = page < totalPages;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6">
        <NotificationsHeader onMarkAllRead={onMarkAllRead} />

        <div className="mt-5">
          <NotificationsFilters value={filter} onChange={setFilter} />
        </div>

        <div className="mt-6">
          {loading && items.length === 0 ? (
            <div className="py-10 text-center text-sm font-semibold text-gray/60">
              Loading notifications...
            </div>
          ) : error ? (
            <div className="py-10 text-center text-sm font-semibold text-red-600">
              {error}
            </div>
          ) : filtered.length === 0 ? (
            <NotificationsEmptyState />
          ) : (
            <>
              <NotificationsCard items={filtered} onItemClick={onOpenNotification} />
              {hasMore ? (
                <div className="mt-10 flex justify-center">
                  <button
                    className="text-sm font-semibold text-gray/60 hover:text-gray"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    {loading ? "Loading..." : "View older notifications"}
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
