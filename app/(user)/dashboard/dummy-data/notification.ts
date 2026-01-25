import { NotificationItem } from "@/app/(user)/dashboard/types/notification";

export const notificationsSeed: NotificationItem[] = [
  {
    id: "n1",
    title: "Complete Offer Post",
    message:
      "A Buyer accepted your offer on the Post “Modern Duplex Villa”. Complete the post as soon as possible for fixing the appointment.",
    timeText: "10m ago",
    category: "action_required",
    read: false,
  },
  {
    id: "n2",
    title: "We Quoted on your Sell Post",
    message:
      "We quoted on the Post “Modern Duplex Villa”. Review our service fees and pay your fees.",
    timeText: "10m ago",
    category: "action_required",
    read: false,
  },
  {
    id: "n3",
    title: "Service Update",
    message:
      "Surveyor Mr. Karim has updated the Pentagraph Map for “5 Katha Plot in Purbachal”.",
    timeText: "2h ago",
    category: "general",
    read: true,
  },
  {
    id: "n4",
    title: "Appointment Confirmed",
    message:
      "Site visit confirmed for Feb 10 with Buyer Mr. Rahim for “5 Katha Plot in Purbachal”.",
    timeText: "Yesterday",
    category: "appointments",
    read: true,
  },
  {
    id: "n5",
    title: "Profile Verified",
    message:
      "Your profile verification (NID) was successful. You can now post properties.",
    timeText: "3d ago",
    category: "general",
    read: true,
  },
  {
    id: "n6",
    title: "New Land Required Post Added",
    message:
      "New buy post for “Gulshan Apt B-4” was listed from a verified buyer.",
    timeText: "3d ago",
    category: "general",
    read: true,
  },
];
