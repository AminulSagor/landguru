"use client";

import React from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { Property } from "@/app/(user)/dashboard/types/property";
import Dialog from "@/components/dialogs/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: Property;
  onSuccess: () => void;
};

const AppointmentModal = ({
  open,
  onOpenChange,
  property,
  onSuccess,
}: Props) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      position="center"
      size="sm"
    >
      <div className="p-2">
        <h2 className="text-xl font-extrabold text-black">
          Request For Appointment
        </h2>
        <p className="mt-1 text-xs text-black/50">
          By requesting for appointment, you agree to share your details below.
          You will be notified soon.
        </p>

        <Card className="mt-5 p-4">
          <div className="flex gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={property.coverImage}
              alt={property.title}
              className="h-16 w-16 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <p className="font-extrabold text-black truncate">
                {property.title}
              </p>
              <p className="text-sm text-black/50">
                Price: {property.currencySymbol ?? "৳"}{" "}
                {property.price.toLocaleString("en-IN")}
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-primary text-white">
                  {property.tag}
                </span>
                {property.verified && (
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-primary/10 text-primary">
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-5 space-y-4">
          <Field label="Full Name *">
            <input
              className="w-full h-12 rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold outline-none focus:border-primary"
              defaultValue="Farhan"
              placeholder="Your name"
            />
          </Field>

          <Field label="Phone Number *">
            <input
              className="w-full h-12 rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold outline-none focus:border-primary"
              defaultValue="+8801700000000"
              placeholder="+8801..."
            />
          </Field>

          <Field label="Your Address *">
            <textarea
              className="w-full min-h-22.5 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-primary resize-none"
              defaultValue="Banani, Banani Thana, Dhaka North City Corporation, Dhaka-1213, Dhaka, Bangladesh."
              placeholder="Your address"
            />
          </Field>
        </div>

        <Button className="w-full mt-6 h-12 rounded-xl" onClick={onSuccess}>
          Request for appointment
        </Button>
      </div>
    </Dialog>
  );
};

export default AppointmentModal;

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-extrabold text-black mb-2">{label}</p>
      {children}
    </div>
  );
}
