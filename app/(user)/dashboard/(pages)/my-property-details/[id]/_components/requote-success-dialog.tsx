// _components/dialogs/RequoteSuccessDialog.tsx
"use client";

import React from "react";
import { Mail } from "lucide-react";
import Dialog from "@/components/dialogs/dialog";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  amount: number;
  times: number;
};

export default function RequoteSuccessDialog({
  open,
  onOpenChange,
  amount,
  times,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="sm" position="center">
      <div className="space-y-5 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-primary">
          <Mail className="h-8 w-8 text-white" />
        </div>

        <div>
          <p className="text-lg font-extrabold text-gray">Requote Submitted</p>
          <p className="mt-1 text-2xl font-extrabold text-primary">৳ {amount}</p>
          <p className="mt-2 text-sm text-primary">
            It may take up to 1–3 business days for reviewing
          </p>
        </div>

        <div className="flex justify-between text-sm">
          <div>
            <p className="font-bold text-gray">Status</p>
            <span className="rounded-lg bg-secondary px-3 py-1 text-xs text-gray/60">
              Pending Admin Review
            </span>
          </div>

          <div className="text-right">
            <p className="font-bold text-gray">Requoted</p>
            <p className="text-primary font-bold">{times} Times</p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
