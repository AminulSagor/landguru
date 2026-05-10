"use client";

import { ArrowLeft } from "lucide-react";
import type { PropertyPostStatus } from "@/types/admin/property-post/property.types";
import StatusBadge from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/status-badge";

export default function PropertyDetailsHeader({
  postRef,
  status,
  statusLabel,
  onBack,
}: {
  postRef: string;
  status: PropertyPostStatus;
  statusLabel: string;
  onBack: () => void;
}) {
  return (
    <div className="mb-6">
      <button onClick={onBack} className="flex items-center gap-2">
        <ArrowLeft size={18} className="text-gray" />
        <p className="text-lg font-extrabold text-gray">Property Listings</p>
      </button>

      <div className="flex items-center gap-3 mt-2">
        <p className="text-xs font-extrabold text-primary">{postRef}</p>
        <StatusBadge status={status} label={statusLabel} />
      </div>
    </div>
  );
}
