import { serviceServer } from "@/service/base/axios.server";
import type {
  AgentDetails,
  AgentDetailsResponse,
} from "@/types/admin/agent-list/details/[id]/agent-details.types";

export const agentDetailsService = {
  async getAdminAgentDetailsServer(agentId: string): Promise<AgentDetails> {
    const response = await serviceServer.get<AgentDetailsResponse>(
      `/agents/admin/${agentId}`,
    );

    return response.data.data;
  },
};