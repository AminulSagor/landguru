import { serviceClient } from "@/service/base/axios.client";
import type {
  UpdateAgentRolePayload,
  UpdateAgentRoleResponse,
} from "@/types/admin/manage/agent-roles/update-agent-role.types";

export const updateAgentRoleService = {
  async updateAgentRole(
    agentRoleId: string,
    payload: UpdateAgentRolePayload,
  ): Promise<UpdateAgentRoleResponse> {
    const response = await serviceClient.patch<UpdateAgentRoleResponse>(
      `/agents/agent-roles/${agentRoleId}`,
      payload,
    );

    return response.data;
  },
};
