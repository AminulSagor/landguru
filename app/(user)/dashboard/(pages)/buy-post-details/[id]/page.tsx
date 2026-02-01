"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import type { BuyPostDetails } from "@/app/(user)/dashboard/dummy-data/buy-post-data";
import { demoBuyPostDetails } from "@/app/(user)/dashboard/dummy-data/buy-post-data";
import BuyPostRequestDetailsCard from "@/app/(user)/dashboard/(pages)/buy-post-details/_components/buy-post-details-card";
import OffersPanel from "@/app/(user)/dashboard/(pages)/buy-post-details/_components/offer-panel";

export default function BuyPostDetailsPage() {
  const data: BuyPostDetails = demoBuyPostDetails;

  return (
    <div className="py-24 space-y-3">
      <Link
        href="/dashboard/my-posts?tab=buy"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray/60 hover:text-gray"
      >
        <ChevronLeft size={18} />
        Back to My Posts (Buys Posts)
      </Link>

      <h1 className="text-2xl font-extrabold text-gray">Manage Request</h1>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[480px_1fr]">
        <BuyPostRequestDetailsCard data={data} />
        <OffersPanel data={data} />
      </div>
    </div>
  );
}
