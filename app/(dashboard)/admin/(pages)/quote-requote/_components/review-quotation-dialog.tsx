// app/(admin)/admin/dashboard/(pages)/quote-requote/_components/review-qutation-dialog.tsx
"use client";

import React, { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import Dialog from "@/components/dialogs/dialog";
import Button from "@/components/buttons/button";
import { PostListItem } from "@/app/(dashboard)/admin/dummy-data/quote-requote-data";

type Props = {
  open: boolean;
  onControl: (v: boolean) => void;
  post: PostListItem | null;
  setSuccessDialog: (v: boolean) => void;
};

type OptionalService = {
  id: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
};

function formatCurrency(symbol: string, amount: number) {
  return `${symbol} ${amount}`;
}

export default function ReviewQutationDialog({
  open,
  onControl,
  post,
  setSuccessDialog,
}: Props) {
  const [optional, setOptional] = useState<OptionalService[]>([
    {
      id: "opt-1",
      label: "Property Registration/ Deed Writing Service",
      checked: true,
    },
    {
      id: "opt-2",
      label: "Namjari/ DCR/ Pouro City Corp Record Update",
      checked: true,
    },
    { id: "opt-3", label: "Inheritance Dispute Analysis", checked: true },
    { id: "opt-4", label: "Government Acquisition Risk", checked: false },
    { id: "opt-5", label: "Court case verification", checked: false },
  ]);

  const mandatory = useMemo(
    () => [
      "Ownership History Validation",
      "Physical estimate & Border Demarcation",
      "Pentagraph Map",
      "Document Organization",
    ],
    [],
  );

  const sym = post?.quote?.currencySymbol || "৳";
  const userCounter = post?.quote?.userNewCounter ?? 4000;
  const adminLast = post?.quote?.adminLastQuote ?? 6000;

  const gap = Math.max(0, adminLast - userCounter);
  const showGapAlert = gap > 0;

  const [mandatoryFee, setMandatoryFee] = useState<string>("");
  const [optionalFee, setOptionalFee] = useState<string>("");

  const optionalCheckedCount = optional.filter((s) => s.checked).length;

  return (
    <Dialog open={open} onOpenChange={onControl} size="xl">
      <div className="flex min-h-[620px] flex-col">
        {/* header */}
        <div className="border-b border-gray/15 pb-4">
          <p className="text-lg font-bold text-black">Review Quotation</p>
          <p className="mt-1 text-xs font-semibold text-light-gray">
            Negotiating Post{" "}
            <span className="font-extrabold text-gray">
              {post?.id ?? "#POST-1044"}
            </span>{" "}
            with{" "}
            <span className="font-extrabold text-gray">
              {post?.seller?.name ?? "Mr. Rahman"}
            </span>
          </p>
        </div>

        {/* body */}
        <div className="grid flex-1 gap-5 pt-5 lg:grid-cols-[0.95fr_1.35fr]">
          {/* left */}
          <div className="space-y-4">
            <p className="text-[11px] font-extrabold tracking-wide text-light-gray">
              NEGOTIATION SUMMARY
            </p>

            {/* User counter */}
            <div className="rounded-xl border border-gray/15 bg-white p-4">
              <p className="text-[11px] font-bold text-light-gray">
                User&apos;s Counter
              </p>

              <p className="mt-1 text-xl font-extrabold text-gray tabular-nums">
                {formatCurrency(sym, userCounter)}
              </p>

              <div className="mt-3 border-t border-gray/15 pt-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-light-gray">
                    Mandatory Fee
                  </p>
                  <p className="text-[11px] font-bold text-light-gray tabular-nums">
                    {formatCurrency(sym, 2000)}
                  </p>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-light-gray">
                    Optional Fee
                  </p>
                  <p className="text-[11px] font-bold text-light-gray tabular-nums">
                    {formatCurrency(sym, 2000)}
                  </p>
                </div>

                <p className="mt-2 text-[11px] font-semibold text-[#ff3b30]">
                  ● Received 2 hours ago
                </p>
              </div>
            </div>

            {/* Previous quote */}
            <div className="rounded-xl border border-gray/15 bg-white p-4">
              <p className="text-[11px] font-bold text-light-gray">
                Your Previous Quote
              </p>

              <p className="mt-1 text-lg font-extrabold text-gray tabular-nums">
                {formatCurrency(sym, adminLast)}
              </p>

              <div className="mt-3 border-t border-gray/15 pt-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-light-gray">
                    Mandatory Fee
                  </p>
                  <p className="text-[11px] font-bold text-light-gray tabular-nums">
                    {formatCurrency(sym, 3000)}
                  </p>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-light-gray">
                    Optional Fee
                  </p>
                  <p className="text-[11px] font-bold text-light-gray tabular-nums">
                    {formatCurrency(sym, 3000)}
                  </p>
                </div>
              </div>
            </div>

            {/* Price gap alert */}
            {showGapAlert && (
              <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Info size={16} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-primary">
                      Price Gap Alert
                    </p>
                    <p className="mt-1 text-[11px] font-semibold text-primary/90">
                      There is currently a{" "}
                      <span className="font-extrabold">
                        {formatCurrency(sym, gap)}
                      </span>{" "}
                      difference between the user&apos;s expectation and your
                      last offer.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* right */}
          <div className="space-y-5">
            <div>
              <p className="text-base font-extrabold text-gray">
                User Chosen Services
              </p>

              <div className="mt-3 rounded-xl border border-gray/15 bg-white p-4">
                <p className="text-xs font-extrabold text-gray">
                  Mandatory Services
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {mandatory.map((m) => (
                    <div
                      key={m}
                      className="rounded-lg border border-gray/15 bg-secondary px-3 py-2"
                    >
                      <p className="text-[11px] font-semibold text-gray">{m}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <p className="text-xs font-extrabold text-gray">
                    Optional Services ({optionalCheckedCount}/{optional.length})
                  </p>

                  <div className="mt-3 space-y-2">
                    {optional.map((s) => (
                      <label
                        key={s.id}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg border border-gray/15 bg-white px-3 py-3",
                          s.disabled && "opacity-60",
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={s.checked}
                          disabled={s.disabled}
                          onChange={() =>
                            setOptional((prev) =>
                              prev.map((x) =>
                                x.id === s.id
                                  ? { ...x, checked: !x.checked }
                                  : x,
                              ),
                            )
                          }
                          className="h-4 w-4 accent-primary"
                        />

                        <p className="text-[11px] font-semibold text-gray">
                          {s.label}
                        </p>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* fee inputs */}
            <div>
              <p className="text-base font-extrabold text-gray">
                Service Fee &amp; Quote
              </p>

              <div className="mt-3 rounded-xl border border-gray/15 bg-white p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-extrabold tracking-wide text-light-gray">
                      MANDATORY SERVICES FEE
                    </p>

                    <div className="mt-2 flex items-center gap-2 rounded-lg border border-gray/15 bg-white px-3 py-2">
                      <span className="text-sm font-extrabold text-primary">
                        {sym}
                      </span>
                      <input
                        value={mandatoryFee}
                        onChange={(e) => setMandatoryFee(e.target.value)}
                        placeholder=""
                        className="w-full bg-transparent text-xs font-semibold text-gray outline-none"
                        inputMode="numeric"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-extrabold tracking-wide text-light-gray">
                      OPTIONAL SERVICES FEE
                    </p>

                    <div className="mt-2 flex items-center gap-2 rounded-lg border border-gray/15 bg-white px-3 py-2">
                      <span className="text-sm font-extrabold text-primary">
                        {sym}
                      </span>
                      <input
                        value={optionalFee}
                        onChange={(e) => setOptionalFee(e.target.value)}
                        placeholder=""
                        className="w-full bg-transparent text-xs font-semibold text-gray outline-none"
                        inputMode="numeric"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* small mobile spacing so it doesn’t feel cramped */}
            <div className="lg:hidden" />
          </div>
        </div>

        {/* footer */}
        <div className="mt-5 border-t border-gray/15 pt-4">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button
              size="md"
              className="w-full rounded-lg border border-[#ff3b30] bg-white px-4 py-2 text-xs font-bold text-[#ff3b30] sm:w-auto"
              onClick={() => onControl(false)}
            >
              Reject &amp; Close Negotiation
            </Button>

            <Button
              size="md"
              className="w-full rounded-lg sm:w-auto"
              onClick={() => {
                setSuccessDialog(true);
                onControl(false);
              }}
            >
              Send Counter-Offer <span className="ml-1">➜</span>
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
