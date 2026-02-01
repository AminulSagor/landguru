// _components/dialogs/RequoteSubmittedDialog.tsx
"use client";

import React from "react";
import Dialog from "@/components/dialogs/dialog";
import { Mail, ArrowRight } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;

  title: string; // "Villa in Kurigram"
  amount: number; // 4000
  times: number; // 1
  statusText?: string; // "Pending Admin Review"
};

export default function RequoteSubmittedDialog({
  open,
  onOpenChange,
  title,
  amount,
  times,
  statusText = "Pending Admin Review",
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="sm" position="top">
      <div className="space-y-6">
        {/* Top title (left like ss) */}
        <div className="flex items-start justify-between">
          <p className="text-lg font-extrabold text-gray">{title}</p>
          {/* X is already in your Dialog component */}
        </div>

        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative flex h-20 w-24 items-center justify-center rounded-xl bg-primary">
            <Mail className="h-9 w-9 text-white" />
            <span className="absolute -right-2 -bottom-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white">
              <ArrowRight className="h-5 w-5 text-primary" />
            </span>
          </div>
        </div>

        {/* Center text */}
        <div className="text-center">
          <p className="text-lg font-extrabold text-gray">Requote Submitted</p>
          <p className="mt-2 text-3xl font-extrabold text-primary">
            ৳ {amount.toLocaleString()}
          </p>

          <p className="mt-3 text-sm text-primary">
            It may take up to 1-3 business days for reviewing
          </p>
        </div>

        {/* Bottom row */}
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-extrabold text-gray">Status</p>
            <span className="mt-2 inline-flex rounded-lg bg-secondary px-3 py-2 text-xs font-semibold text-gray/45">
              {statusText}
            </span>
          </div>

          <div className="text-right">
            <p className="text-sm font-extrabold text-gray">Requoted</p>
            <p className="mt-2 text-lg font-extrabold text-primary">
              {times} Times
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
