"use client";
import React from "react";

type ButtonSize = "sm" | "md" | "lg" | "base";
type ButtonVariant = "primary" | "secondary";
type ButtonShape = "default" | "pill";

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-2 py-1 text-xs",
  base: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary hover:bg-[#1749ab] text-white",
  secondary: "bg-white border border-gray/20 hover:bg-gray/3 text-black",
};

const shapeStyles: Record<ButtonShape, string> = {
  default: "rounded-lg",
  pill: "rounded-full",
};

interface ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  shape?: ButtonShape;
}

const Button = ({
  size = "md",
  variant = "primary",
  type = "button",
  disabled,
  className = "",
  children,
  onClick,
  shape = "default",
}: ButtonProps) => {
  const hasCustomColor =
    className.includes("bg-") ||
    className.includes("text-") ||
    className.includes("border-");

  const baseClasses =
    "flex items-center justify-center gap-2 active:scale-[0.97] shadow-xs ease-in-out transition-all";

  const variantClass = hasCustomColor ? "" : variantStyles[variant];
  const sizeClass = sizeStyles[size];
  const shapeClass = shapeStyles[shape];
  const cursorClass = disabled
    ? "cursor-not-allowed opacity-60"
    : "cursor-pointer active:scale-[0.97]";

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${sizeClass} ${variantClass} ${shapeClass} ${cursorClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
