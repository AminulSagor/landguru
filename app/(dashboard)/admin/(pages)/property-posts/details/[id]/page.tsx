import PropertyDetailsView from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/property-details-view";
import { properties } from "@/app/(dashboard)/admin/dummy-data/property-data";

const page = async ({ params }: { params: { id: string } }) => {
  const param = await params;
  console.log(param);
  const property = properties.find((property) => property.id === param.id);

  if (!property) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Property not found</p>
      </div>
    );
  }

  return <PropertyDetailsView property={property} />;
};

export default page;
