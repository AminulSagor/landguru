"use client";

import OfferedPostRightSidebar from "@/app/(user)/dashboard/(pages)/posts/offered/_components/offed-post-right-sidebar";
import OfferedPostImages from "@/app/(user)/dashboard/(pages)/posts/offered/_components/offerd-post-images";
import OfferedPostHero from "@/app/(user)/dashboard/(pages)/posts/offered/_components/offered-post-hero";
import OfferingWorksStepper from "@/app/(user)/dashboard/(pages)/posts/offered/_components/offering-work-stepper";
import MyPropertyMetrics from "@/app/(user)/dashboard/(pages)/posts/sell/view/_components/my-property-metrics";
import { OFFER_POSTS } from "@/app/(user)/dashboard/dummy-data/offer-post-data";
import { OfferPostCard } from "@/app/(user)/dashboard/types/offer-post";

const OfferedPostDetails = ({
  offeredPropertyId,
}: {
  offeredPropertyId: string;
}) => {
  const property = OFFER_POSTS.find(
    (p: OfferPostCard) => p.id === offeredPropertyId,
  );

  if (!property) {
    return (
      <div className="py-24 text-center text-black/60">Property not found</div>
    );
  }

  return (
    <div className="py-20">
      <OfferedPostHero property={property} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14">
        <div className="col-span-12 lg:col-span-8 mt-5 space-y-10">
          <OfferedPostImages property={property} />
          <MyPropertyMetrics />
          <OfferingWorksStepper />
        </div>

        <div className="col-span-12 lg:col-span-4 mt-5">
          <OfferedPostRightSidebar property={property} />
        </div>
      </div>
    </div>
  );
};

export default OfferedPostDetails;
