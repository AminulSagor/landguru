"use client";

import { AppointmentTabStatus } from "@/app/(dashboard)/admin/(pages)/appointments/page";
import { MapPin, UserCog } from "lucide-react";

interface AppointmentTabProps {
  tabStatus: AppointmentTabStatus;
  setTabStatus: (v: AppointmentTabStatus) => void;
}

const AppointmentTab = ({ tabStatus, setTabStatus }: AppointmentTabProps) => {
  return (
    <div className="flex items-center gap-10">
      <button
        className={`flex cursor-pointer items-center gap-2 py-3 text-sm ${tabStatus === "user_site_visit" ? "border-b-3 border-primary font-semibold text-primary" : "border-b-3 border-white text-gray"}`}
        onClick={() => setTabStatus("user_site_visit")}
      >
        <MapPin size={15} /> <span>User Site Visits</span>
      </button>
      <button
        className={`flex cursor-pointer items-center gap-2 py-3 text-sm ${tabStatus === "agent_schedules" ? "border-b-3 border-primary font-semibold text-primary" : "border-b-3 border-white text-gray"}`}
        onClick={() => setTabStatus("agent_schedules")}
      >
        <UserCog size={15} /> <span>Agent Schedules</span>
      </button>
    </div>
  );
};

export default AppointmentTab;
