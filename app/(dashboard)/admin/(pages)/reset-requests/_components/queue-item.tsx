"use client";

import { ResetRequest } from "@/app/(dashboard)/admin/types/admin-reset-types";
import Image from "next/image";
import { formatDisplayId } from "@/utils/id.utils";
import { useRouter } from "next/navigation";


export default function QueueItem({
  item,
  active,
}: {
  item: ResetRequest;
  active?: boolean;
}) {
  const showAction = Boolean(item.actionRequired);

  return (
    <div className="relative">
      {/* active left bar */}
      {active && (
        <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
      )}

      <div
        className={[
          "px-5 py-4",
          "border-b border-gray/10",
          "cursor-pointer",
          active ? "bg-secondary/30" : "bg-white hover:bg-secondary",
        ].join(" ")}
      >
        {/* top meta row */}
        <div className="flex items-start justify-between">
          <p className="text-xs font-semibold text-primary">
            {formatDisplayId("RST", item.id)}
          </p>

          <div className="flex flex-col items-end gap-1">
            {showAction ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF3D6] px-3 py-1 text-[11px] font-semibold text-[#A16207]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                ACTION REQ
              </span>
            ) : (
              <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold text-gray">
                PENDING
              </span>
            )}

            <p className="text-[11px] font-medium text-gray">{item.time}</p>
          </div>
        </div>

        {/* main row */}
        <div className="mt-3 flex items-center gap-3">
          <Image
            src={item.avatar}
            width={44}
            height={44}
            alt="avatar"
            className="rounded-full"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-primary">
              {item.name}
            </p>
            <p className="text-xs font-medium text-gray">{item.adminId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
