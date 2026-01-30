import MyDealDetails from "@/app/(user)/dashboard/(pages)/my-deals/_components/my-deals-details";

export default async function Page({ params }: { params: { id: string } }) {
  const param = await params;
  return <MyDealDetails propertyId={param.id} />;
}
