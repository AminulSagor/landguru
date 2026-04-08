import { serviceClient } from "@/service/base/axios.client";
import type {
  AgentListResponse,
  GetAgentListParams,
} from "@/types/admin/agent-list/agent-list.types";

export const agentListService = {
  async getAdminAgentList(
    params: GetAgentListParams = {},
  ): Promise<AgentListResponse> {
    const response = await serviceClient.get<AgentListResponse>(
      "/agents/admin/all",
      {
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 10,
          sort: params.sort ?? "ASC",
          ...(params.agentType ? { agentType: params.agentType } : {}),
        },
      },
    );

    return response.data;
  },
};