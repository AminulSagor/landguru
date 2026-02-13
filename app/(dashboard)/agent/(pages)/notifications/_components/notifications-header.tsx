"use client";

import React from "react";
import { Check } from "lucide-react";

export default function NotificationsHeader({
  onMarkAllRead,
}: {
  onMarkAllRead: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <h1 className="text-2xl font-extrabold">Notifications</h1>

      <button
        onClick={onMarkAllRead}
        className="flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80"
      >
        <Check size={16} />
        Mark all as read
      </button>
    </div>
  );
}
