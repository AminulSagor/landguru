"use client";

import Card from "@/components/cards/card";
import AuthStepper from "@/components/steppers/auth-stepper";
import Button from "@/components/buttons/button";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const FinalStep = () => {
  return (
    <div className="py-10">
      <Card className="mx-auto w-full max-w-md text-center">
        <AuthStepper
          step={4}
          percent={100}
          totalSteps={4}
          wantBackButton={false}
        />

        <div className="mt-8 flex flex-col items-center">
          {/* green check bubble */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green">
            <Check className="h-10 w-10 text-white" strokeWidth={3} />
          </div>

          <h2 className="mt-6 text-2xl font-extrabold">Password Changed</h2>

          <p className="mt-3 max-w-md text-base font-medium text-gray/70">
            You can now login back to your account with <br />
            the new password you set.
          </p>

          <div className="mt-8 w-full">
            <Link href={"/auth/user/login"}>
              <Button className=" w-full" onClick={() => {}}>
                <span className="">Back to Login</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FinalStep;
