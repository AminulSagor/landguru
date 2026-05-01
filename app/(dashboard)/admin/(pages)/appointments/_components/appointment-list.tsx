"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import { AppointmentTabStatus } from "@/app/(dashboard)/admin/(pages)/appointments/page";
import Button from "@/components/buttons/button";
import { cn } from "@/utils/classnames.utils";
import type {
  AgentScheduleItem,
  AgentScheduleStatus,
} from "@/types/admin/appointments/agent-schedules-list.types";
import type {
  SiteVisitRequestItem,
  SiteVisitRequestStatus,
} from "@/types/admin/appointments/site-visit-requests.types";

interface AppointmentListProps {
  tabStatus: AppointmentTabStatus;
  siteVisitRows: SiteVisitRequestItem[];
  agentScheduleRows: AgentScheduleItem[];
  currentPage: number;
  total: number;
  totalPages: number;
  isLoading: boolean;
  isFetching: boolean;
  onPageChange: (page: number) => void;
  onApproveSchedule: (v: SiteVisitRequestItem) => void;
}

type TableHead = {
  key: string;
  label: string;
};

const IMAGE_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" fill="#E5E7EB"/><circle cx="80" cy="58" r="26" fill="#CBD5E1"/><rect x="34" y="98" width="92" height="36" rx="18" fill="#CBD5E1"/></svg>`,
  );

export default function AppointmentList({
  tabStatus,
  siteVisitRows,
  agentScheduleRows,
  currentPage,
  total,
  totalPages,
  isLoading,
  isFetching,
  onPageChange,
  onApproveSchedule,
}: AppointmentListProps) {
  const userSiteVisitsHead: TableHead[] = [
    { key: "requestedAt", label: "REQUESTED AT" },
    { key: "property", label: "PROPERTY" },
    { key: "buyer", label: "BUYER / REQUESTER" },
    { key: "owner", label: "OWNER" },
    { key: "status", label: "STATUS" },
    { key: "actions", label: "ACTIONS" },
  ];

  const agentSchedulesHead: TableHead[] = [
    { key: "scheduledAt", label: "TIME & DATE" },
    { key: "property", label: "PROPERTY" },
    { key: "service", label: "SERVICE TYPE" },
    { key: "agent", label: "ASSIGNED AGENT" },
    { key: "status", label: "STATUS" },
    { key: "actions", label: "ACTIONS" },
  ];

  const tableHead =
    tabStatus === "user_site_visit" ? userSiteVisitsHead : agentSchedulesHead;
  const colSpan = tableHead.length;
  const hasRows =
    tabStatus === "user_site_visit"
      ? siteVisitRows.length > 0
      : agentScheduleRows.length > 0;

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between px-5 py-4 text-sm text-gray">
        <p>
          {total > 0 ? `Showing page ${currentPage} of ${totalPages}` : "No data"}
        </p>
        {isFetching && !isLoading ? (
          <p className="font-medium text-primary">Refreshing...</p>
        ) : null}
      </div>

      <table className="w-full min-w-[1100px]">
        <thead>
          <tr className="bg-secondary/40 text-left text-xs font-semibold tracking-wide text-gray">
            {tableHead.map((head) => (
              <th key={head.key} className="px-5 py-4">
                {head.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={colSpan} className="px-5 py-12 text-center text-sm text-gray">
                Loading appointments...
              </td>
            </tr>
          ) : !hasRows ? (
            <tr>
              <td colSpan={colSpan} className="px-5 py-12 text-center text-sm text-gray">
                No appointments found.
              </td>
            </tr>
          ) : tabStatus === "user_site_visit" ? (
            <UserSiteVisitRows
              data={siteVisitRows}
              onApproveSchedule={onApproveSchedule}
            />
          ) : (
            <AgentScheduleRows data={agentScheduleRows} />
          )}
        </tbody>
      </table>

      <PaginationFooter
        currentPage={currentPage}
        total={total}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

function UserSiteVisitRows({
  data,
  onApproveSchedule,
}: {
  data: SiteVisitRequestItem[];
  onApproveSchedule: (v: SiteVisitRequestItem) => void;
}) {
  return (
    <>
      {data.map((row) => {
        const isPending = row.status.toUpperCase() === "PENDING";

        return (
          <tr
            key={row.requestId}
            className={cn("border-t border-gray/15", isPending && "bg-[#FFF9F2]")}
          >
            <td className="px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-black">
                  {relativeAgo(row.requestedAt)}
                </p>
                <p className="mt-1 text-xs text-gray">
                  {formatDateLine(row.requestedAt)}
                </p>
              </div>
            </td>

            <td className="px-5 py-4">
              <PropertyCell
                image={row.property.image}
                name={row.property.title}
                id={row.property.id}
                meta={`${row.property.propertyType} • ${row.property.location}`}
              />
            </td>

            <td className="px-5 py-4">
              <PersonCell
                image={row.buyer.photoUrl}
                name={row.buyer.name}
                phone={row.buyer.phone}
              />
            </td>

            <td className="px-5 py-4">
              <PersonCell
                image={row.owner.photoUrl}
                name={row.owner.name}
                phone={row.owner.phone}
              />
            </td>

            <td className="px-5 py-4">
              <StatusCellAppointment status={row.status} />
            </td>

            <td className="px-5 py-4">
              <Button
                size="base"
                variant={isPending ? "primary" : "secondary"}
                onClick={() => onApproveSchedule(row)}
              >
                {isPending ? "Approve & Schedule" : "Reschedule"}
              </Button>
            </td>
          </tr>
        );
      })}
    </>
  );
}

function AgentScheduleRows({ data }: { data: AgentScheduleItem[] }) {
  return (
    <>
      {data.map((row) => {
        const d = new Date(row.timeAndDate);
        const dayLabel = getDayLabel(d);

        return (
          <tr key={row.id} className="border-t border-gray/15">
            <td className="px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-black">{dayLabel}</p>
                <p className="mt-1 text-xs text-gray">
                  {formatTimeAMPM(row.timeAndDate)}
                </p>
              </div>
            </td>

            <td className="px-5 py-4">
              <PropertyCell
                image={row.property.image}
                name={row.property.title}
                id={row.property.displayId}
              />
            </td>

            <td className="px-5 py-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-black">
                  {row.serviceType.name}
                </p>
                <p className="text-xs text-gray">{row.serviceType.displayId}</p>
              </div>
            </td>

            <td className="px-5 py-4">
              <PersonCell
                image={row.assignedAgent.photoUrl}
                name={row.assignedAgent.name}
                phone={row.assignedAgent.phone}
                meta={toTitleCase(row.assignedAgent.designation)}
              />
            </td>

            <td className="px-5 py-4">
              <StatusCellSchedule status={row.status} />
            </td>

            <td className="px-5 py-4">
              <Button size="base" variant="secondary">
                View Details
              </Button>
            </td>
          </tr>
        );
      })}
    </>
  );
}

function PaginationFooter({
  currentPage,
  total,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) {
    return (
      <div className="flex items-center justify-between border-t border-gray/15 px-5 py-4 text-sm text-gray">
        <p>Total records: {total}</p>
      </div>
    );
  }

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <div className="flex flex-col gap-3 border-t border-gray/15 px-5 py-4 text-sm text-gray md:flex-row md:items-center md:justify-between">
      <p>Total records: {total}</p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="rounded-md border border-gray/20 px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              "rounded-md border px-3 py-1.5",
              page === currentPage
                ? "border-primary bg-primary text-white"
                : "border-gray/20 text-gray",
            )}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="rounded-md border border-gray/20 px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getDayLabel(date: Date) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (isSameDay(date, today)) {
    return "Today";
  }

  if (isSameDay(date, tomorrow)) {
    return "Tomorrow";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTimeAMPM(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDateLine(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function relativeAgo(iso: string) {
  const now = new Date().getTime();
  const time = new Date(iso).getTime();
  const diff = Math.max(0, now - time);

  const min = Math.floor(diff / (1000 * 60));
  if (min < 60) return `${min || 1}m ago`;

  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;

  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}

function StatusCellAppointment({
  status,
}: {
  status: SiteVisitRequestStatus;
}) {
  const normalizedStatus = status.toUpperCase();

  if (["SCHEDULED", "CONFIRMED", "COMPLETED"].includes(normalizedStatus)) {
    return (
      <div className="flex items-center gap-2 text-sm font-semibold text-(--color-green)">
        <CheckCircle2 className="h-4 w-4" />
        {toTitleCase(normalizedStatus)}
      </div>
    );
  }

  if (normalizedStatus === "CANCELLED") {
    return (
      <div className="flex items-center gap-2 text-sm font-semibold text-red-500">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        Cancelled
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-[#E56A00]">
      <span className="h-2 w-2 rounded-full bg-[#FF7A00]" />
      Pending Scheduling
    </div>
  );
}

function StatusCellSchedule({ status }: { status: AgentScheduleStatus }) {
  const normalizedStatus = status.toUpperCase();

  if (["VISITED", "COMPLETED"].includes(normalizedStatus)) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-green/20 px-3 py-1 text-xs font-semibold text-(--color-green)">
        <CheckCircle2 className="h-4 w-4" />
        {toTitleCase(normalizedStatus)}
      </span>
    );
  }

  if (normalizedStatus === "CANCELLED") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-500">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        Cancelled
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/10 px-3 py-1 text-xs font-semibold text-[#2563EB]">
      <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
      Scheduled
    </span>
  );
}

function PropertyCell({
  image,
  name,
  id,
  meta,
}: {
  image: string | null;
  name: string;
  id: string;
  meta?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <AvatarImage
        src={image}
        alt={name}
        containerClassName="relative h-10 w-14 overflow-hidden rounded-lg border border-gray/15 bg-secondary-color"
        imageClassName="object-cover"
      />

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-black">{name}</p>
        <p className="text-xs text-gray">{id}</p>
        {meta ? <p className="text-xs text-gray">{meta}</p> : null}
      </div>
    </div>
  );
}

function PersonCell({
  image,
  name,
  phone,
  meta,
}: {
  image: string | null;
  name: string;
  phone: string;
  meta?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <AvatarImage
        src={image}
        alt={name}
        containerClassName="relative h-9 w-9 overflow-hidden rounded-full border border-gray/15 bg-secondary-color"
        imageClassName="object-cover"
      />

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-black">{name}</p>
        <p className="text-xs text-gray">{phone}</p>
        {meta ? <p className="text-xs text-gray">{meta}</p> : null}
      </div>
    </div>
  );
}

function AvatarImage({
  src,
  alt,
  containerClassName,
  imageClassName,
}: {
  src: string | null;
  alt: string;
  containerClassName: string;
  imageClassName?: string;
}) {
  const [imageSrc, setImageSrc] = React.useState(src || IMAGE_FALLBACK);

  React.useEffect(() => {
    setImageSrc(src || IMAGE_FALLBACK);
  }, [src]);

  return (
    <div className={containerClassName}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={imageClassName}
        unoptimized={imageSrc.startsWith("data:")}
        onError={() => {
          if (imageSrc !== IMAGE_FALLBACK) {
            setImageSrc(IMAGE_FALLBACK);
          }
        }}
      />
    </div>
  );
}

function toTitleCase(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
