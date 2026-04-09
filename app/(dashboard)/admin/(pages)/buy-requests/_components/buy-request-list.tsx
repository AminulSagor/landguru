"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ApprovedDialog from "@/app/(dashboard)/admin/(pages)/buy-requests/_components/approved-dialog";
import BuyRequestPagination from "@/app/(dashboard)/admin/(pages)/buy-requests/_components/buy-request-pagination";
import BuyRequestRow from "@/app/(dashboard)/admin/(pages)/buy-requests/_components/buy-request-row";
import BuyRequestTabsSearch from "@/app/(dashboard)/admin/(pages)/buy-requests/_components/buy-request-tabs-search";
import {
  buyRequestsListService,
  mapTabKeyToApiTab,
} from "@/service/admin/buy-requests/buy-requests-list.service";
import type {
  BuyRequestListItem,
  BuyRequestSortKey,
  BuyRequestTabItem,
  BuyRequestTabKey,
} from "@/types/admin/buy-requests/buy-requests-list.types";
import Button from "@/components/buttons/button";
import { CircleCheckBig, CircleOff, Download, X } from "lucide-react";

const PAGE_SIZE = 10;

const BUY_REQUEST_TABS: BuyRequestTabItem[] = [
  { key: "pending_validation", label: "Pending Validation" },
  { key: "active_listings", label: "Active Listings" },
  { key: "archived", label: "Archived" },
];

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: { data?: { message?: string } } }).response
      ?.data?.message === "string"
  ) {
    return (error as { response?: { data?: { message?: string } } }).response!
      .data!.message!;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Failed to load buy requests.";
}

function matchesSearch(item: BuyRequestListItem, query: string): boolean {
  if (!query) {
    return true;
  }

  const normalizedQuery = query.toLowerCase();

  return [
    item.title,
    item.id,
    item.user.name,
    item.user.phone,
    item.locationLine,
    item.description,
    ...item.tags.map((tag) => tag.strong ?? tag.label),
  ]
    .join(" ")
    .toLowerCase()
    .includes(normalizedQuery);
}

export default function BuyRequestList() {
  const [tab, setTab] = React.useState<BuyRequestTabKey>("pending_validation");
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<BuyRequestSortKey>("newest_first");
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogActionType, setDialogActionType] = React.useState<"approve" | "reject">("approve");
  const [selectedRequest, setSelectedRequest] = React.useState<BuyRequestListItem | null>(null);
  const lastErrorMessageRef = React.useRef<string | null>(null);

  const isFrontendFilterMode = query.trim().length > 0 || sort === "oldest_first";

  const pagedQuery = useQuery({
    queryKey: ["admin-buy-requests", "paged", tab, page],
    queryFn: () =>
      buyRequestsListService.getBuyRequests({
        page,
        limit: PAGE_SIZE,
        tab: mapTabKeyToApiTab(tab),
      }),
    enabled: !isFrontendFilterMode,
    placeholderData: (previousData) => previousData,
  });

  const allRequestsQuery = useQuery({
    queryKey: ["admin-buy-requests", "all", tab],
    queryFn: async () => {
      const firstResponse = await buyRequestsListService.getBuyRequests({
        page: 1,
        limit: PAGE_SIZE,
        tab: mapTabKeyToApiTab(tab),
      });

      const totalPages = Math.max(firstResponse.meta.totalPages, 1);

      if (totalPages === 1) {
        return firstResponse.data;
      }

      const remainingResponses = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, index) =>
          buyRequestsListService.getBuyRequests({
            page: index + 2,
            limit: PAGE_SIZE,
            tab: mapTabKeyToApiTab(tab),
          }),
        ),
      );

      return [
        ...firstResponse.data,
        ...remainingResponses.flatMap((response) => response.data),
      ];
    },
    enabled: isFrontendFilterMode,
  });

  const activeError = isFrontendFilterMode ? allRequestsQuery.error : pagedQuery.error;

  React.useEffect(() => {
    if (!activeError) {
      lastErrorMessageRef.current = null;
      return;
    }

    const message = getErrorMessage(activeError);

    if (lastErrorMessageRef.current !== message) {
      toast.error(message);
      lastErrorMessageRef.current = message;
    }
  }, [activeError]);

  React.useEffect(() => {
    setPage(1);
    setSelected({});
  }, [tab, query, sort]);

  const frontendFilteredItems = React.useMemo(() => {
    const allItems = allRequestsQuery.data ?? [];
    const filteredItems = allItems.filter((item) => matchesSearch(item, query.trim()));

    if (sort === "oldest_first") {
      return [...filteredItems].reverse();
    }

    return filteredItems;
  }, [allRequestsQuery.data, query, sort]);

  const frontendTotal = frontendFilteredItems.length;
  const frontendTotalPages = frontendTotal > 0 ? Math.ceil(frontendTotal / PAGE_SIZE) : 0;

  const frontendRows = React.useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;

    return frontendFilteredItems.slice(startIndex, startIndex + PAGE_SIZE);
  }, [frontendFilteredItems, page]);

  const backendRows = pagedQuery.data?.data ?? [];
  const backendMeta = pagedQuery.data?.meta;

  const rows = isFrontendFilterMode ? frontendRows : backendRows;
  const total = isFrontendFilterMode ? frontendTotal : (backendMeta?.total ?? 0);
  const totalPages = isFrontendFilterMode
    ? frontendTotalPages
    : (backendMeta?.totalPages ?? 0);

  const isLoading = isFrontendFilterMode ? allRequestsQuery.isLoading : pagedQuery.isLoading;
  const isFetching = isFrontendFilterMode ? allRequestsQuery.isFetching : pagedQuery.isFetching;

  React.useEffect(() => {
    if (totalPages === 0) {
      if (page !== 1) {
        setPage(1);
      }
      return;
    }

    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const selectedIds = React.useMemo(
    () => Object.keys(selected).filter((key) => selected[key]),
    [selected],
  );

  const allChecked = rows.length > 0 && rows.every((row) => selected[row.id]);

  const handleToggle = React.useCallback((id: string) => {
    setSelected((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  }, []);

  const handleToggleAllVisible = React.useCallback(() => {
    if (allChecked) {
      setSelected((previous) => {
        const next = { ...previous };
        rows.forEach((row) => {
          delete next[row.id];
        });
        return next;
      });
      return;
    }

    setSelected((previous) => {
      const next = { ...previous };
      rows.forEach((row) => {
        next[row.id] = true;
      });
      return next;
    });
  }, [allChecked, rows]);

  const openDialogForAction = React.useCallback(
    (item: BuyRequestListItem, actionType: "approve" | "reject") => {
      setSelectedRequest(item);
      setDialogActionType(actionType);
      setDialogOpen(true);
    },
    [],
  );

  const handlePageChange = React.useCallback(
    (nextPage: number) => {
      if (nextPage < 1 || nextPage > totalPages) {
        return;
      }

      setPage(nextPage);
    },
    [totalPages],
  );

  const handleDialogClose = React.useCallback((value: boolean) => {
    setDialogOpen(value);

    if (!value) {
      setSelectedRequest(null);
      setDialogActionType("approve");
    }
  }, []);

  const showingFrom = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const showingTo = total === 0 ? 0 : Math.min(page * PAGE_SIZE, total);

  return (
    <div className="w-full">
      <BuyRequestTabsSearch
        tabs={BUY_REQUEST_TABS}
        tab={tab}
        onTabChange={setTab}
        q={query}
        onQChange={setQuery}
        sort={sort}
        onSortChange={setSort}
      />

      <div className="mt-4 space-y-4">
        <div className="mt-10 hidden grid-cols-12 gap-4 px-5 text-[11px] font-semibold lg:grid">
          <div className="col-span-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={allChecked}
              onChange={handleToggleAllVisible}
              className="h-4 w-4 accent-primary"
            />
            <p className="text-gray">USER PROFILE</p>
          </div>

          <div className="col-span-4 flex items-center text-gray">
            REQUIREMENTS &amp; LOCATION
          </div>

          <div className="col-span-2 flex items-center text-gray">DESCRIPTION</div>

          <div className="col-span-2 flex items-center justify-end text-gray">ACTIONS</div>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-gray/15 bg-white px-5 py-8 text-sm text-gray">
            Loading buy requests...
          </div>
        ) : rows.length > 0 ? (
          rows.map((item) => (
            <BuyRequestRow
              key={item.id}
              item={item}
              checked={Boolean(selected[item.id])}
              onToggle={() => handleToggle(item.id)}
              onApprove={(request) => openDialogForAction(request, "approve")}
              onReject={(request) => openDialogForAction(request, "reject")}
            />
          ))
        ) : (
          <div className="rounded-xl border border-gray/15 bg-white px-5 py-8 text-sm text-gray">
            No buy requests found.
          </div>
        )}
      </div>

      <BuyRequestPagination
        showingFrom={showingFrom}
        showingTo={showingTo}
        total={total}
        currentPage={page}
        totalPages={Math.max(totalPages, 1)}
        onPageChange={handlePageChange}
      />

      {selectedIds.length > 0 && (
        <div className="mt-10 flex w-full items-center justify-center">
          <div className="flex items-center gap-4 rounded-md border border-gray/20 bg-white p-4 shadow-lg">
            <div className="flex items-center gap-2 border-r pr-4">
              <p className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm text-white">
                {selectedIds.length}
              </p>
              <span className="text-sm font-semibold">Selected Items</span>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Button>
                <CircleCheckBig size={18} />
                Approve Selected
              </Button>

              <Button variant="secondary">
                <Download size={18} />
                Move to Archive
              </Button>

              <Button
                variant="secondary"
                className="border border-red-400 bg-red-200"
              >
                <CircleOff size={18} />
                Reject Selected
              </Button>

              <button type="button" className="text-gray" onClick={() => setSelected({})}>
                <X size={22} />
              </button>
            </div>
          </div>
        </div>
      )}

      <ApprovedDialog
        openDialog={dialogOpen}
        handleOpenDialog={handleDialogClose}
        postId={selectedRequest?.id ?? null}
        selectedRequest={selectedRequest}
        actionType={dialogActionType}
        onActionSuccess={() => {
          setSelected((previous) => {
            if (!selectedRequest?.id) {
              return previous;
            }

            const next = { ...previous };
            delete next[selectedRequest.id];
            return next;
          });
          setSelectedRequest(null);
          setDialogActionType("approve");
        }}
      />

      {isFetching && !isLoading ? (
        <p className="mt-3 text-xs font-semibold text-light-gray">Refreshing data...</p>
      ) : null}
    </div>
  );
}
