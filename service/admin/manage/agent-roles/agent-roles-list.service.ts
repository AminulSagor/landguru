import { serviceClient } from "@/service/base/axios.client";
import type {
  AgentRolesListQueryParams,
  AgentRolesListResponse,
} from "@/types/admin/manage/agent-roles/agent-roles-list.types";

export const agentRolesListService = {
  async getAgentRoles(
    params: AgentRolesListQueryParams,
  ): Promise<AgentRolesListResponse> {
    const response = await serviceClient.get<AgentRolesListResponse>(
      "/agents/agent-roles",
      {
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 10,
        },
      },
    );

    return response.data;
  },
};
