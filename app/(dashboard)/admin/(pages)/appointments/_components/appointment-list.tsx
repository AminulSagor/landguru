"use client";

import Image from "next/image";
import { AppointmentTabStatus } from "@/app/(dashboard)/admin/(pages)/appointments/page";
import {
  agentSchedules,
  appointments,
} from "@/app/(dashboard)/admin/dummy-data/appointment-data";
import type {
  AgentSchedule,
  Appointment,
} from "@/app/(dashboard)/admin/types/appointment-types";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/buttons/button";

interface AppointmentListProps {
  tabStatus: AppointmentTabStatus;
  onApproveSchedule: (v: Appointment) => void;
}

type TableHead = {
  key: string;
  label: string;
};

export default function AppointmentList({
  tabStatus,
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

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-300">
        <thead>
          <tr className="bg-secondary/40 text-xs font-semibold tracking-wide text-gray">
            {tableHead.map((head) => (
              <th key={head.key} className="px-5 py-4 text-left">
                {head.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tabStatus === "user_site_visit" ? (
            <UserSiteVisitRows
              data={appointments}
              onApproveSchedule={onApproveSchedule}
            />
          ) : (
            <AgentScheduleRows data={agentSchedules} />
          )}
        </tbody>
      </table>
    </div>
  );
}

//====== user visit site =====//
function UserSiteVisitRows({
  data,
  onApproveSchedule,
}: {
  data: Appointment[];
  onApproveSchedule: (v: Appointment) => void;
}) {
  return (
    <>
      {data.map((row) => {
        const isPending = row.status === "pending_scheduling";

        return (
          <tr
            key={row.id}
            className={cn(
              "border-t border-gray/15",
              isPending && "bg-[#FFF9F2]",
            )}
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
                name={row.property.name}
                id={row.property.id}
              />
            </td>

            <td className="px-5 py-4">
              <PersonCell
                image={row.buyer.image}
                name={row.buyer.name}
                phone={row.buyer.phoneNumber}
              />
            </td>

            <td className="px-5 py-4">
              <PersonCell
                image={row.owner.image}
                name={row.owner.name}
                phone={row.owner.phoneNumber}
              />
            </td>

            <td className="px-5 py-4">
              <StatusCellAppointment status={row.status} />
            </td>

            <td className="px-5 py-4">
              {row.status === "pending_scheduling" ? (
                <Button
                  size="base"
                  onClick={() => {
                    onApproveSchedule(row);
                  }}
                >
                  Approve &amp; Schedule
                </Button>
              ) : (
                <Button size="base" variant="secondary">
                  Reschedule
                </Button>
              )}
            </td>
          </tr>
        );
      })}
    </>
  );
}

//====== agent schedules ======//
function AgentScheduleRows({ data }: { data: AgentSchedule[] }) {
  return (
    <>
      {data.map((row) => {
        const d = new Date(row.scheduledAt);
        const dayLabel = isTomorrow(d) ? "Tomorrow" : "Today";

        return (
          <tr key={row.id} className="border-t border-gray/15">
            <td className="px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-black">{dayLabel}</p>
                <p className="mt-1 text-xs text-gray">
                  {formatTimeAMPM(row.scheduledAt)}
                </p>
              </div>
            </td>

            <td className="px-5 py-4">
              <PropertyCell
                image={row.property.image}
                name={row.property.name}
                id={row.property.id}
              />
            </td>

            <td className="px-5 py-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-black">
                  {row.service.name}
                </p>
                <p className="text-xs text-gray">{row.service.id}</p>
              </div>
            </td>

            <td className="px-5 py-4">
              <PersonCell
                image={row.agent.image}
                name={row.agent.name}
                phone={row.agent.phoneNumber}
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

//===============
/* helpers*/
//===============

function isSameBDDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isTomorrow(d: Date) {
  const t = new Date();
  const tm = new Date(t);
  tm.setDate(t.getDate() + 1);
  return isSameBDDay(d, tm);
}

function formatTimeAMPM(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
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
  const t = new Date(iso).getTime();
  const diff = Math.max(0, now - t);

  const min = Math.floor(diff / (1000 * 60));
  if (min < 60) return `${min || 1}m ago`;

  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;

  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}

function StatusCellAppointment({ status }: { status: Appointment["status"] }) {
  if (status === "confirmed") {
    return (
      <div className="flex items-center gap-2 text-sm font-semibold text-(--color-green)">
        <CheckCircle2 className="h-4 w-4" />
        Confirmed
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

function StatusCellSchedule({ status }: { status: AgentSchedule["status"] }) {
  if (status === "visited") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-green/20 px-3 py-1 text-xs font-semibold text-(--color-green)">
        <CheckCircle2 className="h-4 w-4" />
        Visited
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
}: {
  image: string;
  name: string;
  id: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-14 overflow-hidden rounded-lg border border-gray/15 bg-secondary-color">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-black">{name}</p>
        <p className="text-xs text-gray">{id}</p>
      </div>
    </div>
  );
}

function PersonCell({
  image,
  name,
  phone,
}: {
  image: string;
  name: string;
  phone: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-9 w-9 overflow-hidden rounded-full border border-gray/15 bg-secondary-color">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-black">{name}</p>
        <p className="text-xs text-gray">{phone}</p>
      </div>
    </div>
  );
}
