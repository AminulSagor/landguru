"use client";

import React from "react";
import Card from "@/components/cards/card";
import { cn } from "@/lib/utils";

type Variant = "danger" | "primary" | "success" | "neutral";

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;

  /** left border + accent color */
  variant?: Variant;

  /** footer text (e.g. +4 since yesterday) */
  footerText?: string;
  footerTone?: "up" | "down" | "info";

  /** optional sub info (e.g. 8 pending review) */
  subText?: string;
}

const variantStyles: Record<Variant, string> = {
  danger: "border-l-red-500",
  primary: "border-l-blue-500",
  success: "border-l-green-500",
  neutral: "border-l-gray/30",
};

const footerToneStyles = {
  up: "text-green",
  down: "text-red",
  info: "text-gray/60",
};

export default function AdminStatCard({
  title,
  value,
  icon,
  variant = "neutral",
  footerText,
  footerTone = "info",
  subText,
}: DashboardStatCardProps) {
  return (
    <Card className={cn("flex items-start justify-between border-l-4", variantStyles[variant])}>
      {/* left */}
      <div>
        <p className="text-sm font-semibold text-gray">{title}</p>
        <h3 className="mt-1 text-2xl font-extrabold text-gray">{value}</h3>

        {subText && (
          <p className="mt-1 text-xs text-gray/50">{subText}</p>
        )}

        {footerText && (
          <p className={cn("mt-1 text-xs font-semibold", footerToneStyles[footerTone])}>
            {footerText}
          </p>
        )}
      </div>

      {/* right icon */}
      <div className="rounded-lg bg-secondary p-2 text-primary">
        {icon}
      </div>
    </Card>
  );
}
