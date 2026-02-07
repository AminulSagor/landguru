"use client";
import React from "react";

export default function FieldBox({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray mb-2">{label}</p>
      <div className="bg-secondary border border-gray/15 rounded-lg px-3 py-2">
        <p className="text-xs font-extrabold text-primary">{value}</p>
      </div>
    </div>
  );
}
