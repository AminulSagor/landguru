"use client";

import React from "react";
import {
  MapPin,
  Image as ImageIcon,
  Video as VideoIcon,
  Play,
  FileText,
  Info,
  Check,
} from "lucide-react";

import Button from "@/components/buttons/button";
import Dialog from "@/components/dialogs/dialog";

import type {
  StepFourValues,
  StepOneValues,
} from "@/app/(user)/dashboard/types/property-sell-post";
import type { StepTwoValues } from "@/app/(user)/dashboard/types/property-sell-post";
import type { StepThreeValues } from "@/app/(user)/dashboard/types/property-sell-post";

type SellPostAllData = {
  step1?: StepOneValues;
  step2?: StepTwoValues;
  step3?: StepThreeValues;
};

type Props = {
  allData: SellPostAllData;
  onBack: () => void;
  onSubmit: (values: StepFourValues) => void | Promise<void>;
};

function formatBDT(n: number) {
  if (!Number.isFinite(n)) return "৳ 0";
  try {
    return `৳ ${new Intl.NumberFormat("en-IN").format(Math.round(n))}`;
  } catch {
    return `৳ ${Math.round(n)}`;
  }
}

function bytesToMB(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function BadgePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-white">
      {children}
    </span>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary">
      {children}
    </span>
  );
}

function InfoBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-secondary bg-secondary px-4 py-3 flex items-start gap-3">
      <div className="mt-0.5 h-8 w-8 rounded-lg bg-white flex items-center justify-center">
        <Info className="h-4 w-4 text-primary" />
      </div>
      <p className="text-sm text-gray">{children}</p>
    </div>
  );
}

function FileRow({ file }: { file: File }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-secondary bg-white px-4 py-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
          <FileText className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {file.name}
          </p>
          <p className="text-xs text-gray">{bytesToMB(file.size)}</p>
        </div>
      </div>
    </div>
  );
}

export default function SellPropertyStepFourReview({
  allData,
  onBack,
  onSubmit,
}: Props) {
  const step1 = allData.step1;
  const step2 = allData.step2;

  const [showAllDesc, setShowAllDesc] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // create preview urls (photos + video thumb)
  const [photoUrls, setPhotoUrls] = React.useState<string[]>([]);
  const [coverUrl, setCoverUrl] = React.useState<string>("");

  React.useEffect(() => {
    // cleanup old
    photoUrls.forEach((u) => URL.revokeObjectURL(u));
    if (coverUrl) URL.revokeObjectURL(coverUrl);

    const files = step2?.photos ?? [];
    const urls = files.map((f) => URL.createObjectURL(f));
    setPhotoUrls(urls);

    const cover = files[0] ? URL.createObjectURL(files[0]) : "";
    setCoverUrl(cover);

    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
      if (cover) URL.revokeObjectURL(cover);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(step2?.photos ?? []).map((f) => f.name).join("|")]);

  // Asking price (same logic as step 1)
  const sellableAmount = Number(step1?.sellableAmount ?? 0);
  const sellableUnit = step1?.sellableUnit;
  const pricePerKatha = Number(step1?.pricePerKatha ?? 0);

  const KATHA_TO_SQFT = 720;
  const DECIMAL_TO_SQFT = 435.6;
  const toSqft = (value: number, unit: any) =>
    unit === "Katha" ? value * KATHA_TO_SQFT : value * DECIMAL_TO_SQFT;

  const sellableInKatha =
    sellableUnit === "Katha"
      ? sellableAmount
      : toSqft(sellableAmount, "Decimal") / KATHA_TO_SQFT;

  const askingPrice = sellableInKatha * pricePerKatha;

  const description = step1?.description ?? "";
  const shortDesc =
    description.length > 140 ? description.slice(0, 140) + "..." : description;

  const locationText =
    step1?.fullAddress ||
    [step1?.upazila?.label, step1?.district?.label, step1?.division?.label]
      .filter(Boolean)
      .join(", ");

  const topPhotos = photoUrls.slice(0, 3);
  const extraCount = Math.max(0, photoUrls.length - topPhotos.length);

  const deedDocs = step2?.deedDocuments ?? [];
  const khatianDocs = step2?.khatianDocuments ?? [];

  const handleSubmit = async () => {
    await onSubmit({});
    setDialogOpen(true);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
        Review your post
      </h2>
      <p className="mt-2 text-sm text-gray">
        Review your sell post once more and confirm your payment.
      </p>

      {/* Summary card */}
      <div className="mt-6 rounded-2xl border border-secondary bg-white p-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-20 rounded-xl overflow-hidden bg-secondary border border-secondary flex items-center justify-center">
            {coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverUrl}
                alt="cover"
                className="h-full w-full object-cover"
              />
            ) : (
              <ImageIcon className="h-5 w-5 text-gray" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-base font-extrabold text-foreground truncate">
              {step1?.adTitle || "Untitled"}
            </p>
            <p className="text-xs text-gray mt-1">
              Asking Price:{" "}
              <span className="text-primary font-semibold">
                {formatBDT(askingPrice)}
              </span>
            </p>
            <div className="mt-2">
              <BadgePill>{step1?.propertyType ?? "Property"}</BadgePill>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-foreground">Description</p>
        <p className="mt-2 text-sm text-gray leading-relaxed">
          {showAllDesc ? description : shortDesc}{" "}
          {description.length > 140 && (
            <button
              type="button"
              onClick={() => setShowAllDesc((s) => !s)}
              className="text-primary font-semibold"
            >
              {showAllDesc ? "Read Less" : "Read More"}
            </button>
          )}
        </p>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-secondary bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray">
                Sellable Land Amount
              </p>
              <button
                type="button"
                className="text-xs font-semibold text-primary"
              >
                Change Metrics
              </button>
            </div>
            <p className="mt-2 text-sm font-extrabold text-primary">
              {step1?.sellableAmount ?? 0} {step1?.sellableUnit ?? ""}
            </p>
          </div>

          <div className="rounded-xl border border-secondary bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray">Plot Size</p>
              <button
                type="button"
                className="text-xs font-semibold text-primary"
              >
                Change Metrics
              </button>
            </div>
            <p className="mt-2 text-sm font-extrabold text-primary">
              {step1?.plotSize ?? 0} {step1?.plotSizeUnit ?? ""}
            </p>
          </div>

          <div className="rounded-xl border border-secondary bg-white p-4">
            <p className="text-xs font-semibold text-gray">
              Distance from Road
            </p>
            <p className="mt-2 text-sm font-extrabold text-primary">
              {step1?.distanceMin ?? 0}m–{step1?.distanceMax ?? 0}m
            </p>
          </div>

          <div className="rounded-xl border border-secondary bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray">Share Unit</p>
              <button
                type="button"
                className="text-xs font-semibold text-primary"
              >
                Change Metrics
              </button>
            </div>
            <p className="mt-2 text-sm font-extrabold text-primary">
              {step1?.shareUnitEnabled ? (
                <>
                  {step1?.shareUnitAmount ?? 0} {step1?.shareUnitUnit ?? ""}
                </>
              ) : (
                <span className="text-gray font-semibold">Not set</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mt-8">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <p className="text-sm font-semibold text-foreground">Location</p>
        </div>
        <p className="mt-2 text-sm text-gray">{locationText || "—"}</p>
      </div>

      {/* Property Photos */}
      <div className="mt-8">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-primary" />
          <p className="text-sm font-semibold text-foreground">
            Property Photos
          </p>
        </div>

        {photoUrls.length === 0 ? (
          <div className="mt-3 rounded-xl border border-secondary bg-secondary p-6 text-center text-sm text-gray">
            No photos uploaded
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {topPhotos.map((src) => (
              <div
                key={src}
                className="h-20 sm:h-24 rounded-xl overflow-hidden border border-secondary bg-secondary"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="photo"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}

            {extraCount > 0 && (
              <div className="h-20 sm:h-24 rounded-xl border border-secondary bg-secondary flex items-center justify-center">
                <span className="text-primary font-extrabold">
                  +{extraCount}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Property Video */}
      <div className="mt-8">
        <div className="flex items-center gap-2">
          <VideoIcon className="h-4 w-4 text-primary" />
          <p className="text-sm font-semibold text-foreground">
            Property Video
          </p>
        </div>

        <div className="mt-3 rounded-2xl border border-secondary bg-secondary p-8 flex items-center justify-center">
          <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center">
            <Play className="h-6 w-6 text-white" />
          </div>
        </div>

        {!step2?.video && (
          <p className="mt-2 text-xs text-gray">No video uploaded</p>
        )}
      </div>

      {/* Legal documents */}
      <div className="mt-8">
        <p className="text-sm font-semibold text-foreground">Legal Documents</p>

        <div className="mt-4 space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">
              Deed section *
            </p>
            {deedDocs.length === 0 ? (
              <div className="rounded-xl border border-secondary bg-secondary p-4 text-sm text-gray">
                No deed documents uploaded
              </div>
            ) : (
              <div className="space-y-3">
                {deedDocs.map((f, idx) => (
                  <FileRow key={f.name + idx} file={f} />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">
              Khatian section *
            </p>
            {khatianDocs.length === 0 ? (
              <div className="rounded-xl border border-secondary bg-secondary p-4 text-sm text-gray">
                No khatian documents uploaded
              </div>
            ) : (
              <div className="space-y-3">
                {khatianDocs.map((f, idx) => (
                  <FileRow key={f.name + idx} file={f} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <InfoBanner>
            You will be prompted for accepting and negotiating with quotation of
            the service fees later after we review your submission.
          </InfoBanner>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-8">
        <Button className="w-full" onClick={handleSubmit}>
          Submit for Review
        </Button>
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-semibold text-gray"
          >
            Back
          </button>
          <span className="text-xs text-gray">
            (*) marks are mandatory fields
          </span>
        </div>
      </div>

      {/* Submitted dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        size="sm"
        position="center"
      >
        <div className="text-center">
          <div className="mx-auto h-14 w-14 rounded-full bg-green flex items-center justify-center">
            <Check className="h-7 w-7 text-white" />
          </div>

          <h3 className="mt-4 text-xl font-extrabold text-foreground">
            Post Submitted
          </h3>
          <p className="mt-2 text-sm text-gray">
            You will be prompted with quotation soon. It may take up to 1-3
            business days for reviewing
          </p>

          <div className="mt-5 rounded-2xl border border-secondary bg-white p-4 text-left">
            <div className="flex items-center gap-3">
              <div className="h-12 w-14 rounded-xl overflow-hidden bg-secondary border border-secondary flex items-center justify-center">
                {coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={coverUrl}
                    alt="cover"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageIcon className="h-4 w-4 text-gray" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-extrabold text-foreground truncate">
                  {step1?.adTitle || "Untitled"}
                </p>
                <p className="text-xs text-gray mt-0.5">
                  Asking Price:{" "}
                  <span className="text-primary font-semibold">
                    {formatBDT(askingPrice)}
                  </span>
                </p>
                <div className="mt-2">
                  <BadgePill>{step1?.propertyType ?? "Property"}</BadgePill>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold text-gray">Status</p>
              <div className="mt-2 inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-gray">
                Pending Admin Review
              </div>
            </div>
          </div>

          <div className="mt-5">
            <Button className="w-full" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
