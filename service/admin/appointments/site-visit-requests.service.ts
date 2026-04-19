import { serviceClient } from "@/service/base/axios.client";
import type {
  SiteVisitRequestsListResponse,
  SiteVisitRequestsQueryParams,
} from "@/types/admin/appointments/site-visit-requests.types";

export const siteVisitRequestsService = {
  async getAdminSiteVisitRequests(
    params: SiteVisitRequestsQueryParams,
  ): Promise<SiteVisitRequestsListResponse> {
    const response = await serviceClient.get<SiteVisitRequestsListResponse>(
      "/sell-posts/appointments/admin/requests",
      {
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 8,
          ...(params.status ? { status: params.status } : {}),
          ...(params.location ? { location: params.location } : {}),
          ...(params.propertyType ? { propertyType: params.propertyType } : {}),
          ...(params.search ? { search: params.search } : {}),
        },
      },
    );

    return response.data;
  },
};
