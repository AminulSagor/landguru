import { serviceClient } from "@/service/base/axios.client";
import type {
  ServiceRequestListQueryParams,
  ServiceRequestListResponse,
} from "@/types/admin/service-requests/service-requests-list.types";

export const serviceRequestsListService = {
  async getServiceRequests(
    params: ServiceRequestListQueryParams,
  ): Promise<ServiceRequestListResponse> {
    const response = await serviceClient.get<ServiceRequestListResponse>(
      "/property-services/service-requests",
      {
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 10,
          ...(params.status ? { status: params.status } : {}),
          ...(params.serviceType ? { serviceType: params.serviceType } : {}),
          ...(params.search ? { search: params.search } : {}),
          ...(params.sort ? { sort: params.sort } : {}),
        },
      },
    );

    return response.data;
  },
};
