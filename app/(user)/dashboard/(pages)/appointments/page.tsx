"use client";

import React, { useMemo, useState } from "react";
import { Tab, TabConfig } from "@/components/tabs/tab";
import Button from "@/components/buttons/button";
import Card from "@/components/cards/card";
import { ChevronRight, Clock, User } from "lucide-react";
import {
  RequestItem,
  RequestStatus,
  VisitBadge,
  VisitItem,
} from "@/app/(user)/dashboard/types/appointment";
import {
  agentPast,
  agentUpcoming,
  myPast,
  myUpcoming,
  requests,
} from "@/app/(user)/dashboard/dummy-data/appointment";

type MainTabKey = "upcomming" | "past";

type UpcomingSubKey = "my_requests" | "upcoming_visit" | "agent_visit";
type PastSubKey = "my_visit" | "agent_visit";

export default function AppointmentPage() {
  const [tabkey, setTabKey] = useState<MainTabKey>("upcomming");
  const [upSub, setUpSub] = useState<UpcomingSubKey>("my_requests");
  const [pastSub, setPastSub] = useState<PastSubKey>("my_visit");

  const tabs: TabConfig<MainTabKey>[] = [
    { key: "upcomming", label: "Upcoming" },
    { key: "past", label: "Past" },
  ];

  const isUpcoming = tabkey === "upcomming";

  return (
    <div className="py-24">
      <div className="mx-auto max-w-6xl">
        {/* Top main tabs */}
        <Tab tabs={tabs} tabKey={tabkey} onChangeTabKey={setTabKey} />

        {/* Sub tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {isUpcoming ? (
            <>
              <Pill
                active={upSub === "my_requests"}
                onClick={() => setUpSub("my_requests")}
              >
                My Requests
              </Pill>
              <Pill
                active={upSub === "upcoming_visit"}
                onClick={() => setUpSub("upcoming_visit")}
              >
                Upcoming Visit
              </Pill>
              <Pill
                active={upSub === "agent_visit"}
                onClick={() => setUpSub("agent_visit")}
              >
                Agent Visit
              </Pill>
            </>
          ) : (
            <>
              <Pill
                active={pastSub === "my_visit"}
                onClick={() => setPastSub("my_visit")}
              >
                My Visit
              </Pill>
              <Pill
                active={pastSub === "agent_visit"}
                onClick={() => setPastSub("agent_visit")}
              >
                Agent Visit
              </Pill>
            </>
          )}
        </div>

        {/* Content */}
        <div className="mt-10">
          {/* UPCOMING */}
          {isUpcoming && upSub === "my_requests" && (
            <>
              <h2 className="text-xl font-extrabold text-gray">My Requests</h2>
              <p className="mt-1 text-sm font-semibold text-gray/60">
                These are the posts you requested to visit
              </p>

              <div className="mt-6 space-y-5">
                {requests.map((x) => (
                  <RequestRow key={x.id} item={x} />
                ))}
              </div>
            </>
          )}

          {isUpcoming && upSub === "upcoming_visit" && (
            <>
              <h2 className="text-xl font-extrabold text-gray">
                Upcoming Visits
              </h2>
              <p className="mt-1 text-sm font-semibold text-gray/60">
                Showing {myUpcoming.length} Properties
              </p>

              <div className="mt-6 space-y-5">
                {myUpcoming.map((x) => (
                  <VisitRow key={x.id} item={x} mode="my" />
                ))}
              </div>
            </>
          )}

          {isUpcoming && upSub === "agent_visit" && (
            <>
              <h2 className="text-xl font-extrabold text-gray">Agent Visits</h2>
              <p className="mt-1 text-sm font-semibold text-gray/60">
                Check which agents are going to visit your property(s)
              </p>

              <div className="mt-6 space-y-5">
                {agentUpcoming.map((x) => (
                  <VisitRow key={x.id} item={x} mode="agent" />
                ))}
              </div>
            </>
          )}

          {/* PAST */}
          {!isUpcoming && pastSub === "my_visit" && (
            <>
              <h2 className="text-xl font-extrabold text-gray">My Visits</h2>
              <p className="mt-1 text-sm font-semibold text-gray/60">
                Showing {myPast.length} Properties
              </p>

              <div className="mt-6 space-y-5">
                {myPast.map((x) => (
                  <VisitRow key={x.id} item={x} mode="my" />
                ))}
              </div>
            </>
          )}

          {!isUpcoming && pastSub === "agent_visit" && (
            <>
              <h2 className="text-xl font-extrabold text-gray">Agent Visits</h2>
              <p className="mt-1 text-sm font-semibold text-gray/60">
                Check which agents have visited your property(s)
              </p>

              <div className="mt-6 space-y-5">
                {agentPast.map((x) => (
                  <VisitRow key={x.id} item={x} mode="agent" />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Pill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      shape="pill"
      variant={active ? "primary" : "secondary"}
      className={` ${active ? "" : "text-gray bg-white hover:bg-secondary"}`}
    >
      {children}
    </Button>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-gray">
      {children}
    </span>
  );
}

function StatusPill({ status }: { status: RequestStatus }) {
  const ok = status === "Approved";
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${
        ok ? "bg-green/15 text-green" : "bg-secondary text-gray"
      }`}
    >
      {status}
    </span>
  );
}

function VisitPill({ badge }: { badge: VisitBadge }) {
  const isVisited = badge === "Visited";
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${
        isVisited ? "bg-secondary text-gray" : "bg-primary/10 text-primary"
      }`}
    >
      {badge}
    </span>
  );
}

function RequestRow({ item }: { item: RequestItem }) {
  return (
    <Card className="p-5 rounded-2xl bg-white border border-gray/10 shadow-xs">
      <div className="flex items-center gap-4">
        <div className="h-24 w-28 overflow-hidden rounded-xl bg-secondary shrink-0">
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray/60 text-sm">
              No Image
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-base font-extrabold text-gray truncate">
            {item.title}
          </p>
          <p className="text-xs font-semibold text-gray/60">{item.postId}</p>

          <p className="mt-2 text-lg font-extrabold text-primary">
            ৳ {item.price}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Tag>{item.type}</Tag>
            <StatusPill status={item.status} />
          </div>
        </div>

        <div className="flex flex-col items-end justify-between h-24 shrink-0">
          <ChevronRight className="text-gray/40" size={18} />
          <div className="flex items-center gap-1 text-xs font-semibold text-gray/60">
            <Clock size={14} className="text-gray/40" />
            <span>Requested: {item.requestedAgo}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function VisitRow({ item, mode }: { item: VisitItem; mode: "my" | "agent" }) {
  return (
    <Card className="p-5 rounded-2xl bg-white border border-gray/10 shadow-xs">
      <div className="flex items-center gap-5">
        {/* date box */}
        <div className="h-28 w-28 rounded-2xl bg-primary/10 flex flex-col items-center justify-center shrink-0">
          <p className="text-lg font-extrabold text-primary">
            {item.dateLabel.month}
          </p>
          <p className="text-3xl font-extrabold text-primary">
            {item.dateLabel.day}
          </p>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-base font-extrabold text-gray truncate">
                {item.title}
              </p>
              <p className="text-xs font-semibold text-gray/60">
                {item.postId}
              </p>
            </div>
            <ChevronRight className="text-gray/40" size={18} />
          </div>

          <p className="mt-2 text-sm font-semibold text-gray/70 line-clamp-2">
            {item.address}
          </p>

          {mode === "my" ? (
            <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-gray/70">
              <User size={14} className="text-primary" />
              <span className="text-primary">Client:</span>
              <span>{item.clientName || "—"}</span>
            </div>
          ) : (
            <div className="mt-2 space-y-1 text-xs font-semibold text-gray/70">
              <p>
                <span className="text-gray/70">SERVICE TYPE:</span>{" "}
                {item.serviceType || "—"}
              </p>
              <div className="flex items-center gap-2">
                <User size={14} className="text-primary" />
                <span className="text-gray/70">Agent:</span>
                <span>{item.agentName || "—"}</span>
              </div>
            </div>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Tag>{item.type}</Tag>
            <VisitPill badge={item.badge} />
          </div>
        </div>
      </div>
    </Card>
  );
}
