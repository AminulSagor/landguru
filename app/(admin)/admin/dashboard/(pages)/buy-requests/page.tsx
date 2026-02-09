"use client";

import BuyRequestList from "@/app/(admin)/admin/dashboard/(pages)/buy-requests/_components/buy-request-list";
import BuyRequestStateOverview from "@/app/(admin)/admin/dashboard/(pages)/buy-requests/_components/buy-request-state-overview";

export default function BuyRequestPage() {
  return (
    <div className="space-y-4">
      <BuyRequestStateOverview />
      {/* next: tabs/search/table etc */}
      <BuyRequestList />
    </div>
  );
}
