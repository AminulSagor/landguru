import {
  RequestItem,
  VisitItem,
} from "@/app/(dashboard)/user/types/appointment";

export const requests: RequestItem[] = [
  {
    id: "r1",
    title: "Modern Duplex Villa",
    postId: "#POST-1042",
    price: "40,00,000",
    type: "Flat",
    status: "Pending Admin Review",
    requestedAgo: "2h ago",
    imageUrl:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "r2",
    title: "Villa in Kurigram",
    postId: "#POST-1045",
    price: "4,00,00,000",
    type: "Flat",
    status: "Pending Admin Review",
    requestedAgo: "5h ago",
    imageUrl:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "r3",
    title: "Luxury Apartment Complex",
    postId: "#POST-1088",
    price: "1,20,00,000",
    type: "Apartment",
    status: "Approved",
    requestedAgo: "1d ago",
  },
];

export const myUpcoming: VisitItem[] = [
  {
    id: "u1",
    title: "Modern Duplex Villa",
    postId: "#POST-1042",
    address:
      "Banasree, Ward No. 25, Dhaka South City Corporation, Khilgaon Thana, Dhaka - 1219",
    dateLabel: { month: "Jan", day: "25" },
    type: "Flat",
    badge: "Visit Today",
    clientName: "Farhan",
  },
  {
    id: "u2",
    title: "Villa in Kurigram",
    postId: "#POST-1045",
    address:
      "Banasree, Ward No. 25, Dhaka South City Corporation, Khilgaon Thana, Dhaka - 1219",
    dateLabel: { month: "Jan", day: "25" },
    type: "Flat",
    badge: "Upcoming Visit",
    clientName: "Farhan",
  },
];

export const agentUpcoming: VisitItem[] = [
  {
    id: "a1",
    title: "Modern Duplex Villa",
    postId: "#POST-1042",
    address: "SERVICE TYPE: Ownership History Validation",
    dateLabel: { month: "Jan", day: "25" },
    type: "Flat",
    badge: "Visit Today",
    agentName: "Adv. Sahil",
    serviceType: "Ownership History Validation",
  },
  {
    id: "a2",
    title: "Villa in Kurigram",
    postId: "#POST-1045",
    address: "SERVICE TYPE: Ownership History Validation",
    dateLabel: { month: "Jan", day: "25" },
    type: "Flat",
    badge: "Upcoming Visit",
    agentName: "Adv. Sahil",
    serviceType: "Ownership History Validation",
  },
];

export const myPast: VisitItem[] = [
  {
    id: "p1",
    title: "Modern Duplex Villa",
    postId: "#POST-1042",
    address:
      "Banasree, Ward No. 25, Dhaka South City Corporation, Khilgaon Thana, Dhaka - 1219",
    dateLabel: { month: "Jan", day: "25" },
    type: "Flat",
    badge: "Visited",
    clientName: "Farhan",
  },
  {
    id: "p2",
    title: "Villa in Kurigram",
    postId: "#POST-1045",
    address:
      "Banasree, Ward No. 25, Dhaka South City Corporation, Khilgaon Thana, Dhaka - 1219",
    dateLabel: { month: "Jan", day: "25" },
    type: "Flat",
    badge: "Visited",
    clientName: "Farhan",
  },
];

export const agentPast: VisitItem[] = [
  {
    id: "ap1",
    title: "Modern Duplex Villa",
    postId: "#POST-1042",
    address: "SERVICE TYPE: Ownership History Validation",
    dateLabel: { month: "Jan", day: "25" },
    type: "Flat",
    badge: "Visited",
    agentName: "Adv. Sahil",
    serviceType: "Ownership History Validation",
  },
  {
    id: "ap2",
    title: "Villa in Kurigram",
    postId: "#POST-1045",
    address: "SERVICE TYPE: Ownership History Validation",
    dateLabel: { month: "Jan", day: "25" },
    type: "Flat",
    badge: "Visited",
    agentName: "Adv. Sahil",
    serviceType: "Ownership History Validation",
  },
];
