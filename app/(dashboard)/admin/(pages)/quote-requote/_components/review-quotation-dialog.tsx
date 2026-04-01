"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import Dialog from "@/components/dialogs/dialog";
import Button from "@/components/buttons/button";
import {
  counterAdminSellPostNegotiation,
  rejectAdminSellPostNegotiation,
} from "@/service/admin/sell-posts/sell-post-negotiations.service";
import type {
  SellPostNegotiationCounterPayload,
  SellPostNegotiationItem,
} from "@/types/admin/quote-requote/sell-post-negotiations.types";

type SuccessDialogData = {
  postId: string;
  sellerName: string;
  mandatoryFee: number;
  optionalFee: number;
  currencySymbol: string;
};

type Props = {
  open: boolean;
  onControl: (v: boolean) => void;
  item: SellPostNegotiationItem | null;
  onSuccessDialogOpen: (data: SuccessDialogData) => void;
};

type OptionalService = {
  id: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
};

type ReviewQuotationFormValues = {
  mandatoryFee: string;
  optionalFee: string;
};

function formatCurrency(symbol: string, amount: number) {
  return `${symbol} ${amount.toLocaleString()}`;
}

function parseAmount(value: string): number {
  const normalizedValue = value.replace(/,/g, "").trim();

  if (!normalizedValue) {
    return 0;
  }

  const parsedValue = Number(normalizedValue);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

export default function ReviewQutationDialog({
  open,
  onControl,
  item,
  onSuccessDialogOpen,
}: Props) {
  const router = useRouter();

  const [optional, setOptional] = React.useState<OptionalService[]>([
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

  const { register, handleSubmit, reset } = useForm<ReviewQuotationFormValues>({
    defaultValues: {
      mandatoryFee: "",
      optionalFee: "",
    },
  });

  React.useEffect(() => {
    if (open) {
      reset({
        mandatoryFee: "",
        optionalFee: "",
      });
    }
  }, [open, reset, item?.negotiationId]);

  const sym = "৳";
  const userCounter = item?.pricing.userNewCounter ?? 4000;
  const adminLast = item?.pricing.adminLastQuote ?? 6000;

  const gap = Math.max(0, adminLast - userCounter);
  const showGapAlert = gap > 0;

  const optionalCheckedCount = optional.filter(
    (service) => service.checked,
  ).length;

  const counterMutation = useMutation({
    mutationFn: async (payload: SellPostNegotiationCounterPayload) => {
      if (!item?.negotiationId) {
        throw new Error("Negotiation ID is missing.");
      }

      return counterAdminSellPostNegotiation(item.negotiationId, payload);
    },
    onSuccess: (_response, variables) => {
      toast.success("Counter-offer sent successfully.");
      onControl(false);
      onSuccessDialogOpen({
        postId: `#${item?.post.id ?? ""}`,
        sellerName: item?.seller.name ?? "",
        mandatoryFee: variables.mandatoryFee,
        optionalFee: variables.optionalFee,
        currencySymbol: sym,
      });
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to send counter-offer.");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async () => {
      if (!item?.negotiationId) {
        throw new Error("Negotiation ID is missing.");
      }

      return rejectAdminSellPostNegotiation(item.negotiationId);
    },
    onSuccess: () => {
      toast.success("Negotiation rejected successfully.");
      onControl(false);
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reject negotiation.");
    },
  });

  const isSubmitting =
    counterMutation.isPending || rejectMutation.isPending || !item;

  const onSubmit = (values: ReviewQuotationFormValues) => {
    const mandatoryFee = parseAmount(values.mandatoryFee);
    const optionalFee = parseAmount(values.optionalFee);

    if (mandatoryFee <= 0) {
      toast.error("Mandatory fee must be greater than 0.");
      return;
    }

    if (optionalFee <= 0) {
      toast.error("Optional fee must be greater than 0.");
      return;
    }

    counterMutation.mutate({
      mandatoryFee,
      optionalFee,
    });
  };

  const handleReject = () => {
    rejectMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onControl} size="xl">
      <div className="flex min-h-[620px] flex-col">
        <div className="border-b border-gray/15 pb-4">
          <p className="text-lg font-bold text-black">Review Quotation</p>
          <p className="mt-1 text-xs font-semibold text-light-gray">
            Negotiating Post{" "}
            <span className="font-extrabold text-gray">
              #{item?.post.id ?? "POST-1044"}
            </span>{" "}
            with{" "}
            <span className="font-extrabold text-gray">
              {item?.seller.name ?? "Mr. Rahman"}
            </span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col"
        >
          <div className="grid flex-1 gap-5 pt-5 lg:grid-cols-[0.95fr_1.35fr]">
            <div className="space-y-4">
              <p className="text-[11px] font-extrabold tracking-wide text-light-gray">
                NEGOTIATION SUMMARY
              </p>

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
                    {mandatory.map((service) => (
                      <div
                        key={service}
                        className="rounded-lg border border-gray/15 bg-secondary px-3 py-2"
                      >
                        <p className="text-[11px] font-semibold text-gray">
                          {service}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-extrabold text-gray">
                      Optional Services ({optionalCheckedCount}/
                      {optional.length})
                    </p>

                    <div className="mt-3 space-y-2">
                      {optional.map((service) => (
                        <label
                          key={service.id}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-lg border border-gray/15 bg-white px-3 py-3",
                            service.disabled && "opacity-60",
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={service.checked}
                            disabled={service.disabled}
                            onChange={() =>
                              setOptional((prev) =>
                                prev.map((currentService) =>
                                  currentService.id === service.id
                                    ? {
                                        ...currentService,
                                        checked: !currentService.checked,
                                      }
                                    : currentService,
                                ),
                              )
                            }
                            className="h-4 w-4 accent-primary"
                          />

                          <p className="text-[11px] font-semibold text-gray">
                            {service.label}
                          </p>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

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
                          {...register("mandatoryFee")}
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
                          {...register("optionalFee")}
                          placeholder=""
                          className="w-full bg-transparent text-xs font-semibold text-gray outline-none"
                          inputMode="numeric"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:hidden" />
            </div>
          </div>

          <div className="mt-5 border-t border-gray/15 pt-4">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
              <Button
                type="button"
                size="md"
                className="w-full rounded-lg border border-[#ff3b30] bg-white px-4 py-2 text-xs font-bold text-[#ff3b30] sm:w-auto"
                onClick={handleReject}
                disabled={isSubmitting}
              >
                {rejectMutation.isPending
                  ? "Rejecting..."
                  : "Reject & Close Negotiation"}
              </Button>

              <Button
                type="submit"
                size="md"
                className="w-full rounded-lg sm:w-auto"
                disabled={isSubmitting}
              >
                {counterMutation.isPending ? (
                  "Sending..."
                ) : (
                  <>
                    Send Counter-Offer <span className="ml-1">➜</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
