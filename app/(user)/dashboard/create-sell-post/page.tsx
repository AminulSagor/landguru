"use client";

import React from "react";
import {
  ProcessStepper,
  Step as StepperStep,
} from "@/components/steppers/process-stepper";

import SellPropertyStepOneForm from "@/app/(user)/dashboard/create-sell-post/_components/sell-property-step-one";
import SellPropertyStepTwoForm from "@/app/(user)/dashboard/create-sell-post/_components/sell-property-step-two";

import {
  StepFourValues,
  StepOneValues,
  StepThreeValues,
  StepTwoValues,
} from "@/app/(user)/dashboard/types/property-sell-post";
import SellPropertyStepThreeForm from "@/app/(user)/dashboard/create-sell-post/_components/sell-property-step-three";
import SellPropertyStepFourReview from "@/app/(user)/dashboard/create-sell-post/_components/sell-property-step-final";

type SellPostData = {
  step1?: StepOneValues;
  step2?: StepTwoValues;
  step3?: StepThreeValues;
};

export default function CreateSellPostPage() {
  const [currentStep, setCurrentStep] = React.useState<number>(4);
  const [data, setData] = React.useState<SellPostData>({});

  const steps: StepperStep[] = [
    { id: 1, title: "Property Details" },
    { id: 2, title: "Visuals" },
    { id: 3, title: "Services" },
    { id: 4, title: "Review" },
  ];

  const goNext = () => setCurrentStep((s) => Math.min(4, s + 1));
  const goBack = () => setCurrentStep((s) => Math.max(1, s - 1));

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
            <SellPropertyStepOneForm
              defaultValues={data.step1}
              onNext={(step1) => {
                setData((prev) => ({ ...prev, step1 }));
                setCurrentStep(2);
              }}
            />
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <SellPropertyStepTwoForm
              defaultValues={data.step2}
              onBack={goBack}
              onNext={(step2) => {
                setData((prev) => ({ ...prev, step2 }));
                setCurrentStep(3);
              }}
            />
          )}
          {/* STEP 3 */}
          {currentStep === 3 && (
            <SellPropertyStepThreeForm
              defaultValues={data.step3}
              onBack={goBack}
              onNext={(step3) => {
                setData((prev) => ({ ...prev, step3 }));
                setCurrentStep(4); // go to review
              }}
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
              onSubmit={async (step4: StepFourValues) => {
                setData((prev) => ({ ...prev, step4 }));

                // ✅ Later: API call here
                // await createSellPost({ ...prev, step4 })

                // NOTE: Dialog open is handled inside Step-4 component after this resolves.
              }}
            />
          )}
        </section>
      </div>
    </div>
  );
}
