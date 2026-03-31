"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import Button from "@/components/buttons/button";
import CircleLoader from "@/components/loaders/circle-loader";
import { HookFormTextInput } from "@/components/inputs/text-input";
import { authService } from "@/service/auth/auth.login";
import {
  getDashboardPathByRole,
  setToken,
  setUserRole,
} from "@/utils/cookies.utils";
import type { ApiError } from "@/types/auth/login.types";

type LoginForm = {
  phone: string;
  password: string;
  remember: boolean;
};

export default function LoginCard() {
  const router = useRouter();

  const { control, handleSubmit, setValue, watch } = useForm<LoginForm>({
    defaultValues: {
      phone: "",
      password: "",
      remember: false,
    },
  });

  const remember = watch("remember");
  const [showPass, setShowPass] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);

      const response = await authService.login({
        phone: data.phone,
        password: data.password,
      });

      if (!response.success || !response.accessToken || !response.user?.role) {
        toast.error("Login failed");
        return;
      }

      const role = response.user.role;

      if (role !== "admin" && role !== "super_admin") {
        toast.error("This account is not allowed in admin portal");
        return;
      }

      setToken(response.accessToken, data.remember);
      setUserRole(role, data.remember);
      

      toast.success(response.message || "Login successful");

      router.replace(getDashboardPathByRole(role));
      router.refresh();
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

      toast.error(apiError.message || "Unable to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-gray/10 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <h2 className="text-base font-extrabold text-black">Admin Portal</h2>
        <p className="mt-1 text-xs font-medium">Log in to manage your zone</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <HookFormTextInput<LoginForm>
            name="phone"
            control={control}
            label="Admin ID / Phone"
            placeholder="+8801234567890"
            type="tel"
            rules={{ required: "Phone is required" }}
            startAdornment={<User size={16} className="text-primary" />}
            inputClassName="h-11 text-sm"
          />

          <HookFormTextInput<LoginForm>
            name="password"
            control={control}
            label="Password"
            placeholder="Enter your password"
            type={showPass ? "text" : "password"}
            rules={{ required: "Password is required" }}
            startAdornment={<Lock size={16} className="text-primary" />}
            endAdornment={
              <button
                type="button"
                onClick={() => setShowPass((prev) => !prev)}
                className="text-gray/50 hover:text-gray"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
            inputClassName="h-11 pr-12 text-sm"
          />

          <div className="flex items-center justify-between pt-1">
            <label className="flex cursor-pointer select-none items-center gap-2 text-xs font-semibold text-gray/70">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setValue("remember", e.target.checked)}
                className="h-4 w-4 rounded border border-gray/30"
              />
              Remember this device
            </label>

            <Link
              href="/auth/admin/forgot-password"
              className="text-xs font-semibold text-primary hover:opacity-90"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            <span className="inline-flex items-center gap-2">
              {isLoading ? (
                <>
                  <CircleLoader size={16} />
                  Logging in...
                </>
              ) : (
                <>
                  Login <span aria-hidden>→</span>
                </>
              )}
            </span>
          </Button>
        </form>
      </div>

      <p className="mt-6 text-center text-xs font-medium text-gray/60">
        © 2026 LandGuru Admin Portal. All rights reserved.
      </p>
    </div>
  );
}
