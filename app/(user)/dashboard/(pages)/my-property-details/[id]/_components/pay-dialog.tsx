// _components/dialogs/PayDialog.tsx
"use client";

import React from "react";
import Button from "@/components/buttons/button";
import Dialog from "@/components/dialogs/dialog";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  total: number;
  onPay: (v: boolean) => void;
};

export default function PayDialog({ open, onOpenChange, total, onPay }: Props) {
  const [method, setMethod] = React.useState<"ssl" | "mobile">("ssl");

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="md" position="center">
      <div className="space-y-5">
        <h3 className="text-lg font-extrabold text-gray">
          Pay & Activate Post
        </h3>

        <div className="rounded-xl bg-primary/5 p-4 text-center">
          <p className="text-sm font-bold text-gray">Total Payable</p>
          <p className="mt-1 text-2xl font-extrabold text-primary">৳ {total}</p>
        </div>

        <div>
          <p className="text-sm font-bold text-gray">Choose Payment Method</p>

          <div className="mt-3 space-y-3">
            <button
              onClick={() => setMethod("ssl")}
              className={`w-full rounded-xl border p-4 text-left ${
                method === "ssl"
                  ? "border-primary bg-primary/5"
                  : "border-gray/20 bg-white"
              }`}
            >
              <p className="font-bold text-gray">SSL Commerz</p>
              <p className="text-xs text-gray/50">
                All payment methods in one place
              </p>
            </button>

            <button
              onClick={() => setMethod("mobile")}
              className={`w-full rounded-xl border p-4 text-left ${
                method === "mobile"
                  ? "border-primary bg-primary/5"
                  : "border-gray/20 bg-white"
              }`}
            >
              <p className="font-bold text-gray">Mobile Banking</p>
              <p className="text-xs text-gray/50">Bkash, Nagad, Rocket</p>
            </button>
          </div>
        </div>

        <Button
          className=" w-full rounded-xl"
          onClick={() => {
            onOpenChange(false);
            onPay(true);
          }}
        >
          Pay
        </Button>

        <div className="flex justify-between text-xs text-gray/40">
          <span className="rounded-md bg-[#ffe9ea] px-2 py-1 text-[#d13b3b] font-bold">
            Quoted
          </span>
          <span>Quotation Revised: 0 times</span>
        </div>
      </div>
    </Dialog>
  );
}
