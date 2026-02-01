import MYPropertyDetails from "@/app/(user)/dashboard/(pages)/posts/sell/view/_components/my-property-details";

export default async function Page({ params }: { params: { id: string } }) {
  const param = await params;
  return <MYPropertyDetails propertyId={param.id} />;
}
