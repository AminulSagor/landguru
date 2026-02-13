"use client";

import BuyRequestList from "@/app/(dashboard)/admin/(pages)/buy-requests/_components/buy-request-list";
import BuyRequestStateOverview from "@/app/(dashboard)/admin/(pages)/buy-requests/_components/buy-request-state-overview";

export default function BuyRequestPage() {
  return (
    <div className="space-y-4">
      <BuyRequestStateOverview />
      {/* next: tabs/search/table etc */}
      <BuyRequestList />
    </div>
  );
}
