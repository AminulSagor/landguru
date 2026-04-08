import { serviceClient } from "@/service/base/axios.client";
import type {
  ScheduleAppointmentPayload,
  ScheduleAppointmentResponse,
} from "@/types/admin/appointments/schedule-appointment.types";

export const scheduleAppointmentService = {
  async scheduleAdminAppointment(
    requestId: string,
    payload: ScheduleAppointmentPayload,
  ): Promise<ScheduleAppointmentResponse> {
    const response = await serviceClient.post<ScheduleAppointmentResponse>(
      `/sell-posts/appointments/admin/${requestId}/schedule`,
      payload,
    );

    return response.data;
  },
};
