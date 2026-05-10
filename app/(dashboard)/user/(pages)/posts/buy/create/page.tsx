"use client";

import React from "react";
import toast from "react-hot-toast";
import {
  ProcessStepper,
  Step as StepperStep,
} from "@/components/steppers/process-stepper";
import { BuyStepOneValues } from "@/app/(dashboard)/user/types/property-buy-post";
import BuyPostStepOneForm from "@/app/(dashboard)/user/(pages)/posts/buy/create/_components/buy-post-step-one";
import BuyPostStepTwoReview from "@/app/(dashboard)/user/(pages)/posts/buy/create/_components/buy-post-step-two-review";
import {
  createBuyPostDraft,
  submitBuyPostDraft,
  updateBuyPostDraft,
} from "@/service/users/posts/create.buypost.service";
import type { ApiError } from "@/types/auth/signup.types";

type BuyPostData = {
  step1?: BuyStepOneValues;
};

const getApiErrorMessage = (error: unknown, fallback: string) => {
  const apiError = error as ApiError;
  const message = apiError?.response?.data?.message || apiError?.message;

  if (Array.isArray(message) && message.length > 0) {
    return message[0] || fallback;
  }

  if (typeof message === "string" && message.trim()) {
    return message;
  }

  return fallback;
};

const toOptionalNumber = (value?: number) =>
  Number.isFinite(value) ? Number(value) : undefined;

export default function CreateBuyPostPage() {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [data, setData] = React.useState<BuyPostData>({});
  const [draftId, setDraftId] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  const steps: StepperStep[] = [
    { id: 1, title: "Buy Post Details" },
    { id: 2, title: "Review your requirements" },
  ];

  const goBack = () => setCurrentStep((s) => Math.max(1, s - 1));

  const resolveOptionValue = (
    value?: { value?: string; label?: string } | null,
  ) => value?.value || value?.label || undefined;

  const handleStepOne = async (step1: BuyStepOneValues) => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const payload = {
        title: step1.adTitle.trim(),
        description: step1.description.trim(),
        propertyType: step1.propertyType,
        landSizeMin: Number(step1.minLandSize || 0),
        landSizeUnit: step1.minLandUnit,
        budgetMin: Number(step1.budgetMin || 0),
        budgetMax: Number(step1.budgetMax || 0),
        plotSizeMin: toOptionalNumber(step1.minPlotSize),
        plotSizeUnit: Number.isFinite(step1.minPlotSize)
          ? step1.minPlotUnit
          : undefined,
        roadDistanceMin: toOptionalNumber(step1.distanceMin),
        roadDistanceMax: toOptionalNumber(step1.distanceMax),
        division: resolveOptionValue(step1.division),
        district: resolveOptionValue(step1.district),
        upazila: resolveOptionValue(step1.upazila),
        unionOrCityCorp: resolveOptionValue(step1.pouroshovaOrUnion),
        wardNo: resolveOptionValue(step1.wardNo),
        postalCode: step1.postalCode?.trim() || undefined,
      };

      const response = draftId
        ? await updateBuyPostDraft({ postId: draftId, payload })
        : await createBuyPostDraft(payload);

      const resolvedId =
        response.data?.id ||
        response.data?.postId ||
        response.data?.draftOfferId ||
        response.data?.offerId ||
        response.id ||
        response.postId ||
        response.draftOfferId ||
        response.offerId;

      if (!resolvedId) {
        throw new Error("Draft id not found in response");
      }

      setDraftId(resolvedId);
      setData({ step1 });
      setCurrentStep(2);
      toast.success("Buy post details saved.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to save buy post details."));
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmitForReview = async () => {
    if (isSaving) return;
    if (!draftId) {
      toast.error("Draft is missing. Please save Step 1 first.");
      throw new Error("Draft id missing");
    }

    setIsSaving(true);

    try {
      await submitBuyPostDraft(draftId);
      toast.success("Buy post submitted for review.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to submit buy post."));
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full py-24">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* LEFT: Stepper (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <ProcessStepper
              steps={steps}
              currentStep={currentStep}
              orientation="vertical"
            />
          </div>
        </aside>

        {/* RIGHT: Content */}
        <section>
          {/* TOP: Stepper (mobile) */}
          <div className="lg:hidden mb-6">
            <ProcessStepper
              steps={steps}
              currentStep={currentStep}
              orientation="horizontal"
            />
          </div>

          {/* STEP 1 */}
          {currentStep === 1 && (
            <BuyPostStepOneForm
              defaultValues={data.step1}
              onNext={handleStepOne}
            />
          )}

          {/* STEP 2 */}
          {currentStep === 2 && data.step1 && (
            <BuyPostStepTwoReview
              step1={data.step1}
              onBack={goBack}
              onSubmit={handleSubmitForReview}
            />
          )}
        </section>
      </div>
    </div>
  );
}
