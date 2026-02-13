"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Dialog from "@/components/dialogs/dialog";
import Button from "@/components/buttons/button";
import { HookFormTextInput } from "@/components/inputs/text-input";

type FormValues = {
  title: string;
  date: Date | null;
  time: string;
};

export default function AppointmentDateTimeDialog({
  open,
  onOpenChange,
  setScheduleFixedDialog
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  setScheduleFixedDialog : (v:boolean)=>void
}) {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: "Site Visit",
      date: new Date("2026-01-12"),
      time: "10:00 AM",
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange} position="top" size="sm">
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          onOpenChange(false);
        })}
        className=""
      >
        <div className="pr-10">
          <h3 className="text-lg font-extrabold text-gray">
            Set Appointment Date &amp; Time
          </h3>
          <p className="mt-2 text-sm font-semibold text-gray/50">
            Once you update the status, you won&apos;t be able to change date
            and time later on.
          </p>
        </div>

        <div className="mt-6 space-y-5">
          <HookFormTextInput
            name="title"
            control={control}
            label="Title"
            rules={{ required: "Title is required" }}
          />

          <div>
            <p>Date *</p>
            <input type="text" className="w-full border outline-none border-gray/30 px-4 rounded-lg py-2" />
          </div>

          <HookFormTextInput
            name="time"
            control={control}
            label="Time"
            rules={{ required: "Time is required" }}
            placeholder="10:00 AM"
          />
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            size="md"
            className="w-full"
            onClick={()=>setScheduleFixedDialog(true)}
          >
            Set Date &amp; Time
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
