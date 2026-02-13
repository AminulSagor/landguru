"use client";

import React from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { ListFilter } from "lucide-react";
import {
  Category,
  Status,
} from "@/app/(dashboard)/user/(pages)/properties/page";

const PROPERTY_TYPES = [
  "Plain Land",
  "Flat",
  "Commercial",
  "Water Land",
  "Agro Land",
] as const;

type Props = {
  category: Category;
  status: Status;
  setCategory: (v: Category) => void;
  setStatus: (v: Status) => void;
};

export default function MYPropertyFilters({
  category,
  status,
  setCategory,
  setStatus,
}: Props) {
  const [activeType, setActiveType] =
    React.useState<(typeof PROPERTY_TYPES)[number]>("Plain Land");

  // demo counts (like ss small badges)
  const counts = {
    buyPosts: 1,
    quoted: 1,
  };

  const resetAll = () => {
    setActiveType("Plain Land");
    setCategory("Sell Posts");
    setStatus("All Status");
  };

  return (
    <Card className="p-5">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListFilter size={18} className="text-gray/70" />
          <h3 className="text-base font-extrabold text-gray">Filters</h3>
        </div>

        <button
          type="button"
          onClick={resetAll}
          className="text-sm font-semibold text-primary hover:underline"
        >
          Reset All
        </button>
      </div>

      <div className="my-4 h-px w-full bg-gray/10" />

      <div className="space-y-6">
        {/* Property Type */}
        <div>
          <p className="text-sm font-extrabold text-gray">Property Type</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {PROPERTY_TYPES.map((t) => {
              const active = t === activeType;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveType(t)}
                  className={[
                    "h-9 rounded-full px-4 text-xs font-bold transition border",
                    active
                      ? "bg-primary border-primary text-white"
                      : "bg-white border border-gray/20 text-gray/70 hover:bg-secondary",
                  ].join(" ")}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category */}
        <div>
          <p className="text-sm font-extrabold text-gray">Category</p>

          <div className="mt-3 space-y-3">
            <RadioRow
              label="Sell Posts"
              checked={category === "Sell Posts"}
              onClick={() => setCategory("Sell Posts")}
            />

            <RadioRow
              label="Buy Posts"
              checked={category === "Buy Posts"}
              onClick={() => setCategory("Buy Posts")}
              rightBadge={
                counts.buyPosts ? (
                  <CountBadge tone="blue">{counts.buyPosts}</CountBadge>
                ) : null
              }
            />

            <RadioRow
              label="Offered Posts"
              checked={category === "Offered Posts"}
              onClick={() => setCategory("Offered Posts")}
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <p className="text-sm font-extrabold text-gray">Status</p>

          <div className="mt-3 space-y-3">
            <RadioRow
              label="All Status"
              checked={status === "All Status"}
              onClick={() => setStatus("All Status")}
              // in ss it's checked style with a tick
              withTick
            />

            <RadioRow
              label="Pending"
              checked={status === "Pending"}
              onClick={() => setStatus("Pending")}
            />

            <RadioRow
              label="Quoted"
              checked={status === "Quoted"}
              onClick={() => setStatus("Quoted")}
              rightBadge={
                counts.quoted ? (
                  <CountBadge tone="red">{counts.quoted}</CountBadge>
                ) : null
              }
            />

            <RadioRow
              label="Active"
              checked={status === "Active"}
              onClick={() => setStatus("Active")}
            />

            <RadioRow
              label="Draft"
              checked={status === "Draft"}
              onClick={() => setStatus("Draft")}
            />
          </div>
        </div>

        {/* Apply */}
        <Button className="h-12 w-full rounded-xl">Apply Filters</Button>
      </div>
    </Card>
  );
}

/* =======================
   small parts (match ss)
======================= */

function RadioRow({
  label,
  checked,
  onClick,
  rightBadge,
  withTick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
  rightBadge?: React.ReactNode;
  withTick?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <span
          className={[
            "flex h-5 w-5 items-center justify-center rounded-full border",
            checked ? "border-primary" : "border-gray/25",
          ].join(" ")}
        >
          {/* ss: category uses filled dot, status "All Status" shows tick */}
          {checked ? (
            withTick ? (
              <span className="text-[10px] font-black text-primary">✓</span>
            ) : (
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            )
          ) : null}
        </span>

        <span className="text-sm font-semibold text-gray/70">{label}</span>
      </div>

      {rightBadge}
    </button>
  );
}

function CountBadge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "blue" | "red";
}) {
  const cls =
    tone === "blue"
      ? "bg-primary/10 text-primary"
      : "bg-[#ffe9ea] text-[#d13b3b]"; // ss red, custom ok

  return (
    <span
      className={[
        "inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-extrabold",
        cls,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
