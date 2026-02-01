"use client";

import React from "react";
import Card from "@/components/cards/card";
import { Bookmark, User, Clock, Users } from "lucide-react";

type StepItem = {
  id: number;
  title: string;
  subtitle: string;
  Icon: React.ElementType;
};

const STEPS: StepItem[] = [
  {
    id: 1,
    title: "Step 1",
    subtitle: "You accept the offer",
    Icon: Bookmark,
  },
  {
    id: 2,
    title: "Step 2",
    subtitle: "Sellers provides\nrest of the details",
    Icon: User,
  },
  {
    id: 3,
    title: "Step 3",
    subtitle: "We schedule appointment",
    Icon: Clock,
  },
  {
    id: 4,
    title: "Step 4",
    subtitle: "Meet with the seller",
    Icon: Users,
  },
];

export default function OfferingWorksStepper() {
  return (
    <Card className="rounded-3xl border border-gray/15 bg-white p-6 md:p-8">
      <h3 className="text-xl font-extrabold text-gray md:text-2xl">
        How offering works?
      </h3>

      <div className="relative mt-8">
        {/* connector line */}
        <div className="absolute left-10 right-10 top-[22px] h-[2px] bg-gray/10" />

        <div className="flex items-start justify-between gap-6">
          {STEPS.map((s) => (
            <div
              key={s.id}
              className="relative flex flex-1 flex-col items-center"
            >
              {/* circle */}
              <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-primary">
                <s.Icon className="h-5 w-5 text-white" />
              </div>

              {/* text */}
              <div className="mt-4 text-center">
                <p className="text-sm font-extrabold text-gray">{s.title}</p>
                <p className="mt-1 whitespace-pre-line text-sm font-semibold text-gray/60">
                  {s.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
