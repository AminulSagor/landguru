// 2) components/offers/post-submitted-dialog.tsx
"use client";

import { Check, ChevronRight, BadgeCheck } from "lucide-react";
import Card from "@/components/cards/card";
import { Listing } from "./select-property-dialog";
import Dialog from "@/components/dialogs/dialog";
import Image from "next/image";

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
      title: "Modern Duplex Villa",
      location: "Road 11, Banani, Dhaka",
      price: 4000000,
      status: "Active",
      thumbBg: "#f43f5e",
    } as Listing);

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
            <div className="h-16 w-16 overflow-hidden rounded-xl bg-secondary">
              <div
                className="h-full w-full"
                style={{ backgroundColor: safeListing.thumbBg, opacity: 0.18 }}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold text-gray">
                {safeListing.title}
              </p>

              <div className="mt-1 flex items-center gap-2">
                <p className="text-sm text-gray/60">Asking Price:</p>
                <p className="text-sm font-semibold text-primary">
                  ৳ {safeListing.price.toLocaleString()}
                </p>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                  Flat
                </span>

                {/* screenshot pill colors */}
                <span className="inline-flex items-center rounded-md bg-[#fff7e6] px-2 py-1 text-xs font-semibold text-[#a35b00]">
                  Active
                </span>

                <span className="inline-flex items-center gap-1 rounded-md bg-green/10 px-2 py-1 text-xs font-semibold text-green">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Verified
                </span>
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
