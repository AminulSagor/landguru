export interface ServiceRequestsSummaryData {
  totalRequests: number;
  unassigned: number;
  inReview: number;
  totalCompleted: number;
  completedToday: number;
}

export interface ServiceRequestsSummaryResponse {
  success: boolean;
  data: ServiceRequestsSummaryData;
}
