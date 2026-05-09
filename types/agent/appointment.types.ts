export type CreateAppointmentBody = {
  appointmentTitle: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:MM
};

export type RescheduleAppointmentBody = CreateAppointmentBody;

export default {};
