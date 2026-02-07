"use client";

import { ArrowLeft } from "lucide-react";
import { StatusKey } from "@/app/(admin)/admin/types/property.types";
import StatusBadge from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/status-badge";

export default function PropertyDetailsHeader({
  postRef,
  statusKey,
  statusLabel,
  onBack,
}: {
  postRef: string;
  statusKey: StatusKey;
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
        <StatusBadge kind={statusKey} label={statusLabel} />
      </div>
    </div>
  );
}
