"use client";

import { StatusKey } from "@/app/(dashboard)/admin/types/property.types";

export default function StatusBadge({
  kind,
  label,
}: {
  kind: StatusKey;
  label: string;
}) {
  const cls =
    kind === "rejected"
      ? "bg-[#FEE2E2] text-[#B91C1C] border border-[#FCA5A5]"
      : kind === "pending_review"
        ? "bg-[#FFEAD5] text-[#C2410C] border border-[#FDBA74]"
        : kind === "service_fee_paid"
          ? "bg-[#DCFCE7] text-green border border-[#86EFAC]"
          : kind === "sold"
            ? "bg-[#DCFCE7] text-green border border-[#86EFAC]"
            : "bg-[#DCFCE7] text-green-400 border border-[#C3F7D8]"; // live

  return (
    <span className={`text-xs font-bold px-12 py-1 rounded-full ${cls}`}>
      {label}
    </span>
  );
}
