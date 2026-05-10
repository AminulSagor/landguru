"use client";

import React, { useEffect, useState } from "react";
import AssignedLocationBar from "@/app/(dashboard)/agent/(pages)/dashboard/_components/assigned-location-bar";
import RequiresAcceptingSection from "@/app/(dashboard)/agent/(pages)/dashboard/_components/requires-accepting-section";
import StatsRow from "@/app/(dashboard)/agent/(pages)/dashboard/_components/stat-row";
import TodaysScheduleSection from "@/app/(dashboard)/agent/(pages)/dashboard/_components/todays-schedule-section";
import { RequestItem, ScheduleItem, StatItem } from "@/app/(dashboard)/agent/dummy-data/moc-agent-home";
import agentDashboardService from "@/service/agent/agent-dashboard.service";

export default function AgentHomePage() {
  const [assignedLocation, setAssignedLocation] = useState<string>("");
  const [stats, setStats] = useState<StatItem[]>([]);
  const [requiresAccepting, setRequiresAccepting] = useState<RequestItem[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [location, statsRes, tasksRes, scheduleRes] = await Promise.all([
          agentDashboardService.getAssignedLocation(),
          agentDashboardService.getStats(),
          agentDashboardService.getAgentTasks("NEW", 5),
          agentDashboardService.getTodaySchedule(),
        ]);

        if (!mounted) return;

        if (location) setAssignedLocation(location);
        if (Array.isArray(statsRes) && statsRes.length) setStats(statsRes as StatItem[]);
        if (tasksRes && Array.isArray(tasksRes.items)) setRequiresAccepting(tasksRes.items as RequestItem[]);
        if (Array.isArray(scheduleRes) && scheduleRes.length) setSchedule(scheduleRes as ScheduleItem[]);
      } catch (err) {
        console.error("Failed to load agent dashboard data", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const todayLabel = new Date().toLocaleString("en-US", { month: "short" }).toUpperCase() + " " + new Date().getDate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm font-semibold text-gray">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="space-y-10">
        <AssignedLocationBar location={assignedLocation} />

        <StatsRow stats={stats} />

        <div className="grid grid-cols-1 gap-6 xl:gap-15 lg:grid-cols-2">
          <RequiresAcceptingSection items={requiresAccepting} />
          <TodaysScheduleSection dateLabel={todayLabel} items={schedule} />
        </div>
      </div>
    </div>
  );
}
