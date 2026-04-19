"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import Dialog from "@/components/dialogs/dialog";
import { cn } from "@/lib/utils";
import { propertyPostReviewService } from "@/service/admin/property/property-post-review.service";
import { getErrorMessage } from "../../_utils/property-posts.utils";
import type { ReviewPropertyPostPayload } from "@/types/admin/property-post/property.types";

export default function PendingReviewFooter({
  propertyId,
  defaultValidatedPricePerUnit,
  defaultValidatedPrice,
  defaultMandatoryFee,
  defaultOptionalFee,
}: {
  propertyId: string;
  defaultValidatedPricePerUnit?: number | null;
  defaultValidatedPrice?: number | null;
  defaultMandatoryFee?: number | null;
  defaultOptionalFee?: number | null;
}) {
  const router = useRouter();

  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);

  const [reason, setReason] = useState("");

  const [validatedPricePerUnit, setValidatedPricePerUnit] = useState(
    defaultValidatedPricePerUnit !== null &&
      defaultValidatedPricePerUnit !== undefined
      ? String(defaultValidatedPricePerUnit)
      : "",
  );
  const [validatedPrice, setValidatedPrice] = useState(
    defaultValidatedPrice !== null && defaultValidatedPrice !== undefined
      ? String(defaultValidatedPrice)
      : "",
  );
  const [mandatoryServiceFee, setMandatoryServiceFee] = useState(
    defaultMandatoryFee !== null && defaultMandatoryFee !== undefined
      ? String(defaultMandatoryFee)
      : "",
  );
  const [optionalServiceFee, setOptionalServiceFee] = useState(
    defaultOptionalFee !== null && defaultOptionalFee !== undefined
      ? String(defaultOptionalFee)
      : "",
  );

  const reviewMutation = useMutation({
    mutationFn: ({
      postId,
      payload,
    }: {
      postId: string;
      payload: ReviewPropertyPostPayload;
    }) => propertyPostReviewService.reviewPropertyPost(postId, payload),
    onSuccess: async (_, variables) => {
      toast.success(
        variables.payload.status === "REJECTED"
          ? "Post rejected successfully."
          : "Quote submitted successfully.",
      );

      setIsRejectDialogOpen(false);
      setIsQuoteDialogOpen(false);
      setReason("");
      await Promise.resolve(router.refresh());
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const onReject = () => {
    const trimmedReason = reason.trim();

    if (!trimmedReason) {
      toast.error("Please provide a rejection reason.");
      return;
    }

    reviewMutation.mutate({
      postId: propertyId,
      payload: {
        status: "REJECTED",
        rejectionReason: trimmedReason,
      },
    });
  };

  const onSubmitQuote = () => {
    const nextValidatedPricePerUnit = Number(validatedPricePerUnit);
    const nextValidatedPrice = Number(validatedPrice);
    const nextMandatoryServiceFee = Number(mandatoryServiceFee);
    const nextOptionalServiceFee = Number(optionalServiceFee);

    if (
      !Number.isFinite(nextValidatedPricePerUnit) ||
      !Number.isFinite(nextValidatedPrice)
    ) {
      toast.error("Validated prices are required.");
      return;
    }

    if (
      !Number.isFinite(nextMandatoryServiceFee) ||
      !Number.isFinite(nextOptionalServiceFee)
    ) {
      toast.error("Service fees are required.");
      return;
    }

    reviewMutation.mutate({
      postId: propertyId,
      payload: {
        status: "QUOTED",
        validatedPricePerUnit: nextValidatedPricePerUnit,
        validatedPrice: nextValidatedPrice,
        mandatoryServiceFee: nextMandatoryServiceFee,
        optionalServiceFee: nextOptionalServiceFee,
      },
    });
  };

  return (
    <Card className="flex items-center justify-between gap-4">
      <Button
        onClick={() => setIsRejectDialogOpen(true)}
        className="border border-[#EF4444] bg-white text-[#EF4444] hover:bg-[#FEF2F2]"
        disabled={reviewMutation.isPending}
      >
        Reject Post
      </Button>

      <Button
        variant="primary"
        onClick={() => setIsQuoteDialogOpen(true)}
        disabled={reviewMutation.isPending}
      >
        Submit Quote to User <ArrowRight size={18} />
      </Button>

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen} size="md">
        <div>
          <div className="flex items-start justify-between gap-4 border-b border-gray/20 pb-2">
            <div className="space-y-1">
              <p className="text-lg font-semibold text-gray">
                Reject Post{" "}
                <span className="font-semibold text-[#EF4444]">
                  #{propertyId}
                </span>
              </p>
              <p className="text-sm text-gray">Are you sure?</p>
            </div>
          </div>

          {/* body */}
          <div>
            <p className="mb-3 text-sm font-semibold text-[#EF4444]">
              Write the reason for rejection
            </p>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={7}
              placeholder=""
              className={cn(
                "w-full resize-none rounded-xl border px-4 py-4 text-sm text-gray outline-none",
                "border-[#EF4444] bg-[#FEF2F2] focus:ring-2 focus:ring-[#EF4444]/20",
              )}
            />

            <div className="pt-6">
              <Button
                onClick={onReject}
                disabled={reviewMutation.isPending}
                className={cn(
                  "w-full justify-center rounded-xl border bg-white py-4",
                  "border-[#EF4444] text-[#EF4444] hover:bg-[#FEF2F2]",
                )}
              >
                {reviewMutation.isPending ? "Rejecting..." : "Reject Post"}
              </Button>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog open={isQuoteDialogOpen} onOpenChange={setIsQuoteDialogOpen} size="md">
        <div>
          <div className="border-b border-gray/20 pb-2">
            <p className="text-lg font-semibold text-gray">
              Submit Quote <span className="font-semibold text-primary">#{propertyId}</span>
            </p>
            <p className="text-sm text-gray mt-1">
              Update validated price and service fees before submitting.
            </p>
          </div>

          <div className="mt-4 space-y-4">
            <NumberField
              label="Validated Price Per Unit"
              value={validatedPricePerUnit}
              onChange={setValidatedPricePerUnit}
            />

            <NumberField
              label="Validated Total Price"
              value={validatedPrice}
              onChange={setValidatedPrice}
            />

            <NumberField
              label="Mandatory Service Fee"
              value={mandatoryServiceFee}
              onChange={setMandatoryServiceFee}
            />

            <NumberField
              label="Optional Service Fee"
              value={optionalServiceFee}
              onChange={setOptionalServiceFee}
            />

            <Button
              onClick={onSubmitQuote}
              disabled={reviewMutation.isPending}
              className="w-full justify-center"
            >
              {reviewMutation.isPending ? "Submitting..." : "Submit Quote"}
            </Button>
          </div>
        </div>
      </Dialog>
    </Card>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-gray">{label}</p>
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full h-10 rounded-lg border border-gray/20 px-3 text-sm text-gray outline-none"
      />
    </div>
  );
}
