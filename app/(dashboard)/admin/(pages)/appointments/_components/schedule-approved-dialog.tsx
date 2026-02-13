"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Dialog from "@/components/dialogs/dialog";
import Button from "@/components/buttons/button";
import type { Appointment } from "@/app/(dashboard)/admin/types/appointment-types";
import { Calendar, Clock, MapPin, SendHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ConfirmAppointmentDialog({
  open,
  appointment,
  onClose,
}: {
  open: boolean;
  appointment: Appointment | null;
  onClose: () => void;
}) {
  const [date, setDate] = useState("20-Jan-2026");
  const [time, setTime] = useState("02:30 PM");
  const [title, setTitle] = useState("");

  console.log(appointment);

  const postId = appointment?.property.id ?? "";

  const propertyTitle = useMemo(() => {
    if (!appointment) return "";
    return appointment.property.name || "Property";
  }, [appointment]);

  if (!appointment) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
      size="lg"
      className="overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-start gap-3 pr-10">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-secondary/60 text-primary-color">
          <Calendar className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-black">
            Confirm Appointment for {postId}
          </h3>
        </div>
      </div>

      <div className="-mx-5 mt-4 border-t border-gray/15" />

      {/* Body */}
      <div className="mt-5 space-y-6">
        {/* Participants */}
        <section>
          <p className="text-xs font-semibold tracking-wide text-gray">
            PARTICIPANTS
          </p>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ParticipantCard
              image={appointment.buyer.image}
              name={appointment.buyer.name}
              phone={appointment.buyer.phoneNumber}
              role="BUYER"
            />
            <ParticipantCard
              image={appointment.owner.image}
              name={appointment.owner.name}
              phone={appointment.owner.phoneNumber}
              role="OWNER"
            />
          </div>
        </section>

        {/* Property context */}
        <section>
          <p className="text-xs font-semibold tracking-wide text-gray">
            PROPERTY CONTEXT
          </p>

          <div className="mt-3 rounded-xl border border-gray/15 bg-white p-4">
            <div className="flex items-start gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-gray/15 bg-secondary">
                <Image
                  src={appointment.property.image}
                  alt={appointment.property.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-black">
                  {propertyTitle}
                </p>
                <p className="mt-1 text-xs text-gray">
                  {appointment.property.id}
                </p>

                <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-primary-color">
                  <MapPin className="h-4 w-4" />
                  Dhaka, Bangladesh
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scheduling */}
        <section>
          <p className="text-xs font-semibold tracking-wide text-gray">
            SCHEDULING
          </p>

          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <LabeledField label="Date">
              <InputLike
                icon={<Calendar className="h-4 w-4 text-gray" />}
                value={date}
                onChange={setDate}
                placeholder="Select date"
              />
            </LabeledField>

            <LabeledField label="Time">
              <InputLike
                icon={<Clock className="h-4 w-4 text-gray" />}
                value={time}
                onChange={setTime}
                placeholder="Select time"
              />
            </LabeledField>
          </div>
        </section>

        {/* Scheduling title */}
        <section>
          <p className="text-xs font-semibold tracking-wide text-gray">
            SCHEDULING TITLE
          </p>

          <p className="mt-2 text-sm text-gray">
            Enter a title for this schedule
          </p>

          <div className="mt-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Site Visit"
              className="h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm font-semibold text-black outline-none placeholder:text-gray/60 focus:border-gray/25"
            />
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="-mx-5 mt-6 border-t border-gray/15" />
      <div className="-mx-5 -mb-5 mt-0 flex items-center justify-between bg-secondary/25 px-5 py-4">
        <button
          type="button"
          onClick={onClose}
          className="text-sm font-semibold text-primary-color hover:opacity-90"
        >
          Cancel
        </button>

        <Button size="base">
          <span className="inline-flex items-center gap-2">
            <SendHorizontal className="h-4 w-4" />
            Send Appointment to All Parties
          </span>
        </Button>
      </div>
    </Dialog>
  );
}

/* =======================
   UI bits
======================= */

function ParticipantCard({
  image,
  name,
  phone,
  role,
}: {
  image: string;
  name: string;
  phone: string;
  role: "BUYER" | "OWNER";
}) {
  return (
    <div className="rounded-xl border border-gray/15 bg-secondary/20 p-3">
      <div className="flex items-center gap-3">
        <div className="relative h-9 w-9 overflow-hidden rounded-full border border-gray/15 bg-white">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-black">{name}</p>
          <p className="text-xs text-gray">{phone}</p>
          <p className="mt-1 text-xs font-semibold tracking-wide text-gray">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}

function LabeledField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-black">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function InputLike({
  icon,
  value,
  onChange,
  placeholder,
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex h-11 items-center gap-3 rounded-xl border border-gray/15 bg-white px-3">
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-white">
        {icon}
      </div>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full bg-transparent text-sm font-semibold text-gray outline-none placeholder:text-gray/60",
        )}
      />
    </div>
  );
}
