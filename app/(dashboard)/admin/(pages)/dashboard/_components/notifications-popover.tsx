"use client";

import React, { useState } from "react";
import Button from "@/components/buttons/button";
import { cn } from "@/lib/utils";
import { Bell, Check, AlertCircle, Wrench, UserPlus } from "lucide-react";

type NotificationType = "urgent" | "success" | "service" | "user";

type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  showActions?: boolean;
  href?: string;
};

const notifications: NotificationItem[] = [
  {
    id: "1",
    type: "urgent",
    title: "Urgent Offer Received",
    description:
      "New high-value offer on Block-C, Banani - Negotiation pending review.",
    time: "Just now",
    showActions: true,
    href: "/admin/dashboard/requests",
  },
  {
    id: "2",
    type: "success",
    title: "Listing Approved",
    description: "Property listing 'Ocean View Villa' has been approved.",
    time: "12m ago",
    href: "/admin/dashboard/property-posts",
  },
  {
    id: "3",
    type: "service",
    title: "Service Scheduled",
    description: 'Maintenance request scheduled for Unit 4B with "QuickFix".',
    time: "1h ago",
    href: "/admin/dashboard/service-requests",
  },
  {
    id: "4",
    type: "user",
    title: "New Agent Signed Up",
    description: 'Agent "Marcus Aurelius" completed profile setup.',
    time: "4h ago",
    href: "/admin/dashboard/agents",
  },
];

const iconMap = {
  urgent: <AlertCircle className="text-red" size={18} />,
  success: <Check className="text-green" size={18} />,
  service: <Wrench className="text-orange" size={18} />,
  user: <UserPlus className="text-gray/50" size={18} />,
};

export default function NotificationsPopover() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* bell */}
      <button aria-label="Notifications" className="relative">
        <Bell size={18} />
        <p className="bg-red-500 h-2 w-2 rounded-full absolute -top-1 right-0"/>
      </button>

      {/* hover bridge (prevents closing while moving mouse to card) */}
      <div
        className={cn(
          "absolute right-0 top-full h-4 w-[420px]",
          open ? "block" : "hidden",
        )}
      />

      {/* dropdown */}
      <div
        className={cn(
          "absolute right-0 top-full mt-3 w-[420px] transition",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <div className="rounded-2xl border border-gray/15 bg-white shadow-xl overflow-hidden">
          {/* header */}
          <div className="flex items-center justify-between px-5 py-4">
            <h3 className="text-base">
              Notifications <span className="text-primary">(4)</span>
            </h3>
            <button className="text-sm font-semibold text-primary">
              Mark all as read
            </button>
          </div>

          {/* tabs */}
          <div className="flex gap-6 px-5 pb-3 text-sm border-b border-gray/10">
            <span className="text-primary border-b-2 border-primary pb-2">
              All
            </span>
            <span>Urgent</span>
            <span>Posts</span>
          </div>

          {/* list */}
          <div className="max-h-[420px] overflow-y-auto">
            {notifications.map((n) => (
              <a
                key={n.id}
                href={n.href || "#"}
                className={cn(
                  "flex gap-4 px-5 py-4 border-l-4 cursor-pointer",
                  n.type === "urgent"
                    ? "bg-primary/5 border-primary"
                    : "border-transparent hover:bg-gray/5",
                )}
              >
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                  {iconMap[n.type]}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between gap-3">
                    <h4 className="text-sm">
                      {n.title}
                    </h4>
                    <span className="text-xs">{n.time}</span>
                  </div>

                  <p className="mt-1 text-sm text-gray">
                    {n.description}
                  </p>

                  {n.showActions && (
                    <div
                      className="mt-3 flex gap-2"
                      // stop link navigation when clicking buttons
                      onClick={(e) => e.preventDefault()}
                    >
                      <Button size="sm">Review Now</Button>
                      <Button size="sm" variant="secondary">
                        Dismiss
                      </Button>
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>

          {/* footer */}
          <div className="border-t border-gray/10 px-5 py-4">
            <button className="w-full rounded-lg border border-gray/40 py-2 text-sm font-extrabold text-gray hover:bg-gray/5">
              View All Notification History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
