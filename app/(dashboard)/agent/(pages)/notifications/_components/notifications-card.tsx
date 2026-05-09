"use client";

import React from "react";
import Card from "@/components/cards/card";
import type { AgentUiNotification } from "@/types/notifications.types";
import NotificationRow from "@/app/(dashboard)/agent/(pages)/notifications/_components/notification-row";

export default function NotificationsCard({
  items,
  onItemClick,
}: {
  items: AgentUiNotification[];
  onItemClick?: (id: string) => void;
}) {
  return (
    <Card className="rounded-2xl p-0 overflow-hidden">
      <div className="divide-y divide-gray/10">
        {items.map((n) => (
          <NotificationRow key={n.id} item={n} onClick={onItemClick} />
        ))}
      </div>
    </Card>
  );
}
