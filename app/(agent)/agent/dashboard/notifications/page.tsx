"use client";

import React from "react";
import NotificationsHeader from "./_components/notifications-header";
import NotificationsFilters, {
  NotiFilter,
} from "./_components/notifications-filters";
import NotificationsCard from "./_components/notifications-card";
import NotificationsEmptyState from "./_components/notifications-empty-state";
import { mockNotifications } from "@/app/(agent)/agent/dummy-data/mock-notifications";

export default function NotificationsPage() {
  const [filter, setFilter] = React.useState<NotiFilter>("all");
  const [items, setItems] = React.useState(mockNotifications);

  const filtered = React.useMemo(() => {
    if (filter === "all") return items;
    return items.filter((n) => n.category === filter);
  }, [filter, items]);

  const onMarkAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6">
        <NotificationsHeader onMarkAllRead={onMarkAllRead} />

        <div className="mt-5">
          <NotificationsFilters value={filter} onChange={setFilter} />
        </div>

        <div className="mt-6">
          {filtered.length === 0 ? (
            <NotificationsEmptyState />
          ) : (
            <>
              <NotificationsCard items={filtered} />
              <div className="mt-10 flex justify-center">
                <button className="text-sm font-semibold text-gray/60 hover:text-gray">
                  View older notifications
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
