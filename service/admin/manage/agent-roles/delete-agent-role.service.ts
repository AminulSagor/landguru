import { serviceClient } from "@/service/base/axios.client";
import type { DeleteAgentRoleResponse } from "@/types/admin/manage/agent-roles/delete-agent-role.types";

export const deleteAgentRoleService = {
  async deleteAgentRole(agentRoleId: string): Promise<DeleteAgentRoleResponse> {
    const response = await serviceClient.delete<DeleteAgentRoleResponse>(
      `/agents/agent-roles/${agentRoleId}`,
    );

    return response.data;
  },
};
