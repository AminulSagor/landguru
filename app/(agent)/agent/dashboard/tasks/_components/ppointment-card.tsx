"use client";

import React from "react";
import Card from "@/components/cards/card";

export default function AppointmentCard() {
  return (
    <Card className="rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-gray">
          Appointment <span className="text-xs font-semibold text-gray/40">(Optional)</span>
        </h3>
      </div>

      <div className="mt-3 rounded-lg border border-gray/10 bg-white px-4 py-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray/70">Not Scheduled</p>
        <button className="text-xs font-extrabold text-primary hover:opacity-80">
          Set Date & Time
        </button>
      </div>
    </Card>
  );
}
