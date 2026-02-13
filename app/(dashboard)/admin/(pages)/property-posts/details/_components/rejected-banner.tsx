"use client";

import React from "react";

export default function RejectedBanner({
  rejection,
}: {
  rejection: { title: string; message: string };
}) {
  return (
    <div className="border border-[#FCA5A5] bg-[#FEE2E2] rounded-lg p-5 text-center">
      <p className="text-sm font-extrabold text-[#B91C1C]">{rejection.title}</p>
      <p className="text-xs font-semibold text-[#B91C1C] mt-1">{rejection.message}</p>
    </div>
  );
}
