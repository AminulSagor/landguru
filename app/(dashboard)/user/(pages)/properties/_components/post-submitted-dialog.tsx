// 2) components/offers/post-submitted-dialog.tsx
"use client";

import { ChevronRight, BadgeCheck } from "lucide-react";
import Image from "next/image";

import Card from "@/components/cards/card";
import Dialog from "@/components/dialogs/dialog";
import { IMAGE } from "@/constants/image-paths";
import { Listing } from "./select-property-dialog";

export default function PostSubmittedDialog({
  open,
  onOpenChange,
  listing,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  listing: Listing | null;
}) {
  const safeListing: Listing =
    listing ??
    ({
      id: "LIST-101",
      title: "Offer Post",
      price: 0,
      status: "Pending",
      image: IMAGE.property,
    } as Listing);

  const priceText = formatPrice(safeListing.price);
  const imageUrl = safeListing.image || IMAGE.property;
  const statusLabel = normalizeStatus(
    typeof safeListing.status === "string"
      ? safeListing.status
      : String(safeListing.status ?? ""),
  );

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      position="top"
      className="rounded-2xl"
    >
      <div>
        <div className="flex flex-col items-center text-center">
          <div className="flex  items-center justify-center ">
            <Image
              src={"/images/submit-success.png"}
              height={100}
              width={110}
              alt="submit-success"
            />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray">
            Post Submitted
          </h3>
          <p className="mt-1 text-sm text-primary">
            Your offer post will be visible to the buyer soon.
          </p>
        </div>

        <Card className="mt-6 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-secondary">
              <Image
                src={imageUrl}
                alt={safeListing.title || "Listing"}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold text-gray">
                {safeListing.title || "Untitled"}
              </p>

              <div className="mt-1 flex items-center gap-2">
                <p className="text-sm text-gray/60">Asking Price:</p>
                <p className="text-sm font-semibold text-primary">
                  ৳ {priceText}
                </p>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                {safeListing.propertyType ? (
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                    {safeListing.propertyType}
                  </span>
                ) : null}

                <StatusPill status={statusLabel} />

                {safeListing.isVerified ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-green/10 px-2 py-1 text-xs font-semibold text-green">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified
                  </span>
                ) : null}
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-gray/50" />
          </div>
        </Card>

        <div className="mt-6">
          <p className="text-sm font-semibold text-gray">Status</p>
          <div className="mt-2 inline-flex rounded-lg bg-gray/20 px-4 py-2 text-sm text-gray/60">
            Pending Buyer Review
          </div>
        </div>
      </div>
    </Dialog>
  );
}

const normalizeStatus = (value?: string | null) => {
  const normalized = String(value || "").toLowerCase();
  if (normalized === "active") return "Active";
  if (normalized === "draft") return "Draft";
  if (normalized.includes("pending")) return "Pending";
  return "Pending";
};

const formatPrice = (value?: number | string | null) => {
  if (typeof value === "number" && Number.isFinite(value)) {
    try {
      return value.toLocaleString("en-IN");
    } catch {
      return String(value);
    }
  }

  const digits = String(value ?? "").replace(/[^\d]/g, "");
  const amount = digits ? Number(digits) : 0;
  try {
    return amount.toLocaleString("en-IN");
  } catch {
    return String(amount);
  }
};

function StatusPill({ status }: { status: string }) {
  if (status === "Active") {
    return (
      <span className="inline-flex items-center rounded-md bg-green/10 px-2 py-1 text-xs font-semibold text-green">
        Active
      </span>
    );
  }

  if (status === "Draft") {
    return (
      <span className="inline-flex items-center rounded-md bg-gray/10 px-2 py-1 text-xs font-semibold text-gray/70">
        Draft
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-md bg-[#fff7e6] px-2 py-1 text-xs font-semibold text-[#a35b00]">
      Pending
    </span>
  );
}
