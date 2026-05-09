import { z } from "zod";

export const appointmentDateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
export const appointmentTimeRegex = /^[0-9]{2}:[0-9]{2}$/;

export const createAppointmentSchema = z.object({
  appointmentTitle: z.string().min(1, "Title is required"),
  appointmentDate: z.string().regex(appointmentDateRegex, "Invalid date, expected YYYY-MM-DD"),
  appointmentTime: z.string().regex(appointmentTimeRegex, "Invalid time, expected HH:MM"),
});

export const rescheduleAppointmentSchema = createAppointmentSchema;

export type CreateAppointmentSchema = z.infer<typeof createAppointmentSchema>;
export type RescheduleAppointmentSchema = z.infer<typeof rescheduleAppointmentSchema>;

export default { createAppointmentSchema, rescheduleAppointmentSchema };
