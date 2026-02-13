import MYDealsDetails from "@/app/(dashboard)/user/(pages)/my-deals/_components/my-deals-details";

export default async function Page({ params }: { params: { id: string } }) {
  const param = await params;
  return <MYDealsDetails propertyId={param.id} />;
}
