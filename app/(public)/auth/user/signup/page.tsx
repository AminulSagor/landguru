"use client";

import React from "react";
import SignUpStepOne from "@/app/(public)/auth/user/signup/_components/sign-up-step-one";
import SignUpStepTwo from "@/app/(public)/auth/user/signup/_components/sign-up-step-two";
import SignUpStepThree from "@/app/(public)/auth/user//signup/_components/sign-up-step-three";
import SignUpStepFour from "@/app/(public)/auth/user/signup/_components/sign-up-step-four";
import SignUpStepFive from "@/app/(public)/auth/user/signup/_components/sign-up-step-five";

const TOTAL_STEPS = 5;

type CompletePayload = {
  nidFront?: File | null;
  nidBack?: File | null;
  tin?: File | null;
  skipped: boolean;
};

const SignUpPage = () => {
  const [step, setStep] = React.useState(1);
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");

  const next = React.useCallback(() => {
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  }, []);

  const back = React.useCallback(() => {
    setStep((s) => Math.max(1, s - 1));
  }, []);

  const onCompleteRegistration = React.useCallback(
    (payload: CompletePayload) => {
      console.log("COMPLETE REGISTRATION:", {
        phone,
        password,
        ...payload,
      });
    },
    [phone, password],
  );

  return (
    <div>
      {step === 1 && (
        <SignUpStepOne setPhone={setPhone} onNext={next} onBack={back} />
      )}

      {step === 2 && (
        <SignUpStepTwo
          phone={phone}
          onNext={next}
          onBack={back}
          onResend={() => {
            console.log("RESEND OTP to:", phone);
          }}
        />
      )}

      {step === 3 && (
        <SignUpStepThree
          onNext={next}
          onBack={back}
          setPassword={setPassword}
        />
      )}

      {step === 4 && (
        <SignUpStepFour
          phone={phone}
          onBack={back}
          onNext={(data) => {
            console.log("STEP 4 DATA:", data);
            next();
          }}
        />
      )}

      {step === 5 && (
        <SignUpStepFive
          onBack={back}
          onSkip={() => {
            onCompleteRegistration({ skipped: true });
          }}
          onComplete={(payload) => {
            console.log("STEP 5:", payload);
            onCompleteRegistration(payload);
          }}
        />
      )}
    </div>
  );
};

export default SignUpPage;
