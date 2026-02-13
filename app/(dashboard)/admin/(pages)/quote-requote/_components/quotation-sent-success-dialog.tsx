// app/(admin)/admin/dashboard/(pages)/quote-requote/_components/quotation-sent-success-dialog.tsx
"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Dialog from "@/components/dialogs/dialog";
import Button from "@/components/buttons/button";

type Props = {
  open: boolean;
  onControl: (v: boolean) => void;

  // you can pass these from your Review dialog after submit
  postId?: string; // "#POST-1044"
  sellerName?: string; // "Mr. Rahman"
  mandatoryFee?: number; // 3000
  optionalFee?: number; // 3000
  currencySymbol?: string; // "৳"
};

function money(sym: string, n: number) {
  return `${sym} ${n.toLocaleString()}`;
}

export default function QuotationSentSuccessDialog({
  open,
  onControl,
  postId = "#POST-1044",
  sellerName = "Mr. Rahman",
  mandatoryFee = 3000,
  optionalFee = 3000,
  currencySymbol = "৳",
}: Props) {
  const total = mandatoryFee + optionalFee;

  return (
    <Dialog
      open={open}
      onOpenChange={onControl}
      size="sm"
      className="text-center"
      position="top"
    >
      {/* icon */}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green/15">
        <Check className="text-green" size={22} />
      </div>

      <p className="mt-4 text-lg font-extrabold">
        Quotation Sent Successfully
      </p>

      <p className="mt-2 text-xs font-semibold text-light-gray">
        Your revised counter-offer has been sent to{" "}
        <span className="font-extrabold text-gray">{sellerName}</span> for Post{" "}
        <span className="font-extrabold text-gray">{postId}</span>.
      </p>

      {/* summary box */}
      <div className="mt-4 rounded-xl border border-gray/15 bg-secondary/40 p-4 text-left">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-light-gray">Mandatory Fee</p>
          <p className="text-xs font-extrabold text-gray tabular-nums">
            {money(currencySymbol, mandatoryFee)}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs font-semibold text-light-gray">Optional Fee</p>
          <p className="text-xs font-extrabold text-gray tabular-nums">
            {money(currencySymbol, optionalFee)}
          </p>
        </div>

        <div className="mt-4 border-t border-gray/15 pt-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-extrabold tracking-wide text-gray">
              TOTAL QUOTE AMOUNT
            </p>
            <p className="text-lg font-extrabold text-primary tabular-nums">
              {money(currencySymbol, total)}
            </p>
          </div>
        </div>
      </div>

      {/* button */}
      <Button
        size="md"
        className="mt-5 w-full"
        onClick={() => onControl(false)}
      >
        Done
      </Button>
    </Dialog>
  );
}
