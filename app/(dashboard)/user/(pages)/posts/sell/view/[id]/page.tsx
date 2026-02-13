import MYPropertyDetails from "@/app/(dashboard)/user/(pages)/posts/sell/view/_components/my-property-details";

export default async function Page({ params }: { params: { id: string } }) {
  const param = await params;
  return <MYPropertyDetails propertyId={param.id} />;
}
