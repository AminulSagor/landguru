"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import AuthStepper from "@/components/steppers/auth-stepper";
import { HookFormTextInput } from "@/components/inputs/text-input";

type FormValues = {
  password: string;
  confirmPassword: string;
};

type Props = {
  onNext: () => void;
  onBack: () => void;
  setPassword?: (password: string) => void;
};

const ForgotPasswordStepThree = ({ onNext, onBack, setPassword }: Props) => {
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = (data: FormValues) => {
    setPassword?.(data.password);
    onNext();
  };

  return (
    <div className="py-10">
      <Card className="shadow-sm rounded-xl">
        <AuthStepper
          title="Forgot Password"
          step={3}
          totalSteps={4}
          percent={50}
          onBack={onBack}
        />

        <div className="mt-8">
          <h1 className="text-3xl font-extrabold text-black">Set password</h1>
          <p className="mt-2 text-sm leading-6 text-black/55">
            To make your account secure, you need to enter a password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5">
            <HookFormTextInput<FormValues>
              name="password"
              control={control}
              label="Set New Password"
              type={showPass ? "text" : "password"}
              rules={{
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              }}
              inputClassName={["h-12 px-4", "border-black/10", ,].join(" ")}
              endAdornment={
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="text-black/40 hover:text-black/60"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            <HookFormTextInput<FormValues>
              name="confirmPassword"
              control={control}
              label="Confirm Password"
              type={showConfirm ? "text" : "password"}
              rules={{
                required: "Confirm password is required",
                validate: (v) => v === password || "Passwords do not match",
              }}
              inputClassName={["h-12 px-4", "border-black/10", ,].join(" ")}
              endAdornment={
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="text-black/40 hover:text-black/60"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            <div className="pt-4">
              <Button type="submit" className="w-full">
                Next <ArrowRight size={20} />
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordStepThree;
