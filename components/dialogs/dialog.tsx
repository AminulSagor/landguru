"use client";

import { X } from "lucide-react";
import React from "react";

type DialogSize = "default" | "sm" | "md" | "lg";
type DialogPosition = "center" | "top" | "bottom";

interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  size?: DialogSize;
  position?: DialogPosition;
}

const styleSize: Record<DialogSize, string> = {
  default: "min-w-80",
  sm: "min-w-sm",
  md: "min-w-xl",
  lg: "min-w-2xl",
};

const stylePosition: Record<DialogPosition, string> = {
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  top: "top-15 left-1/2 -translate-x-1/2",
  bottom: "bottom-10 left-1/2 -translate-x-1/2",
};

const Dialog = ({
  open,
  onOpenChange,
  children,
  className,
  size = "default",
  position = "center",
}: DialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div
        className={`absolute p-4 rounded-lg bg-white border border-gray-200
        transition-all duration-150
        ${stylePosition[position]}
        ${styleSize[size]}
        ${className}`}
      >
        <button
          className="absolute top-3 right-3 text-gray-500"
          onClick={() => onOpenChange(false)}
        >
          <X size={20} />
        </button>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
