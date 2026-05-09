"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Dialog from "@/components/dialogs/dialog";
import Button from "@/components/buttons/button";
import { HookFormTextInput } from "@/components/inputs/text-input";
import agentTaskService from "@/service/agent/agent-task.service";
import { createAppointmentSchema, rescheduleAppointmentSchema } from "@/schemas/agents/appointment.schema";

type FormValues = {
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. 10:00 AM
};

function formatDateToYMD(d: Date) {
  const year = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

function parseTimeTo24(t?: string) {
  if (!t) return "";
  const parts = t.trim().split(" ");
  if (parts.length === 2) {
    const [timePart, ampm] = parts;
    const [hhStr, mmStr] = timePart.split(":");
    let hh = Number.parseInt(hhStr || "0", 10) || 0;
    const mm = (mmStr || "0").padStart(2, "0");
    const upper = ampm.toUpperCase();
    if (upper === "PM" && hh !== 12) hh += 12;
    if (upper === "AM" && hh === 12) hh = 0;
    return `${String(hh).padStart(2, "0")}:${mm}`;
  }
  // assume already HH:MM
  return t;
}

export default function AppointmentDateTimeDialog({
  open,
  onOpenChange,
  setScheduleFixedDialog,
  assignmentId,
  isReschedule = false,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  setScheduleFixedDialog: (v: boolean) => void;
  assignmentId?: string;
  isReschedule?: boolean;
  onSuccess?: (resp: any) => void;
}) {
  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      title: "Site Visit",
      date: formatDateToYMD(new Date("2026-01-12")),
      time: "10:00 AM",
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    if (!assignmentId) return;
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        appointmentTitle: data.title,
        appointmentDate: data.date,
        appointmentTime: parseTimeTo24(data.time),
      };

      const schema = isReschedule ? rescheduleAppointmentSchema : createAppointmentSchema;
      const parsed = schema.safeParse(payload);
      if (!parsed.success) {
        setError(parsed.error.errors.map((e) => e.message).join(", "));
        setSubmitting(false);
        return;
      }

      if (isReschedule) {
        const resp = await agentTaskService.rescheduleAppointment(assignmentId, parsed.data);
        if (onSuccess) onSuccess(resp);
      } else {
        const resp = await agentTaskService.createAppointment(assignmentId, parsed.data);
        if (onSuccess) onSuccess(resp);
      }

      onOpenChange(false);
      setScheduleFixedDialog(true);
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Failed to set appointment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} position="top" size="sm">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="pr-10">
          <h3 className="text-lg font-extrabold text-gray">Set Appointment Date &amp; Time</h3>
          <p className="mt-2 text-sm font-semibold text-gray/50">
            Once you update the status, you won&apos;t be able to change date and time later on.
          </p>
        </div>

        <div className="mt-6 space-y-5">
          <HookFormTextInput name="title" control={control} label="Title" rules={{ required: "Title is required" }} />

          <div>
            <p>Date *</p>
            <input {...register("date")} type="date" className="w-full border outline-none border-gray/30 px-4 rounded-lg py-2" />
          </div>

          <HookFormTextInput name="time" control={control} label="Time" rules={{ required: "Time is required" }} placeholder="10:00 AM" />
        </div>

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        <div className="mt-6">
          <Button type="submit" size="md" className="w-full" disabled={submitting}>
            {submitting ? "Setting..." : "Set Date &amp; Time"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
