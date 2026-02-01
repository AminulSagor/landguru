"use client";

import React from "react";

import { Property } from "@/app/(user)/dashboard/types/property";
import { featuredProperties } from "@/app/(user)/dashboard/dummy-data/property";

import BuyStepper from "@/components/steppers/buy-stepper";
import PropertyHero from "@/app/(user)/dashboard/(pages)/properties/_components/property-hero";
import PropertyImages from "@/app/(user)/dashboard/(pages)/properties/_components/property-images";
import PropertyMetrics from "@/app/(user)/dashboard/(pages)/properties/_components/property-metrics";
import PropertyLocked from "@/app/(user)/dashboard/(pages)/properties/_components/property-locked";
import PropertyUnlocked from "@/app/(user)/dashboard/(pages)/properties/_components/property-unlocked";
import PropertySidebar from "@/app/(user)/dashboard/(pages)/properties/_components/property-sidebar";
import AppointmentModal from "@/app/(user)/dashboard/(pages)/properties/_components/appointment-modal";
import SuccessModal from "@/app/(user)/dashboard/(pages)/properties/_components/success-modal";

const PropertyDetails = ({ propertyId }: { propertyId: string }) => {
  const property = featuredProperties.find(
    (p: Property) => p.id === propertyId,
  );

  const [unlocked, setUnlocked] = React.useState(false);
  const [appointmentOpen, setAppointmentOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);

  if (!property) {
    return (
      <div className="py-24 text-center text-black/60">Property not found</div>
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
          <PropertyMetrics />
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
