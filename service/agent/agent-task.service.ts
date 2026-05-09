import { serviceClient } from "@/service/base/axios.client";
import { agentTaskDetailsSchema } from "@/schemas/agents/agent-task.schema";
import type { CreateAppointmentBody, RescheduleAppointmentBody } from "@/types/agent/appointment.types";

export const agentTaskService = {
  async getTaskDetails(assignmentId: string) {
    const res = await serviceClient.get(`/agents/agent-task/${assignmentId}`);
    const payload = res.data;
    const parsed = agentTaskDetailsSchema.safeParse(payload);
    return parsed.success ? parsed.data : payload;
  },

  async acceptTask(assignmentId: string) {
    const res = await serviceClient.patch(`/agents/agent-task/${assignmentId}/accept`);
    return res.data;
  },

  async addWorkLog(assignmentId: string, body: { remark?: string; fileUrls?: string[] }) {
    const res = await serviceClient.post(`/agents/agent-task/${assignmentId}/work-log`, body);
    return res.data;
  },

  async getWorkLog(assignmentId: string) {
    const res = await serviceClient.get(`/agents/agent-task/${assignmentId}/work-log`);
    return res.data;
  },

  async createAppointment(assignmentId: string, body: CreateAppointmentBody) {
    const res = await serviceClient.post(`/agents/agent-task/${assignmentId}/appointment`, body);
    return res.data;
  },

  async rescheduleAppointment(assignmentId: string, body: RescheduleAppointmentBody) {
    const res = await serviceClient.post(`/agents/agent-task/${assignmentId}/appointment/reschedule`, body);
    return res.data;
  },

  async submitReview(assignmentId: string, body: { rating: number; comment?: string }) {
    const res = await serviceClient.post(`/agents/agent-task/${assignmentId}/submit-review`, body);
    return res.data;
  },
};

export default agentTaskService;
