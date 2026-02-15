import type { ActivityRow } from "../types/recent-activity-types";

export const recentActivityRows: ActivityRow[] = [
  {
    id: "#POST-1042",
    type: "sell",
    subject: "5 Katha Land",
    location: "Sector 7, Uttara",
    user: "Mr. Rahman",
    status: "pending_validation",
    timeText: "10 mins ago",
    canReview: true,
  },
  {
    id: "#SERV892-POST-1042",
    type: "service",
    subject: "Ownership History Validation",
    location: "Road 12, House 4",
    user: "Mrs. Salma",
    status: "assigned",
    timeText: "45 mins ago",
  },
  {
    id: "#BUY-2201",
    type: "request",
    subject: "3 Bed Apartment",
    location: "Near Sector 4 Park",
    user: "Mr. Sahil",
    status: "new",
    timeText: "2 hours ago",
  },
  {
    id: "#POST-1041",
    type: "sell",
    subject: "Commercial Space",
    location: "Sector 11",
    user: "Mr. Karim",
    status: "pending_validation",
    timeText: "3 hours ago",
    canReview: true,
  },
];
