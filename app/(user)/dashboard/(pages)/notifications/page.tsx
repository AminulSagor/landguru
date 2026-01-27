"use client";

import React from "react";
import { CheckCheck } from "lucide-react";
import {
  NotificationCategory,
  NotificationItem,
} from "@/app/(user)/dashboard/types/notification";
import NotificationRow from "@/app/(user)/dashboard/(pages)/notifications/_components/notification-row";
import { notificationsSeed } from "@/app/(user)/dashboard/dummy-data/notification";

type FilterKey = "all" | "action_required" | "appointments";

function Pill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "px-4 py-2 rounded-full text-sm font-semibold transition",
        "ring-1 ring-black/5 shadow-sm",
        active
          ? "bg-primary text-white"
          : "bg-white text-gray hover:bg-gray-50",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default function NotificationsPage() {
  const [filter, setFilter] = React.useState<FilterKey>("all");
  const [items, setItems] =
    React.useState<NotificationItem[]>(notificationsSeed);

  const filtered = React.useMemo(() => {
    if (filter === "all") return items;
    const category: NotificationCategory = filter;
    return items.filter((x) => x.category === category);
  }, [filter, items]);

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  const openNotification = (id: string) => {
    // mark as read on click (like most apps)
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-24">
      {/* Header */}

      <div className="flex items-start justify-between gap-4 w-full">
        <h1 className="text-2xl font-extrabold text-black">Notifications</h1>

        <button
          type="button"
          onClick={markAllRead}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-2"
        >
          <CheckCheck size={16} />
          Mark all as read
        </button>
      </div>
      <div>
        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Pill active={filter === "all"} onClick={() => setFilter("all")}>
            All
          </Pill>
          <Pill
            active={filter === "action_required"}
            onClick={() => setFilter("action_required")}
          >
            Action Required
          </Pill>
          <Pill
            active={filter === "appointments"}
            onClick={() => setFilter("appointments")}
          >
            Appointments
          </Pill>
        </div>

        {/* List */}
        <div className="mt-8 space-y-4 max-w-5xl">
          {filtered.map((n) => (
            <NotificationRow key={n.id} item={n} onClick={openNotification} />
          ))}

          {filtered.length === 0 && (
            <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5 text-sm text-gray-500">
              No notifications found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
