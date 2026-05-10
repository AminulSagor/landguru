"use client";

import React from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";

import { ArrowRight } from "lucide-react";
import AuthStepper from "@/components/steppers/auth-stepper";
import CircleLoader from "@/components/loaders/circle-loader";

type Props = {
  phone: string;
  onNext: (otp: string) => Promise<void> | void;
  onBack: () => void;
  onResend?: () => Promise<void> | void;
  isSubmitting?: boolean;
  isResending?: boolean;
};

const pad2 = (n: number) => String(n).padStart(2, "0");

const SignUpStepTwo = ({
  phone,
  onNext,
  onBack,
  onResend,
  isSubmitting = false,
  isResending = false,
}: Props) => {
  const [digits, setDigits] = React.useState<string[]>(["", "", "", ""]);
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);
  const [seconds, setSeconds] = React.useState(59);

  // countdown
  React.useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const code = digits.join("");
  const isComplete = code.length === 4 && digits.every((d) => d !== "");

  const focusIndex = (i: number) => inputsRef.current[i]?.focus();

  const setAt = (i: number, value: string) => {
    setDigits((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  };

  const handleChange = (i: number, raw: string) => {
    const v = raw.replace(/\D/g, "").slice(-1); // only last digit
    setAt(i, v);
    if (v && i < 3) focusIndex(i + 1);
  };

  const handleKeyDown = (
    i: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (digits[i]) {
        setAt(i, "");
        return;
      }
      if (i > 0) {
        focusIndex(i - 1);
        setAt(i - 1, "");
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!txt) return;

    e.preventDefault();
    const arr = txt.split("").concat(["", "", "", ""]).slice(0, 4);
    setDigits(arr);
    const lastFilled = Math.min(arr.filter(Boolean).length, 4) - 1;
    focusIndex(Math.max(0, lastFilled));
  };

  const resend = () => {
    if (seconds > 0 || isResending) return;
    setSeconds(59);
    onResend?.();
  };

  return (
    <div className="py-10">
      <Card className="shadow-sm rounded-xl">
        <AuthStepper
          title="Create Account"
          step={2}
          totalSteps={5}
          percent={30}
          onBack={onBack}
        />

        <div className="mt-8">
          <h1 className="text-3xl font-extrabold text-black">
            Verify Phone Number
          </h1>

          <p className="mt-2 text-sm leading-6 text-black/55">
            We sent a 4-digit code to{" "}
            <span className="font-semibold text-black/70">
              {phone || "+880..."}
            </span>
            .
            <br />
            Enter it below to secure your account.
          </p>

          {/* OTP boxes */}
          <div className="mt-8 flex items-center gap-5">
            {digits.map((d, i) => {
              const isActive =
                i === digits.findIndex((x) => x === "") ||
                (isComplete && i === 3);
              const activeRing = isActive
                ? "border-primary bg-primary/5"
                : "border-black/10 bg-white";

              return (
                <input
                  key={i}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  value={d}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  onPaste={handlePaste}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={[
                    "h-20 w-20 rounded-xl border text-center text-2xl font-semibold text-black",
                    "outline-none transition",
                    activeRing,
                    "focus:border-primary focus:bg-primary/5",
                  ].join(" ")}
                />
              );
            })}
          </div>

          {/* resend line */}
          <div className="mt-6 text-center text-sm text-black/55">
            Didn&apos;t receive code?{" "}
            {seconds > 0 ? (
              <span className="text-primary/80 font-semibold">
                Resend code in 00:{pad2(seconds)}
              </span>
            ) : (
              <button
                type="button"
                onClick={resend}
                disabled={isResending}
                className="text-primary font-semibold hover:underline"
              >
                {isResending ? "Sending..." : "Resend code"}
              </button>
            )}
          </div>

          <div className="mt-8">
            <Button
              type="button"
              className="w-full"
              disabled={!isComplete || isSubmitting}
              onClick={() => onNext(code)}
            >
              {isSubmitting ? (
                <CircleLoader />
              ) : (
                <>
                  Verify &amp; Proceed <ArrowRight size={20} />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignUpStepTwo;
