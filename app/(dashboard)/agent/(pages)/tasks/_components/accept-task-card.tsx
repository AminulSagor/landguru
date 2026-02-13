"use client";

import React from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";

export default function AcceptTaskCard() {
  return (
    <Card className="rounded-2xl p-5">
      <Button className="w-full bg-pumpkin hover:opacity-95">Accept Task</Button>

      <p className="mt-3 text-[11px] font-semibold text-gray/40 text-center">
        By accepting, you agree to the{" "}
        <span className="text-primary font-extrabold cursor-pointer hover:opacity-80">
          terms of service
        </span>
        .
      </p>
    </Card>
  );
}
