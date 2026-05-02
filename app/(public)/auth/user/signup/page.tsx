"use client";

import React from "react";
import SignUpStepOne from "@/app/(public)/auth/user/signup/_components/sign-up-step-one";
import SignUpStepTwo from "@/app/(public)/auth/user/signup/_components/sign-up-step-two";
import SignUpStepThree from "@/app/(public)/auth/user/signup/_components/sign-up-step-three";
import SignUpStepFour, {
  SignUpStepFourFormValues,
} from "@/app/(public)/auth/user/signup/_components/sign-up-step-four";
import SignUpStepFive, {
  SignUpStepFivePayload,
} from "@/app/(public)/auth/user/signup/_components/sign-up-step-five";
import { signupService } from "@/service/auth/auth.signup";
import type {
  ApiError,
  CompleteSignupIdentityPayload,
  PresignedUploadUrlResponse,
  UploadType,
} from "@/types/auth/signup.types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const TOTAL_STEPS = 5;

const AVATAR_BUCKET_HOST = "landbuyself-mediafiles.s3.ap-south-1.amazonaws.com";

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
    (response.key ? `https://${AVATAR_BUCKET_HOST}/${response.key}` : withoutQuery);

  return {
    uploadUrl: cleanedUploadUrl,
    fileUrl,
  };
};

const SignUpPage = () => {
  const router = useRouter();

  const [step, setStep] = React.useState<number>(1);
  const [phone, setPhone] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [stepFourData, setStepFourData] = React.useState<SignUpStepFourFormValues | null>(
    null,
  );

  const [isSendingOtp, setIsSendingOtp] = React.useState<boolean>(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = React.useState<boolean>(false);
  const [isResendingOtp, setIsResendingOtp] = React.useState<boolean>(false);
  const [isCompletingSignup, setIsCompletingSignup] = React.useState<boolean>(false);

  const next = React.useCallback(() => {
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  }, []);

  const back = React.useCallback(() => {
    setStep((s) => Math.max(1, s - 1));
  }, []);

  const requestSignupOtp = React.useCallback(async (nextPhone: string) => {
    if (!nextPhone?.trim()) {
      toast.error("Phone number is required");
      return;
    }

    try {
      setIsSendingOtp(true);

      const response = await signupService.sendOtp({
        phone: nextPhone,
        forgetPassword: false,
      });

      if (!response.success) {
        toast.error(response.message || "Failed to send OTP");
        return;
      }

      setPhone(nextPhone);
      toast.success(response.message || "OTP sent successfully");
      next();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to send OTP"));
    } finally {
      setIsSendingOtp(false);
    }
  }, [next]);

  const verifySignupOtp = React.useCallback(async (otp: string) => {
    if (!phone) {
      toast.error("Phone number is missing. Please start again.");
      setStep(1);
      return;
    }

    try {
      setIsVerifyingOtp(true);

      const response = await signupService.verifyOtp({ phone, otp });

      if (!response.success || !response.verified) {
        toast.error(response.message || "OTP verification failed");
        return;
      }

      toast.success(response.message || "OTP verified");
      next();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "OTP verification failed"));
    } finally {
      setIsVerifyingOtp(false);
    }
  }, [next, phone]);

  const resendSignupOtp = React.useCallback(async () => {
    if (!phone) {
      toast.error("Phone number is missing. Please start again.");
      setStep(1);
      return;
    }

    try {
      setIsResendingOtp(true);

      const response = await signupService.sendOtp({
        phone,
        forgetPassword: false,
      });

      if (!response.success) {
        toast.error(response.message || "Failed to resend OTP");
        return;
      }

      toast.success(response.message || "OTP sent successfully");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to resend OTP"));
    } finally {
      setIsResendingOtp(false);
    }
  }, [phone]);

  const uploadFileAndGetUrl = React.useCallback(
    async (file: File, type: UploadType): Promise<string> => {
      const presignedResponse = await signupService.getPresignedUploadUrl({
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        type,
      });

      const { uploadUrl, fileUrl } = resolvePresignedUrls(presignedResponse);
      await signupService.uploadToPresignedUrl(uploadUrl, file);

      return fileUrl;
    },
    [],
  );

  const onCompleteRegistration = React.useCallback(
    async (payload: SignUpStepFivePayload) => {
      if (!phone || !password || !stepFourData) {
        toast.error("Signup data is incomplete. Please complete all steps.");
        setStep(1);
        return;
      }

      try {
        setIsCompletingSignup(true);

        const photoUrl = stepFourData.photo
          ? await uploadFileAndGetUrl(stepFourData.photo, "AVATAR")
          : "";

        const signupResponse = await signupService.completeSignup({
          phone,
          password,
          role: "user",
          fullName: stepFourData.fullName,
          email: stepFourData.email,
          photoUrl,
          division:
            typeof stepFourData.division === "string"
              ? stepFourData.division
              : stepFourData.division?.value || "",
          district:
            typeof stepFourData.district === "string"
              ? stepFourData.district
              : stepFourData.district?.value || "",
          upazila:
            typeof stepFourData.upazila === "string"
              ? stepFourData.upazila
              : stepFourData.upazila?.value || "",
          unionOrCityCorp:
            typeof stepFourData.pouroshovaOrUnion === "string"
              ? stepFourData.pouroshovaOrUnion
              : stepFourData.pouroshovaOrUnion?.value || "",
          wardNo:
            typeof stepFourData.wardNo === "string"
              ? stepFourData.wardNo
              : stepFourData.wardNo?.value || "",
          postalCode: stepFourData.postalCode,
          fullAddress: stepFourData.fullAddress,
        });

        if (!signupResponse.success) {
          toast.error(signupResponse.message || "Failed to complete signup");
          return;
        }

        if (!payload.skipped) {
          const identityPayload: CompleteSignupIdentityPayload = { phone };

          if (payload.nidFront) {
            identityPayload.nidFrontUrl = await uploadFileAndGetUrl(
              payload.nidFront,
              "DEED",
            );
          }

          if (payload.nidBack) {
            identityPayload.nidBackUrl = await uploadFileAndGetUrl(
              payload.nidBack,
              "DEED",
            );
          }

          if (payload.tin) {
            identityPayload.tinCertificateUrl = await uploadFileAndGetUrl(
              payload.tin,
              "DEED",
            );
          }

          const identityResponse = await signupService.completeSignupIdentity(
            identityPayload,
          );

          if (!identityResponse.success) {
            toast.error(identityResponse.message || "Failed to save identity");
            return;
          }
        }

        toast.success("Signup completed successfully");
        router.replace("/auth/user/login");
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Signup failed"));
      } finally {
        setIsCompletingSignup(false);
      }
    },
    [password, phone, router, stepFourData, uploadFileAndGetUrl],
  );

  return (
    <div>
      {step === 1 && (
        <SignUpStepOne
          onNext={requestSignupOtp}
          onBack={back}
          isLoading={isSendingOtp}
        />
      )}

      {step === 2 && (
        <SignUpStepTwo
          phone={phone}
          onNext={verifySignupOtp}
          onBack={back}
          onResend={resendSignupOtp}
          isSubmitting={isVerifyingOtp}
          isResending={isResendingOtp}
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
            setStepFourData(data);
            next();
          }}
        />
      )}

      {step === 5 && (
        <SignUpStepFive
          onBack={back}
          onSkip={() => {
            onCompleteRegistration({
              nidFront: null,
              nidBack: null,
              tin: null,
              skipped: true,
            });
          }}
          onComplete={onCompleteRegistration}
          isSubmitting={isCompletingSignup}
        />
      )}
    </div>
  );
};

export default SignUpPage;
