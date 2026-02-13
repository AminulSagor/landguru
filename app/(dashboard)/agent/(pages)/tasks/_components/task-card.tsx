"use client";

import React from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { MapPin, User, MoreHorizontal } from "lucide-react";
import { TaskItem } from "@/app/(dashboard)/agent/dummy-data/mock-tasks";
import Link from "next/link";

export default function TaskCard({ item }: { item: TaskItem }) {
  const isNew = item.status === "new";
  const isActive = item.status === "active";
  const isReview = item.status === "review";
  const isDone = item.status === "done";

  return (
    <Card className="rounded-2xl p-6">
      {/* top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {isNew ? (
            <span className="rounded-lg bg-pumpkin px-3 py-1 text-xs font-extrabold text-white">
              NEW REQUEST
            </span>
          ) : null}

          {isDone ? (
            <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary">
              {item.completedTag || "COMPLETED"}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-gray/40">
          <span>{item.assignedAgo}</span>
          <button className="rounded-lg p-1 hover:bg-secondary">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* title */}
      <h3 className="mt-3 text-base font-extrabold leading-snug">
        {item.title}
      </h3>
      <p className="mt-1 text-xs font-semibold text-gray/40">{item.code}</p>

      {/* middle content differs by tab */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
            <User size={14} className="text-primary" />
          </div>
          <p className="text-gray/70">
            <span className="text-gray/50">Client:</span>{" "}
            <span className="font-extrabold text-gray">{item.client}</span>
          </p>
        </div>

        {isNew || isDone ? (
          <div className="flex items-start gap-2 text-sm text-gray/60">
            <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-gray/5">
              <MapPin size={14} className="text-gray/40" />
            </div>
            <p className="leading-6">{item.location}</p>
          </div>
        ) : null}

        {isNew ? (
          <p className="text-xs font-extrabold text-pumpkin">
            {item.acceptBefore}
          </p>
        ) : null}

        {isActive ? (
          <div className="rounded-lg bg-primary/5 px-3 py-2 text-xs font-semibold text-primary">
            {item.lastUpdate}
          </div>
        ) : null}
      </div>

      {/* action */}
      <div className="mt-5">
        {isActive ? (
          <Link href={`/agent/tasks/details/${item.id}`} className="block">
            <Button className="w-full">Update Status</Button>
          </Link>
        ) : (
          <Link href={`/agent/tasks/details/${item.id}`} className="block">
            <Button
              variant={isNew ? "primary" : "secondary"}
              className={`w-full ${isNew ? "bg-pumpkin hover:opacity-95 text-white" : ""}`}
            >
              View Details
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}
