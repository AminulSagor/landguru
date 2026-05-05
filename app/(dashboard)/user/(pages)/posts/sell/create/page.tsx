"use client";

import React from "react";
import toast from "react-hot-toast";
import {
  ProcessStepper,
  Step as StepperStep,
} from "@/components/steppers/process-stepper";

import SellPropertyStepOneForm from "@/app/(dashboard)/user/(pages)/posts/sell/_components/sell-property-step-one";
import SellPropertyStepTwoForm from "@/app/(dashboard)/user/(pages)/posts/sell/_components/sell-property-step-two";

import {
  StepFourValues,
  StepOneValues,
  StepThreeValues,
  StepTwoValues,
} from "@/app/(dashboard)/user/types/property-sell-post";
import SellPropertyStepThreeForm from "@/app/(dashboard)/user/(pages)/posts/sell/_components/sell-property-step-three";
import SellPropertyStepFourReview from "@/app/(dashboard)/user/(pages)/posts/sell/_components/sell-property-step-final";
import { ArrowLeft } from "lucide-react";
import {
  createSellPostStepOne,
  updateSellPostStepOne,
  updateSellPostStepThree,
  updateSellPostStepTwo,
  submitForReview,
} from "@/service/users/posts/create.sellpost.service";
import { uploadService } from "@/service/base/upload.service";
import type { PresignedUploadUrlResponse, UploadType } from "@/types/base/upload.types";
import type { ApiError } from "@/types/auth/signup.types";

type SellPostData = {
  step1?: StepOneValues;
  step2?: StepTwoValues;
  step3?: StepThreeValues;
};

const KATHA_TO_SQFT = 720;
const DECIMAL_TO_SQFT = 435.6;

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

const resolvePresignedUrls = (response: PresignedUploadUrlResponse) => {
  const uploadUrl =
    response.uploadUrl ||
    response.presignedUrl ||
    response.putUrl ||
    response.url;

  if (!uploadUrl) {
    throw new Error("Upload URL not received");
  }

  const cleanedUploadUrl = uploadUrl.trim();
  const withoutQuery = cleanedUploadUrl.split("?")[0] || cleanedUploadUrl;

  const fileUrl =
    response.fileUrl ||
    response.publicUrl ||
    response.objectUrl ||
    withoutQuery;

  return {
    uploadUrl: cleanedUploadUrl,
    fileUrl,
    fileKey: response.key,
  };
};

const calculateAskingPrice = (step1: StepOneValues) => {
  const sellableAmount = Number(step1.sellableAmount || 0);
  const pricePerKatha = Number(step1.pricePerKatha || 0);

  const sellableInKatha =
    step1.sellableUnit === "Katha"
      ? sellableAmount
      : (sellableAmount * DECIMAL_TO_SQFT) / KATHA_TO_SQFT;

  return sellableInKatha * pricePerKatha;
};

const toOptionalNumber = (value?: number) =>
  Number.isFinite(value) ? Number(value) : undefined;

export default function CreateSellPostPage() {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [data, setData] = React.useState<SellPostData>({});
  const [draftId, setDraftId] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  const steps: StepperStep[] = [
    { id: 1, title: "Property Details" },
    { id: 2, title: "Visuals" },
    { id: 3, title: "Services" },
    { id: 4, title: "Review" },
  ];

  const goBack = () => setCurrentStep((s) => Math.max(1, s - 1));

  const uploadFile = React.useCallback(
    async (file: File, type: UploadType, preferKey = false) => {
      const presignedResponse = await uploadService.getPresignedUploadUrl({
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        type,
      });

      const { uploadUrl, fileUrl, fileKey } =
        resolvePresignedUrls(presignedResponse);
      await uploadService.uploadToPresignedUrl(uploadUrl, file);

      return preferKey ? fileKey || fileUrl : fileUrl;
    },
    [],
  );

  const uploadFiles = React.useCallback(
    async (files: File[], type: UploadType, preferKey = false) => {
      if (!files.length) return [] as string[];
      return Promise.all(
        files.map((file) => uploadFile(file, type, preferKey)),
      );
    },
    [uploadFile],
  );

  const handleStepOne = async (step1: StepOneValues) => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const askingPrice = calculateAskingPrice(step1);

      const payload = {
        title: step1.adTitle.trim(),
        description: step1.description.trim(),
        propertyType: step1.propertyType,
        sellableAmount: Number(step1.sellableAmount || 0),
        sellableUnit: step1.sellableUnit,
        askingPricePerUnit: Number(step1.pricePerKatha || 0),
        askingPrice: askingPrice,
        isPropertyShareable: step1.shareUnitEnabled ?? false,
        roadDistanceMin: toOptionalNumber(step1.distanceMin),
        roadDistanceMax: toOptionalNumber(step1.distanceMax),
        plotSize: toOptionalNumber(step1.plotSize),
        plotUnit: Number.isFinite(step1.plotSize) ? step1.plotSizeUnit : undefined,
        shareAmount: step1.shareUnitEnabled
          ? toOptionalNumber(step1.shareUnitAmount)
          : undefined,
        shareUnit: step1.shareUnitEnabled ? step1.shareUnitUnit : undefined,
        division: step1.division?.value || undefined,
        district: step1.district?.value || undefined,
        upazila: step1.upazila?.value || undefined,
        unionOrCityCorp: step1.pouroshovaOrUnion?.trim() || undefined,
        wardNo: step1.wardNo?.trim() || undefined,
        postalCode: step1.postalCode?.trim() || undefined,
        fullAddress: step1.fullAddress?.trim() || undefined,
      };

      const response = draftId
        ? await updateSellPostStepOne({ postId: draftId, payload })
        : await createSellPostStepOne(payload);

      setDraftId(response.id);
      setData((prev) => ({ ...prev, step1 }));
      setCurrentStep(2);
      toast.success("Property details saved.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to save property details."));
    } finally {
      setIsSaving(false);
    }
  };

  const handleStepTwo = async (step2: StepTwoValues) => {
    if (isSaving) return;
    if (!draftId) {
      toast.error("Draft is missing. Please save Step 1 first.");
      return;
    }
    setIsSaving(true);

    try {
      const photos = await uploadFiles(step2.photos ?? [], "AVATAR");
      const videoUrl = step2.video
        ? await uploadFile(step2.video, "AVATAR")
        : undefined;
      const deedFiles = await uploadFiles(
        step2.deedDocuments ?? [],
        "DEED",
        true,
      );
      const khatianFiles = await uploadFiles(
        step2.khatianDocuments ?? [],
        "DEED",
        true,
      );
      const otherFiles = await uploadFiles(
        step2.otherDocuments ?? [],
        "DEED",
        true,
      );

      const response = await updateSellPostStepTwo({
        postId: draftId,
        payload: {
          photos: photos.length ? photos : undefined,
          videoUrl,
          deedFiles: deedFiles.length ? deedFiles : undefined,
          khatianFiles: khatianFiles.length ? khatianFiles : undefined,
          otherFiles: otherFiles.length ? otherFiles : undefined,
        },
      });

      setDraftId(response.id);
      setData((prev) => ({ ...prev, step2 }));
      setCurrentStep(3);
      toast.success("Visuals saved.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to save visuals."));
    } finally {
      setIsSaving(false);
    }
  };

  const handleStepThree = async (step3: StepThreeValues) => {
    if (isSaving) return;
    if (!draftId) {
      toast.error("Draft is missing. Please save Step 1 first.");
      return;
    }
    setIsSaving(true);

    try {
      const selectedServices = Array.from(
        new Set([
          ...(step3.mandatoryServiceIds ?? []),
          ...(step3.optionalServiceIds ?? []),
        ]),
      );

      const response = await updateSellPostStepThree({
        postId: draftId,
        payload: { selectedServices },
      });

      setDraftId(response.id);
      setData((prev) => ({ ...prev, step3 }));
      setCurrentStep(4);
      toast.success("Services saved.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to save services."));
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmitForReview = async (step4: StepFourValues) => {
    if (isSaving) return false;
    if (!draftId) {
      toast.error("Draft is missing. Please save your post first.");
      return false;
    }

    setIsSaving(true);

    try {
      await submitForReview(draftId);
      setData((prev) => ({ ...prev, step4 }));
      toast.success("Post submitted for review.");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to submit post."));
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full py-24 space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowLeft size={28} />
          <h1 className="text-xl font-semibold text-black">Create Sell Post</h1>
        </div>

        <button className="text-primary text-base font-semibold">
          Save as Draft
        </button>
      </div>
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
            <SellPropertyStepOneForm
              defaultValues={data.step1}
              onNext={handleStepOne}
            />
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <SellPropertyStepTwoForm
              defaultValues={data.step2}
              onBack={goBack}
              onNext={handleStepTwo}
            />
          )}
          {/* STEP 3 */}
          {currentStep === 3 && (
            <SellPropertyStepThreeForm
              defaultValues={data.step3}
              onBack={goBack}
              onNext={handleStepThree}
            />
          )}

          {currentStep === 4 && (
            <SellPropertyStepFourReview
              allData={{
                step1: data.step1,
                step2: data.step2,
                step3: data.step3,
              }}
              onBack={goBack}
              onSubmit={handleSubmitForReview}
            />
          )}
        </section>
      </div>
    </div>
  );
}
