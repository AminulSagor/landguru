"use client";

import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import AuthStepper from "@/components/steppers/auth-stepper";
import { ArrowRightIcon, Check } from "lucide-react";
import Link from "next/link";

const ForgotPasswordStepTwo = () => {
  return (
    <div className="py-10">
      <Card className="shadow-sm rounded-xl max-w-md space-y-12">
        <AuthStepper
          title="Forgot Password"
          step={1}
          totalSteps={2}
          percent={99}
        />

        {/* Success Circle */}
        <div className="mt-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green">
            <Check size={42} className="text-white" />
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-2xl font-extrabold text-black text-center">
            Password Reset Request Sent
          </h1>

          <p className="mt-2 text-sm leading-6 text-black/55 text-center">
            Your designated admin will review your request and contact with you
            soon.
          </p>
          <Link href={"/auth/agent/login"}>
            <Button type="button" className="w-full mt-6">
              Back to Login <ArrowRightIcon size={18} />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordStepTwo;
