"use client";
import React from "react";

export default function Avatar({ url, name }: { url?: string; name: string }) {
  return (
    <div className="h-10 w-10 rounded-full overflow-hidden border border-gray/15 bg-secondary flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {url ? (
        <img src={url} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span className="text-xs font-extrabold text-gray">{name?.[0] ?? "U"}</span>
      )}
    </div>
  );
}
