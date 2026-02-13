import PropertyDetails from "@/app/(dashboard)/user/(pages)/properties/_components/property-details";

export default async function Page({ params }: { params: { id: string } }) {
  const param = await params;
  return <PropertyDetails propertyId={param.id} />;
}
