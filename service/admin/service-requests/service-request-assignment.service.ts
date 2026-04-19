import { serviceClient } from "@/service/base/axios.client";
import type {
  AssignAgentPayload,
  AssignAgentResponse,
  AvailableAgentsQueryParams,
  AvailableAgentsResponse,
  ServiceRequestActionResponse,
  ServiceRequestFeedbackPayload,
} from "@/types/admin/service-requests/service-request-assignment.types";

export const serviceRequestAssignmentService = {
  async getAvailableAgents(
    params: AvailableAgentsQueryParams,
  ): Promise<AvailableAgentsResponse> {
    const response = await serviceClient.get<AvailableAgentsResponse>(
      "/property-services/available-agents",
      {
        params: {
          sellPostId: params.sellPostId,
          ...(params.filter ? { filter: params.filter } : {}),
          ...(params.page ? { page: params.page } : {}),
          ...(params.limit ? { limit: params.limit } : {}),
        },
      },
    );

    return response.data;
  },

  async assignAgent(payload: AssignAgentPayload): Promise<AssignAgentResponse> {
    const response = await serviceClient.post<AssignAgentResponse>(
      "/property-services/assign",
      payload,
    );

    return response.data;
  },

  async approveSubmittedTask(
    assignmentId: string,
  ): Promise<ServiceRequestActionResponse> {
    const response = await serviceClient.post<ServiceRequestActionResponse>(
      `/property-services/assignment/${assignmentId}/approve`,
    );

    return response.data;
  },

  async requestRevision(
    assignmentId: string,
    payload: ServiceRequestFeedbackPayload,
  ): Promise<ServiceRequestActionResponse> {
    const response = await serviceClient.post<ServiceRequestActionResponse>(
      `/property-services/assignment/${assignmentId}/feedback`,
      payload,
    );

    return response.data;
  },
};
