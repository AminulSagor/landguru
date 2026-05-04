"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MetricUnit } from "@/app/(dashboard)/admin/types/property.types";
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
import type { PropertyPostItem } from "@/types/admin/property-post/property.types";
import { formatBdt } from "@/utils/properties-management-table.utils";
import { formatDisplayId } from "@/utils/id.utils";

type Props = { property: PropertyPostItem };

function humanizeStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function toMetricUnit(value?: string | null): MetricUnit {
  const normalized = (value ?? "").toLowerCase();

  if (normalized === "sqft") return "Sqft";
  if (normalized === "decimal") return "Decimal";
  if (normalized === "bigha") return "Bigha";

  return "Katha";
}

function toStatusLabel(status: string) {
  if (status.toUpperCase() === "PAYMENT_PENDING_REVIEW") {
    return "Service Fee Paid";
  }

  return humanizeStatus(status);
}

function formatDate(dateValue?: string | null) {
  if (!dateValue) return "N/A";

  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PropertyDetailsView({ property }: Props) {
  const router = useRouter();

  const statusLabel = toStatusLabel(property.status);
  const postRef = formatDisplayId("POST", property.id);
  const normalizedStatus = property.status.toUpperCase();
  const [unit, setUnit] = useState<MetricUnit>(
    toMetricUnit(property.plotUnit || property.sellableUnit),
  );

  const isSold = normalizedStatus === "SOLD";
  const isRejected = normalizedStatus === "REJECTED";
  const isPendingReview = ![
    "REJECTED",
    "SOLD",
    "PARTIAL_SOLD",
    "PAYMENT_PENDING_REVIEW",
    "ACTIVE",
  ].includes(normalizedStatus);

  const finalDeal = isSold
    ? {
        label: "Final Deal Closed",
        soldOn: formatDate(property.updatedAt),
        amount: formatBdt(property.validatedPrice ?? property.askingPrice),
      }
    : undefined;

  const rejection =
    isRejected && property.rejectionReason
      ? {
          title: "This property was rejected",
          message: property.rejectionReason,
        }
      : undefined;

  return (
    <div>
      <PropertyDetailsHeader
        postRef={postRef}
        status={property.status}
        statusLabel={statusLabel}
        onBack={() => router.back()}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* LEFT */}
        <div className="space-y-6 col-span-7">
          {/* SOLD blocks */}
          {isSold && finalDeal && (
            <div className="mb-6 space-y-4">
              <BuyerBars finalDeal={finalDeal} />
            </div>
          )}

          {/* REJECTED banner */}
          {isRejected && rejection && (
            <div className="mb-6">
              <RejectedBanner rejection={rejection} />
            </div>
          )}

          <div className="flex items-center justify-between">
            <SectionTitle title="Post Information" />
            <MetricSelect value={unit} onChange={setUnit} />
          </div>

          {/*title comes from property.title */}
          <PostInformationCard property={property} selectedUnit={unit} />

          <DocumentsCard property={property} />

          {property.ownershipHistory && property.ownershipHistory.length > 0 && (
            <OwnershipHistoryCard property={property} />
          )}
        </div>

        {/* RIGHT */}
        <div className="space-y-6 col-span-5">
          <PriceCompareCard unit={unit} property={property} />
          <ChosenServicesCard property={property} />
          <ServiceProgressCard property={property} />
          <ServiceFeesCard property={property} />

          {property.riskChecklist && property.riskChecklist.length > 0 && (
            <AuthenticityCard property={property} />
          )}
        </div>
      </div>

      {/*Pending Review footer actions (Reject + Submit Quote) */}
      {isPendingReview ? (
        <div className="mt-6">
          <PendingReviewFooter
            propertyId={property.id}
            defaultValidatedPricePerUnit={
              property.validatedPricePerUnit ?? property.askingPricePerUnit
            }
            defaultValidatedPrice={property.validatedPrice ?? property.askingPrice}
            defaultMandatoryFee={property.mandatoryServiceFee}
            defaultOptionalFee={property.optionalServiceFee}
          />
        </div>
      ) : (
        <UpdateStatusSection
          postId={property.id}
          propertyTitle={property.title}
          currentStatus={property.status}
        />
      )}
    </div>
  );
}
