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
import { authService } from "@/service/auth/auth.login";
import { getDashboardPathByRole, setToken, setUserRole } from "@/utils/cookies.utils";
import { ApiError, LoginResponse } from "@/types/auth/login.types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {

  const [loading, setLoading] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: { phone: "", password: "" },
  });
  const router = useRouter();
  const onSubmit = async (data: LoginFormValues) => {
    //login api
    console.log(data);
    setLoading(true);

    try {
      const response: LoginResponse = await authService.login({
        phone: data.phone,
        password: data.password,
      });

      if (!response?.success) {
        toast.error(response?.message || "Login failed");
        return;
      }

      if(response.user.role !== "user") {
        toast.error(`${response.user.role} accounts cannot login here`);
        return;
      }

      setToken(response.accessToken);
      setUserRole(response.user.role);
      toast.success(response.message || "Login successful");
      router.replace(getDashboardPathByRole(response.user.role));
    } catch (error) {
      const apiError = error as ApiError;
      const message =
        apiError?.response?.data?.message || apiError?.message || "Login failed";

      toast.error(Array.isArray(message) ? message.join("\n") : message);
    } finally {
      setLoading(false);
    }
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
            Welcome
          </h1>
          <p className="mt-2 text-center text-sm text-gray">
            Enter your phone number to access <br /> exclusive property
            listings.
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
                  href="/auth/user/signup/forgot-password"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Forgot password?
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
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/user/signup"
                className="text-primary font-semibold"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
