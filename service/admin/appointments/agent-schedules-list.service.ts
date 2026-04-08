import { serviceClient } from "@/service/base/axios.client";
import type {
  AgentSchedulesListQueryParams,
  AgentSchedulesListResponse,
} from "@/types/admin/appointments/agent-schedules-list.types";

export const agentSchedulesListService = {
  async getAdminAgentSchedulesList(
    params: AgentSchedulesListQueryParams,
  ): Promise<AgentSchedulesListResponse> {
    const response = await serviceClient.get<AgentSchedulesListResponse>(
      "/property-services/appointments/agent-schedules",
      {
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 8,
        },
      },
    );

    return response.data;
  },
};
