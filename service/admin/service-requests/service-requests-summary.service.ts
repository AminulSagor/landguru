import { serviceClient } from "@/service/base/axios.client";
import type { ServiceRequestsSummaryResponse } from "@/types/admin/service-requests/service-requests-summary.types";

export const serviceRequestsSummaryService = {
  async getServiceRequestsSummary(): Promise<ServiceRequestsSummaryResponse> {
    const response = await serviceClient.get<ServiceRequestsSummaryResponse>(
      "/property-services/service-requests/summary",
    );

    return response.data;
  },
};
