// _components/dialogs/PaySuccessDialog.tsx
"use client";

import React from "react";
import Dialog from "@/components/dialogs/dialog";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;

  amount: number; // 6000
  title: string; // "Villa in Kurigram"
  priceText: string; // "৳ 40,00,000"
  tagText?: string; // "Flat"
  image: string; // "/images/..."
  statusText?: string; // "Pending Admin Review"
};

export default function PaySuccessDialog({
  open,
  onOpenChange,
  amount,
  title,
  priceText,
  tagText = "Flat",
  image,
  statusText = "Pending Admin Review",
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="sm" position="top" className="px-8">
      <div className="space-y-6 text-center">
        {/* Top icon */}
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green text-white shadow-sm">
            <Check className="h-10 w-10" />
          </div>
        </div>

        {/* Title */}
        <div>
          <p className="text-base font-extrabold text-gray">
            Service Fee Payment Confirmed
          </p>

          <p className="mt-2 text-4xl font-extrabold text-primary">
            ৳ {amount.toLocaleString()}
          </p>

          <p className="mt-3 text-sm text-primary">
            Your sell post will be live soon.
            <br />
            It may take up to 1-3 business days for reviewing
          </p>
        </div>

        {/* Property mini card */}
        <div className="rounded-2xl border border-gray/15 bg-white p-4 text-left">
          <div className="flex items-center gap-4">
            <div className="h-20 w-25 overflow-hidden rounded-xl bg-secondary">
              <Image
                src={image}
                alt={title}
                className="h-full w-full object-cover"
                height={100}
                width={200}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-extrabold text-gray">
                {title}
              </p>

              <div className="mt-1 flex items-center gap-2">
                <p className="text-sm font-semibold text-gray/50">Price:</p>
                <p className="text-sm font-extrabold text-primary">
                  {priceText}
                </p>
              </div>

              <div className="mt-2">
                <span className="inline-flex rounded-md bg-primary px-3 py-1 text-xs font-extrabold text-white">
                  {tagText}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="pt-2 text-left">
          <p className="text-sm font-extrabold text-gray">Status</p>
          <span className="mt-2 inline-flex rounded-lg bg-secondary px-3 py-2 text-xs font-semibold text-gray/45">
            {statusText}
          </span>
        </div>
      </div>
    </Dialog>
  );
}
