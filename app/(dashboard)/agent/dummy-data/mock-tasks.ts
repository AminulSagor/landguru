export type TaskStatus = "new" | "active" | "review" | "done";

export type TaskItem = {
  id: string;
  title: string;
  code: string;
  client: string;
  location: string;
  assignedAgo: string; // "10m ago"
  status: TaskStatus;
  serviceType: string; // used by dropdown
  acceptBefore?: string; // for new
  lastUpdate?: string; // for active
  completedTag?: string; // for done ("COMPLETED")
};

const titles = [
  "Ownership history validation",
  "Pentagraph Map Verification",
  "Physical estimate and border demarcation",
  "Deed Writing Service",
  "Document Organization",
  "Namjari/DCR Update",
  "Inheritance Dispute Analysis",
  "Title Search Report",
  "Mutation File Review",
  "Boundary Verification",
];

const locations = [
  "Block-C, Banani, Banani Thana, Dhaka North City Corporation, Dhaka-1213, Dhaka, Bangladesh.",
  "Plot-45, Gulshan Avenue, Gulshan-1, Dhaka North City Corporation, Dhaka-1212.",
  "Block-A, Gulshan-2, Dhaka North City Corporation, Dhaka-1212.",
];

const clients = ["Farhan", "Rahim", "Nafisa", "Sabbir", "Tamim"];

const serviceTypes = ["Land", "Deed", "Mutation", "Verification", "Report"];

function pick<T>(arr: T[], i: number) {
  return arr[i % arr.length];
}

function makeCode(i: number) {
  const base = 1042 + (i % 7);
  return `#SERV892-POST-${base}`;
}

function makeAssigned(i: number) {
  if (i % 3 === 0) return "10m ago";
  if (i % 3 === 1) return "2h ago";
  return "1d ago";
}

export const mockTasks: TaskItem[] = Array.from({ length: 40 }).map((_, i) => {
  const status: TaskStatus =
    i % 4 === 0 ? "new" : i % 4 === 1 ? "active" : i % 4 === 2 ? "review" : "done";

  return {
    id: String(i + 1),
    title: pick(titles, i),
    code: makeCode(i),
    client: pick(clients, i),
    location: pick(locations, i),
    assignedAgo: makeAssigned(i),
    status,
    serviceType: pick(serviceTypes, i),

    acceptBefore:
      status === "new" ? "Accept Before: 12 Jan 2026, 12:00AM" : undefined,

    lastUpdate:
      status === "active" ? "Last Update: Fixed Appointment (2h ago)" : undefined,

    completedTag:
      status === "done" ? "COMPLETED" : undefined,
  };
});
