import { serviceClient } from "@/service/base/axios.client";
import type { AdminSummaryMetricsResponse } from "@/types/admin/admin-list/admin-summary-metrics.types";

export const adminSummaryMetricsService = {
  async getSummaryMetrics(): Promise<AdminSummaryMetricsResponse> {
    const response = await serviceClient.get<AdminSummaryMetricsResponse>(
      "/admin/summary-metrics",
    );

    return response.data;
  },
};
