// ✅ 3) ResellSubmittedDialog.tsx
"use client";

import React from "react";
import Dialog from "@/components/dialogs/dialog";
import Card from "@/components/cards/card";
import { X, Check } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;

  title: string;
  imageUrl?: string;
  tagText: string; // "Flat"
  priceText: string; // "৳ 40,00,000"
};

export default function ResellSubmittedDialog({
  open,
  onOpenChange,
  title,
  imageUrl,
  tagText,
  priceText,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} position="top">
      <div className="space-y-6 px-4">
        {/* header */}
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-extrabold text-gray">
            Resell this property
          </h3>
        </div>

        {/* success icon */}
        <div className="flex flex-col items-center text-center">
          <div className="h-20 w-20 rounded-full bg-green flex items-center justify-center">
            <Check size={38} className="text-white" />
          </div>

          <p className="mt-5 text-lg font-extrabold text-gray">
            Post Submitted
          </p>

          <p className="mt-2 text-sm font-semibold text-primary">
            Your post will be listed as a sell post soon. <br />
            It may take up to 1-3 business days for reviewing
          </p>
        </div>

        {/* property preview card */}
        <Card className="rounded-2xl border border-gray/10 shadow-none p-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-20 rounded-xl bg-secondary overflow-hidden shrink-0">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={title}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-extrabold text-gray truncate">
                {title}
              </p>

              <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-gray/60">
                <span>Asking Price</span>
                <span className="font-extrabold text-primary">{priceText}</span>
              </div>

              <div className="mt-2">
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-extrabold text-primary">
                  {tagText}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* status */}
        <div className="space-y-2">
          <p className="text-sm font-extrabold text-gray">Status</p>
          <span className="inline-flex rounded-md bg-secondary px-3 py-2 text-xs font-extrabold text-gray/50">
            Pending Admin Review
          </span>
        </div>
      </div>
    </Dialog>
  );
}
