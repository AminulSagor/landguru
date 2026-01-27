import PropertyDetails from "@/app/(user)/dashboard/(pages)/property-details/_components/property-details";

export default async function Page({ params }: { params: { id: string } }) {
  const param = await params;
  return <PropertyDetails propertyId={param.id} />;
}
