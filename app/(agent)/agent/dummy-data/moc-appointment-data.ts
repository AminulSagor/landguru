export type AppointmentItem = {
  id: string;
  title: string;
  serviceType: string;
  address: string;
  agentName: string;

  date: {
    month: string;
    day: number;
  };

  tag: string;
  status: "today" | "upcoming";
};

export const appointmentsData: AppointmentItem[] = [
  {
    id: "#SERV892-POST-1042",
    title: "Modern Duplex Villa",
    serviceType: "Ownership History Validation",
    address:
      "Block-C, Banani, Banani Thana, Dhaka North City Corporation, Dhaka-1213, Dhaka, Bangladesh.",
    agentName: "Adv. Sahil",
    date: {
      month: "Jan",
      day: 25,
    },
    tag: "Flat",
    status: "today",
  },
  {
    id: "#SERV892-POST-1042",
    title: "Villa in Kurigram",
    serviceType: "Ownership History Validation",
    address:
      "Block-C, Banani, Banani Thana, Dhaka North City Corporation, Dhaka-1213, Dhaka, Bangladesh.",
    agentName: "Adv. Sahil",
    date: {
      month: "Jan",
      day: 26,
    },
    tag: "Flat",
    status: "upcoming",
  },
];
