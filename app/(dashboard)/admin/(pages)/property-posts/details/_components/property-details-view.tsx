"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/cards/card";
import Avatar from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/avatar";
import PropertyDetailsHeader from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/property-details-header";
import RejectedBanner from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/rejected-banner";
import PendingReviewFooter from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/pending-review-footer";
import UpdateStatusSection from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/update-status-section";
import {
  PropertyPostDocument,
  PropertyPostItem,
  PropertyPostRiskChecklistItem,
} from "@/types/admin/property-post/property.types";
import { formatCompactBdt } from "../../_utils/properties-management-table.utils";

type Props = { property: PropertyPostItem };

const PENDING_ACTION_STATUSES = new Set([
  "PENDING_ADMIN",
  "PENDING_BUYER_REVIEW",
  "PAYMENT_PENDING_REVIEW",
  "QUOTED",
]);

function toStatusLabel(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function toPostRef(postId: string) {
  return `#${postId.slice(0, 8).toUpperCase()}`;
}

function toAddress(post: PropertyPostItem) {
  if (post.address?.fullAddress?.trim()) {
    return post.address.fullAddress;
  }

  if (post.fullAddress?.trim()) {
    return post.fullAddress;
  }

  const locationParts = [
    post.address?.upazila ?? post.upazila,
    post.address?.district ?? post.district,
    post.address?.division ?? post.division,
  ].filter(Boolean);

  if (locationParts.length === 0) {
    return "Location unavailable";
  }

  return locationParts.join(", ");
}

function humanizeServiceKey(serviceKey: string) {
  return serviceKey
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
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

function getFileName(fileUrl: string) {
  const segments = fileUrl.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? fileUrl;
}

function getRiskLabel(item: PropertyPostRiskChecklistItem, index: number) {
  return item.label?.trim() || `Checklist item ${index + 1}`;
}

function resolveDocuments(property: PropertyPostItem) {
  if (property.documents?.length) {
    return property.documents;
  }

  const fallbackDocuments: PropertyPostDocument[] = [];

  (property.deedFiles ?? []).forEach((fileUrl) => {
    fallbackDocuments.push({ fileUrl, category: "DEED" });
  });

  (property.khatianFiles ?? []).forEach((fileUrl) => {
    fallbackDocuments.push({ fileUrl, category: "KHATIAN" });
  });

  (property.otherFiles ?? []).forEach((fileUrl) => {
    fallbackDocuments.push({ fileUrl, category: "OTHER" });
  });

  if (property.videoUrl) {
    fallbackDocuments.push({ fileUrl: property.videoUrl, category: "VIDEO" });
  }

  return fallbackDocuments;
}

function groupDocumentsByCategory(documents: PropertyPostDocument[]) {
  const grouped = new Map<string, PropertyPostDocument[]>();

  documents.forEach((document) => {
    const key = document.category || "OTHER";

    if (!grouped.has(key)) {
      grouped.set(key, []);
    }

    grouped.get(key)?.push(document);
  });

  return grouped;
}

export default function PropertyDetailsView({ property }: Props) {
  const router = useRouter();

  const status = property.status;
  const sellerName =
    property.seller.name ?? property.seller.fullName ?? "Unknown Seller";
  const sellerAvatar = property.seller.photoUrl ?? property.seller.avatar ?? "";

  const address = useMemo(() => toAddress(property), [property]);

  const selectedServices = useMemo(() => {
    if (property.selectedServiceslist?.length) {
      return property.selectedServiceslist.map((service) =>
        humanizeServiceKey(service.serviceKey),
      );
    }

    return (property.selectedServices ?? []).map((service) =>
      humanizeServiceKey(service),
    );
  }, [property.selectedServices, property.selectedServiceslist]);

  const documents = useMemo(() => resolveDocuments(property), [property]);
  const documentsByCategory = useMemo(
    () => groupDocumentsByCategory(documents),
    [documents],
  );

  const ownershipHistory = property.ownershipHistory ?? [];
  const riskChecklist = property.riskChecklist ?? [];
  const serviceAssignments = property.serviceAssignments ?? [];
  const showPendingActions = PENDING_ACTION_STATUSES.has(status);

  return (
    <div>
      <PropertyDetailsHeader
        postRef={toPostRef(property.id)}
        status={status}
        statusLabel={toStatusLabel(status)}
        onBack={() => router.back()}
      />

      {status === "REJECTED" && property.rejectionReason && (
        <div className="mb-5">
          <RejectedBanner
            rejection={{
              title: "This property post was rejected",
              message: property.rejectionReason,
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="space-y-6 col-span-7">
          <Card>
            <p className="text-sm font-semibold text-gray">Post Information</p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <p className="text-base font-extrabold text-gray">{property.title}</p>
                <p className="mt-2 text-xs font-medium text-gray leading-relaxed">
                  {property.description ?? "No description available."}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray">Property Type</p>
                <p className="text-sm font-bold text-primary mt-1">{property.propertyType}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray">Location</p>
                <p className="text-sm font-bold text-primary mt-1">{address}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray">Sellable Size</p>
                <p className="text-sm font-bold text-primary mt-1">
                  {property.sellableAmount} {property.sellableUnit}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray">Plot Size</p>
                <p className="text-sm font-bold text-primary mt-1">
                  {property.plotSize} {property.plotUnit}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray">Road Distance</p>
                <p className="text-sm font-bold text-primary mt-1">
                  {property.roadDistanceMin ?? "N/A"} - {property.roadDistanceMax ?? "N/A"} ft
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray">Created At</p>
                <p className="text-sm font-bold text-primary mt-1">{formatDate(property.createdAt)}</p>
              </div>
            </div>

            <div className="mt-5 border border-gray/15 rounded-lg p-4 bg-white flex items-center gap-3">
              <Avatar url={sellerAvatar} name={sellerName} />

              <div>
                <p className="text-xs font-extrabold text-gray">{sellerName}</p>
                <p className="text-xs font-semibold text-gray">
                  {property.seller.phone ?? "No phone number"}
                </p>
                <p className="text-xs font-semibold text-gray">
                  {property.seller.email ?? "No email"}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <p className="text-sm font-semibold text-gray">Media and Documents</p>

            {property.photos?.length ? (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.photos.map((photoUrl, index) => (
                  <div
                    key={`${photoUrl}-${index}`}
                    className="overflow-hidden rounded-lg border border-gray/15"
                  >
                    <Image
                      src={photoUrl}
                      alt={`${property.title} - ${index + 1}`}
                      width={240}
                      height={160}
                      unoptimized
                      className="h-28 w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-xs font-semibold text-gray">No photos uploaded.</p>
            )}

            {documents.length > 0 ? (
              <div className="mt-5 space-y-4">
                {Array.from(documentsByCategory.entries()).map(([category, items]) => (
                  <div key={category}>
                    <p className="text-xs font-extrabold text-gray mb-2">{category}</p>

                    <div className="space-y-2">
                      {items.map((document, index) => (
                        <a
                          key={`${document.fileUrl}-${index}`}
                          href={document.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="block rounded-lg border border-gray/15 px-3 py-2 text-xs font-semibold text-primary hover:bg-secondary"
                        >
                          {getFileName(document.fileUrl)}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-xs font-semibold text-gray">No documents uploaded.</p>
            )}
          </Card>

          {ownershipHistory.length > 0 && (
            <Card>
              <p className="text-sm font-semibold text-gray">Ownership History</p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ownershipHistory.map((owner, index) => {
                  const ownerName = owner.ownerName ?? owner.name ?? `Owner ${index + 1}`;
                  const ownerDuration = owner.duration ?? owner.dateRange ?? "N/A";

                  return (
                    <div
                      key={`${ownerName}-${ownerDuration}-${index}`}
                      className="border border-gray/15 rounded-lg px-3 py-3"
                    >
                      <p className="text-xs font-extrabold text-gray">{ownerName}</p>
                      <p className="text-xs font-semibold text-primary mt-1">{ownerDuration}</p>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {riskChecklist.length > 0 && (
            <Card>
              <p className="text-sm font-semibold text-gray">Risk Checklist</p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {riskChecklist.map((item, index) => {
                  const checked = item.isChecked ?? item.checked ?? false;

                  return (
                    <div
                      key={`${getRiskLabel(item, index)}-${index}`}
                      className="border border-gray/15 rounded-lg px-3 py-2 flex items-center justify-between gap-3"
                    >
                      <p className="text-xs font-semibold text-gray">{getRiskLabel(item, index)}</p>
                      <span
                        className={`text-[11px] font-bold rounded-full px-2 py-0.5 ${
                          checked
                            ? "bg-[#DCFCE7] text-green border border-[#86EFAC]"
                            : "bg-[#FEE2E2] text-[#B91C1C] border border-[#FCA5A5]"
                        }`}
                      >
                        {checked ? "Checked" : "Pending"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-6 col-span-5">
          <Card>
            <p className="text-sm font-semibold text-gray">Pricing Overview</p>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray">Asking Price</p>
                <p className="text-sm font-extrabold text-gray">
                  {formatCompactBdt(property.askingPrice)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray">Asking Price Per Unit</p>
                <p className="text-sm font-extrabold text-gray">
                  {formatCompactBdt(property.askingPricePerUnit)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray">Validated Price</p>
                <p className="text-sm font-extrabold text-green">
                  {formatCompactBdt(property.validatedPrice)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray">Mandatory Service Fee</p>
                <p className="text-sm font-extrabold text-gray">
                  {formatCompactBdt(property.mandatoryServiceFee)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray">Optional Service Fee</p>
                <p className="text-sm font-extrabold text-gray">
                  {formatCompactBdt(property.optionalServiceFee)}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <p className="text-sm font-semibold text-gray">Selected Services</p>

            {selectedServices.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedServices.map((service) => (
                  <span
                    key={service}
                    className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
                  >
                    {service}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-xs font-semibold text-gray">No services selected.</p>
            )}
          </Card>

          <Card>
            <p className="text-sm font-semibold text-gray">Service Assignments</p>

            {serviceAssignments.length > 0 ? (
              <div className="mt-4 space-y-3">
                {serviceAssignments.map((assignment, index) => (
                  <div
                    key={`${assignment.id ?? assignment.serviceKey}-${index}`}
                    className="border border-gray/15 rounded-lg px-3 py-3"
                  >
                    <p className="text-xs font-extrabold text-gray">
                      {assignment.serviceName || humanizeServiceKey(assignment.serviceKey)}
                    </p>
                    <p className="text-xs font-semibold text-gray mt-1">
                      Status: {assignment.status ?? "Not assigned"}
                    </p>
                    <p className="text-xs font-semibold text-gray">
                      Fee: {formatCompactBdt(assignment.feeAmount ?? null)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-xs font-semibold text-gray">
                Service assignments are not available yet.
              </p>
            )}
          </Card>
        </div>
      </div>

      {showPendingActions ? (
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
