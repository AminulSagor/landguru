import { serviceClient } from "@/service/base/axios.client";
import type {
  AdminZoneAgentsQueryParams,
  AdminZoneAgentsResponse,
} from "@/types/admin/agent-list/admin-zone-agents.types";

export const adminZoneAgentsService = {
  async getAdminZoneAgents(
    params: AdminZoneAgentsQueryParams,
  ): Promise<AdminZoneAgentsResponse> {
    const response = await serviceClient.get<AdminZoneAgentsResponse>(
      `/admin/${params.adminId}/agents`,
      {
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 10,
          ...(params.role ? { role: params.role } : {}),
          ...(params.search ? { search: params.search } : {}),
        },
      },
    );

    return response.data;
  },
};
