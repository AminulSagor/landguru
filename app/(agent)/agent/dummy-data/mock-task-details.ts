export type TaskStage = "pending_accepting" | "active";

export type TaskDetails = {
  id: string;
  title: string;
  code: string;

  // header chips + times
  stage: TaskStage;
  acceptBefore?: string; // pending only
  postedAgo: string; // "Posted 10m ago"
  updatedAgo?: string; // active only

  // property/client
  clientName: string;
  verified: boolean;
  avatarUrl?: string;

  // property details (static if not in your tasks list)
  propertyType: string;
  plotSize: string;
  sellableLand: string;
  roadDistance: string;
  location: string;

  // images/documents
  photos: string[];
  morePhotosCount: number;

  rawDocs: { name: string; size: string }[];

  serviceFee: number;
};

// NOTE: stage is mocked from id (odd/even) to demonstrate both UIs
export function mockTaskDetailsById(id: string): TaskDetails {
  const isActive = Number(id) % 2 === 0;

  return {
    id,
    title: "Ownership history validation",
    code: "#SERV892-POST-1042",

    stage: isActive ? "active" : "pending_accepting",

    acceptBefore: isActive ? undefined : "Accept Before: 12 Jan 2026, 12:00AM",
    postedAgo: "Posted 10m ago",
    updatedAgo: isActive ? "Updated 10m ago" : undefined,

    clientName: "Farhan",
    verified: true,

    propertyType: "Flat",
    plotSize: "15 Katha",
    sellableLand: "15 Katha",
    roadDistance: "200m–750m",
    location:
      "Block-C, Banani, Banani Thana, Dhaka North City Corporation, Dhaka-1213, Dhaka, Bangladesh.",

    photos: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=600&q=60",
    ],
    morePhotosCount: 2,

    rawDocs: [
      { name: "Deed document 1.pdf", size: "1.5 MB" },
      { name: "Deed document 2.pdf", size: "1.5 MB" },
      { name: "Deed document 3.pdf", size: "1.5 MB" },
    ],

    serviceFee: 40000,
  };
}
