"use client";
import ForgotPasswordStepOne from "@/app/(agent)/agent/auth/forgot-password/_components/step-one";
import ForgotPasswordStepTwo from "@/app/(agent)/agent/auth/forgot-password/_components/step-two";
import React from "react";

const TOTAL_STEPS = 2;

const ForgotPasswordPage = () => {
  const [step, setStep] = React.useState(1);
  const [phone, setPhone] = React.useState("");

  const next = React.useCallback(() => {
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  }, []);

  const back = React.useCallback(() => {
    setStep((s) => Math.max(1, s - 1));
  }, []);
  return (
    <div>
      {step === 1 && (
        <ForgotPasswordStepOne
          setPhone={setPhone}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 2 && <ForgotPasswordStepTwo />}
    </div>
  );
};

export default ForgotPasswordPage;
