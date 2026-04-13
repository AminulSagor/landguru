import { serviceClient } from "@/service/base/axios.client";
import type {
  CreateAgentRolePayload,
  CreateAgentRoleResponse,
} from "@/types/admin/manage/agent-roles/create-agent-role.types";

export const createAgentRoleService = {
  async createAgentRole(
    payload: CreateAgentRolePayload,
  ): Promise<CreateAgentRoleResponse> {
    const response = await serviceClient.post<CreateAgentRoleResponse>(
      "/agents/agent-roles",
      payload,
    );

    return response.data;
  },
};
