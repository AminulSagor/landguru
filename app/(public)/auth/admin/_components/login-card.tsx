"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import Button from "@/components/buttons/button";
import { HookFormTextInput } from "@/components/inputs/text-input";

type LoginForm = {
  phone: string;
  password: string;
  remember: boolean;
};

export default function LoginCard() {
  const { control, handleSubmit, setValue, watch } = useForm<LoginForm>({
    defaultValues: { phone: "", password: "", remember: false },
  });

  const remember = watch("remember");
  const [showPass, setShowPass] = React.useState(false);

  const onSubmit = (data: LoginForm) => {
    console.log(data);
    // TODO: call login api
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray/10 p-8">
        <h2 className="text-base font-extrabold text-black">Admin Portal</h2>
        <p className="mt-1 text-xs font-medium">
          Log in to manage your zone
        </p>

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
                onClick={() => setShowPass((v) => !v)}
                className="text-gray/50 hover:text-gray"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
            inputClassName="h-11 text-sm pr-12"
          />

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs font-semibold text-gray/70 select-none cursor-pointer">
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

          <Button type="submit" className="w-full">
            <span className="inline-flex items-center gap-2">
              Login <span aria-hidden>→</span>
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
