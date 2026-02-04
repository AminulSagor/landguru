"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { User } from "lucide-react";
import Button from "@/components/buttons/button";
import { HookFormTextInput } from "@/components/inputs/text-input";
import { redirect } from "next/navigation";

type ForgotForm = {
  phone: string;
};

export default function ForgotPasswordCard() {
  const { control, handleSubmit } = useForm<ForgotForm>({
    defaultValues: { phone: "" },
  });

  const onSubmit = async (data: ForgotForm) => {
    console.log(data);
    redirect("/admin/auth/reset-success");
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray/10 p-8">
        <h2 className="text-sm font-extrabold text-black">Reset Password</h2>
        <p className="mt-1 text-xs font-medium text-gray/80">
          Enter your registered phone number to send request to super admin.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <HookFormTextInput<ForgotForm>
            name="phone"
            control={control}
            label="Phone Number"
            placeholder="01XXXXXXXXX"
            type="tel"
            rules={{ required: "Phone number is required" }}
            startAdornment={<User size={16} className="text-primary" />}
            inputClassName="h-11 text-sm"
          />

          <Button type="submit" className="w-full">
            <span className="inline-flex items-center gap-2">
              Send Reset Request <span aria-hidden>→</span>
            </span>
          </Button>

          <div className="pt-1 text-center">
            <Link
              href="/admin/login"
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
