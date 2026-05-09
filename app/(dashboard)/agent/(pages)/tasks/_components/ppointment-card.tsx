"use client";

import React from "react";
import Card from "@/components/cards/card";

type Appointment = {
  isScheduled: boolean;
  appointmentTitle?: string;
  appointmentDate?: string;
  appointmentTime?: string;
};

type Props = {
  setOpen: (v: boolean) => void;
  appointment?: Appointment | null;
};

export default function AppointmentCard({ setOpen, appointment }: Props) {
  const scheduled = !!appointment?.isScheduled;
  const title = appointment?.appointmentTitle ?? (scheduled ? "Scheduled" : "");
  const date = appointment?.appointmentDate ?? "";
  const time = appointment?.appointmentTime ?? "";

  return (
    <Card className="rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-gray">
          Appointment <span className="text-xs font-semibold text-gray/40">(Optional)</span>
        </h3>
      </div>

      <div className="mt-3 rounded-lg border border-gray/10 bg-white px-4 py-3 flex items-center justify-between">
        <div>
          {scheduled ? (
            <>
              <p className="text-sm font-extrabold text-gray">{title}</p>
              <p className="text-xs font-semibold text-gray/50">{date} {time ? `• ${time}` : ""}</p>
            </>
          ) : (
            <p className="text-sm font-semibold text-gray/70">Not Scheduled</p>
          )}
        </div>

        <button className="text-xs font-bold text-primary hover:opacity-80" onClick={() => setOpen(true)}>
          {scheduled ? "Reschedule" : "Set Date & Time"}
        </button>
      </div>
    </Card>
  );
}
