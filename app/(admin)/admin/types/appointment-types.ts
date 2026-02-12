export type Status = "pending_scheduling" | "confirmed";
export type ScheduleStatus = "scheduled" | "visited";

export interface Appointment {
  id: string;
  requestedAt: string;

  property: {
    image: string;
    name: string;
    id: string;
  };

  buyer: {
    image: string;
    name: string;
    phoneNumber: string;
  };

  owner: {
    image: string;
    name: string;
    phoneNumber: string;
  };

  status: Status;
}

export interface AgentSchedule {
  id: string;
  scheduledAt: string;

  property: {
    image: string;
    name: string;
    id: string;
  };

  service: {
    icon: string;
    name: string;
    id: string;
  };
  agent: {
    image: string;
    name: string;
    phoneNumber: string;
  };

  status: ScheduleStatus;
}
