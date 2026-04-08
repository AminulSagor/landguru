"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Card from "@/components/cards/card";
import { appointmentsSummaryService } from "@/service/admin/appointments/appointments-summary.service";

const AppointmentStatOverview = () => {
  const lastErrorMessageRef = React.useRef<string | null>(null);

  const summaryQuery = useQuery({
    queryKey: ["appointments-summary"],
    queryFn: () => appointmentsSummaryService.getAdminAppointmentsSummary(),
  });

  React.useEffect(() => {
    if (!summaryQuery.error) {
      lastErrorMessageRef.current = null;
      return;
    }

    const message = getErrorMessage(summaryQuery.error);

    if (lastErrorMessageRef.current !== message) {
      toast.error(message);
      lastErrorMessageRef.current = message;
    }
  }, [summaryQuery.error]);

  const summary = summaryQuery.data?.data;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Pending Requests"
        value={summary?.pendingRequests ?? 0}
        badgeText={summaryQuery.isFetching ? "Refreshing" : "live"}
        badgeColor="bg-red-100 text-red-500"
        valueColor="text-red-500"
      />
      <StatCard
        title="Scheduled Today"
        value={summary?.scheduledToday ?? 0}
        badgeText={summaryQuery.isFetching ? "Refreshing" : "live"}
        badgeColor="bg-blue-100 text-blue-500"
        valueColor="text-blue-500"
      />
      <StatCard title="Agent Service Visits" value={summary?.agentServiceVisits ?? 0} />
      <StatCard title="Buyer Site Visits" value={summary?.buyerSiteVisits ?? 0} />
    </div>
  );
};

export default AppointmentStatOverview;

interface StatCardProps {
  title: string;
  value: number;
  valueColor?: string;
  badgeText?: string;
  badgeColor?: string;
}

function StatCard({
  title,
  value,
  valueColor,
  badgeText,
  badgeColor,
}: StatCardProps) {
  return (
    <Card>
      <h2 className="text-base text-gray">{title}</h2>
      <div className="mt-2 flex items-end gap-2">
        <h1 className={`text-3xl font-bold ${valueColor ?? "text-black"}`}>
          {value}
        </h1>
        {badgeText ? (
          <p className={`rounded-full px-2 py-1 text-xs ${badgeColor ?? ""}`}>
            {badgeText}
          </p>
        ) : null}
      </div>
    </Card>
  );
}

function getErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response
  ) {
    const responseData = (error.response as { data?: { message?: string } }).data;

    if (typeof responseData?.message === "string" && responseData.message) {
      return responseData.message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong while loading appointment summary.";
}
