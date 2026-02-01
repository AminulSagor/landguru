// _components/dialogs/RequoteDialog.tsx
"use client";

import React from "react";
import Button from "@/components/buttons/button";
import Dialog from "@/components/dialogs/dialog";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mandatoryFee: number;
  optionalFee: number;
  onSubmit: (v: boolean) => void;
};

export default function RequoteDialog({
  open,
  onOpenChange,
  mandatoryFee,
  optionalFee,
  onSubmit,
}: Props) {
  const [mandatory, setMandatory] = React.useState(mandatoryFee);
  const [optional, setOptional] = React.useState(optionalFee);

  const total = mandatory + optional;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="md" position="center">
      <div className="space-y-6">
        {/* Header */}
        <h3 className="text-lg font-extrabold text-gray">Requote</h3>

        {/* Service Fees Card */}
        <div className="rounded-xl border border-gray/15 bg-white p-4">
          <p className="text-sm font-extrabold text-gray">Service Fees</p>

          {/* Mandatory */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-extrabold text-primary">
                Mandatory Service Fees
              </p>
              <p className="text-sm font-extrabold text-primary">৳ 3000</p>
            </div>

            <ul className="mt-2 space-y-1 pl-5">
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
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-extrabold text-primary">
                Optional Service Fees
              </p>
              <p className="text-sm font-extrabold text-primary">৳ 3000</p>
            </div>

            <ul className="mt-2 space-y-1 pl-5">
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

        {/* Requote Section */}
        <div className="space-y-4">
          <p className="text-sm font-extrabold text-gray">Requote Your Offer</p>

          {/* Mandatory input */}
          <div>
            <p className="text-xs font-bold text-primary">
              Mandatory Service Fees
            </p>
            <div className="mt-1 flex items-center rounded-xl border border-gray/20 bg-white px-4">
              <span className="text-lg font-extrabold text-primary">৳</span>
              <input
                type="number"
                value={mandatory}
                onChange={(e) => setMandatory(Number(e.target.value || 0))}
                className="h-12 w-full bg-transparent px-2 text-lg font-extrabold text-primary outline-none"
              />
            </div>
          </div>

          {/* Optional input */}
          <div>
            <p className="text-xs font-bold text-primary">
              Optional Service Fees
            </p>
            <div className="mt-1 flex items-center rounded-xl border border-gray/20 bg-white px-4">
              <span className="text-lg font-extrabold text-primary">৳</span>
              <input
                type="number"
                value={optional}
                onChange={(e) => setOptional(Number(e.target.value || 0))}
                className="h-12 w-full bg-transparent px-2 text-lg font-extrabold text-primary outline-none"
              />
            </div>
          </div>
        </div>

        {/* Total Box */}
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 text-center">
          <p className="text-xs font-bold text-gray">Total Requested Value</p>
          <p className="mt-1 text-2xl font-extrabold text-primary">
            ৳ {total.toLocaleString()}
          </p>
        </div>

        {/* Action */}
        <Button
          className="h-12 w-full rounded-xl"
          onClick={() => {
            onOpenChange(false);
            onSubmit(true);
          }}
        >
          Requote
        </Button>

        {/* Footer text */}
        <p className="text-center text-xs text-gray/40">
          Quotation Revised: 0 times
        </p>
      </div>
    </Dialog>
  );
}
