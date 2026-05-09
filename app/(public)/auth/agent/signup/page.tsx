"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HookFormBDPhoneInput } from "@/components/inputs/HookFormBDPhoneInput";
import { HookFormPasswordInput } from "@/components/inputs/HookFormPasswordInput";
import Button from "@/components/buttons/button";
import CircleLoader from "@/components/loaders/circle-loader";
import { LoginFormValues } from "@/interfaces/auth";
import Link from "next/link";
import Image from "next/image";

export default function AgentSignUpPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: { phone: "", password: "" },
  });

  const onSubmit = (data: LoginFormValues) => {
    // TODO: Hook up signup API
    console.log("Agent signup:", data);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="/images/auth-home.png"
          alt="House"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex items-center justify-center px-6 py-10 bg-white">
        <div className="w-full max-w-sm">
          <div className="flex justify-center">
            <span className="inline-flex items-center rounded-lg bg-primary px-6 py-2 text-white text-sm font-semibold shadow">
              LandGuru
            </span>
          </div>

          <h1 className="mt-6 text-center text-3xl font-bold text-black">Agent Registration</h1>
          <p className="mt-2 text-center text-sm text-gray">
            Create an agent account. Accounts may require admin approval.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <HookFormBDPhoneInput<LoginFormValues>
              name="phone"
              control={control}
              label="Phone Number"
            />

            <HookFormPasswordInput<LoginFormValues>
              name="password"
              control={control}
              label="Password"
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <CircleLoader /> : "Register"}
            </Button>

            <p className="text-center text-sm text-gray">
              Already have an account? <Link href="/auth/agent/login" className="text-primary">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
