"use client";

import React from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import type { PropertyDetails } from "@/types/property/property.details";
import { IMAGE } from "@/constants/image-paths";
import Dialog from "@/components/dialogs/dialog";
import { requestSellPostAppointment } from "@/service/users/properties.services";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: PropertyDetails;
  onSuccess: () => void;
};

const AppointmentModal = ({
  open,
  onOpenChange,
  property,
  onSuccess,
}: Props) => {
  const [buyerName, setBuyerName] = React.useState("Farhan");
  const [buyerPhone, setBuyerPhone] = React.useState("+8801700000000");
  const [buyerAddress, setBuyerAddress] = React.useState(
    "Banani, Banani Thana, Dhaka North City Corporation, Dhaka-1213, Dhaka, Bangladesh.",
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async () => {
    if (!buyerName || !buyerPhone || !buyerAddress) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await requestSellPostAppointment({
        sellPostId: property.id,
        buyerName,
        buyerPhone,
        buyerAddress,
      });
      onSuccess();
    } catch (error) {
      setErrorMessage("Unable to request appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} position="center" size="sm">
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
              src={property.photos?.[0] ?? IMAGE.property}
              alt={property.title}
              className="h-16 w-16 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <p className="font-extrabold text-black truncate">
                {property.title}
              </p>
              <p className="text-sm text-black/50">
                Price: ৳ {property.askingPrice.toLocaleString("en-IN")}
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-primary text-white">
                  {property.propertyType}
                </span>
                {property.seller?.isVerified && (
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
              value={buyerName}
              onChange={(event) => setBuyerName(event.target.value)}
              placeholder="Your name"
            />
          </Field>

          <Field label="Phone Number *">
            <input
              className="w-full h-12 rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold outline-none focus:border-primary"
              value={buyerPhone}
              onChange={(event) => setBuyerPhone(event.target.value)}
              placeholder="+8801..."
            />
          </Field>

          <Field label="Your Address *">
            <textarea
              className="w-full min-h-22.5 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-primary resize-none"
              value={buyerAddress}
              onChange={(event) => setBuyerAddress(event.target.value)}
              placeholder="Your address"
            />
          </Field>
        </div>

        {errorMessage ? (
          <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
        ) : null}

        <Button
          className="w-full mt-6 h-12 rounded-xl"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Requesting..." : "Request for appointment"}
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
