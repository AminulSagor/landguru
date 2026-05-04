"use client";
import FinalStep from "@/app/(public)/auth/user/signup/forgot-password/_components/final-step";
import ForgotPasswordStepOne from "@/app/(public)/auth/user/signup/forgot-password/_components/forgot-password-step-one";
import ForgotPasswordStepThree from "@/app/(public)/auth/user/signup/forgot-password/_components/forgot-password-step-three";
import ForgotPasswordStepTwo from "@/app/(public)/auth/user/signup/forgot-password/_components/forgot-password-step-two";
import { forgotPasswordService } from "@/service/auth/auth.forgot-password";
import type { ApiError } from "@/types/auth/forgot-password.types";
import React from "react";
import toast from "react-hot-toast";

const TOTAL_STEPS = 4;

const getApiErrorMessage = (error: unknown) => {
  const apiError = error as ApiError;
  const message = apiError.response?.data?.message;

  if (Array.isArray(message) && message.length > 0) {
    return message[0];
  }

  if (typeof message === "string" && message.trim()) {
    return message;
  }

  return apiError.message || "Something went wrong. Please try again.";
};

const ForgotPasswordPage = () => {
  const [step, setStep] = React.useState(1);
  const [phone, setPhone] = React.useState("");
  const [isSendingOtp, setIsSendingOtp] = React.useState(false);
  const [isResendingOtp, setIsResendingOtp] = React.useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = React.useState(false);
  const [isSavingPassword, setIsSavingPassword] = React.useState(false);

  const next = React.useCallback(() => {
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  }, []);

  const back = React.useCallback(() => {
    setStep((s) => Math.max(1, s - 1));
  }, []);

  const handleSendOtp = React.useCallback(
    async (phoneValue: string, isResend = false) => {
      if (!phoneValue.trim()) {
        toast.error("Phone number is required");
        return;
      }

      if (isResend) {
        setIsResendingOtp(true);
      } else {
        setIsSendingOtp(true);
      }

      try {
        const response = await forgotPasswordService.sendOtp({
          phone: phoneValue,
          forgetPassword: true,
        });

        if (!response.success) {
          toast.error(response.message || "Failed to send OTP");
          return;
        }

        toast.success(response.message || "OTP sent successfully");

        if (!isResend) {
          setPhone(phoneValue);
          next();
        }
      } catch (error: unknown) {
        toast.error(getApiErrorMessage(error));
      } finally {
        if (isResend) {
          setIsResendingOtp(false);
        } else {
          setIsSendingOtp(false);
        }
      }
    },
    [next],
  );

  const handleVerifyOtp = React.useCallback(
    async (otp: string) => {
      if (!phone.trim()) {
        toast.error("Phone number is required");
        return;
      }

      setIsVerifyingOtp(true);

      try {
        const response = await forgotPasswordService.verifyOtp({
          phone,
          otp,
        });

        if (!response.success || !response.verified) {
          toast.error(response.message || "OTP verification failed");
          return;
        }

        toast.success(response.message || "OTP verified");
        next();
      } catch (error: unknown) {
        toast.error(getApiErrorMessage(error));
      } finally {
        setIsVerifyingOtp(false);
      }
    },
    [next, phone],
  );

  const handleSavePassword = React.useCallback(
    async (newPassword: string) => {
      if (!phone.trim()) {
        toast.error("Phone number is required");
        return;
      }

      setIsSavingPassword(true);

      try {
        const response = await forgotPasswordService.resetPassword({
          phone,
          password: newPassword,
        });

        if (!response.success) {
          toast.error(response.message || "Failed to reset password");
          return;
        }

        toast.success(response.message || "Password reset successfully");
        next();
      } catch (error: unknown) {
        toast.error(getApiErrorMessage(error));
      } finally {
        setIsSavingPassword(false);
      }
    },
    [next, phone],
  );

  return (
    <div>
      {step === 1 && (
        <ForgotPasswordStepOne
          onSubmit={(value) => handleSendOtp(value, false)}
          onBack={back}
          isLoading={isSendingOtp}
        />
      )}

      {step === 2 && (
        <ForgotPasswordStepTwo
          phone={phone}
          onVerify={handleVerifyOtp}
          onBack={back}
          onResend={() => handleSendOtp(phone, true)}
          isVerifying={isVerifyingOtp}
          isResending={isResendingOtp}
        />
      )}

      {step === 3 && (
        <ForgotPasswordStepThree
          onSubmit={handleSavePassword}
          onBack={back}
          isLoading={isSavingPassword}
        />
      )}

      {step === 4 && <FinalStep />}
    </div>
  );
};

export default ForgotPasswordPage;
