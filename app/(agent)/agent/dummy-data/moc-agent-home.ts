export type StatCardType = "new" | "active" | "done";

export type StatItem = {
  type: StatCardType;
  title: string;
  value: number;
  subtitle: string;
};

export type RequestItem = {
  id: string;
  badge: string;
  title: string;
  code: string;
  assignedAgo: string;
  address: string;
  acceptBefore: string;
};

export type ScheduleItem = {
  time: string;
  title: string;
  code: string;
  client: string;
  address: string;
};

export const mockAgentHome = {
  assignedLocation:
    "Banani, Banani Thana, Dhaka North City Corporation, Dhaka-1213, Dhaka, Bangladesh.",

  stats: [
    { type: "new", title: "NEW", value: 3, subtitle: "Requests" },
    { type: "active", title: "ACTIVE", value: 5, subtitle: "Jobs" },
    { type: "done", title: "DONE", value: 12, subtitle: "In Jan" },
  ] as StatItem[],

  requiresAccepting: [
    {
      id: "1",
      badge: "NEW REQUEST",
      title: "Pentagraph Map Verification",
      code: "#SERV892-POST-1042",
      assignedAgo: "Assigned: 10m ago",
      address:
        "Block-C, Banani, Banani Thana, Dhaka North City Corporation, Dhaka-1213, Dhaka, Bangladesh.",
      acceptBefore: "Accept Before: 12 Jan 2026, 12:00AM",
    },
    {
      id: "2",
      badge: "NEW REQUEST",
      title: "Ownership History Check",
      code: "#SERV892-POST-1043",
      assignedAgo: "Assigned: 2h ago",
      address:
        "Plot-45, Gulshan Avenue, Gulshan-1, Dhaka North City Corporation, Dhaka-1212.",
      acceptBefore: "Accept Before: 12 Jan 2026, 04:00PM",
    },
  ],

  todayLabel: "JAN 25",

  schedule: [
    {
      time: "10:00 AM",
      title: "Client Meeting",
      code: "#SERV892-POST-1042",
      client: "Farhan",
      address: "Block-C, Banani, Banani Thana, Dhaka North City Corporation...",
    },
    {
      time: "12:30 PM",
      title: "Site Visit",
      code: "#SERV892-POST-1042",
      client: "Farhan",
      address: "Block-C, Banani, Banani Thana, Dhaka North City Corporation...",
    },
    {
      time: "4:30 PM",
      title: "Site Visit",
      code: "#SERV892-POST-1042",
      client: "Farhan",
      address: "Block-C, Banani, Banani Thana, Dhaka North City Corporation...",
    },
  ],
};
