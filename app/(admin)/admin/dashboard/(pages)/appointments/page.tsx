"use client";
import AppointmentList from "@/app/(admin)/admin/dashboard/(pages)/appointments/_components/appointment-list";
import AppointmentStatOverview from "@/app/(admin)/admin/dashboard/(pages)/appointments/_components/appointment-stat-overview";
import AppointmentTab from "@/app/(admin)/admin/dashboard/(pages)/appointments/_components/appointment-tab";
import FilterBar from "@/app/(admin)/admin/dashboard/(pages)/appointments/_components/filter-bar";
import ListAndSearch from "@/app/(admin)/admin/dashboard/(pages)/appointments/_components/list-and-search";
import ConfirmAppointmentDialog from "@/app/(admin)/admin/dashboard/(pages)/appointments/_components/schedule-approved-dialog";
import { Appointment } from "@/app/(admin)/admin/types/appointment-types";
import Button from "@/components/buttons/button";
import { useState } from "react";

export type AppointmentTabStatus = "user_site_visit" | "agent_schedules";

const AppointmentsPage = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [tabStatus, setTabStatus] =
    useState<AppointmentTabStatus>("user_site_visit");

  const onApproveSchedule = (row: Appointment) => {
    setSelected(row);
    setOpenConfirm(true);
  };

  const onCloseDialog = () => {
    setOpenConfirm(false);
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button size="base">+ New Appointment</Button>
      </div>

      <AppointmentStatOverview />

      {/* tab , filter, list */}
      <div className="w-full bg-white border border-gray/20 rounded-md py-5">
        <div className="w-full bg-white  rounded-md flex flex-col lg:flex-row justify-center-center justify-between gap-4 px-5 lg:items-center pb-2 lg:pb-0">
          <AppointmentTab tabStatus={tabStatus} setTabStatus={setTabStatus} />
          <ListAndSearch />
        </div>

        {/* filter */}
        <FilterBar />

        {/* list */}
        <AppointmentList tabStatus={tabStatus} onApproveSchedule={onApproveSchedule }/>
      </div>

      <ConfirmAppointmentDialog
        open={openConfirm}
        appointment={selected}
        onClose={onCloseDialog}
      />
    </div>
  );
};

export default AppointmentsPage;
