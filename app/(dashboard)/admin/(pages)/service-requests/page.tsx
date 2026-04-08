"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import ServiceRequestsOverview from "./_components/service-requests-overview";
import ServiceRequestsToolbar from "./_components/service-requests-toolbar";
import ServiceRequestsTable from "./_components/service-requests-table";
import ServiceDetailsDialog from "./_components/service-details-dialog";
import AssignAgentDialog from "./_components/assign-agent-dialog";

import { serviceRequestsListService } from "@/service/admin/service-requests/service-requests-list.service";
import { serviceRequestsSummaryService } from "@/service/admin/service-requests/service-requests-summary.service";
import type {
  ServiceRequestListItem,
  ServiceRequestListQueryParams,
} from "@/types/admin/service-requests/service-requests-list.types";
import type { ServiceRequestsSummaryData } from "@/types/admin/service-requests/service-requests-summary.types";

import {
  demoServiceDetails,
} from "@/app/(dashboard)/admin/dummy-data/service-requests.data";
import type { AssignAgentDialogPayload } from "@/app/(dashboard)/admin/types/assign-agent.types";

const DEFAULT_SUMMARY: ServiceRequestsSummaryData = {
  totalRequests: 0,
  unassigned: 0,
  inReview: 0,
  totalCompleted: 0,
  completedToday: 0,
};

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: unknown }).response === "object" &&
    (error as { response?: { data?: { message?: string } } }).response?.data
      ?.message
  ) {
    return (
      (error as { response?: { data?: { message?: string } } }).response?.data
        ?.message ?? "Something went wrong"
    );
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong";
}

function buildOptions(values: string[]): Array<{ label: string; value: string }> {
  return Array.from(
    new Set(values.map((value) => value.trim()).filter(Boolean)),
  )
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({ label: value, value }));
}

function normalizeStatus(value: string): string {
  if (!value || value === "all") {
    return "";
  }

  return value;
}

function mapSortToApi(sort: string): ServiceRequestListQueryParams["sort"] {
  return sort === "oldest" ? "ASC" : "DESC";
}

function matchesSearch(item: ServiceRequestListItem, query: string): boolean {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [
    item.service.name,
    item.service.id,
    item.parentPost.id,
    item.parentPost.location,
    item.assignedAgent?.name ?? "",
    item.latestWorkLog?.title ?? "",
  ].some((value) => value.toLowerCase().includes(normalizedQuery));
}

function matchesType(item: ServiceRequestListItem, type: string): boolean {
  if (!type || type === "all") {
    return true;
  }

  return item.service.name === type;
}

export default function ServiceRequestPage() {
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [type, setType] = React.useState("all");
  const [sort, setSort] = React.useState("newest");

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [openDetails, setOpenDetails] = React.useState(false);
  const [selected, setSelected] = React.useState<ServiceRequestListItem | null>(
    null,
  );

  const [openAssign, setOpenAssign] = React.useState(false);
  const [assignPayload, setAssignPayload] =
    React.useState<Partial<AssignAgentDialogPayload> | null>(null);

  const lastErrorMessageRef = React.useRef<string | null>(null);
  const lastSummaryErrorMessageRef = React.useRef<string | null>(null);

  const normalizedStatus = normalizeStatus(status);
  const sortParam = mapSortToApi(sort);

  const isFrontendFilterMode = search.trim().length > 0 || type !== "all";

  const summaryQuery = useQuery({
    queryKey: ["admin-service-requests-summary"],
    queryFn: () => serviceRequestsSummaryService.getServiceRequestsSummary(),
  });

  const pagedQuery = useQuery({
    queryKey: [
      "admin-service-requests",
      "paged",
      page,
      rowsPerPage,
      normalizedStatus,
      sortParam,
    ],
    queryFn: () =>
      serviceRequestsListService.getServiceRequests({
        page,
        limit: rowsPerPage,
        status: normalizedStatus,
        sort: sortParam,
      }),
    enabled: !isFrontendFilterMode,
    placeholderData: (previousData) => previousData,
  });

  const allItemsQuery = useQuery({
    queryKey: [
      "admin-service-requests",
      "all",
      rowsPerPage,
      normalizedStatus,
      sortParam,
    ],
    queryFn: async () => {
      const firstResponse = await serviceRequestsListService.getServiceRequests({
        page: 1,
        limit: rowsPerPage,
        status: normalizedStatus,
        sort: sortParam,
      });

      const totalPages = Math.max(firstResponse.meta.totalPages, 1);

      if (totalPages === 1) {
        return firstResponse.data;
      }

      const remainingResponses = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, index) =>
          serviceRequestsListService.getServiceRequests({
            page: index + 2,
            limit: rowsPerPage,
            status: normalizedStatus,
            sort: sortParam,
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

  const activeListError = isFrontendFilterMode
    ? allItemsQuery.error
    : pagedQuery.error;

  React.useEffect(() => {
    if (!activeListError) {
      lastErrorMessageRef.current = null;
      return;
    }

    const message = getErrorMessage(activeListError);

    if (lastErrorMessageRef.current !== message) {
      toast.error(message);
      lastErrorMessageRef.current = message;
    }
  }, [activeListError]);

  React.useEffect(() => {
    if (!summaryQuery.error) {
      lastSummaryErrorMessageRef.current = null;
      return;
    }

    const message = getErrorMessage(summaryQuery.error);

    if (lastSummaryErrorMessageRef.current !== message) {
      toast.error(message);
      lastSummaryErrorMessageRef.current = message;
    }
  }, [summaryQuery.error]);

  const optionSourceItems = React.useMemo(() => {
    if (allItemsQuery.data?.length) {
      return allItemsQuery.data;
    }

    return pagedQuery.data?.data ?? [];
  }, [allItemsQuery.data, pagedQuery.data]);

  const typeOptions = React.useMemo(
    () => buildOptions(optionSourceItems.map((item) => item.service.name)),
    [optionSourceItems],
  );

  const frontendFilteredItems = React.useMemo(() => {
    const allItems = allItemsQuery.data ?? [];

    return allItems.filter(
      (item) => matchesSearch(item, search) && matchesType(item, type),
    );
  }, [allItemsQuery.data, search, type]);

  const frontendTotal = frontendFilteredItems.length;
  const frontendTotalPages =
    frontendTotal > 0 ? Math.ceil(frontendTotal / rowsPerPage) : 0;

  const frontendPaginatedItems = React.useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;

    return frontendFilteredItems.slice(startIndex, startIndex + rowsPerPage);
  }, [frontendFilteredItems, page, rowsPerPage]);

  const backendItems = pagedQuery.data?.data ?? [];
  const backendMeta = pagedQuery.data?.meta;

  const rows = isFrontendFilterMode ? frontendPaginatedItems : backendItems;
  const totalCount = isFrontendFilterMode
    ? frontendTotal
    : (backendMeta?.total ?? 0);
  const totalPages = isFrontendFilterMode
    ? frontendTotalPages
    : (backendMeta?.totalPages ?? 0);

  const isLoading = isFrontendFilterMode
    ? allItemsQuery.isLoading
    : pagedQuery.isLoading;
  const isFetching = isFrontendFilterMode
    ? allItemsQuery.isFetching
    : pagedQuery.isFetching;

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

  const stats = summaryQuery.data?.data ?? DEFAULT_SUMMARY;

  const onView = React.useCallback((item: ServiceRequestListItem) => {
    setSelected(item);
    setOpenDetails(true);
  }, []);

  const onAssignAgent = React.useCallback((item: ServiceRequestListItem) => {
    setAssignPayload({
      postId: item.parentPost.id,
    });
    setOpenAssign(true);
  }, []);

  const handleAssignNow = React.useCallback((agentId: string) => {
    const agent =
      (assignPayload as { agents?: Array<{ id: string; name: string }> } | null)
        ?.agents?.find?.((item) => item.id === agentId) ?? null;

    const agentName = agent?.name ?? "Assigned Agent";

    setSelected((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        assignedAgent: {
          id: agentId,
          name: agentName,
          photoUrl: null,
        },
      };
    });

    setOpenAssign(false);
  }, [assignPayload]);

  return (
    <div className="w-full space-y-4">
      <ServiceRequestsOverview stats={stats} isLoading={summaryQuery.isLoading} />

      <ServiceRequestsToolbar
        search={search}
        onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
        status={status}
        onStatus={(value) => {
          setStatus(value || "all");
          setPage(1);
        }}
        type={type}
        onType={(value) => {
          setType(value || "all");
          setPage(1);
        }}
        typeOptions={typeOptions}
        sort={sort}
        onSort={(value) => {
          setSort(value || "newest");
          setPage(1);
        }}
      />

      <ServiceRequestsTable
        items={rows}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        totalPages={Math.max(totalPages, 1)}
        isLoading={isLoading}
        isFetching={isFetching}
        onPageChange={setPage}
        onRowsChange={(nextRowsPerPage) => {
          setRowsPerPage(nextRowsPerPage);
          setPage(1);
        }}
        onView={onView}
        onAssignAgent={onAssignAgent}
      />

      <ServiceDetailsDialog
        open={openDetails}
        onOpenChange={setOpenDetails}
        details={{
          ...demoServiceDetails,
          headerTitle: selected
            ? `Service Details: ${selected.service.name}`
            : demoServiceDetails.headerTitle,
          serviceIdLabel: selected
            ? `#${selected.service.id}-${selected.parentPost.id}`
            : demoServiceDetails.serviceIdLabel,
        }}
      />

      <AssignAgentDialog
        open={openAssign}
        onOpenChange={setOpenAssign}
        payload={assignPayload ?? undefined}
        onAssign={handleAssignNow}
      />
    </div>
  );
}
