import PropertyDetailsView from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/property-details-view";
import { getAdminPropertyPostDetailServer } from "@/service/admin/property/property-post-detail.server.service";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const property = await getAdminPropertyPostDetailServer(id);

    if (!property?.id) {
      notFound();
    }

    return <PropertyDetailsView property={property} />;
  } catch {
    notFound();
  }

  return null;
};

export default page;
