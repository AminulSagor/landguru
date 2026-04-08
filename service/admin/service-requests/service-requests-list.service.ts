import { serviceClient } from "@/service/base/axios.client";
import type {
  ServiceRequestListApiResponse,
  ServiceRequestListItem,
  ServiceRequestListQueryParams,
  ServiceRequestListResponse,
} from "@/types/admin/service-requests/service-requests-list.types";

function formatDateTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function mapItem(item: ServiceRequestListApiResponse["data"][number]): ServiceRequestListItem {
  return {
    service: item.service,
    parentPost: item.parentPost,
    assignedAgent: item.assignedAgent,
    status: item.status,
    latestWorkLog: item.latestWorkLog
      ? {
          title: item.latestWorkLog.title,
          createdAt: item.latestWorkLog.createdAt,
          timeLabel: formatDateTime(item.latestWorkLog.createdAt),
        }
      : null,
  };
}

export const serviceRequestsListService = {
  async getServiceRequests(
    params: ServiceRequestListQueryParams,
  ): Promise<ServiceRequestListResponse> {
    const response = await serviceClient.get<ServiceRequestListApiResponse>(
      "/property-services/service-requests",
      {
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 10,
          ...(params.status ? { status: params.status } : {}),
          ...(params.sort ? { sort: params.sort } : {}),
        },
      },
    );

    return {
      ...response.data,
      data: response.data.data.map(mapItem),
    };
  },
};
