import { serviceClient } from "@/service/base/axios.client";
import type { AppointmentsSummaryResponse } from "@/types/admin/appointments/appointments-summary.types";

export const appointmentsSummaryService = {
  async getAdminAppointmentsSummary(): Promise<AppointmentsSummaryResponse> {
    const response = await serviceClient.get<AppointmentsSummaryResponse>(
      "/property-services/appointments/summary",
    );

    return response.data;
  },
};
