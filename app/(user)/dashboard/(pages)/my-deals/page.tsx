"use client";

import React, { useMemo, useState } from "react";
import Card from "@/components/cards/card";
import { ChevronRight, Search, Home, Banknote } from "lucide-react";
import {
  DealItem,
  DealStatusSold,
  DealTab,
} from "@/app/(user)/dashboard/types/deals";
import {
  boughtDeals,
  soldDeals,
} from "@/app/(user)/dashboard/dummy-data/deals-data";
import Link from "next/link";

/* ---------------- page ---------------- */

export default function MyDealsPage() {
  const [tab, setTab] = useState<DealTab>("sold");
  const [q, setQ] = useState("");
  const [soldStatus, setSoldStatus] = useState<DealStatusSold | "all">("all");

  // ✅ NEW: use imported data
  const soldItems = soldDeals;
  const boughtItems = boughtDeals;

  const list = tab === "sold" ? soldItems : boughtItems;

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();

    return list.filter((x) => {
      const matchText =
        !s ||
        x.title.toLowerCase().includes(s) ||
        x.location.toLowerCase().includes(s) ||
        x.postId.toLowerCase().includes(s);

      const matchSoldStatus =
        tab !== "sold"
          ? true
          : soldStatus === "all"
            ? true
            : x.status === soldStatus;

      return matchText && matchSoldStatus;
    });
  }, [list, q, tab, soldStatus]);

  const topLeft =
    tab === "sold" ? (
      <StatCard
        title="Property Sold"
        value="12"
        icon={<Home size={18} className="text-primary" />}
      />
    ) : (
      <StatCard
        title="Property Bought"
        value="5"
        icon={<Home size={18} className="text-primary" />}
      />
    );

  const topRight =
    tab === "sold" ? (
      <StatCard
        title="Total Earned"
        value="৳ 9.2 Cr"
        icon={<Banknote size={18} className="text-green" />}
      />
    ) : (
      <StatCard
        title="Total Spent"
        value="৳ 1.8 Cr"
        icon={<Banknote size={18} className="text-green" />}
      />
    );

  return (
    <div className="py-24">
      <div className="w-full space-y-6">
        {/* top stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {topLeft}
          {topRight}
        </div>

        {/* sold/bought segmented */}
        <div>
          <Segmented value={tab} onChange={(v) => setTab(v)} />
        </div>

        {/* filters row */}
        <Card className="p-4 rounded-2xl bg-white border border-gray/10 shadow-xs">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="w-full md:max-w-[420px]">
              <SearchBox value={q} onChange={setQ} />
            </div>

            <div className="flex items-center gap-3 justify-end">
              {/* Sold tab has Sold + Partially Sold filter */}
              {tab === "sold" ? (
                <div className="inline-flex items-center rounded-xl border border-gray/10 bg-white overflow-hidden">
                  <button
                    onClick={() => setSoldStatus("all")}
                    className={`h-11 px-4 text-sm font-bold ${
                      soldStatus === "all"
                        ? "bg-secondary text-gray"
                        : "text-gray/60 hover:bg-secondary"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSoldStatus("sold")}
                    className={`h-11 px-4 text-sm font-bold ${
                      soldStatus === "sold"
                        ? "bg-secondary text-gray"
                        : "text-gray/60 hover:bg-secondary"
                    }`}
                  >
                    Sold
                  </button>
                  <button
                    onClick={() => setSoldStatus("partially_sold")}
                    className={`h-11 px-4 text-sm font-bold ${
                      soldStatus === "partially_sold"
                        ? "bg-secondary text-gray"
                        : "text-gray/60 hover:bg-secondary"
                    }`}
                  >
                    Partially Sold
                  </button>
                </div>
              ) : null}

              {/* two dropdown */}
              <Select placeholder=" " />
              <Select placeholder=" " />
            </div>
          </div>
        </Card>

        {/* list */}
        <div className="space-y-5">
          {filtered.map((x) => (
            <DealRowSS key={x.id} item={x} kind={tab} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- small ui helpers ---------------- */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="p-5 rounded-2xl bg-white border border-gray/10 shadow-xs">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-gray/60">{title}</p>
          <p className="mt-1 text-2xl font-extrabold text-gray">{value}</p>
        </div>

        <div className="h-11 w-11 rounded-xl bg-secondary flex items-center justify-center">
          {icon}
        </div>
      </div>
    </Card>
  );
}

function Segmented({
  value,
  onChange,
}: {
  value: DealTab;
  onChange: (v: DealTab) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-xl bg-secondary p-1">
      <button
        onClick={() => onChange("sold")}
        className={`h-10 px-6 rounded-lg text-sm font-bold transition-all ${
          value === "sold" ? "bg-primary text-white shadow-xs" : "text-gray/70"
        }`}
      >
        Sold
      </button>
      <button
        onClick={() => onChange("bought")}
        className={`h-10 px-6 rounded-lg text-sm font-bold transition-all ${
          value === "bought"
            ? "bg-primary text-white shadow-xs"
            : "text-gray/70"
        }`}
      >
        Bought
      </button>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-gray">
      {children}
    </span>
  );
}

function StatusPill({ status }: { status: DealItem["status"] }) {
  const label =
    status === "partially_sold"
      ? "Partially Sold"
      : status.charAt(0).toUpperCase() + status.slice(1);

  const isSold = status === "sold";
  const isPartial = status === "partially_sold";
  const isBought = status === "bought";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold ${
        isSold || isBought
          ? "bg-green/15 text-green"
          : isPartial
            ? "bg-primary/10 text-primary"
            : "bg-secondary text-gray"
      }`}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
}

function Select({ placeholder }: { placeholder: string }) {
  // mock-only, to match screenshot
  return (
    <div className="h-11 w-44 rounded-xl border border-gray/10 bg-white px-4 text-sm font-semibold text-gray/60 flex items-center justify-between">
      <span>{placeholder}</span>
      <span className="text-gray/40">⌄</span>
    </div>
  );
}

function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 h-11 rounded-xl border border-gray/10 bg-white px-4">
      <Search size={18} className="text-gray/40" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=""
        className="w-full text-sm font-semibold text-gray outline-none bg-transparent"
      />
    </div>
  );
}

function DealRowSS({ item, kind }: { item: DealItem; kind: DealTab }) {
  return (
    <Card className="rounded-2xl bg-white border border-gray/10 shadow-xs overflow-hidden">
      {/* mobile: column, desktop: row */}
      <div className="flex flex-col md:flex-row md:items-stretch">
        {/* image */}
        <div className="p-4 md:pr-0">
          <div className="h-44 md:h-28 w-full md:w-44 rounded-2xl bg-secondary overflow-hidden">
            {item.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray/60 text-sm">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* middle content */}
        <div className="flex-1 min-w-0 px-4 md:px-6 pb-4 md:py-5">
          <p className="text-xs font-bold text-gray/40">{item.postId}</p>

          {/* desktop: title left + price right in same row
              mobile: stacks */}
          <div className="mt-1 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-6">
            <div className="min-w-0">
              <p className="text-lg md:text-lg font-extrabold text-gray truncate">
                {item.title}
              </p>
              <p className="mt-1 text-sm font-semibold text-gray/60 line-clamp-2 md:truncate">
                {item.location}
              </p>
            </div>

            <div className="md:text-right shrink-0">
              <p className="text-[11px] font-extrabold tracking-wide text-gray/30 uppercase">
                {kind === "sold" ? "SOLD AT" : "BOUGHT AT"}
              </p>
              <p className="mt-1 text-xl md:text-2xl font-extrabold text-primary">
                ৳ {item.price}
              </p>
            </div>
          </div>

          {/* bottom row */}
          <div className="mt-5 md:mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <Tag>{item.typeLabel}</Tag>
              <StatusPill status={item.status} />
            </div>

            <p className="text-sm font-semibold text-gray/40 md:text-right">
              {item.timeLabel}
            </p>
          </div>
        </div>

        {/* arrow strip */}
        <div className="md:w-20 md:border-l md:border-gray/10 flex items-center justify-end md:justify-center px-4 pb-4 md:p-0">
          <Link href={`/dashboard/my-deals/details/${item.id}`}>
            <p className="h-11 w-11 rounded-full border border-gray/10 bg-secondary/60 flex items-center justify-center cursor-pointer">
              <ChevronRight size={20} className="text-gray/40" />
            </p>
          </Link>
        </div>
      </div>
    </Card>
  );
}
