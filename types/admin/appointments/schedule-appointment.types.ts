export interface ScheduleAppointmentPayload {
  title: string;
  date: string;
  time: string;
}

export interface ScheduleAppointmentResponse {
  success: boolean;
  message: string;
  requestId: string;
  scheduledAt: string;
}
