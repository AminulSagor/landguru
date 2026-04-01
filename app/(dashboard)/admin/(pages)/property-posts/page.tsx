import PropertyPostsClient from "@/app/(dashboard)/admin/(pages)/property-posts/_components/property-posts-client";
import StatusSummaryCards from "@/app/(dashboard)/admin/(pages)/property-posts/_components/stat-cards";

const page = () => {
  return (
    <div className="space-y-5">
      <StatusSummaryCards />
      <PropertyPostsClient />
    </div>
  );
};

export default page;
