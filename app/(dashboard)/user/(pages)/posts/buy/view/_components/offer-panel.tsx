"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Clock, Search } from "lucide-react";
import Card from "@/components/cards/card";
import type {
  BuyPostDetails,
  BuyPostOffer,
} from "@/app/(dashboard)/user/dummy-data/buy-post-data";

type SortKey = "newest" | "oldest" | "price_high" | "price_low";

export default function OffersPanel({ data }: { data: BuyPostDetails }) {
  const [q, setQ] = React.useState("");
  const [sort, setSort] = React.useState<SortKey>("newest");

  const offers = React.useMemo(() => {
    const query = q.trim().toLowerCase();
    let rows = [...(data.offers ?? [])];

    if (query) {
      rows = rows.filter((x) => {
        const hay = `${x.title} ${x.id}`.toLowerCase();
        return hay.includes(query);
      });
    }

    rows.sort((a, b) => {
      if (sort === "price_high")
        return (b.askingPrice || 0) - (a.askingPrice || 0);
      if (sort === "price_low")
        return (a.askingPrice || 0) - (b.askingPrice || 0);
      if (sort === "oldest") return 1; // no real date -> stable
      return -1;
    });

    return rows;
  }, [data.offers, q, sort]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-extrabold text-gray">
          Offers Received ({data.totalOffers})
        </h2>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          {/* search */}
          <div className="relative w-full sm:w-[320px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray/40"
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="h-10 w-full rounded-xl border border-gray/15 bg-white pl-9 pr-3 text-sm font-semibold text-gray outline-none placeholder:text-gray/40 focus:border-primary/40"
            />
          </div>

          {/* sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-10 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm font-semibold text-gray outline-none focus:border-primary/40 sm:w-[170px]"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price_high">Price: High to Low</option>
            <option value="price_low">Price: Low to High</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {offers.map((o) => (
          <OfferRow key={o.id} offer={o} />
        ))}
      </div>
    </div>
  );
}

function OfferRow({ offer }: { offer: BuyPostOffer }) {
  return (
    <Link href={`#`} className="block">
      <Card className="rounded-2xl border border-gray/15 bg-white p-4 hover:bg-secondary/40">
        <div className="flex items-start gap-4">
          <div className="relative h-[86px] w-[120px] overflow-hidden rounded-xl bg-secondary">
            <Image
              src={offer.image}
              alt={offer.title}
              fill
              className="object-cover"
              sizes="120px"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-extrabold text-gray">
                  {offer.title}
                </p>
                <p className="mt-1 text-sm font-semibold text-gray/50">
                  Asking Price:{" "}
                  <span className="font-extrabold text-primary">
                    ৳ {formatBDT(offer.askingPrice)}
                  </span>
                </p>
              </div>

              <ChevronRight className="mt-1 text-gray/30" size={18} />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-primary px-2 py-1 text-[10px] font-extrabold text-white">
                {offer.propertyType}
              </span>

              <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray/40">
                <Clock size={14} className="text-gray/30" />
                Offered: {offer.offeredText}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function formatBDT(n: number) {
  try {
    return n.toLocaleString("en-IN");
  } catch {
    return String(n);
  }
}
