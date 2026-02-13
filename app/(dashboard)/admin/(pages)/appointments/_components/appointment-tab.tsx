"use client";
import { AppointmentTabStatus } from "@/app/(dashboard)/admin/(pages)/appointments/page";
import { MapPin, UserCog } from "lucide-react";

interface AppointmentTabProps {
  tabStatus: AppointmentTabStatus;
  setTabStatus: (v: AppointmentTabStatus) => void;
}
const AppointmentTab = ({ tabStatus, setTabStatus }: AppointmentTabProps) => {
  return (
    <div className="flex gap-10 items-center">
      <button
        className={`text-sm flex items-center gap-2 py-3 cursor-pointer ${tabStatus === "user_site_visit" ? "border-b-3 border-primary text-primary font-semibold" : "text-gray border-b-3 border-white"}`}
        onClick={() => setTabStatus("user_site_visit")}
      >
        <MapPin size={15} /> <span>User Site Visits</span>
      </button>
      <button
        className={`text-gray text-sm flex items-center gap-2 py-3 cursor-pointer ${tabStatus === "agent_schedules" ? "border-b-3 border-primary text-primary font-semibold" : "text-gray border-b-3 border-white"}`}
        onClick={() => setTabStatus("agent_schedules")}
      >
        <UserCog size={15} /> <span>UAgent Schedules</span>
      </button>
    </div>
  );
};

export default AppointmentTab;
