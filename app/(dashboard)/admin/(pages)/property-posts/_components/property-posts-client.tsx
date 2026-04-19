"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import PropertyFiltersBar from "./filter-select";
import PropertiesManagementTable from "./PropertiesManagementTable";

import { propertyPostsService } from "@/service/admin/property/property-posts.service";
import type { PropertyPostStatus } from "@/types/admin/property-post/property.types";
import {
  buildOptions,
  castPropertyPostStatus,
  getErrorMessage,
  getServiceTypeNames,
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

  const pagedQuery = useQuery({
    queryKey: [
      "admin-property-posts",
      "paged",
      page,
      status,
      propertyType,
      serviceType,
      debouncedSearch,
    ],
    queryFn: () =>
      propertyPostsService.getAdminPropertyPosts({
        page,
        limit: PAGE_SIZE,
        status,
        propertyType,
        serviceType,
        search: debouncedSearch,
      }),
    placeholderData: (previousData) => previousData,
  });
  const activeError = pagedQuery.error;

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
    return pagedQuery.data?.data ?? [];
  }, [pagedQuery.data]);

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

  const backendItems = pagedQuery.data?.data ?? [];
  const backendMeta = pagedQuery.data?.meta;

  const rows = backendItems;
  const total = Number(backendMeta?.total ?? 0);
  const totalPages = Number(backendMeta?.totalPages ?? 0);
  const isLoading = pagedQuery.isLoading;
  const isFetching = pagedQuery.isFetching;

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
