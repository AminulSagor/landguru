"use client";
import FinalStep from "@/app/(public)/auth/user/signup/forgot-password/_components/final-step";
import ForgotPasswordStepOne from "@/app/(public)/auth/user/signup/forgot-password/_components/forgot-password-step-one";
import ForgotPasswordStepThree from "@/app/(public)/auth/user/signup/forgot-password/_components/forgot-password-step-three";
import ForgotPasswordStepTwo from "@/app/(public)/auth/user/signup/forgot-password/_components/forgot-password-step-two";
import React from "react";

const TOTAL_STEPS = 4;

const ForgotPasswordPage = () => {
  const [step, setStep] = React.useState(1);
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");

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

      {step === 2 && (
        <ForgotPasswordStepTwo
          phone={phone}
          onNext={next}
          onBack={back}
          onResend={() => {
            console.log("RESEND OTP to:", phone);
          }}
        />
      )}

      {step === 3 && (
        <ForgotPasswordStepThree
          onNext={next}
          onBack={back}
          setPassword={setPassword}
        />
      )}

      {step === 4 && <FinalStep />}
    </div>
  );
};

export default ForgotPasswordPage;
