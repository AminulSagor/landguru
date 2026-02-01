"use client";

import React from "react";
import {
  ProcessStepper,
  Step as StepperStep,
} from "@/components/steppers/process-stepper";
import { BuyStepOneValues } from "@/app/(user)/dashboard/types/property-buy-post";
import BuyPostStepOneForm from "@/app/(user)/dashboard/(pages)/posts/buy/create/_components/buy-post-step-one";
import BuyPostStepTwoReview from "@/app/(user)/dashboard/(pages)/posts/buy/create/_components/buy-post-step-two-review";

type BuyPostData = {
  step1?: BuyStepOneValues;
};

export default function CreateBuyPostPage() {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [data, setData] = React.useState<BuyPostData>({});

  const steps: StepperStep[] = [
    { id: 1, title: "Buy Post Details" },
    { id: 2, title: "Review your requirements" },
  ];

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
            <BuyPostStepOneForm
              defaultValues={data.step1}
              onNext={(step1: BuyStepOneValues) => {
                setData({ step1 });
                setCurrentStep(2);
              }}
            />
          )}

          {/* STEP 2 */}
          {currentStep === 2 && data.step1 && (
            <BuyPostStepTwoReview
              step1={data.step1}
              onBack={goBack}
              onSubmit={async () => {
                //  later API submit here
                // await createBuyPost(data.step1)
                // dialog open handled inside Step 2 component after this resolves
              }}
            />
          )}
        </section>
      </div>
    </div>
  );
}
