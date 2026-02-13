"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Property,
  MetricUnit,
} from "@/app/(dashboard)/admin/types/property.types";
import PropertyDetailsHeader from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/property-details-header";
import BuyerBars from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/buyer-bars";
import RejectedBanner from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/rejected-banner";
import MetricSelect from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/metric-select";
import SectionTitle from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/section-title";
import PostInformationCard from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/post-information-card";
import DocumentsCard from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/documents-card";
import OwnershipHistoryCard from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/ownership-history-card";
import PriceCompareCard from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/price-compare-card";
import ChosenServicesCard from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/chosen-services-card";
import ServiceProgressCard from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/service-progress-card";
import ServiceFeesCard from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/service-fees-card";
import AuthenticityCard from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/authenticity-card";
import PendingReviewFooter from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/pending-review-footer";
import UpdateStatusSection from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/update-status-section";

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
