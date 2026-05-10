"use client";

import type { PropertyPostStatus } from "@/types/admin/property-post/property.types";

export default function StatusBadge({
  status,
  label,
}: {
  status: PropertyPostStatus;
  label: string;
}) {
  const normalizedStatus = status.toUpperCase();
  const cls =
    normalizedStatus === "REJECTED"
      ? "bg-[#FEE2E2] text-[#B91C1C] border border-[#FCA5A5]"
      : normalizedStatus === "PAYMENT_PENDING_REVIEW"
        ? "bg-[#DCFCE7] text-green border border-[#86EFAC]"
        : normalizedStatus === "SOLD"
          ? "bg-[#DCFCE7] text-green border border-[#86EFAC]"
          : normalizedStatus === "PARTIAL_SOLD" || normalizedStatus === "ACTIVE"
            ? "bg-[#DCFCE7] text-green-400 border border-[#C3F7D8]"
            : "bg-[#FFEAD5] text-[#C2410C] border border-[#FDBA74]";

  return (
    <span className={`text-xs font-bold px-12 py-1 rounded-full ${cls}`}>
      {label}
    </span>
  );
}
