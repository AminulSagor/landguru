import PropertyPostsClient from "@/app/(dashboard)/admin/(pages)/property-posts/_components/property-posts-client";
import StatusSummaryCards from "@/app/(dashboard)/admin/(pages)/property-posts/_components/stat-cards";
import { getAdminSellPostSummaryServer } from "@/service/admin/property/sell-post-summary.service";

const Page = async () => {
  const response = await getAdminSellPostSummaryServer();

  return (
    <div className="space-y-5">
      <StatusSummaryCards stats={response.stats} />
      <PropertyPostsClient />
    </div>
  );
};

export default Page;
