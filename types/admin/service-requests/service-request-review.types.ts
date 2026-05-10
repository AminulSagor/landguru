export interface ServiceRequestReviewAgent {
  id: string;
  name: string;
  photo: string | null;
  phone: string;
}

export interface ServiceRequestReviewTiming {
  startedAt: string | null;
  submittedAt: string | null;
}

export interface ServiceRequestReviewActivityLog {
  id: string;
  title: string;
  date: string;
  files: string[];
}

export interface ServiceRequestReviewDeliverable {
  logId: string;
  uploadedAt: string;
  title: string;
  files: string[];
}

export interface ServiceRequestReviewResponse {
  success: boolean;
  assignmentId: string;
  status: string;
  serviceName: string;
  agent: ServiceRequestReviewAgent | null;
  timings: ServiceRequestReviewTiming | null;
  activityLog: ServiceRequestReviewActivityLog[];
  deliverables: ServiceRequestReviewDeliverable[];
  lastFeedback: {
    feedback: string | null;
    createdAt: string | null;
  } | null;
}
