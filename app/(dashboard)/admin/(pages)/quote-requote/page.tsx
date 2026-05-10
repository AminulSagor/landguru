import QuoteRequoteClient from "@/app/(dashboard)/admin/(pages)/quote-requote/_components/quote-requote-client";
import {
  getSafeNegotiationTab,
  getSafePositiveNumber,
} from "@/app/(dashboard)/admin/(pages)/quote-requote/_utils/quote-requote.utils";
import { getAdminSellPostNegotiationsServer } from "@/service/admin/sell-posts/sell-post-negotiations.server.service";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<{
    tab?: string;
    page?: string;
    limit?: string;
    search?: string;
    sort?: string;
  }>;
};

const Page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;

  const tab = getSafeNegotiationTab(resolvedSearchParams?.tab);
  const page = getSafePositiveNumber(resolvedSearchParams?.page, 1);
  const limit = getSafePositiveNumber(resolvedSearchParams?.limit, 10);
  const search = resolvedSearchParams?.search ?? "";
  const sort =
    resolvedSearchParams?.sort === "oldest_first"
      ? "oldest_first"
      : "newest_first";

  const response = await getAdminSellPostNegotiationsServer({
    tab,
    page,
    limit,
  });

  console.log("🚀 ~ file: page.tsx:49 ~ Page ~ response:", response.data);

  return (
    <div className="space-y-5">
      <QuoteRequoteClient
        key={`${tab}-${page}-${limit}`}
        items={response.data}
        meta={response.meta}
        activeTab={tab}
        search={search}
        sort={sort}
        limit={limit}
      />
    </div>
  );
};

export default Page;
