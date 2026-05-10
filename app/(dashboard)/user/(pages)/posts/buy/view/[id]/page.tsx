import BuyPostDetails from "@/app/(dashboard)/user/(pages)/posts/buy/view/_components/buy-post-details";

export default async function Page({ params }: { params: { id: string } }) {
  const param = await params;
  return <BuyPostDetails buyPostId={param.id} />;
}
