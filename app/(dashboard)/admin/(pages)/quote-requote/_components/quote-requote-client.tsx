"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import type {
  SellPostNegotiationItem,
  SellPostNegotiationTab,
  SellPostNegotiationsMeta,
} from "@/types/admin/quote-requote/sell-post-negotiations.types";
import type { QuoteRequoteSortKey } from "@/app/(dashboard)/admin/(pages)/quote-requote/_utils/quote-requote.utils";
import {
  buildQueryString,
  filterNegotiationItems,
  sortNegotiationItems,
} from "@/app/(dashboard)/admin/(pages)/quote-requote/_utils/quote-requote.utils";
import QuoteRequoteTabs from "@/app/(dashboard)/admin/(pages)/quote-requote/_components/quote-requote-tabs";
import QuoteRequoteToolbar from "@/app/(dashboard)/admin/(pages)/quote-requote/_components/quote-requote-toolbar";
import QuoteRequotePagination from "@/app/(dashboard)/admin/(pages)/quote-requote/_components/quote-requote-pagination";
import QuoteRequoteItemCard from "@/app/(dashboard)/admin/(pages)/quote-requote/_components/quote-requote-item-card";
import QuotationSentSuccessDialog from "@/app/(dashboard)/admin/(pages)/quote-requote/_components/quotation-sent-success-dialog";
import Card from "@/components/cards/card";
import ReviewQutationDialog from "@/app/(dashboard)/admin/(pages)/quote-requote/_components/review-quotation-dialog";

type QuoteRequoteClientProps = {
  items: SellPostNegotiationItem[];
  meta: SellPostNegotiationsMeta;
  activeTab: SellPostNegotiationTab;
  search: string;
  sort: QuoteRequoteSortKey;
  limit: number;
};

type SuccessDialogData = {
  postId: string;
  sellerName: string;
  mandatoryFee: number;
  optionalFee: number;
  currencySymbol: string;
};

function EmptyState() {
  return (
    <Card className="border border-gray/15 bg-white p-8">
      <div className="flex min-h-[220px] items-center justify-center">
        <p className="text-sm font-semibold text-primary">
          No negotiations found.
        </p>
      </div>
    </Card>
  );
}

const initialSuccessDialogData: SuccessDialogData = {
  postId: "#POST-1044",
  sellerName: "Mr. Rahman",
  mandatoryFee: 3000,
  optionalFee: 3000,
  currencySymbol: "৳",
};

export default function QuoteRequoteClient({
  items,
  meta,
  activeTab,
  search,
  sort,
  limit,
}: QuoteRequoteClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [searchInput, setSearchInput] = React.useState(search);
  const [selectedItem, setSelectedItem] =
    React.useState<SellPostNegotiationItem | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = React.useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = React.useState(false);
  const [successDialogData, setSuccessDialogData] =
    React.useState<SuccessDialogData>(initialSuccessDialogData);

  React.useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const filteredItems = React.useMemo(() => {
    const searchedItems = filterNegotiationItems(items, search);
    return sortNegotiationItems(searchedItems, sort);
  }, [items, search, sort]);

  const updateRoute = React.useCallback(
    (params: {
      tab?: SellPostNegotiationTab;
      page?: number;
      limit?: number;
      search?: string;
      sort?: QuoteRequoteSortKey;
    }) => {
      const nextTab = params.tab ?? activeTab;
      const nextPage = params.page ?? meta.page;
      const nextLimit = params.limit ?? limit;
      const nextSearch = params.search ?? search;
      const nextSort = params.sort ?? sort;

      const queryString = buildQueryString({
        tab: nextTab,
        page: nextPage,
        limit: nextLimit,
        search: nextSearch,
        sort: nextSort,
      });

      router.push(`${pathname}?${queryString}`);
      router.refresh();
    },
    [activeTab, limit, meta.page, pathname, router, search, sort],
  );

  const handleTabChange = (tab: SellPostNegotiationTab) => {
    updateRoute({
      tab,
      page: 1,
    });
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateRoute({
      search: searchInput,
      page: 1,
    });
  };

  const handleSortToggle = () => {
    updateRoute({
      sort: sort === "newest_first" ? "oldest_first" : "newest_first",
      page: 1,
    });
  };

  const handlePageChange = (nextPage: number) => {
    updateRoute({
      page: nextPage,
    });
  };

  const handleReviewRespond = (item: SellPostNegotiationItem) => {
    setSelectedItem(item);
    setIsReviewDialogOpen(true);
  };

  const handleReviewDialogControl = (value: boolean) => {
    setIsReviewDialogOpen(value);

    if (!value) {
      setSelectedItem(null);
    }
  };

  const handleSuccessDialogOpen = (data: SuccessDialogData) => {
    setSuccessDialogData(data);
    setIsSuccessDialogOpen(true);
  };

  const startIndex =
    filteredItems.length === 0 ? 0 : (meta.page - 1) * meta.limit + 1;
  const endIndex =
    filteredItems.length === 0 ? 0 : startIndex + filteredItems.length - 1;

  return (
    <>
      <div className="w-full space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <QuoteRequoteTabs
              activeTab={activeTab}
              activeCount={meta.total}
              onChange={handleTabChange}
            />
          </div>

          <div className="w-full lg:w-auto lg:min-w-[420px]">
            <QuoteRequoteToolbar
              searchInput={searchInput}
              sort={sort}
              onSearchInputChange={setSearchInput}
              onSearchSubmit={handleSearchSubmit}
              onSortToggle={handleSortToggle}
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-gray/15 bg-white">
              <table className="min-w-[1100px] w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray/15 bg-[#F9FAFB]">
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase text-primary/80">
                      Post
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase text-primary/80">
                      Seller
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase text-primary/80">
                      Quote Details
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-bold uppercase text-primary/80">
                      Requotes
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-bold uppercase text-primary/80">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredItems.map((item) => (
                    <QuoteRequoteItemCard
                      key={item.negotiationId}
                      item={item}
                      onReviewRespond={handleReviewRespond}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 text-xs font-semibold text-primary sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing <span className="font-bold">{startIndex}</span>-
            <span className="font-bold">{endIndex}</span> of{" "}
            <span className="font-bold">{filteredItems.length}</span> results
          </p>

          <QuoteRequotePagination
            currentPage={meta.page}
            totalPages={meta.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <ReviewQutationDialog
        open={isReviewDialogOpen}
        onControl={handleReviewDialogControl}
        item={selectedItem}
        onSuccessDialogOpen={handleSuccessDialogOpen}
      />

      <QuotationSentSuccessDialog
        open={isSuccessDialogOpen}
        onControl={setIsSuccessDialogOpen}
        postId={successDialogData.postId}
        sellerName={successDialogData.sellerName}
        mandatoryFee={successDialogData.mandatoryFee}
        optionalFee={successDialogData.optionalFee}
        currencySymbol={successDialogData.currencySymbol}
      />
    </>
  );
}
