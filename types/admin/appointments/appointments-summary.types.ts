export interface AppointmentsSummaryData {
  pendingRequests: number;
  scheduledToday: number;
  agentServiceVisits: number;
  buyerSiteVisits: number;
}

export interface AppointmentsSummaryResponse {
  success: boolean;
  data: AppointmentsSummaryData;
}
