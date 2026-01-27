"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Home,
  Ruler,
  LayoutGrid,
  SlidersHorizontal,
  CircleDollarSign,
  Check,
} from "lucide-react";

import Button from "@/components/buttons/button";
import Dialog from "@/components/dialogs/dialog";
import { BuyStepOneValues } from "@/app/(user)/dashboard/types/property-buy-post";
import Card from "@/components/cards/card";
import Image from "next/image";

type Props = {
  step1: BuyStepOneValues;
  onBack: () => void;
  onSubmit: () => void | Promise<void>; // later API call
};

function formatBDT(n: number) {
  if (!Number.isFinite(n)) return "৳ 0";
  try {
    return `৳ ${new Intl.NumberFormat("en-IN").format(Math.round(n))}`;
  } catch {
    return `৳ ${Math.round(n)}`;
  }
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 h-9 w-9 rounded-xl bg-secondary flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-semibold tracking-wide text-gray uppercase">
          {label}
        </p>
        <div className="mt-1 text-sm font-semibold text-foreground">
          {value}
        </div>
      </div>
    </div>
  );
}

export default function BuyPostStepTwoReview({
  step1,
  onBack,
  onSubmit,
}: Props) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const locationText =
    [
      step1.upazila?.label,
      step1.pouroshovaOrUnion?.label,
      step1.wardNo?.label ? `Ward No. ${step1.wardNo.label}` : null,
      step1.district?.label,
      step1.division?.label,
      step1.postalCode ? `Dhaka - ${step1.postalCode}` : null,
    ]
      .filter(Boolean)
      .join(", ") ||
    [step1.upazila?.label, step1.district?.label, step1.division?.label]
      .filter(Boolean)
      .join(", ");

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await onSubmit(); // ✅ when you add API call, keep it here
      setDialogOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="rounded-xl">
      <h2 className="text-2xl font-extrabold text-foreground">
        Review your requirements
      </h2>
      <p className="mt-2 text-sm text-gray">
        Review your buy post once more and confirm your placement. Your post
        will be visible as below.
      </p>

      {/* Review Card */}
      <div className="mt-6 rounded-2xl border border-secondary bg-white shadow-sm p-6">
        <p className="text-xl font-extrabold text-foreground">
          {step1.adTitle || "Untitled"}
        </p>

        <div className="mt-4 border-t border-secondary" />

        <div className="py-5 space-y-6">
          <Row
            icon={<MapPin className="h-4 w-4 text-primary" />}
            label="Preferred Location"
            value={locationText || "—"}
          />

          <Row
            icon={<Home className="h-4 w-4 text-primary" />}
            label="Property Type"
            value={step1.propertyType}
          />

          <div className="flex items-start justify-between gap-4">
            <Row
              icon={<Ruler className="h-4 w-4 text-primary" />}
              label="Required Land Size"
              value={`Min ${step1.minLandSize} ${step1.minLandUnit}`}
            />
            <button
              type="button"
              className="text-xs font-semibold text-primary mt-2"
            >
              Change Metrics
            </button>
          </div>

          <div className="flex items-start justify-between gap-4">
            <Row
              icon={<LayoutGrid className="h-4 w-4 text-primary" />}
              label="Required Plot Size"
              value={`Min ${step1.minPlotSize ?? 0} ${step1.minPlotUnit}`}
            />
            <button
              type="button"
              className="text-xs font-semibold text-primary mt-2"
            >
              Change Metrics
            </button>
          </div>

          <Row
            icon={<SlidersHorizontal className="h-4 w-4 text-primary" />}
            label="Distance from Road"
            value={`${step1.distanceMin}m-${step1.distanceMax}m`}
          />

          <Row
            icon={<CircleDollarSign className="h-4 w-4 text-primary" />}
            label="Budget Range"
            value={`${formatBDT(step1.budgetMin)} - ${formatBDT(step1.budgetMax)}`}
          />
        </div>

        <div className="border-t border-secondary pt-5">
          <p className="text-sm font-semibold text-foreground">Description</p>
          <p className="mt-2 text-sm text-gray leading-relaxed">
            {step1.description || "—"}
          </p>
        </div>

        <div className="mt-6">
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit for Review"}
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
      </div>

      {/* Submitted Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        size="md"
        position="center"
        className="p-6 md:p-8"
      >
        <div className="text-center">
          <div className="flex items-center justify-center">
            <Image
              src={"/images/submit-success.png"}
              height={34}
              width={68}
              alt="sumit-success-image"
            />
          </div>

          <h3 className="mt-4 text-xl font-extrabold text-foreground">
            Post Submitted
          </h3>

          <p className="mt-2 text-sm text-primary font-semibold">
            Your post will be visible in the listing soon.
          </p>
          <p className="mt-1 text-sm text-gray">
            It may take up to 1-3 business days for reviewing
          </p>

          {/* Dialog Card */}
          <div className="mt-5 rounded-2xl border border-secondary bg-white p-5 text-left">
            <p className="text-base font-extrabold text-foreground">
              {step1.adTitle || "Untitled"}
            </p>

            <div className="mt-4 space-y-4">
              <Row
                icon={<MapPin className="h-4 w-4 text-primary" />}
                label="Preferred Location"
                value={locationText || "—"}
              />

              <Row
                icon={<Home className="h-4 w-4 text-primary" />}
                label="Property Type"
                value={step1.propertyType}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Row
                  icon={<Ruler className="h-4 w-4 text-primary" />}
                  label="Required Land Size"
                  value={`Min ${step1.minLandSize} ${step1.minLandUnit}`}
                />
                <Row
                  icon={<LayoutGrid className="h-4 w-4 text-primary" />}
                  label="Required Plot Size"
                  value={`Min ${step1.minPlotSize ?? 0} ${step1.minPlotUnit}`}
                />
              </div>

              <Row
                icon={<SlidersHorizontal className="h-4 w-4 text-primary" />}
                label="Distance from Road"
                value={`${step1.distanceMin}m-${step1.distanceMax}m`}
              />

              <Row
                icon={<CircleDollarSign className="h-4 w-4 text-primary" />}
                label="Budget Range"
                value={`${formatBDT(step1.budgetMin)} - ${formatBDT(
                  step1.budgetMax,
                )}`}
              />
            </div>

            <div className="mt-5 border-t border-secondary pt-4">
              <p className="text-sm font-semibold text-foreground">
                Description
              </p>
              <p className="mt-2 text-sm text-gray leading-relaxed">
                {step1.description || "—"}
              </p>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-foreground">Status</p>
              <div className="mt-2 inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-gray">
                Pending Admin Review
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </Dialog>
    </Card>
  );
}
