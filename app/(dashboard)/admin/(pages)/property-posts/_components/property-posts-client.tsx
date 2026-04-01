"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import PropertyFiltersBar from "./filter-select";
import PropertiesManagementTable from "./PropertiesManagementTable";

import { propertyPostsService } from "@/service/admin/property/property-posts.service";
import type { PropertyPostStatus } from "@/types/admin/property.types";
import {
  buildOptions,
  castPropertyPostStatus,
  getErrorMessage,
  getServiceTypeNames,
  matchesSearch,
  matchesServiceType,
  PAGE_SIZE,
  SEARCH_DEBOUNCE_MS,
  STATUS_OPTIONS,
} from "../_utils/property-posts.utils";

export default function PropertyPostsClient() {
  const [searchValue, setSearchValue] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [status, setStatus] = React.useState<PropertyPostStatus | "">("");
  const [propertyType, setPropertyType] = React.useState("");
  const [serviceType, setServiceType] = React.useState("");
  const [page, setPage] = React.useState(1);

  const lastErrorMessageRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(searchValue.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [searchValue]);

  const isFrontendFilterMode =
    debouncedSearch.length > 0 || serviceType.length > 0;

  const pagedQuery = useQuery({
    queryKey: ["admin-property-posts", "paged", page, status, propertyType],
    queryFn: () =>
      propertyPostsService.getAdminPropertyPosts({
        page,
        limit: PAGE_SIZE,
        status,
        propertyType,
      }),
    enabled: !isFrontendFilterMode,
    placeholderData: (previousData) => previousData,
  });

  const allPostsQuery = useQuery({
    queryKey: ["admin-property-posts", "all", status, propertyType],
    queryFn: async () => {
      const firstResponse = await propertyPostsService.getAdminPropertyPosts({
        page: 1,
        limit: PAGE_SIZE,
        status,
        propertyType,
      });

      const totalPages = Math.max(firstResponse.meta.totalPages, 1);

      if (totalPages === 1) {
        return firstResponse.data;
      }

      const remainingResponses = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, index) =>
          propertyPostsService.getAdminPropertyPosts({
            page: index + 2,
            limit: PAGE_SIZE,
            status,
            propertyType,
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

  const activeError = isFrontendFilterMode
    ? allPostsQuery.error
    : pagedQuery.error;

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

  const optionSourceItems = React.useMemo(() => {
    if (allPostsQuery.data?.length) {
      return allPostsQuery.data;
    }

    return pagedQuery.data?.data ?? [];
  }, [allPostsQuery.data, pagedQuery.data]);

  const propertyTypeOptions = React.useMemo(
    () => buildOptions(optionSourceItems.map((item) => item.propertyType)),
    [optionSourceItems],
  );

  const serviceTypeOptions = React.useMemo(
    () =>
      buildOptions(
        optionSourceItems.flatMap((item) => getServiceTypeNames(item)),
      ),
    [optionSourceItems],
  );

  const frontendFilteredItems = React.useMemo(() => {
    const allItems = allPostsQuery.data ?? [];

    return allItems.filter(
      (item) =>
        matchesSearch(item, debouncedSearch) &&
        matchesServiceType(item, serviceType),
    );
  }, [allPostsQuery.data, debouncedSearch, serviceType]);

  const frontendTotal = frontendFilteredItems.length;
  const frontendTotalPages =
    frontendTotal > 0 ? Math.ceil(frontendTotal / PAGE_SIZE) : 0;

  const frontendPaginatedItems = React.useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;

    return frontendFilteredItems.slice(startIndex, startIndex + PAGE_SIZE);
  }, [frontendFilteredItems, page]);

  const backendItems = pagedQuery.data?.data ?? [];
  const backendMeta = pagedQuery.data?.meta;

  const rows = isFrontendFilterMode ? frontendPaginatedItems : backendItems;
  const total = isFrontendFilterMode
    ? frontendTotal
    : (backendMeta?.total ?? 0);
  const totalPages = isFrontendFilterMode
    ? frontendTotalPages
    : (backendMeta?.totalPages ?? 0);

  const isLoading = isFrontendFilterMode
    ? allPostsQuery.isLoading
    : pagedQuery.isLoading;

  const isFetching = isFrontendFilterMode
    ? allPostsQuery.isFetching
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

  const handleSearchChange = React.useCallback((value: string) => {
    setSearchValue(value);
    setPage(1);
  }, []);

  const handleStatusChange = React.useCallback((value: string) => {
    setStatus(castPropertyPostStatus(value));
    setPage(1);
  }, []);

  const handlePropertyTypeChange = React.useCallback((value: string) => {
    setPropertyType(value);
    setPage(1);
  }, []);

  const handleServiceTypeChange = React.useCallback((value: string) => {
    setServiceType(value);
    setPage(1);
  }, []);

  const handlePageChange = React.useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  return (
    <div className="space-y-5">
      <PropertyFiltersBar
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        propertyType={propertyType}
        onPropertyTypeChange={handlePropertyTypeChange}
        propertyTypeOptions={propertyTypeOptions}
        serviceType={serviceType}
        onServiceTypeChange={handleServiceTypeChange}
        serviceTypeOptions={serviceTypeOptions}
        status={status}
        onStatusChange={handleStatusChange}
        statusOptions={STATUS_OPTIONS}
      />

      <PropertiesManagementTable
        rows={rows}
        currentPage={page}
        total={total}
        totalPages={totalPages}
        isLoading={isLoading}
        isFetching={isFetching}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
