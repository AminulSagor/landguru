import { Agent } from "@/app/(dashboard)/admin/types/agent-list-type";
import { IMAGE } from "@/constants/image-paths";

export const Agents: Agent[] = [
  {
    id: "agent-001",
    profile: {
      image: IMAGE.avatar,
      name: "Rahim Ahmed",
      profileId: "SUR-2026-0002",
    },
    role: "Surveyor",
    assigned_zone: "Uttara Sector 1-14",
    contact: "+880 1711 456...",
    perfomance: "45 Jobs",
    status: "on",
  },
  {
    id: "agent-002",
    profile: {
      image: IMAGE.avatar,
      name: "Fatima Begum",
      profileId: "SUR-2026-0047",
    },
    role: "Field Assistant",
    assigned_zone: "Gulshan & Banani",
    contact: "+880 1718 789...",
    perfomance: "78 Jobs",
    status: "on",
  },
  {
    id: "agent-003",
    profile: {
      image: IMAGE.avatar,
      name: "Kamal Hossain",
      profileId: "SUR-2026-0091",
    },
    role: "Lawyer",
    assigned_zone: "Mirpur Section 1-6",
    contact: "+880 1912 234...",
    perfomance: "23 Jobs",
    status: "off",
  },
  {
    id: "agent-004",
    profile: {
      image: IMAGE.avatar,
      name: "Shahana Akter",
      profileId: "SUR-2026-0123",
    },
    role: "Surveyor",
    assigned_zone: "Dhanmondi & Lalmatia",
    contact: "+880 1723 567...",
    perfomance: "52 Jobs",
    status: "on",
  },
  {
    id: "agent-005",
    profile: {
      image: IMAGE.avatar,
      name: "Nasir Uddin",
      profileId: "SUR-2026-0156",
    },
    role: "Surveyor",
    assigned_zone: "Mohakhali & DOHS",
    contact: "+880 1815 890...",
    perfomance: "31 Jobs",
    status: "off",
  },
];

// DEPRECATION NOTICE
// This file contains demo data only. Replace usages with live API calls.
export const __IS_DEMO = true;

export async function getLiveOrDemo(..._args: any[]): Promise<{ agents: Agent[] }> {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.warn("[DEMO] Using Agents demo data — replace with live API.");
  }
  return { agents: Agents };
}
