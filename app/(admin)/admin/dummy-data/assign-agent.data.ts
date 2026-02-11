// app/(admin)/admin/dummy-data/assign-agent.data.ts

import { AssignAgentDialogPayload } from "@/app/(admin)/admin/types/assign-agent.types";

export const demoAssignAgentDialog: AssignAgentDialogPayload = {
  postId: "POST-1060",
  zoneLabel: "Block-C, Banani",
  serviceTitle: "Pentagraph Map",
  serviceDesc: "Detailed overlay of mouza maps with physical plot boundaries.",
  documents: [
    { id: "d1", fileName: "Deed_doc1.pdf", type: "pdf", selected: true },
    { id: "d2", fileName: "Deed_doc2.docx", type: "docx", selected: false },
    { id: "d3", fileName: "CS_Khatian.pdf", type: "pdf", selected: true },
    { id: "d4", fileName: "Deed_doc2.docx", type: "docx", selected: false },
  ],
  serviceFeeBDT: 5000,
  deadlineLabel: "28-Oct-2026",
  agents: [
    {
      id: "a1",
      name: "Mr. Karim",
      role: "Senior Surveyor",
      phone: "+880 1711-234567",
      avatarUrl: null,
      online: true,
      matchesZone: true,
      activeJobsLabel: "Active Jobs: 1 (Low)",
      activeTone: "green",
    },
    {
      id: "a2",
      name: "Mr. Ahmed",
      role: "Surveyor",
      phone: "+880 1611-998877",
      avatarUrl: null,
      online: true,
      matchesZone: false,
      activeJobsLabel: "Active Jobs: 0",
      activeTone: "primary",
    },
    {
      id: "a3",
      name: "Mr. Farhan",
      role: "Surveyor",
      phone: "+880 1722-111222",
      avatarUrl: null,
      online: true,
      matchesZone: false,
      activeJobsLabel: "Active Jobs: 2",
      activeTone: "orange",
    },
  ],
};
