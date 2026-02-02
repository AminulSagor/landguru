export type NotiCategory = "all" | "action" | "appointments";

export type NotificationItem = {
  id: string;
  title: string;
  messageLeft: string; // "You've been assigned..."
  highlight: string;   // bold part
  messageRight: string; // "View details..."
  time: string;        // "10m ago" | "Yesterday"
  unread?: boolean;
  kind: "danger" | "success" | "info";
  category: NotiCategory;
};

export const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "New Service Request Assigned",
    messageLeft: "You’ve been assigned for the service:",
    highlight: "Deed Writing #SERV892-POST-1042.",
    messageRight: "View details and start completing the service as soon as possible.",
    time: "10m ago",
    unread: true,
    kind: "danger",
    category: "action",
  },
  {
    id: "2",
    title: "New Service Request Assigned",
    messageLeft: "You’ve been assigned for the service:",
    highlight: "Ownership History Validation #SERV892-POST-1042.",
    messageRight: "View details and start completing the service as soon as possible.",
    time: "20m ago",
    unread: true,
    kind: "danger",
    category: "action",
  },
  {
    id: "3",
    title: "New Service Request Assigned",
    messageLeft: "You’ve been assigned for the service:",
    highlight: "Document Organization #SERV892-POST-1042.",
    messageRight: "View details and start completing the service as soon as possible.",
    time: "30m ago",
    unread: true,
    kind: "danger",
    category: "action",
  },
  {
    id: "4",
    title: "Upcoming Appointment",
    messageLeft: "",
    highlight: "#SERV892-POST-1042, 12 Jan 2026, 10:00 AM.",
    messageRight: "",
    time: "Yesterday",
    unread: false,
    kind: "success",
    category: "appointments",
  },
  {
    id: "5",
    title: "Document Reviewed",
    messageLeft: "Your submission on the service:",
    highlight: "Pentagraph Map Verification",
    messageRight: "was reviewed. No issues found.",
    time: "3d ago",
    unread: false,
    kind: "info",
    category: "all",
  },
];
