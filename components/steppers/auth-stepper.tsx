"use client";

import * as React from "react";
import { ChevronLeft } from "lucide-react";

type AuthStepperProps = {
  title?: string;
  step: number; // 1..totalSteps
  totalSteps?: number;
  onBack?: () => void;
  percent?: number;
  className?: string;
  wantBackButton?: boolean;
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const AuthStepper: React.FC<AuthStepperProps> = ({
  title,
  step,
  totalSteps = 5,
  onBack,
  percent,
  className = "",
  wantBackButton = true,
}) => {
  const safeStep = clamp(step, 1, totalSteps);

  const computed = clamp(
    Math.round((safeStep / Math.max(1, totalSteps - 1)) * 100),
    0,
    100,
  );

  const percentText = clamp(percent ?? computed, 0, 100);

  return (
    <div className={className}>
      {/* Top row */}
      {wantBackButton && (
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="absolute left-0 inline-flex h-9 w-9 items-center justify-center rounded-md text-black/70 hover:bg-black/5"
          >
            <ChevronLeft size={18} />
          </button>

          <p className="text-base font-semibold text-black">{title}</p>
        </div>
      )}

      {/* Step + percent */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-black/60">
          Step {safeStep} of {totalSteps}
        </p>
        <p className="text-sm text-black/60">{percentText}%</p>
      </div>

      {/* Segmented progress */}
      <div className="mt-2 flex gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const active = i < safeStep;
          return (
            <span
              key={i}
              className={[
                "h-1.5 flex-1 rounded-full",
                active ? "bg-primary" : "bg-black/10",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AuthStepper;
