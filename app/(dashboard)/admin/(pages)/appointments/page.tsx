"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import AppointmentList from "@/app/(dashboard)/admin/(pages)/appointments/_components/appointment-list";
import AppointmentStatOverview from "@/app/(dashboard)/admin/(pages)/appointments/_components/appointment-stat-overview";
import AppointmentTab from "@/app/(dashboard)/admin/(pages)/appointments/_components/appointment-tab";
import FilterBar from "@/app/(dashboard)/admin/(pages)/appointments/_components/filter-bar";
import ListAndSearch from "@/app/(dashboard)/admin/(pages)/appointments/_components/list-and-search";
import ConfirmAppointmentDialog from "@/app/(dashboard)/admin/(pages)/appointments/_components/schedule-approved-dialog";
import Button from "@/components/buttons/button";
import { agentSchedulesListService } from "@/service/admin/appointments/agent-schedules-list.service";
import { siteVisitRequestsService } from "@/service/admin/appointments/site-visit-requests.service";
import type {
  SiteVisitRequestItem,
  SiteVisitRequestStatus,
} from "@/types/admin/appointments/site-visit-requests.types";

export type AppointmentTabStatus = "user_site_visit" | "agent_schedules";

const PAGE_SIZE = 8;
const SEARCH_DEBOUNCE_MS = 400;

const AppointmentsPage = () => {
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [selected, setSelected] = React.useState<SiteVisitRequestItem | null>(
    null,
  );
  const [tabStatus, setTabStatus] =
    React.useState<AppointmentTabStatus>("user_site_visit");

  const [searchValue, setSearchValue] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [status, setStatus] = React.useState<SiteVisitRequestStatus | "">("");
  const [location, setLocation] = React.useState("");
  const [propertyType, setPropertyType] = React.useState("");
  const [siteVisitPage, setSiteVisitPage] = React.useState(1);
  const [agentSchedulesPage, setAgentSchedulesPage] = React.useState(1);

  const lastErrorMessageRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(searchValue.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [searchValue]);

  const siteVisitRequestsQuery = useQuery({
    queryKey: [
      "admin-site-visit-requests",
      siteVisitPage,
      status,
      location,
      propertyType,
      debouncedSearch,
    ],
    queryFn: () =>
      siteVisitRequestsService.getAdminSiteVisitRequests({
        page: siteVisitPage,
        limit: PAGE_SIZE,
        status,
        location,
        propertyType,
        search: debouncedSearch,
      }),
    placeholderData: (previousData) => previousData,
  });

  const agentSchedulesListQuery = useQuery({
    queryKey: ["admin-agent-schedules-list", agentSchedulesPage],
    queryFn: () =>
      agentSchedulesListService.getAdminAgentSchedulesList({
        page: agentSchedulesPage,
        limit: PAGE_SIZE,
      }),
    placeholderData: (previousData) => previousData,
  });

  React.useEffect(() => {
    const activeError =
      tabStatus === "user_site_visit"
        ? siteVisitRequestsQuery.error
        : agentSchedulesListQuery.error;

    if (!activeError) {
      lastErrorMessageRef.current = null;
      return;
    }

    const message = getErrorMessage(activeError);

    if (lastErrorMessageRef.current !== message) {
      toast.error(message);
      lastErrorMessageRef.current = message;
    }
  }, [
    agentSchedulesListQuery.error,
    siteVisitRequestsQuery.error,
    tabStatus,
  ]);

  const siteVisitItems = siteVisitRequestsQuery.data?.data ?? [];
  const agentScheduleItems = agentSchedulesListQuery.data?.data ?? [];

  const statusOptions = React.useMemo(
    () => buildOptions(siteVisitItems.map((item) => item.status), status),
    [siteVisitItems, status],
  );

  const locationOptions = React.useMemo(
    () =>
      buildOptions(
        siteVisitItems.map((item) => item.property.location),
        location,
      ),
    [siteVisitItems, location],
  );

  const propertyTypeOptions = React.useMemo(
    () =>
      buildOptions(
        siteVisitItems.map((item) => item.property.propertyType),
        propertyType,
      ),
    [siteVisitItems, propertyType],
  );

  const currentPage =
    tabStatus === "user_site_visit" ? siteVisitPage : agentSchedulesPage;
  const currentTotal =
    tabStatus === "user_site_visit"
      ? (siteVisitRequestsQuery.data?.meta.total ?? 0)
      : (agentSchedulesListQuery.data?.meta.total ?? 0);
  const currentTotalPages =
    tabStatus === "user_site_visit"
      ? (siteVisitRequestsQuery.data?.meta.totalPages ?? 0)
      : (agentSchedulesListQuery.data?.meta.totalPages ?? 0);
  const isLoading =
    tabStatus === "user_site_visit"
      ? siteVisitRequestsQuery.isLoading
      : agentSchedulesListQuery.isLoading;
  const isFetching =
    tabStatus === "user_site_visit"
      ? siteVisitRequestsQuery.isFetching
      : agentSchedulesListQuery.isFetching;

  const onApproveSchedule = (row: SiteVisitRequestItem) => {
    setSelected(row);
    setOpenConfirm(true);
  };

  const onCloseDialog = () => {
    setOpenConfirm(false);
    setSelected(null);
  };

  const handleSearchChange = React.useCallback((value: string) => {
    setSearchValue(value);
    setSiteVisitPage(1);
  }, []);

  const handleStatusChange = React.useCallback((value: string) => {
    setStatus(value as SiteVisitRequestStatus | "");
    setSiteVisitPage(1);
  }, []);

  const handleLocationChange = React.useCallback((value: string) => {
    setLocation(value);
    setSiteVisitPage(1);
  }, []);

  const handlePropertyTypeChange = React.useCallback((value: string) => {
    setPropertyType(value);
    setSiteVisitPage(1);
  }, []);

  const handleResetFilters = React.useCallback(() => {
    setSearchValue("");
    setDebouncedSearch("");
    setStatus("");
    setLocation("");
    setPropertyType("");
    setSiteVisitPage(1);
  }, []);

  const handlePageChange = React.useCallback(
    (nextPage: number) => {
      if (tabStatus === "user_site_visit") {
        setSiteVisitPage(nextPage);
        return;
      }

      setAgentSchedulesPage(nextPage);
    },
    [tabStatus],
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button size="base">+ New Appointment</Button>
      </div>

      <AppointmentStatOverview />

      <div className="w-full rounded-md border border-gray/20 bg-white py-5">
        <div className="flex w-full flex-col justify-between gap-4 rounded-md bg-white px-5 pb-2 lg:flex-row lg:items-center lg:pb-0">
          <AppointmentTab tabStatus={tabStatus} setTabStatus={setTabStatus} />
          <ListAndSearch
            showSearch={tabStatus === "user_site_visit"}
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
          />
        </div>

        {tabStatus === "user_site_visit" ? (
          <FilterBar
            status={status}
            onStatusChange={handleStatusChange}
            statusOptions={statusOptions}
            propertyType={propertyType}
            onPropertyTypeChange={handlePropertyTypeChange}
            propertyTypeOptions={propertyTypeOptions}
            location={location}
            onLocationChange={handleLocationChange}
            locationOptions={locationOptions}
            onReset={handleResetFilters}
          />
        ) : null}

        <AppointmentList
          tabStatus={tabStatus}
          siteVisitRows={siteVisitItems}
          agentScheduleRows={agentScheduleItems}
          currentPage={currentPage}
          total={currentTotal}
          totalPages={currentTotalPages}
          isLoading={isLoading}
          isFetching={isFetching}
          onPageChange={handlePageChange}
          onApproveSchedule={onApproveSchedule}
        />
      </div>

      <ConfirmAppointmentDialog
        open={openConfirm}
        appointment={selected}
        onClose={onCloseDialog}
      />
    </div>
  );
};

export default AppointmentsPage;

function buildOptions(values: Array<string | null | undefined>, selected?: string) {
  const result = Array.from(
    new Set([
      ...(selected ? [selected] : []),
      ...values.filter((value): value is string => Boolean(value?.trim())),
    ]),
  );

  return result.sort((a, b) => a.localeCompare(b));
}

function getErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response
  ) {
    const responseData = (error.response as { data?: { message?: string } }).data;

    if (typeof responseData?.message === "string" && responseData.message) {
      return responseData.message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong while loading appointments.";
}
