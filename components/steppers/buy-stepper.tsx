"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { Bookmark, User, Clock, Users } from "lucide-react";

const stepData: BuyStep[] = [
  {
    id: 1,
    title: "Step 1",
    subtitle: "You request for Appointment",
    icon: <Bookmark size={22} />,
  },
  {
    id: 2,
    title: "Step 2",
    subtitle: "We review your request",
    icon: <User size={22} />,
  },
  {
    id: 3,
    title: "Step 3",
    subtitle: "Schedules appointment",
    icon: <Clock size={22} />,
  },
  {
    id: 4,
    title: "Step 4",
    subtitle: "Meet with the seller",
    icon: <Users size={22} />,
  },
];

const current = 5;

export type BuyStep = {
  id: number;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
};

type Props = {
  steps?: BuyStep[];
  currentStep?: number; // 1-based
};

export default function BuyStepper({
  steps = stepData,
  currentStep = current,
}: Props) {
  return (
    <div className="w-full">
      <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8 shadow-sm">
        <h3 className="text-xl  font-extrabold text-black">How to buy?</h3>

        <div className="mt-6">
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
            {/* Base line (behind circles) */}
            <div className="hidden sm:block absolute left-0 right-0 top-7.5 h-0.5 bg-black/10" />

            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isActive = stepNumber === currentStep;

              return (
                <div
                  key={step.id}
                  className={cn(
                    "relative flex items-start gap-4 sm:flex-1 sm:flex-col sm:items-center sm:gap-0",
                  )}
                >
                  {/* Progress line (filled) */}
                  {index !== 0 && (
                    <div
                      className={cn(
                        "hidden sm:block absolute left-0 top-7.5 h-0.5",
                        "w-1/2",
                        isCompleted || isActive
                          ? "bg-primary"
                          : "bg-transparent",
                      )}
                      style={{ left: 0 }}
                    />
                  )}
                  {index !== steps.length - 1 && (
                    <div
                      className={cn(
                        "hidden sm:block absolute right-0 top-7.5 h-0.5",
                        "w-1/2",
                        stepNumber < currentStep
                          ? "bg-primary"
                          : "bg-transparent",
                      )}
                    />
                  )}

                  {/* Circle with icon */}
                  <div
                    className={cn(
                      "z-10 h-13 w-13 rounded-full flex items-center justify-center shrink-0 transition",
                      "border border-black/10 bg-primary text-white shadow-sm",
                      isActive && "ring-4 ring-primary/15",
                      !isActive && "ring-0",
                    )}
                  >
                    {/* icon */}
                    <div className="text-white">{step.icon}</div>
                  </div>

                  {/* Labels */}
                  <div className="sm:mt-4 sm:text-center">
                    <p className="text-sm font-extrabold text-black">
                      Step {stepNumber}
                    </p>

                    {step.subtitle ? (
                      <p className="mt-1 text-sm text-black/45 leading-snug">
                        {step.subtitle}
                      </p>
                    ) : (
                      <p className="mt-1 text-sm text-black/45 leading-snug">
                        {step.title}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile stacked line (optional look like SS) */}
          <div className="sm:hidden mt-2 text-xs text-black/40">
            {/* keeps layout clean on small screens */}
          </div>
        </div>
      </div>
    </div>
  );
}
