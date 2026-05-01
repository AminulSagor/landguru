import { cn } from "@/utils/classnames.utils";
import { Check } from "lucide-react";

export type Step = {
  id: number;
  title: string;
  subtitle?: string;
};

interface StepperProps {
  steps: Step[];
  currentStep: number; // 1-based index
  orientation?: "vertical" | "horizontal";
}

export function ProcessStepper({
  steps,
  currentStep,
  orientation = "vertical",
}: StepperProps) {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={cn(
        "flex",
        isVertical
          ? "flex-col gap-6"
          : "flex-row items-start justify-between w-full",
      )}
    >
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div
            key={step.id}
            className={cn(
              "relative flex items-center",
              isVertical ? "gap-4" : "flex-1 flex-col",
            )}
          >
            <div className="flex items-center">
              {/* Circle */}
              <div
                className={cn(
                  "flex items-center justify-center rounded-full border-2 transition-all shrink-0 z-10",
                  "h-10 w-10",
                  isCompleted && "bg-primary border-primary text-white",
                  isActive && "border-primary text-primary bg-background",
                  !isCompleted &&
                    !isActive &&
                    "border-gray-300 text-gray-500 bg-background",
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="font-medium">{stepNumber}</span>
                )}
              </div>

              {/* Vertical layout line */}
              {isVertical && index !== steps.length - 1 && (
                <div
                  className={cn(
                    "absolute left-5 top-10 w-0.5 h-12 transition-all",
                    isCompleted ? "bg-primary" : "bg-gray-300",
                  )}
                />
              )}
            </div>

            {/* Labels */}
            <div className={cn(isVertical ? "pb-6" : "mt-3 text-center")}>
              <p
                className={cn(
                  "text-xs font-semibold uppercase",
                  isActive || isCompleted ? "text-primary" : "text-gray-500",
                )}
              >
                Step {stepNumber}
              </p>
              <p
                className={cn(
                  "text-sm font-medium mt-1",
                  isActive ? "text-foreground" : "text-gray-500",
                )}
              >
                {step.title}
              </p>
            </div>

            {/* Horizontal layout line (after the step except last) */}
            {!isVertical && index !== steps.length - 1 && (
              <div
                className={cn(
                  "absolute left-1/2 -right-1/2 top-5 h-0.5 transition-all",
                  isCompleted ? "bg-primary" : "bg-gray-300",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
