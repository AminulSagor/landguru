"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import Dialog from "@/components/dialogs/dialog";
import { cn } from "@/utils/classnames.utils";
import { propertyPostReviewService } from "@/service/admin/property/property-post-review.service";
import { getErrorMessage } from "../../../../../../../utils/property-posts.utils";
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

  const [open, setOpen] = useState(false);

  const [reason, setReason] = useState("");

  const validatedPricePerUnit =
    defaultValidatedPricePerUnit !== null &&
      defaultValidatedPricePerUnit !== undefined
      ? String(defaultValidatedPricePerUnit)
      : "";
  const validatedPrice =
    defaultValidatedPrice !== null && defaultValidatedPrice !== undefined
      ? String(defaultValidatedPrice)
      : "";
  const mandatoryServiceFee =
    defaultMandatoryFee !== null && defaultMandatoryFee !== undefined
      ? String(defaultMandatoryFee)
      : "";
  const optionalServiceFee =
    defaultOptionalFee !== null && defaultOptionalFee !== undefined
      ? String(defaultOptionalFee)
      : "";

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

      setOpen(false);
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
        onClick={() => setOpen(true)}
        className="border border-[#EF4444] bg-white text-[#EF4444] hover:bg-[#FEF2F2]"
        disabled={reviewMutation.isPending}
      >
        Reject Post
      </Button>

      <Button variant="primary" onClick={onSubmitQuote} disabled={reviewMutation.isPending}>
        Submit Quote to User <ArrowRight size={18} />
      </Button>

      {/* rejection dialog */}
      <Dialog open={open} onOpenChange={setOpen} size="md">
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
    </Card>
  );
}
