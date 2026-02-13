"use client";

import AssignedLocationBar from "@/app/(dashboard)/agent/(pages)/dashboard/_components/assigned-location-bar";
import RequiresAcceptingSection from "@/app/(dashboard)/agent/(pages)/dashboard/_components/requires-accepting-section";
import StatsRow from "@/app/(dashboard)/agent/(pages)/dashboard/_components/stat-row";
import TodaysScheduleSection from "@/app/(dashboard)/agent/(pages)/dashboard/_components/todays-schedule-section";
import { mockAgentHome } from "@/app/(dashboard)/agent/dummy-data/moc-agent-home";

export default function AgentHomePage() {
  const data = mockAgentHome;

  return (
    <div className="min-h-screen">
      <div className="space-y-10">
        <AssignedLocationBar location={data.assignedLocation} />

        <StatsRow stats={data.stats} />

        <div className="grid grid-cols-1 gap-6 xl:gap-15 lg:grid-cols-2">
          <RequiresAcceptingSection items={data.requiresAccepting} />
          <TodaysScheduleSection
            dateLabel={data.todayLabel}
            items={data.schedule}
          />
        </div>
      </div>
    </div>
  );
}
