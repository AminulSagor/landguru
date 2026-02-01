import OfferedPostDetails from "@/app/(user)/dashboard/(pages)/posts/offered/_components/offered-post-details";

export default async function Page({ params }: { params: { id: string } }) {
  const param = await params;
  return <OfferedPostDetails offeredPropertyId={param.id} />;
}
