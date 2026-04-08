import { serviceClient } from "@/service/base/axios.client";
import type { AgentSummaryResponse } from "@/types/admin/agent-list/agent-list.types";

export const agentSummaryService = {
  async getAdminAgentSummary(): Promise<AgentSummaryResponse> {
    const response = await serviceClient.get<AgentSummaryResponse>(
      "/agents/admin/summary",
    );

    return response.data;
  },
};