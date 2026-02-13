// app/(admin)/admin/dummy-data/service-requests.data.ts

import {
  ServiceDetails,
  ServiceRequestListItem,
  ServiceRequestOverview,
} from "@/app/(dashboard)/admin/types/service-request.types";

export const demoServiceRequestOverview: ServiceRequestOverview = {
  totalRequests: 142,
  unassigned: 99,
  inReview: 77,
  completedToday: 100,
};

export const demoServiceRequests: ServiceRequestListItem[] = [
  {
    id: "SERV-892",
    serviceName: "Document Organization",
    parentPostId: "POST-1044",
    locationLine: "Banani, Banani Thana",
    assignedAgent: { name: "Sahil", avatarUrl: null },
    status: "submitted_for_review",
    latestWorkLog: {
      title: "Uploaded Final_Report_v2.pdf",
      timeLabel: "20 mins ago",
    },
    createdAtISO: "2026-02-10T10:10:00.000Z",
    type: "document_organization",
  },
  {
    id: "SERV-901",
    serviceName: "Physical Demarcation",
    parentPostId: "POST-1055",
    locationLine: "Banani, Banani Thana",
    assignedAgent: { name: "Mr. Karim", avatarUrl: null },
    status: "in_progress",
    latestWorkLog: {
      title: "Site visit checked in.",
      timeLabel: "Today 10:00 AM",
    },
    createdAtISO: "2026-02-10T09:00:00.000Z",
    type: "physical_demarcation",
  },
  {
    id: "SERV-905",
    serviceName: "Pentagraph Map",
    parentPostId: "POST-1060",
    locationLine: "Banani, Banani Thana",
    assignedAgent: null,
    status: "pending_assignment",
    latestWorkLog: null,
    createdAtISO: "2026-02-10T08:30:00.000Z",
    type: "pentagraph_map",
  },
  {
    id: "SERV-905-2",
    serviceName: "Pentagraph Map",
    parentPostId: "POST-1060",
    locationLine: "Banani, Banani Thana",
    assignedAgent: null,
    status: "pending_assignment",
    latestWorkLog: null,
    createdAtISO: "2026-02-10T08:00:00.000Z",
    type: "pentagraph_map",
  },
  {
    id: "SERV-901-2",
    serviceName: "Physical Demarcation",
    parentPostId: "POST-1055",
    locationLine: "Banani, Banani Thana",
    assignedAgent: { name: "Mr. Karim", avatarUrl: null },
    status: "in_progress",
    latestWorkLog: {
      title: "Site visit checked in.",
      timeLabel: "Today 10:00 AM",
    },
    createdAtISO: "2026-02-10T07:50:00.000Z",
    type: "physical_demarcation",
  },
  {
    id: "SERV-892-2",
    serviceName: "Document Organization",
    parentPostId: "POST-1044",
    locationLine: "Banani, Banani Thana",
    assignedAgent: { name: "Sahil", avatarUrl: null },
    status: "submitted_for_review",
    latestWorkLog: {
      title: "Uploaded Final_Report_v2.pdf",
      timeLabel: "20 mins ago",
    },
    createdAtISO: "2026-02-10T07:20:00.000Z",
    type: "document_organization",
  },
];

export const demoServiceDetails: ServiceDetails = {
  headerTitle: "Service Details: Document Organization",
  serviceIdLabel: "#SERV892-POST-1044",
  statusChipLabel: "Submitted",
  agent: {
    id: "AG-1",
    name: "Sahil",
    role: "Surveyor",
    phone: "+880 1912-334455",
    avatarUrl: null,
    isOnline: true,
    startedAtLabel: "Started: Oct 12, 10:00 AM",
    lastActiveLabel: "Last Active: 2 hours ago",
  },
  activityLog: [
    {
      kind: "event",
      title: "Job Accepted",
      subtitle: "System Assignment",
      timeLabel: "Oct 12, 10:05 AM",
    },
    {
      kind: "event",
      title: "Site Visit Scheduled",
      subtitle: "Location: Block-C, Banani",
      timeLabel: "Oct 13, 09:00 AM",
    },
    {
      kind: "note",
      title: "Admin Note",
      body: "Found a discrepancy in the CS Khatian volume number compared to the master plan. Will need to verify with the local land office.",
      timeLabel: "Oct 14, 02:30 PM",
    },
    {
      kind: "file",
      title: "Uploaded Draft Report",
      fileName: "v1_draft_analysis.pdf",
      timeLabel: "Oct 15, 11:00 AM",
    },
    {
      kind: "event",
      title: "Marked Job as Complete",
      subtitle: "Ready for review",
      timeLabel: "Oct 15, 04:45 PM",
    },
  ],
  finalDeliverable: {
    fileName: "Final_Ownership_Report_Verified.pdf",
    meta: "2.4 MB • PDF Document",
  },
};
