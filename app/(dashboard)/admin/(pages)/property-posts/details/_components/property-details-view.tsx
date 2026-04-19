"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DocKind,
  MetricUnit,
  Property,
  PropertyDetails,
  StatusKey,
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
import {
  PropertyPostDocument,
  PropertyPostItem,
} from "@/types/admin/property-post/property.types";

type Props = { property: PropertyPostItem };

function humanizeStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function humanizeServiceKey(serviceKey: string) {
  return serviceKey
    .split("_")
    .filter(Boolean)
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

function toStatusKey(status: string): StatusKey {
  const normalized = status.toUpperCase();

  if (normalized === "REJECTED") return "rejected";
  if (normalized === "SOLD") return "sold";
  if (normalized === "PARTIAL_SOLD") return "partially_sold";
  if (normalized === "PAYMENT_PENDING_REVIEW") return "service_fee_paid";
  if (normalized === "ACTIVE") return "live";

  return "pending_review";
}

function toStatusLabel(status: string) {
  if (status.toUpperCase() === "PAYMENT_PENDING_REVIEW") {
    return "Service Fee Paid";
  }

  return humanizeStatus(status);
}

function toStatusMetaLabel(status: string) {
  const normalized = status.toUpperCase();

  if (normalized === "ACTIVE") return "Published:";
  if (normalized === "SOLD" || normalized === "PARTIAL_SOLD") return "Sold:";
  if (normalized === "REJECTED") return "Rejected:";

  return "Updated:";
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

function formatRelativeTime(dateValue?: string | null) {
  if (!dateValue) return "N/A";

  const timestamp = new Date(dateValue).getTime();

  if (Number.isNaN(timestamp)) return "N/A";

  const diffInMinutes = Math.max(
    0,
    Math.floor((Date.now() - timestamp) / (1000 * 60)),
  );

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) return `${diffInHours} hr ago`;

  const diffInDays = Math.floor(diffInHours / 24);

  return `${diffInDays} day ago`;
}

function formatBdt(value: number | null | undefined) {
  if (value === null || value === undefined) return "Pending";

  return `৳ ${new Intl.NumberFormat("en-BD").format(value)}`;
}

function getAddressText(property: PropertyPostItem) {
  if (property.address?.fullAddress?.trim()) {
    return property.address.fullAddress;
  }

  if (property.fullAddress?.trim()) {
    return property.fullAddress;
  }

  const locationParts = [
    property.address?.upazila ?? property.upazila,
    property.address?.district ?? property.district,
    property.address?.division ?? property.division,
  ].filter(Boolean);

  if (locationParts.length === 0) return "Location unavailable";

  return locationParts.join(", ");
}

function getFileName(fileUrl: string) {
  const segments = fileUrl.split("/").filter(Boolean);

  return segments[segments.length - 1] ?? fileUrl;
}

function toDocKind(fileUrl: string): DocKind {
  const extension = getFileName(fileUrl).split(".").pop()?.toLowerCase();

  if (!extension) return "other";
  if (["jpg", "jpeg", "png", "webp", "avif"].includes(extension)) return "image";
  if (extension === "pdf") return "pdf";
  if (extension === "doc") return "doc";
  if (extension === "docx") return "docx";

  return "other";
}

function toDocSizeLabel(fileUrl: string) {
  const extension = getFileName(fileUrl).split(".").pop()?.toUpperCase();

  if (!extension) return "FILE";

  return `${extension} File`;
}

function resolveDocuments(property: PropertyPostItem) {
  if (property.documents?.length) {
    return property.documents;
  }

  const fallback: PropertyPostDocument[] = [];

  (property.deedFiles ?? []).forEach((fileUrl) => {
    fallback.push({ fileUrl, category: "DEED" });
  });

  (property.khatianFiles ?? []).forEach((fileUrl) => {
    fallback.push({ fileUrl, category: "KHATIAN" });
  });

  (property.otherFiles ?? []).forEach((fileUrl) => {
    fallback.push({ fileUrl, category: "OTHER" });
  });

  return fallback;
}

function toServiceProgressStatus(status?: string | null):
  | "none"
  | "pending"
  | "in_progress"
  | "submitted"
  | "verified" {
  const normalized = (status ?? "").toUpperCase();

  if (normalized === "PENDING") return "pending";
  if (normalized === "IN_PROGRESS") return "in_progress";
  if (normalized === "SUBMITTED") return "submitted";
  if (normalized === "VERIFIED" || normalized === "COMPLETED") return "verified";

  return "none";
}

function parseProgressText(value?: string | null) {
  const match = value?.match(/(\d+)\s*\/\s*(\d+)/);

  if (!match) {
    return { done: 0, total: 0 };
  }

  return {
    done: Number.parseInt(match[1], 10) || 0,
    total: Number.parseInt(match[2], 10) || 0,
  };
}

function toLegacyProperty(property: PropertyPostItem): Property {
  const sellerName = property.seller.name ?? property.seller.fullName ?? "Unknown Seller";
  const sellerPhone = property.seller.phone ?? "N/A";
  const sellerId = property.seller.id ?? property.sellerId;
  const sellerAvatar = property.seller.photoUrl ?? property.seller.avatar ?? "";
  const addressText = getAddressText(property);
  const statusLabel = toStatusLabel(property.status);
  const statusKey = toStatusKey(property.status);

  const documents = resolveDocuments(property);

  const deedDocs = documents.filter((doc) => doc.category === "DEED");
  const khatianDocs = documents.filter((doc) => doc.category === "KHATIAN");
  const otherDocs = documents.filter(
    (doc) => doc.category !== "DEED" && doc.category !== "KHATIAN",
  );

  const selectedServiceLabels = property.selectedServiceslist?.length
    ? property.selectedServiceslist.map((service) => humanizeServiceKey(service.serviceKey))
    : (property.selectedServices ?? []).map((service) => humanizeServiceKey(service));

  const serviceRowsSource =
    property.serviceAssignments && property.serviceAssignments.length > 0
      ? property.serviceAssignments.map((assignment) => ({
          key: assignment.serviceKey,
          label: assignment.serviceName || humanizeServiceKey(assignment.serviceKey),
          id: assignment.id,
          status: assignment.status,
          hasAgent: Boolean(assignment.agentId),
        }))
      : selectedServiceLabels.map((label) => ({
          key: label,
          label,
          id: undefined,
          status: undefined,
          hasAgent: false,
        }));

  const progressFromApi = parseProgressText(property.servicesProgress);
  const fallbackTotal = serviceRowsSource.length;
  const fallbackDone = serviceRowsSource.filter((row) => {
    const mapped = toServiceProgressStatus(row.status);
    return mapped === "submitted" || mapped === "verified";
  }).length;

  const totalProgress = progressFromApi.total > 0 ? progressFromApi.total : fallbackTotal;
  const doneProgress = progressFromApi.total > 0 ? progressFromApi.done : fallbackDone;

  const details: PropertyDetails = {
    header: {
      postRef: `#${property.id.slice(0, 8).toUpperCase()}`,
      statusBadgeLabel: statusLabel,
    },
    metricsUnit: toMetricUnit(property.plotUnit || property.sellableUnit),
    finalDeal:
      statusKey === "sold" || statusKey === "partially_sold"
        ? {
            label: "Final Deal Closed",
            soldOn: formatDate(property.updatedAt),
            amount: formatBdt(property.validatedPrice ?? property.askingPrice),
          }
        : undefined,
    rejection: property.rejectionReason
      ? {
          title: "This property was rejected",
          message: property.rejectionReason,
        }
      : undefined,
    postInformation: {
      postedBy: {
        name: sellerName,
        phone: sellerPhone,
        uid: sellerId.slice(0, 8).toUpperCase(),
        avatarUrl: sellerAvatar,
      },
      askingPrice: formatBdt(property.askingPrice),
      locationText: addressText,
      facts: [
        {
          label: "Property Type",
          value: property.propertyType,
        },
        {
          label: "Sellable Amount",
          value: `${property.sellableAmount} ${property.sellableUnit}`,
        },
        {
          label: "Plot Size",
          value: `${property.plotSize} ${property.plotUnit}`,
        },
        {
          label: "Road Distance",
          value:
            property.roadDistanceMin !== null && property.roadDistanceMax !== null
              ? `${property.roadDistanceMin} - ${property.roadDistanceMax} ft`
              : "N/A",
        },
      ],
      description: property.description ?? "No description available.",
      media: {
        photos: (property.photos ?? []).map((url) => ({ url })),
        video: property.videoUrl
          ? {
              url: property.videoUrl,
            }
          : undefined,
      },
    },
    askingVsValidated: {
      askingPerUnit: formatBdt(property.askingPricePerUnit),
      askingTotal: formatBdt(property.askingPrice),
      validatedPerUnit: formatBdt(property.validatedPricePerUnit),
      validatedTotal: formatBdt(property.validatedPrice),
    },
    chosenServices: {
      mandatory: [],
      optional: selectedServiceLabels.map((label) => ({ label, selected: true })),
    },
    serviceFees: {
      isPaid:
        property.mandatoryServiceFee !== null || property.optionalServiceFee !== null,
      mandatoryFee: formatBdt(property.mandatoryServiceFee),
      optionalFee: formatBdt(property.optionalServiceFee),
    },
    documents: {
      canReorganize: true,
      emptyLabel: "None",
      sections: [
        {
          title: "Deed",
          items: deedDocs.map((doc) => ({
            name: getFileName(doc.fileUrl),
            sizeLabel: toDocSizeLabel(doc.fileUrl),
            kind: toDocKind(doc.fileUrl),
            url: doc.fileUrl,
          })),
        },
        {
          title: "Khatian",
          items: khatianDocs.map((doc) => ({
            name: getFileName(doc.fileUrl),
            sizeLabel: toDocSizeLabel(doc.fileUrl),
            kind: toDocKind(doc.fileUrl),
            url: doc.fileUrl,
          })),
        },
        {
          title: "Others",
          items: otherDocs.map((doc) => ({
            name: getFileName(doc.fileUrl),
            sizeLabel: toDocSizeLabel(doc.fileUrl),
            kind: toDocKind(doc.fileUrl),
            url: doc.fileUrl,
          })),
        },
      ].filter((section) => section.items.length > 0),
    },
    serviceProgress: {
      completedText: `(${doneProgress}/${totalProgress} Completed)`,
      noteText:
        totalProgress > doneProgress
          ? `${totalProgress - doneProgress} service(s) still pending`
          : undefined,
      rows: serviceRowsSource.map((row) => {
        const progressStatus = toServiceProgressStatus(row.status);

        const action = !row.hasAgent
          ? {
              kind: "assign" as const,
              label: "Assign Agent",
            }
          : progressStatus === "submitted"
            ? {
                kind: "review" as const,
                label: "Review",
              }
            : {
                kind: "view" as const,
                label: "View",
              };

        return {
          serviceType: row.label,
          serviceRef: row.id ? `#${row.id.slice(0, 8).toUpperCase()}` : undefined,
          assignedAgent: undefined,
          progressStatus,
          action,
        };
      }),
    },
    ownershipHistory:
      property.ownershipHistory && property.ownershipHistory.length > 0
        ? {
            title: "Ownership History",
            canEdit: true,
            owners: property.ownershipHistory.map((owner) => ({
              name: owner.ownerName ?? owner.name ?? "N/A",
              dateRange: owner.duration ?? owner.dateRange ?? "N/A",
              isCurrent: owner.isCurrent,
            })),
          }
        : undefined,
    authenticityChecklist:
      property.riskChecklist && property.riskChecklist.length > 0
        ? {
            title: "Property Authenticity Checklist",
            canEdit: true,
            items: property.riskChecklist.map((item, index) => ({
              label: item.label?.trim() || `Checklist item ${index + 1}`,
              checked: item.isChecked ?? item.checked ?? false,
            })),
          }
        : undefined,
  };

  return {
    id: property.id,
    title: property.title,
    propertyType:
      property.propertyType.toLowerCase() === "flat" ? "Flat" : "Land",
    addressLine1: addressText,
    addressLine2: "",
    tags: [],
    thumbUrl: property.photos?.[0] ?? "",
    ask: formatBdt(property.askingPrice),
    val: formatBdt(property.validatedPrice),
    owner: {
      name: sellerName,
      phone: sellerPhone,
      uid: sellerId.slice(0, 8).toUpperCase(),
      avatarUrl: sellerAvatar,
    },
    progress: {
      labelLeft: "Progress",
      done: doneProgress,
      total: totalProgress,
      note:
        totalProgress > doneProgress
          ? {
              text: "Pending Assign",
              count: totalProgress - doneProgress,
            }
          : undefined,
    },
    status: {
      key: statusKey,
      label: statusLabel,
      metaLabel: toStatusMetaLabel(property.status),
      metaTime: formatRelativeTime(property.updatedAt || property.createdAt),
    },
    action: {
      kind: "view_details",
      label: "View Details",
    },
    details,
  };
}

export default function PropertyDetailsView({ property }: Props) {
  const router = useRouter();

  const legacyProperty = useMemo(() => toLegacyProperty(property), [property]);
  const statusKey = legacyProperty.status.key;
  const id = legacyProperty.id;

  const details = useMemo(() => legacyProperty.details, [legacyProperty.details]);
  const [unit, setUnit] = useState<MetricUnit>(
    legacyProperty.details?.metricsUnit ?? "Katha",
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
          <PostInformationCard title={legacyProperty.title} data={details.postInformation} />

          <DocumentsCard data={details.documents} />

          {details.ownershipHistory && <OwnershipHistoryCard data={details.ownershipHistory} />}
        </div>

        {/* RIGHT */}
        <div className="space-y-6 col-span-5">
          <PriceCompareCard unit={unit} data={details.askingVsValidated} />
          <ChosenServicesCard data={details.chosenServices} />

          {/*safe + typed */}
          {serviceProgress ? <ServiceProgressCard data={serviceProgress} /> : null}

          <ServiceFeesCard data={details.serviceFees} />

          {details.authenticityChecklist && <AuthenticityCard data={details.authenticityChecklist} />}
        </div>
      </div>

      {/*Pending Review footer actions (Reject + Submit Quote) */}
      {statusKey === "pending_review" ? (
        <div className="mt-6">
          <PendingReviewFooter
            propertyId={id}
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
          postId={id}
          propertyTitle={legacyProperty.title}
          currentStatus={property.status}
        />
      )}
    </div>
  );
}
