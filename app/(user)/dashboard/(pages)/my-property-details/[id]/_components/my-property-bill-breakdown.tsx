"use client";

import React from "react";
import { Info } from "lucide-react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";

type Props = {
  onRequote: () => void;
  onPay: () => void;
};

export default function MyPropertyBillBreakdown({ onRequote, onPay }: Props) {
  return (
    <Card className="rounded-2xl border bg-white p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Info className="h-4 w-4" />
        </span>
        <h3 className="text-xl font-extrabold text-gray">Bill Breakdown</h3>
      </div>

      <div className="mt-4 h-px w-full bg-gray/10" />

      {/* Body */}
      <div className="mt-5">
        <p className="text-lg font-extrabold text-gray">Service Fees</p>

        <div className="mt-5 space-y-7">
          {/* Mandatory */}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-extrabold text-primary">
                Mandatory Service Fees
              </p>
              <p className="text-lg font-extrabold text-primary">৳ 3000</p>
            </div>

            <ul className="mt-3 space-y-2 pl-5">
              <li className="list-disc text-sm text-gray/80">
                Ownership History Validation
              </li>
              <li className="list-disc text-sm text-gray/80">Pentagraph Map</li>
              <li className="list-disc text-sm text-gray/80">
                Physical estimate & Border Demarcation
              </li>
              <li className="list-disc text-sm text-gray/80">
                Document Organization
              </li>
            </ul>
          </div>

          {/* Optional */}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-extrabold text-primary">
                Optional Service Fees
              </p>
              <p className="text-lg font-extrabold text-primary">৳ 3000</p>
            </div>

            <ul className="mt-3 space-y-2 pl-5">
              <li className="list-disc text-sm text-gray/80">
                Property Registration/ Deed Writing Service
              </li>
              <li className="list-disc text-sm text-gray/80">
                Namjari/ DCR/ Pouro City Corp Record Update
              </li>
              <li className="list-disc text-sm text-gray/80">
                Inheritance Dispute Analysis
              </li>
              <li className="list-disc text-sm text-gray/80">
                Government Acquisition Risk
              </li>
              <li className="list-disc text-sm text-gray/80">
                Court case verification
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 h-px w-full bg-gray/10" />

      {/* Total */}
      <div className="mt-5 flex items-end justify-between">
        <p className="text-2xl font-extrabold text-gray">Total Payable</p>
        <p className="text-2xl font-extrabold text-primary">৳ 6000</p>
      </div>

      {/* Buttons */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <Button variant="secondary" onClick={onRequote}>
          Requote
        </Button>

        <Button onClick={onPay}>Pay &amp; Activate Post</Button>
      </div>
    </Card>
  );
}
