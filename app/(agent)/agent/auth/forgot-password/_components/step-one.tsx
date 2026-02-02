"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { SignUpStepOneForm } from "@/interfaces/auth";
import AuthStepper from "@/components/steppers/auth-stepper";
import { HookFormBDPhoneInput } from "@/components/inputs/HookFormBDPhoneInput";

type Props = {
  onNext: () => void;
  onBack?: () => void;
  setPhone: (phone: string) => void;
};

const ForgotPasswordStepOne = ({ onNext, onBack, setPhone }: Props) => {
  const { control, handleSubmit } = useForm<SignUpStepOneForm>({
    defaultValues: { phone: "" },
  });

  const onSubmit = (data: SignUpStepOneForm) => {
    setPhone(data.phone);
    onNext();
  };

  return (
    <div className="py-10">
      <Card className="shadow-sm rounded-xl max-w-md">
        <AuthStepper
          title="Forgot Password"
          step={1}
          totalSteps={2}
          percent={25}
          onBack={onBack}
        />

        <div className="mt-8">
          <h1 className="text-2xl font-extrabold text-black">
            Forgot Password?
          </h1>

          <p className="mt-2 text-sm leading-6 text-black/55">
            We need your mobile number to verify your identity and secure your
            property listings.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <HookFormBDPhoneInput<SignUpStepOneForm>
              name="phone"
              control={control}
              label="Phone Number"
            />

            <Button type="submit" className="w-full">
              Send Reset Request
            </Button>

            <p className="text-center text-xs text-black/50">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-primary font-semibold">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary font-semibold">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordStepOne;
