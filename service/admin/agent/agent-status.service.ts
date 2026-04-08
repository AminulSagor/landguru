import { serviceClient } from "@/service/base/axios.client";
import {
  UpdateAgentStatusPayload,
  UpdateAgentStatusResponse,
} from "@/types/admin/agent-list/agent-status.types";

export const agentStatusService = {
  async updateAdminAgentStatus(
    agentId: string,
    payload: UpdateAgentStatusPayload,
  ): Promise<UpdateAgentStatusResponse> {
    const response = await serviceClient.patch<UpdateAgentStatusResponse>(
      `/agents/admin/${agentId}/status`,
      payload,
    );

    return response.data;
  },
};