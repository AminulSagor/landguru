"use client";

import Dialog from "@/components/dialogs/dialog";
import { Check } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;

  serviceType?: string;
  title?: string;
  refId?: string;

  onGoToAppointments?: () => void;
};

export default function ScheduleFixedDialog({
  open,
  onOpenChange,
  serviceType = "SERVICE TYPE",
  title = "Ownership history validation",
  refId = "#SERV892-POST-1042",
  onGoToAppointments,
}: Props) {
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} position="top" size="sm">
      <div className="text-center">
        {/* icon badge */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green">
          <Check className="text-white" size={34} strokeWidth={3} />
        </div>

        <h3 className="mt-4 text-sm font-extrabold text-gray">
          Schedule Fixed
        </h3>

        <p className="mt-2 text-xs font-semibold text-gray/50">
          You can view your all appointments in{" "}
          <button
            type="button"
            onClick={onGoToAppointments}
            className="font-bold text-primary hover:opacity-80"
          >
            Appointment Section
          </button>
        </p>

        {/* details card */}
        <div className="mt-5 rounded-xl border border-gray/15 bg-white px-4 py-3 text-left">
          <p className="text-[10px] font-extrabold tracking-wide text-gray/40">
            {serviceType}
          </p>
          <p className="mt-1 text-sm font-extrabold text-gray">{title}</p>
          <p className="mt-1 text-[11px] font-semibold text-gray/50">{refId}</p>
        </div>
      </div>
    </Dialog>
  );
}
