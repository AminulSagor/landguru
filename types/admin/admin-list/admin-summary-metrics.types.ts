export interface AdminSummaryMetricsData {
  totalAdmins: number;
  activeLocations: number;
  totalWorkforce: number;
}

export interface AdminSummaryMetricsResponse {
  success: boolean;
  data: AdminSummaryMetricsData;
}
