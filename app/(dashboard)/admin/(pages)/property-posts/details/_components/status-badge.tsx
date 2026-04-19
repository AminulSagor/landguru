"use client";

export default function StatusBadge({
  status,
  label,
}: {
  status: string;
  label: string;
}) {
  const normalizedStatus = status.toUpperCase();

  const cls =
    normalizedStatus === "REJECTED"
      ? "bg-[#FEE2E2] text-[#B91C1C] border border-[#FCA5A5]"
      : normalizedStatus === "PENDING_ADMIN" ||
          normalizedStatus === "PENDING_BUYER_REVIEW" ||
          normalizedStatus === "PAYMENT_PENDING_REVIEW" ||
          normalizedStatus === "QUOTED"
        ? "bg-[#FFEAD5] text-[#C2410C] border border-[#FDBA74]"
        : normalizedStatus === "ACTIVE"
          ? "bg-[#DCFCE7] text-green border border-[#86EFAC]"
          : normalizedStatus === "SOLD" || normalizedStatus === "PARTIAL_SOLD"
            ? "bg-[#DCFCE7] text-green border border-[#86EFAC]"
            : "bg-white text-gray border border-gray/15";

  return (
    <span className={`text-xs font-bold px-12 py-1 rounded-full ${cls}`}>
      {label}
    </span>
  );
}
