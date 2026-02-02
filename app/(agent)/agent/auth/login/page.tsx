"use client";

import { HookFormBDPhoneInput } from "@/components/inputs/HookFormBDPhoneInput";
import { HookFormPasswordInput } from "@/components/inputs/HookFormPasswordInput";
import Button from "@/components/buttons/button";
import CircleLoader from "@/components/loaders/circle-loader";
import { LoginFormValues } from "@/interfaces/auth";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: { phone: "", password: "" },
  });

  const onSubmit = (data: LoginFormValues) => {
    //login api
    console.log(data);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left image */}
      <div className="relative hidden lg:block">
        <Image
          src="/images/auth-home.png"
          alt="House"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center px-6 py-10 bg-white">
        <div className="w-full max-w-sm">
          <div className="flex justify-center">
            <span className="inline-flex items-center rounded-lg bg-primary px-6 py-2 text-white text-sm font-semibold shadow">
              LandGuru
            </span>
          </div>

          <h1 className="mt-6 text-center text-3xl font-bold text-black">
            Agent Portal
          </h1>
          <p className="mt-2 text-center text-sm text-gray">
            Secure access for authorized personnel only <br /> (Lawyers,
            Surveyors, Deed Writer, Field Assistant)
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <HookFormBDPhoneInput<LoginFormValues>
              name="phone"
              control={control}
              label="Phone Number"
            />

            <div className="space-y-2">
              <HookFormPasswordInput<LoginFormValues>
                name="password"
                control={control}
                label="Password"
              />

              <div className="flex justify-end">
                <Link
                  href="/auth/signup/forgot-password"
                  className="text-sm text-primary"
                >
                  Forgot password ? Contact Support
                </Link>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <CircleLoader />
              ) : (
                <>
                  Login
                  <ArrowRight size={20} />
                </>
              )}
            </Button>

            <p className="text-center text-sm text-gray">
              Restricted Area. Accounts are issued by administration only.{" "}
              <br />
              IP Address logged for security
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
