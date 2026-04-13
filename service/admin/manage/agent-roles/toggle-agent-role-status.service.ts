import { serviceClient } from "@/service/base/axios.client";
import type {
  ToggleAgentRoleStatusPayload,
  ToggleAgentRoleStatusResponse,
} from "@/types/admin/manage/agent-roles/toggle-agent-role-status.types";

export const toggleAgentRoleStatusService = {
  async toggleAgentRoleStatus(
    agentRoleId: string,
    payload: ToggleAgentRoleStatusPayload,
  ): Promise<ToggleAgentRoleStatusResponse> {
    const response = await serviceClient.patch<ToggleAgentRoleStatusResponse>(
      `/agents/agent-roles/${agentRoleId}/status`,
      payload,
    );

    return response.data;
  },
};
