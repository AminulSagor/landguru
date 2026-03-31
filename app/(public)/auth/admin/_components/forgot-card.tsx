"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { User } from "lucide-react";
import Button from "@/components/buttons/button";
import CircleLoader from "@/components/loaders/circle-loader";
import { HookFormTextInput } from "@/components/inputs/text-input";
import { forgotPasswordService } from "@/service/auth/auth.forgot-password";
import type {
  ApiError,
  ForgotPasswordForm,
} from "@/types/auth/forgot-password.types";

export default function ForgotPasswordCard() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<ForgotPasswordForm>({
    defaultValues: { phone: "" },
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      setIsLoading(true);

      const response = await forgotPasswordService.sendOtp({
        phone: data.phone,
        forgetPassword: false,
      });

      if (!response.success) {
        toast.error(response.message || "Failed to send reset request");
        return;
      }

      toast.success(response.message || "Reset request sent successfully");
      router.push("/auth/admin/reset-success");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.response?.data?.message;

      if (Array.isArray(message) && message.length > 0) {
        toast.error(message[0]);
        return;
      }

      if (typeof message === "string" && message.trim()) {
        toast.error(message);
        return;
      }

      toast.error(
        apiError.message || "Unable to send reset request. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-gray/10 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <h2 className="text-sm font-extrabold text-black">Reset Password</h2>
        <p className="mt-1 text-xs font-medium text-gray/80">
          Enter your registered phone number to send request to super admin.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <HookFormTextInput<ForgotPasswordForm>
            name="phone"
            control={control}
            label="Phone Number"
            placeholder="01XXXXXXXXX"
            type="tel"
            rules={{ required: "Phone number is required" }}
            startAdornment={<User size={16} className="text-primary" />}
            inputClassName="h-11 text-sm"
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            <span className="inline-flex items-center gap-2">
              {isLoading ? (
                <>
                  <CircleLoader size={16} />
                  Sending Request...
                </>
              ) : (
                <>
                  Send Reset Request <span aria-hidden>→</span>
                </>
              )}
            </span>
          </Button>

          <div className="pt-1 text-center">
            <Link
              href="/auth/admin/login"
              className="text-xs font-semibold text-primary hover:opacity-90"
            >
              ← Back to Login
            </Link>
          </div>
        </form>
      </div>

      <p className="mt-6 text-center text-xs font-medium text-gray/60">
        © 2026 LandGuru Admin Portal. All rights reserved.
      </p>
    </div>
  );
}
