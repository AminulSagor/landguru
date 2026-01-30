type PropertyType = "Flat" | "Apartment";
export type RequestStatus = "Pending Admin Review" | "Approved";
export type VisitBadge = "Visit Today" | "Upcoming Visit" | "Visited";
export type RequestItem = {
  id: string;
  title: string;
  postId: string;
  price: string;
  type: PropertyType;
  status: RequestStatus;
  requestedAgo: string;
  imageUrl?: string;
};

export type VisitItem = {
  id: string;
  title: string;
  postId: string;
  address: string;
  dateLabel: { month: string; day: string };
  type: PropertyType;
  badge: VisitBadge;
  clientName?: string; // My Visit
  agentName?: string; // Agent Visit
  serviceType?: string; // Agent Visit
};
