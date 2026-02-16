// 3) update your page file (only add state + wire dialogs)
// app/(user)/dashboard/(pages)/property-request-details/[id]/RequestPropertyDetailsView.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarClock,
  FileText,
  Home,
  MapPin,
  Users,
  Wallet,
  Bookmark,
  User,
  CirclePlus,
  Route,
  Square,
  Ruler,
} from "lucide-react";

import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";

import { PropertyRequestDetails } from "@/app/(dashboard)/user/(pages)/properties/request/details/[id]/page";

import PostSubmittedDialog from "@/app/(dashboard)/user/(pages)/properties/_components/post-submitted-dialog";
import SelectPropertyDialog, {
  Listing,
} from "@/app/(dashboard)/user/(pages)/properties/_components/select-property-dialog";

export default function RequestPropertyDetailsView({
  request,
}: {
  request: PropertyRequestDetails;
}) {
  const budgetText = `৳ ${request.budgetMin.toLocaleString()} - ৳ ${request.budgetMax.toLocaleString()}`;

  const [openSelect, setOpenSelect] = React.useState(false);
  const [openSubmitted, setOpenSubmitted] = React.useState(false);
  const [selectedListing, setSelectedListing] = React.useState<Listing | null>(
    null,
  );

  const handleConfirmOffer = (listing: Listing) => {
    setSelectedListing(listing);
    setOpenSelect(false);
    setOpenSubmitted(true);
  };

  return (
    <div className="py-24">
      <div>
        <Link
          href="/user/properties"
          className="inline-flex items-center gap-2 text-sm text-gray hover:opacity-80"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Listings
        </Link>

        <Card className="mx-auto mt-4 max-w-6xl rounded-xl px-4 py-6">
          {/* Header */}
          <div className="rounded-2xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold text-gray">
                    {request.title}
                  </h1>
                  <StatusBadge status={request.status} />
                </div>
                <p className="mt-2 text-sm text-gray/70">ID: #{request.id}</p>
              </div>

              <div className="w-full md:w-[320px]">
                <BuyerCard
                  name={request.postedBy}
                  postedAgo={request.postedAgo}
                  verified={!!request.verified}
                />
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Left */}
            <div>
              <h2 className="text-base font-semibold text-gray">
                Property Requirements
              </h2>

              <div className="mt-5 space-y-5">
                <ReqRow
                  icon={<MapPin className="h-5 w-5" />}
                  label="Preferred Location"
                  value={request.location}
                />
                <ReqRow
                  icon={<Home className="h-5 w-5" />}
                  label="Property Type"
                  value={request.propertyType}
                />
                <ReqRow
                  icon={<Ruler className="h-5 w-5" />}
                  label="Required Land Size"
                  value={request.requiredLandSize}
                  rightLink="Change Metrics"
                />
                <ReqRow
                  icon={<Square className="h-5 w-5" />}
                  label="Required Plot Size"
                  value={request.requiredPlotSize}
                  rightLink="Change Metrics"
                />
                <ReqRow
                  icon={<Route className="h-5 w-5" />}
                  label="Distance from Road"
                  value={request.distanceFromRoad}
                />
                <ReqRow
                  icon={<Wallet className="h-5 w-5" />}
                  label="Budget Range"
                  value={budgetText}
                />
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-semibold text-gray">
                  Description
                </h2>
                <Card className="mt-3 rounded-2xl border bg-secondary p-5">
                  <p className="text-sm text-gray/80">{request.description}</p>
                </Card>
              </div>

              <div>
                <h2 className="text-base font-semibold text-gray">
                  How offering works?
                </h2>
                <Card className="mt-3 rounded-2xl border bg-secondary p-6">
                  <OfferingStepper />
                </Card>
              </div>

              <Card className="rounded-2xl border bg-secondary p-6">
                <Button
                  className="h-12 w-full rounded-xl"
                  onClick={() => setOpenSelect(true)}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Offer from your existing Posts
                </Button>
                <Link href={'/user/posts/sell/create'}>
                  <Button
                    className="mt-4 w-full border border-gray text-primary"
                    variant="secondary"
                  >
                    <CirclePlus size={18} />
                    Create new sell post and offer
                  </Button>
                </Link>

                <p className="mt-4 text-center text-xs text-gray/70">
                  By offering, you agree to our{" "}
                  <a href="#" className="text-primary underline">
                    Terms &amp; Conditions
                  </a>
                  .
                </p>
              </Card>
            </div>
          </div>
        </Card>
      </div>

      {/* Dialog 1 */}
      <SelectPropertyDialog
        open={openSelect}
        onOpenChange={setOpenSelect}
        requestTitle={request.title}
        requestId={request.id}
        onConfirm={handleConfirmOffer}
      />

      {/* Dialog 2 */}
      <PostSubmittedDialog
        open={openSubmitted}
        onOpenChange={setOpenSubmitted}
        listing={selectedListing}
      />
    </div>
  );
}

/* ===== helpers (keep your existing ones if already) ===== */

function StatusBadge({ status }: { status: "Active" | "Closed" | "Pending" }) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
      {status}
    </span>
  );
}

function BuyerCard({
  name,
  postedAgo,
  verified,
}: {
  name: string;
  postedAgo: string;
  verified: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-secondary/50 p-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/10" />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-gray">{name}</p>
            {verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green/10 px-2 py-0.5 text-xs font-medium text-green">
                <BadgeCheck className="h-3.5 w-3.5" />
                Verified
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-gray/70">Posted: {postedAgo}</p>
        </div>
      </div>
    </div>
  );
}

function ReqRow({
  icon,
  label,
  value,
  rightLink,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  rightLink?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-gray/60">
            {label}
          </p>
          <p className="mt-1 line-clamp-2 text-sm font-semibold text-gray">
            {value}
          </p>
        </div>
      </div>

      {rightLink ? (
        <button
          type="button"
          className="mt-1 text-xs font-medium text-primary hover:opacity-80"
        >
          {rightLink}
        </button>
      ) : null}
    </div>
  );
}

function OfferingStepper() {
  const steps = [
    { icon: <Bookmark className="h-5 w-5" />, label: "You send offer" },
    { icon: <User className="h-5 w-5" />, label: "Buyer reviews" },
    { icon: <CalendarClock className="h-5 w-5" />, label: "We schedule" },
    { icon: <Users className="h-5 w-5" />, label: "Meet buyer" },
  ];

  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-6 h-[2px] bg-primary/15" />
      <div className="grid grid-cols-4 gap-4">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-[color:var(--color-secondary)]">
              {s.icon}
            </div>
            <p className="mt-2 text-xs font-medium text-gray/70">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
