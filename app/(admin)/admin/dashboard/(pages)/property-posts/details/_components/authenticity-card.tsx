"use client";

import React from "react";
import { Check, ShieldAlert } from "lucide-react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { PropertyDetails } from "@/app/(admin)/admin/types/property.types";

function ChecklistItem({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="border border-gray/15 rounded-lg px-3 py-2 bg-white flex items-center gap-2">
      <div
        className={`h-4 w-4 rounded border border-gray/15 flex items-center justify-center ${
          checked ? "bg-primary" : "bg-white"
        }`}
      >
        {checked && <Check size={12} className="text-white" />}
      </div>

      <p className="text-xs font-semibold text-gray">{label}</p>
    </div>
  );
}

export default function AuthenticityCard({
  data,
}: {
  data: NonNullable<PropertyDetails["authenticityChecklist"]>;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-gray">Property Authenticity</p>

        {data.canEdit && (
          <Button size="sm" variant="primary">
            Edit Status
          </Button>
        )}
      </div>

      <div className="border border-gray/15 rounded-lg p-4 bg-white mt-4">
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert size={16} className="text-primary" />
          <p className="text-xs font-extrabold text-gray">{data.title}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.items.map((it) => (
            <ChecklistItem
              key={it.label}
              label={it.label}
              checked={it.checked}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
