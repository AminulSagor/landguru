"use client";

import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CheckCheck } from "lucide-react";
import {
  NotificationCategory,
  NotificationItem,
} from "@/app/(dashboard)/user/types/notification";
import NotificationRow from "@/app/(dashboard)/user/(pages)/notifications/_components/notification-row";
import { userNotificationsService } from "@/service/users/notification/notifications.service";
import type {
  NotificationApiItem,
  NotificationsListResponse,
} from "@/types/notifications/notifications.types";
import { formatRelativeTime } from "@/utils/properties-management-table.utils";

type FilterKey = "all" | "action_required" | "appointments";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

function mapCategory(type: string): NotificationCategory {
  const normalized = type.toUpperCase();

  if (normalized.includes("APPOINT")) {
    return "appointments";
  }

  if (
    normalized.includes("POST") ||
    normalized.includes("QUOTE") ||
    normalized.includes("OFFER") ||
    normalized.includes("REJECT")
  ) {
    return "action_required";
  }

  return "general";
}

function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildMessage(item: NotificationApiItem): string {
  const typeLabel = toTitleCase(item.type);

  if (item.referenceId) {
    return `${typeLabel} (${item.referenceId})`;
  }

  return typeLabel;
}

function toUiItem(item: NotificationApiItem): NotificationItem {
  return {
    id: item.id,
    title: item.title,
    message: buildMessage(item),
    timeText: formatRelativeTime(item.createdAt) || item.createdAt,
    category: mapCategory(item.type),
    read: item.isRead,
  };
}

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: unknown }).response === "object" &&
    (error as { response?: { data?: { message?: string } } }).response?.data
      ?.message
  ) {
    return (
      (error as { response?: { data?: { message?: string } } }).response?.data
        ?.message ?? "Something went wrong"
    );
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong";
}

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
  const queryClient = useQueryClient();
  const lastErrorMessageRef = React.useRef<string | null>(null);

  const listQuery = useQuery({
    queryKey: ["user-notifications", DEFAULT_PAGE, DEFAULT_LIMIT],
    queryFn: () =>
      userNotificationsService.getNotifications({
        page: DEFAULT_PAGE,
        limit: DEFAULT_LIMIT,
      }),
  });

  const items = React.useMemo(
    () => (listQuery.data?.data ?? []).map(toUiItem),
    [listQuery.data?.data],
  );

  React.useEffect(() => {
    if (!listQuery.error) {
      lastErrorMessageRef.current = null;
      return;
    }

    const message = getErrorMessage(listQuery.error);
    if (lastErrorMessageRef.current !== message) {
      toast.error(message);
      lastErrorMessageRef.current = message;
    }
  }, [listQuery.error]);

  const markAllMutation = useMutation({
    mutationFn: () => userNotificationsService.markAllRead(),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["user-notifications", DEFAULT_PAGE, DEFAULT_LIMIT],
      });

      const previous = queryClient.getQueryData<NotificationsListResponse>([
        "user-notifications",
        DEFAULT_PAGE,
        DEFAULT_LIMIT,
      ]);

      if (previous) {
        queryClient.setQueryData<NotificationsListResponse>(
          ["user-notifications", DEFAULT_PAGE, DEFAULT_LIMIT],
          {
            ...previous,
            data: previous.data.map((item) => ({
              ...item,
              isRead: true,
            })),
            meta: {
              ...previous.meta,
              unreadCount: 0,
            },
          },
        );
      }

      return { previous };
    },
    onError: (error, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ["user-notifications", DEFAULT_PAGE, DEFAULT_LIMIT],
          context.previous,
        );
      }
      toast.error(
        error instanceof Error ? error.message : "Failed to mark all read",
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-notifications", DEFAULT_PAGE, DEFAULT_LIMIT],
      });
    },
  });

  const markReadMutation = useMutation({
    mutationFn: (notificationId: string) =>
      userNotificationsService.markRead(notificationId),
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({
        queryKey: ["user-notifications", DEFAULT_PAGE, DEFAULT_LIMIT],
      });

      const previous = queryClient.getQueryData<NotificationsListResponse>([
        "user-notifications",
        DEFAULT_PAGE,
        DEFAULT_LIMIT,
      ]);

      if (previous) {
        const nextData = previous.data.map((item) =>
          item.id === notificationId ? { ...item, isRead: true } : item,
        );

        const unreadCount = nextData.filter((item) => !item.isRead).length;

        queryClient.setQueryData<NotificationsListResponse>(
          ["user-notifications", DEFAULT_PAGE, DEFAULT_LIMIT],
          {
            ...previous,
            data: nextData,
            meta: {
              ...previous.meta,
              unreadCount,
            },
          },
        );
      }

      return { previous };
    },
    onError: (error, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ["user-notifications", DEFAULT_PAGE, DEFAULT_LIMIT],
          context.previous,
        );
      }
      toast.error(
        error instanceof Error ? error.message : "Failed to mark as read",
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-notifications", DEFAULT_PAGE, DEFAULT_LIMIT],
      });
    },
  });

  const filtered = React.useMemo(() => {
    if (filter === "all") return items;
    const category: NotificationCategory = filter;
    return items.filter((x) => x.category === category);
  }, [filter, items]);

  const markAllRead = () => {
    if (!items.length) return;
    markAllMutation.mutate();
  };

  const openNotification = (id: string) => {
    const target = items.find((item) => item.id === id);
    if (!target || target.read) return;

    markReadMutation.mutate(id);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-24">
      {/* Header */}

      <div className="flex items-start justify-between gap-4 w-full">
        <h1 className="text-2xl font-extrabold text-black">Notifications</h1>

        <button
          type="button"
          onClick={markAllRead}
          disabled={markAllMutation.isPending || items.length === 0}
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

          {!listQuery.isLoading && filtered.length === 0 && (
            <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5 text-sm text-gray-500">
              No notifications found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
