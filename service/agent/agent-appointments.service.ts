import { serviceClient } from "@/service/base/axios.client";
import type {
  AgentAppointmentDetails,
  AgentAppointmentDetailsResponse,
  AgentAppointmentsQueryParams,
  AgentAppointmentsResponse,
} from "@/types/agent/appointments.types";

export const agentAppointmentsService = {
  async getAppointments(
    params: AgentAppointmentsQueryParams,
  ): Promise<AgentAppointmentsResponse> {
    const response = await serviceClient.get<AgentAppointmentsResponse>("/agents/appointments", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        tab: params.tab ?? "UPCOMING",
      },
    });

    return response.data;
  },

  async getAppointmentDetails(
    assignmentId: string,
  ): Promise<AgentAppointmentDetails | AgentAppointmentDetailsResponse> {
    const response = await serviceClient.get<
      AgentAppointmentDetails | AgentAppointmentDetailsResponse
    >(`/agents/appointments/${assignmentId}`);

    return response.data;
  },
};

export default agentAppointmentsService;
