"use client";
import ForgotPasswordStepOne from "@/app/auth/signup/forgot-password/_components/forgot-password-step-one";
import ForgotPasswordStepTwo from "@/app/auth/signup/forgot-password/_components/forgot-password-step-two";
import React from "react";

const TOTAL_STEPS = 3;

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
    </div>
  );
};

export default ForgotPasswordPage;
