"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Property, MetricUnit } from "@/app/(admin)/admin/types/property.types";
import PropertyDetailsHeader from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/property-details-header";
import BuyerBars from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/buyer-bars";
import RejectedBanner from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/rejected-banner";
import SectionTitle from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/section-title";
import MetricSelect from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/metric-select";
import PostInformationCard from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/post-information-card";
import DocumentsCard from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/documents-card";
import OwnershipHistoryCard from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/ownership-history-card";
import AuthenticityCard from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/authenticity-card";
import PriceCompareCard from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/price-compare-card";
import ChosenServicesCard from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/chosen-services-card";
import ServiceProgressCard from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/service-progress-card";
import ServiceFeesCard from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/service-fees-card";
import PendingReviewFooter from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/pending-review-footer";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import UpdateStatusSection from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/update-status-section";

type Props = { property: Property };

export default function PropertyDetailsView({ property }: Props) {
  const router = useRouter();
  const statusKey = property.status.key;

  const id = property.id;

  const details = useMemo(() => property.details, [property.details]);
  const [unit, setUnit] = useState<MetricUnit>(
    property.details?.metricsUnit ?? "Katha",
  );

  if (!details) {
    return (
      <div className="px-6 py-6">
        <p className="text-sm font-semibold text-gray">No details found.</p>
      </div>
    );
  }

  const serviceProgress = details.serviceProgress;

  return (
    <div>
      <PropertyDetailsHeader
        postRef={details.header.postRef}
        statusKey={statusKey}
        statusLabel={details.header.statusBadgeLabel}
        onBack={() => router.back()}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* LEFT */}
        <div className="space-y-6 col-span-7">
          {/* SOLD blocks */}
          {statusKey === "sold" && (details.buyer || details.finalDeal) && (
            <div className="mb-6 space-y-4">
              <BuyerBars buyer={details.buyer} finalDeal={details.finalDeal} />
            </div>
          )}

          {/* REJECTED banner */}
          {statusKey === "rejected" && details.rejection && (
            <div className="mb-6">
              <RejectedBanner rejection={details.rejection} />
            </div>
          )}

          <div className="flex items-center justify-between">
            <SectionTitle title="Post Information" />
            <MetricSelect value={unit} onChange={setUnit} />
          </div>

          {/*title comes from property.title */}
          <PostInformationCard
            title={property.title}
            data={details.postInformation}
          />

          <DocumentsCard data={details.documents} />

          {details.ownershipHistory && (
            <OwnershipHistoryCard data={details.ownershipHistory} />
          )}
        </div>

        {/* RIGHT */}
        <div className="space-y-6 col-span-5">
          <PriceCompareCard unit={unit} data={details.askingVsValidated} />
          <ChosenServicesCard data={details.chosenServices} />

          {/*safe + typed */}
          {serviceProgress ? (
            <ServiceProgressCard data={serviceProgress} />
          ) : null}

          <ServiceFeesCard data={details.serviceFees} />

          {details.authenticityChecklist && (
            <AuthenticityCard data={details.authenticityChecklist} />
          )}
        </div>
      </div>

      {/*Pending Review footer actions (Reject + Submit Quote) */}
      {statusKey === "pending_review" ? (
        <div className="mt-6">
          <PendingReviewFooter propertyId={id} />
        </div>
      ) : (
        <UpdateStatusSection />
      )}
    </div>
  );
}
