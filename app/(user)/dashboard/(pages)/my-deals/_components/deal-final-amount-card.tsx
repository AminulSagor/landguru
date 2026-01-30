"use client";

import Card from "@/components/cards/card";

type Props = {
  amount: string; // "40,00,000"
  soldOn: string; // "23 Jan 2026"
};

export default function DealFinalAmountCard({ amount, soldOn }: Props) {
  return (
    <div className="border border-green/40 bg-green/10 rounded-lg shadow-none">
      <div className="flex flex-col items-center justify-center p-3 text-center">
        <p className="text-xs font-extrabold text-gray tracking-wide">
          FINAL DEAL AMOUNT
        </p>

        <p className="mt-1 text-xs font-semibold text-gray/70">
          SOLD ON: {soldOn}
        </p>

        <p className="mt-3 text-3xl font-extrabold text-green">৳ {amount}</p>
      </div>
    </div>
  );
}
