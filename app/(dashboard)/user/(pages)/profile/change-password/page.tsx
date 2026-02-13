"use client";

import React from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { useForm } from "react-hook-form";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { HookFormTextInput } from "@/components/inputs/text-input";

type ChangePasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordPage() {
  const form = useForm<ChangePasswordFormValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const { control, handleSubmit, watch } = form;

  const [show, setShow] = React.useState({
    current: false,
    next: false,
    confirm: false,
  });

  const onSubmit = (values: ChangePasswordFormValues) => {
    console.log(values);
  };

  const newPass = watch("newPassword");

  return (
    <div className="w-full max-w-xl space-y-5 py-25 mx-auto">
      {/* Back */}
      <button
        type="button"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray/70 hover:text-gray"
        onClick={() => history.back()}
      >
        <ArrowLeft size={18} />
        Back to My Profile
      </button>

      <div className="flex justify-center">
        <Card className="w-full max-w-xl !p-0 overflow-hidden">
          {/* Header */}
          <div className="px-8 py-7">
            <h1 className="text-2xl font-extrabold">
              Change Password
            </h1>
            <p className="mt-2 text-sm font-semibold text-gray/70 leading-relaxed">
              Keep your account secure by regularly updating your password.
              <br />
              Choose a strong password that you haven&apos;t used before.
            </p>
          </div>

          <div className="border-t border-gray/10" />

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-8 py-7 space-y-6"
          >
            <HookFormTextInput<ChangePasswordFormValues>
              name="currentPassword"
              control={control}
              label="Current Password"
              placeholder="Enter current password"
              type={show.current ? "text" : "password"}
              rules={{ required: "Current password is required" }}
              endAdornment={
                <button
                  type="button"
                  onClick={() =>
                    setShow((s) => ({ ...s, current: !s.current }))
                  }
                  className="text-gray/60 hover:text-gray"
                  aria-label="Toggle password visibility"
                >
                  {show.current ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              inputClassName="bg-secondary"
            />

            <HookFormTextInput<ChangePasswordFormValues>
              name="newPassword"
              control={control}
              label="Set New Password"
              placeholder="Atleast 8 characters minimum"
              type={show.next ? "text" : "password"}
              rules={{
                required: "New password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              }}
              endAdornment={
                <button
                  type="button"
                  onClick={() => setShow((s) => ({ ...s, next: !s.next }))}
                  className="text-gray/60 hover:text-gray"
                  aria-label="Toggle password visibility"
                >
                  {show.next ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              inputClassName="bg-secondary"
            />

            <HookFormTextInput<ChangePasswordFormValues>
              name="confirmPassword"
              control={control}
              label="Confirm Password"
              placeholder="Re-enter password"
              type={show.confirm ? "text" : "password"}
              rules={{
                required: "Confirm password is required",
                validate: (v) => v === newPass || "Passwords do not match",
              }}
              endAdornment={
                <button
                  type="button"
                  onClick={() =>
                    setShow((s) => ({ ...s, confirm: !s.confirm }))
                  }
                  className="text-gray/60 hover:text-gray"
                  aria-label="Toggle password visibility"
                >
                  {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              inputClassName="bg-secondary"
            />

            <div className="pt-2">
              <Button type="submit" className="w-full">Update Password</Button>

              <button
                type="button"
                className="mt-4 w-full text-center text-sm font-semibold text-gray/70 hover:text-gray"
                onClick={() => console.log("forgot password")}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
