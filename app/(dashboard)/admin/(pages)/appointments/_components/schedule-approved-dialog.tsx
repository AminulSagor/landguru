"use client";

import Image from "next/image";
import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Calendar, Clock, MapPin, SendHorizontal } from "lucide-react";

import Button from "@/components/buttons/button";
import Dialog from "@/components/dialogs/dialog";
import { cn } from "@/lib/utils";
import { scheduleAppointmentService } from "@/service/admin/appointments/schedule-appointment.service";
import type { SiteVisitRequestItem } from "@/types/admin/appointments/site-visit-requests.types";

const IMAGE_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" fill="#E5E7EB"/><circle cx="80" cy="58" r="26" fill="#CBD5E1"/><rect x="34" y="98" width="92" height="36" rx="18" fill="#CBD5E1"/></svg>`,
  );

export default function ConfirmAppointmentDialog({
  open,
  appointment,
  onClose,
}: {
  open: boolean;
  appointment: SiteVisitRequestItem | null;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");

  const requestId = appointment?.requestId ?? "";
  const isReschedule = Boolean(
    appointment?.scheduledAt || appointment?.scheduledTitle?.trim(),
  );

  const propertyTitle = useMemo(() => {
    if (!appointment) return "";
    return appointment.property.title || "Property";
  }, [appointment]);

  useEffect(() => {
    if (!appointment || !open) {
      return;
    }

    setDate(formatDateForInput(appointment.scheduledAt));
    setTime(formatTimeForInput(appointment.scheduledAt));
    setTitle(
      appointment.scheduledTitle?.trim() ||
        `Site Visit with ${appointment.buyer.name}`,
    );
  }, [appointment, open]);

  const scheduleMutation = useMutation({
    mutationFn: () => {
      if (!requestId) {
        throw new Error("Request id is missing.");
      }

      const normalizedTitle = title.trim();
      const normalizedDate = date.trim();
      const normalizedTime = normalizeScheduleTime(time);

      if (!normalizedTitle) {
        throw new Error("Please enter a scheduling title.");
      }

      if (!normalizedDate) {
        throw new Error("Please select a date.");
      }

      if (!normalizedTime) {
        throw new Error("Please select a valid time.");
      }

      return scheduleAppointmentService.scheduleAdminAppointment(requestId, {
        title: normalizedTitle,
        date: normalizedDate,
        time: normalizedTime,
      });
    },
    onSuccess: async (response) => {
      toast.success(
        response.message ||
          (isReschedule
            ? "Appointment rescheduled successfully."
            : "Appointment scheduled successfully."),
      );

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-site-visit-requests"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-agent-schedules-list"] }),
        queryClient.invalidateQueries({ queryKey: ["appointments-summary"] }),
      ]);

      onClose();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  if (!appointment) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value && !scheduleMutation.isPending) {
          onClose();
        }
      }}
      size="lg"
      className="overflow-hidden"
    >
      <div className="flex items-start gap-3 pr-10">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-secondary/60 text-primary-color">
          <Calendar className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-black">
            {isReschedule ? "Reschedule Appointment" : "Confirm Appointment"} for{" "}
            {requestId}
          </h3>
        </div>
      </div>

      <div className="-mx-5 mt-4 border-t border-gray/15" />

      <div className="mt-5 space-y-6">
        <section>
          <p className="text-xs font-semibold tracking-wide text-gray">
            PARTICIPANTS
          </p>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ParticipantCard
              image={appointment.buyer.photoUrl}
              name={appointment.buyer.name}
              phone={appointment.buyer.phone}
              role="BUYER"
            />
            <ParticipantCard
              image={appointment.owner.photoUrl}
              name={appointment.owner.name}
              phone={appointment.owner.phone}
              role="OWNER"
            />
          </div>
        </section>

        <section>
          <p className="text-xs font-semibold tracking-wide text-gray">
            PROPERTY CONTEXT
          </p>

          <div className="mt-3 rounded-xl border border-gray/15 bg-white p-4">
            <div className="flex items-start gap-3">
              <AvatarImage
                src={appointment.property.image}
                alt={appointment.property.title}
                containerClassName="relative h-14 w-14 overflow-hidden rounded-lg border border-gray/15 bg-secondary"
                imageClassName="object-cover"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-black">
                  {propertyTitle}
                </p>
                <p className="mt-1 text-xs text-gray">
                  {appointment.property.id}
                </p>

                <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-primary-color">
                  <MapPin className="h-4 w-4" />
                  {appointment.property.location}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <p className="text-xs font-semibold tracking-wide text-gray">
            SCHEDULING
          </p>

          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <LabeledField label="Date">
              <PickerField
                type="date"
                icon={<Calendar className="h-4 w-4 text-gray" />}
                value={date}
                displayValue={formatDateDisplay(date)}
                onChange={setDate}
                placeholder="Select date"
              />
            </LabeledField>

            <LabeledField label="Time">
              <PickerField
                type="time"
                icon={<Clock className="h-4 w-4 text-gray" />}
                value={time}
                displayValue={formatTimeDisplay(time)}
                onChange={setTime}
                placeholder="Select time"
              />
            </LabeledField>
          </div>
        </section>

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
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Site Visit"
              className="h-11 w-full rounded-xl border border-[#CBD5E1] bg-white px-4 text-sm font-medium text-black outline-none placeholder:text-[#94A3B8] focus:border-[#CBD5E1]"
            />
          </div>
        </section>
      </div>

      <div className="-mx-5 mt-6 border-t border-gray/15" />
      <div className="-mx-5 -mb-5 mt-0 flex items-center justify-between bg-secondary/25 px-5 py-4">
        <button
          type="button"
          onClick={onClose}
          disabled={scheduleMutation.isPending}
          className="text-sm font-semibold text-primary-color hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>

        <Button size="base" onClick={() => scheduleMutation.mutate()}>
          <span className="inline-flex items-center gap-2">
            <SendHorizontal className="h-4 w-4" />
            {scheduleMutation.isPending
              ? isReschedule
                ? "Rescheduling..."
                : "Sending..."
              : isReschedule
                ? "Reschedule Appointment"
                : "Send Appointment to All Parties"}
          </span>
        </Button>
      </div>
    </Dialog>
  );
}

function ParticipantCard({
  image,
  name,
  phone,
  role,
}: {
  image: string | null;
  name: string;
  phone: string;
  role: "BUYER" | "OWNER";
}) {
  return (
    <div className="rounded-xl border border-gray/15 bg-secondary/20 p-3">
      <div className="flex items-center gap-3">
        <AvatarImage
          src={image}
          alt={name}
          containerClassName="relative h-9 w-9 overflow-hidden rounded-full border border-gray/15 bg-white"
          imageClassName="object-cover"
        />

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
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-black">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function PickerField({
  type,
  icon,
  value,
  displayValue,
  onChange,
  placeholder,
}: {
  type: "date" | "time";
  icon: ReactNode;
  value: string;
  displayValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = () => {
    const input = inputRef.current as (HTMLInputElement & {
      showPicker?: () => void;
    }) | null;

    if (!input) {
      return;
    }

    if (typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }

    input.focus();
    input.click();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPicker();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openPicker}
      onKeyDown={handleKeyDown}
      className="relative flex h-11 items-center gap-3 rounded-xl border border-[#CBD5E1] bg-white px-4 outline-none transition focus-within:border-[#CBD5E1]"
    >
      <div className="grid h-5 w-5 shrink-0 place-items-center">{icon}</div>

      <span
        className={cn(
          "text-sm font-medium",
          displayValue ? "text-[#94A3B8]" : "text-[#94A3B8]",
        )}
      >
        {displayValue || placeholder}
      </span>

      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="pointer-events-none absolute inset-0 opacity-0"
        tabIndex={-1}
      />
    </div>
  );
}

function AvatarImage({
  src,
  alt,
  containerClassName,
  imageClassName,
}: {
  src: string | null;
  alt: string;
  containerClassName: string;
  imageClassName?: string;
}) {
  const [imageSrc, setImageSrc] = useState(src || IMAGE_FALLBACK);

  useEffect(() => {
    setImageSrc(src || IMAGE_FALLBACK);
  }, [src]);

  return (
    <div className={containerClassName}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={imageClassName}
        unoptimized={imageSrc.startsWith("data:")}
        onError={() => {
          if (imageSrc !== IMAGE_FALLBACK) {
            setImageSrc(IMAGE_FALLBACK);
          }
        }}
      />
    </div>
  );
}

function formatDateForInput(value: string | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatTimeForInput(value: string | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");

  return `${hours}:${minutes}`;
}

function formatDateDisplay(value: string) {
  if (!value) {
    return "";
  }

  const [year, month, day] = value.split("-");

  if (!year || !month || !day) {
    return value;
  }

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const monthLabel = date.toLocaleString("en-US", { month: "short" });

  return `${day}-${monthLabel}-${year}`;
}

function formatTimeDisplay(value: string) {
  if (!value) {
    return "";
  }

  const [hourText, minuteText] = value.split(":");
  const hours = Number(hourText);
  const minutes = Number(minuteText);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return value;
  }

  const suffix = hours >= 12 ? "PM" : "AM";
  const twelveHour = hours % 12 || 12;

  return `${`${twelveHour}`.padStart(2, "0")}:${`${minutes}`.padStart(2, "0")} ${suffix}`;
}

function normalizeScheduleTime(value: string) {
  const normalized = value.trim().toUpperCase();

  if (!normalized) {
    return null;
  }

  const twelveHourMatch = normalized.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/);

  if (twelveHourMatch) {
    const hours = Number(twelveHourMatch[1]);
    const minutes = Number(twelveHourMatch[2]);

    if (hours >= 1 && hours <= 12 && minutes >= 0 && minutes <= 59) {
      return `${hours}:${`${minutes}`.padStart(2, "0")} ${twelveHourMatch[3]}`;
    }
  }

  const twentyFourHourMatch = normalized.match(/^(\d{1,2}):(\d{2})$/);

  if (twentyFourHourMatch) {
    const hours = Number(twentyFourHourMatch[1]);
    const minutes = Number(twentyFourHourMatch[2]);

    if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      const suffix = hours >= 12 ? "PM" : "AM";
      const twelveHour = hours % 12 || 12;

      return `${twelveHour}:${`${minutes}`.padStart(2, "0")} ${suffix}`;
    }
  }

  return null;
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

  return "Something went wrong while scheduling the appointment.";
}
