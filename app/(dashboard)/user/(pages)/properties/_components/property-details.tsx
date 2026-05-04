"use client";

import React from "react";

import { fetchSellPostDetails } from "@/service/users/properties.services";
import type { PropertyDetails as PropertyDetailsDto } from "@/types/property/property.details";

import BuyStepper from "@/components/steppers/buy-stepper";
import PropertyHero from "@/app/(dashboard)/user/(pages)/properties/_components/property-hero";
import PropertyImages from "@/app/(dashboard)/user/(pages)/properties/_components/property-images";
import PropertyMetrics from "@/app/(dashboard)/user/(pages)/properties/_components/property-metrics";
import PropertyLocked from "@/app/(dashboard)/user/(pages)/properties/_components/property-locked";
import PropertyUnlocked from "@/app/(dashboard)/user/(pages)/properties/_components/property-unlocked";
import PropertySidebar from "@/app/(dashboard)/user/(pages)/properties/_components/property-sidebar";
import AppointmentModal from "@/app/(dashboard)/user/(pages)/properties/_components/appointment-modal";
import SuccessModal from "@/app/(dashboard)/user/(pages)/properties/_components/success-modal";


const PropertyDetails = ({ propertyId }: { propertyId: string }) => {
  const [property, setProperty] = React.useState<PropertyDetailsDto | null>(
    null,
  );
  const [loading, setLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  const [unlocked, setUnlocked] = React.useState(false);
  const [appointmentOpen, setAppointmentOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);

  React.useEffect(() => {
    let isActive = true;

    setLoading(true);
    setHasError(false);

    fetchSellPostDetails(propertyId)
      .then((data) => {
        if (!isActive) return;
        setProperty(data);
      })
      .catch(() => {
        if (!isActive) return;
        setHasError(true);
      })
      .finally(() => {
        if (!isActive) return;
        setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [propertyId]);

  if (loading) {
    return (
      <div className="py-24 text-center text-black/60">
        Loading property...
      </div>
    );
  }

  if (hasError || !property) {
    return (
      <div className="py-24 text-center text-black/60">
        Property not found
      </div>
    );
  }

  return (
    <div className="py-20">
      <PropertyHero
        property={property}
        onRequest={() => setAppointmentOpen(true)}
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14">
        <div className="col-span-12 lg:col-span-8 mt-5 space-y-10">
          <PropertyImages property={property} />
          <PropertyMetrics property={property} />
          <div>
            {!unlocked ? (
              <PropertyLocked onUnlock={() => setUnlocked(true)} />
            ) : (
              <PropertyUnlocked />
            )}
          </div>

          {/*  buying guide */}
          <BuyStepper />
        </div>

        <div className="col-span-12 lg:col-span-4 mt-5">
          <PropertySidebar
            property={property}
            onRequest={() => setAppointmentOpen(true)}
          />
        </div>
      </div>

      {/* Dialog-based modals */}
      <AppointmentModal
        open={appointmentOpen}
        onOpenChange={setAppointmentOpen}
        property={property}
        onSuccess={() => {
          setAppointmentOpen(false);
          setSuccessOpen(true);
        }}
      />

      <SuccessModal
        open={successOpen}
        onOpenChange={setSuccessOpen}
        property={property}
      />
    </div>
  );
};

export default PropertyDetails;
