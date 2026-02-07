"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoreVertical } from "lucide-react";

import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { cn } from "@/lib/utils";

import { Property, StatusKey } from "@/app/(admin)/admin/types/property.types";
import { properties } from "@/app/(admin)/admin/dummy-data/property-data";

/* ---------------- helpers ---------------- */

function buildPropertyDetailsHref(propertyId: string) {
  return `/admin/dashboard/property-posts/details/${propertyId}`;
}

function ActionLinkButton({
  href,
  children,
  variant = "primary",
  className = "",
  disabled,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
}) {
  return (
    <Button
      variant={variant}
      disabled={disabled}
      size="sm"
      className="w-30"
    >
      <Link
        href={href}
        className="h-full w-full flex items-center justify-center"
      >
        {children}
      </Link>
    </Button>
  );
}

/* ---------------- pills ---------------- */

function TagPill({
  label,
  tone,
}: {
  label: string;
  tone: Property["tags"][number]["tone"];
}) {
  const cls =
    tone === "blue"
      ? "border-primary/20 bg-primary/10 text-primary"
      : tone === "purple"
        ? "border-[#D8B4FE] bg-[#F3E8FF] text-[#6D28D9]"
        : tone === "red"
          ? "border-[#FCA5A5] bg-[#FEE2E2] text-[#B91C1C]"
          : "border-gray/15 bg-white text-gray";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-extrabold",
        cls,
      )}
    >
      {label}
    </span>
  );
}

function StatusPill({ k, label }: { k: StatusKey; label: string }) {
  const cls =
    k === "pending_review"
      ? "border-[#FDBA74] bg-[#FFEAD5] text-[#C2410C]"
      : k === "service_fee_paid"
        ? "border-[#FDBA74] bg-white text-[#C2410C]"
        : k === "live"
          ? "border-[#86EFAC] bg-[#DCFCE7] text-green"
          : k === "sold" || k === "partially_sold"
            ? "border-green bg-green text-white"
            : "border-[#EF4444] bg-[#EF4444] text-white"; // rejected

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-4 py-1 text-xs font-extrabold whitespace-nowrap",
        cls,
      )}
    >
      {label}
    </span>
  );
}

/* ---------------- progress ---------------- */

function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total <= 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
      <div className="h-full bg-green" style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ---------------- component ---------------- */

export default function PropertiesManagementTable() {
  return (
    <Card className="rounded-2xl p-0 overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-295 border-collapse">
          <thead>
            <tr className="bg-secondary">
              {[
                "PROPERTY",
                "DETAILS",
                "PRICING",
                "OWNER",
                "SERVICES PROGRESS",
                "STATUS",
                "ACTIONS",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-4 text-left text-xs font-extrabold text-gray tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {properties.map((r, idx) => {
              const detailsHref = buildPropertyDetailsHref(r.id);

              const isPending = r.status.key === "pending_review";
              const isServicePaid = r.status.key === "service_fee_paid";
              const isLive = r.status.key === "live";
              const isRejected = r.status.key === "rejected";
              const isSold = r.status.key === "sold" || r.status.key === "partially_sold";

              return (
                <tr
                  key={`${r.id}-${idx}`}
                  className="border-t border-gray/15 hover:bg-secondary"
                >
                  {/* PROPERTY (thumb) */}
                  <td className="px-6 py-6 align-top">
                    <div className="h-14 w-14 overflow-hidden rounded-lg border border-gray/15 bg-secondary">
                      <Image
                        src={r.thumbUrl}
                        alt={r.title}
                        width={56}
                        height={56}
                        className="h-14 w-14 object-cover"
                      />
                    </div>
                  </td>

                  {/* DETAILS */}
                  <td className="px-6 py-6 align-top">
                    <Link href={detailsHref} className="inline-block">
                      <p className="text-sm font-extrabold text-primary hover:underline">
                        {r.title}
                      </p>
                    </Link>

                    <p className="mt-1 text-xs font-semibold text-gray leading-relaxed">
                      {r.addressLine1}
                      <br />
                      {r.addressLine2}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {r.tags.map((t, i2) => (
                        <TagPill
                          key={`${t.label}-${i2}`}
                          label={t.label}
                          tone={t.tone}
                        />
                      ))}
                    </div>
                  </td>

                  {/* PRICING */}
                  <td className="px-6 py-6 align-top">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-gray">
                          Ask:
                        </span>
                        <span className="text-xs font-extrabold text-gray">
                          {r.ask}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-gray">
                          Val:
                        </span>

                        {r.val.toLowerCase() === "pending" ? (
                          <span className="text-xs font-extrabold text-gray italic">
                            Pending
                          </span>
                        ) : (
                          <span className="text-xs font-extrabold text-green">
                            {r.val}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* OWNER */}
                  <td className="px-6 py-6 align-top">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full border border-gray/15 bg-secondary">
                        <Image
                          src={r.owner.avatarUrl}
                          alt={r.owner.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 object-cover"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-extrabold text-gray">
                          {r.owner.name}
                        </p>
                        <p className="text-xs font-semibold text-gray">
                          {r.owner.phone}
                        </p>
                        <p className="text-xs font-semibold text-gray">
                          ID: {r.owner.uid}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* SERVICES PROGRESS */}
                  <td className="px-6 py-6 align-top">
                    <div className="min-w-[180px]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray">
                          {r.progress.labelLeft}
                        </span>
                        <span className="text-xs font-semibold text-gray">
                          {r.progress.total <= 0
                            ? "0/0"
                            : `${r.progress.done}/${r.progress.total}`}
                        </span>
                      </div>

                      <div className="mt-2">
                        <ProgressBar done={r.progress.done} total={r.progress.total} />
                      </div>

                      {r.progress.note?.text ? (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs font-extrabold text-[#EF4444]">
                            {r.progress.note.text}
                          </span>
                          {typeof r.progress.note.count === "number" && (
                            <span className="text-xs font-extrabold text-[#EF4444]">
                              {r.progress.note.count}
                            </span>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-6 align-top">
                    <div className="flex flex-col items-center gap-2">
                      <StatusPill k={r.status.key} label={r.status.label} />

                      <div className="text-center">
                        <p className="text-xs font-semibold text-gray">
                          {r.status.metaLabel}
                        </p>
                        <p className="text-xs font-semibold text-gray">
                          {r.status.metaTime}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-6 align-top">
                    <div className="flex items-center justify-end gap-3">
                      {/* All actions link to details (matches SS behavior) */}
                      {r.action.kind === "review" && (
                        <ActionLinkButton
                          href={detailsHref}
                          variant="primary"
                          className="min-w-[110px] text-white"
                        >
                          {r.action.label}
                        </ActionLinkButton>
                      )}

                      {r.action.kind === "active" && (
                        <ActionLinkButton
                          href={detailsHref}
                          variant="primary"
                          className="min-w-[110px] text-white"
                        >
                          {r.action.label}
                        </ActionLinkButton>
                      )}

                      {r.action.kind === "view_details" && (
                        <ActionLinkButton
                          href={detailsHref}
                          variant="secondary"
                          className="min-w-[120px] border border-gray/15 bg-white text-gray"
                        >
                          {r.action.label}
                        </ActionLinkButton>
                      )}

                      <button
                        type="button"
                        className="h-9 w-9 rounded-lg border border-transparent hover:border-gray/15 hover:bg-secondary flex items-center justify-center"
                        aria-label="More actions"
                      >
                        <MoreVertical size={18} className="text-gray" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* footer */}
      <div className="flex flex-col gap-3 border-t border-gray/15 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold text-gray">
          Showing 1 to 4 of 12 results
        </p>

        <div className="flex items-center justify-end gap-2">
          <button className="h-8 w-8 rounded-lg border border-gray/15 bg-white text-gray flex items-center justify-center text-xs font-extrabold">
            ‹
          </button>

          <button className="h-8 w-8 rounded-lg bg-primary text-white text-xs font-extrabold">
            1
          </button>
          <button className="h-8 w-8 rounded-lg border border-gray/15 bg-white text-gray text-xs font-extrabold">
            2
          </button>
          <button className="h-8 w-8 rounded-lg border border-gray/15 bg-white text-gray text-xs font-extrabold">
            3
          </button>

          <span className="px-2 text-xs font-extrabold text-gray">…</span>

          <button className="h-8 w-8 rounded-lg border border-gray/15 bg-white text-gray flex items-center justify-center text-xs font-extrabold">
            ›
          </button>
        </div>
      </div>
    </Card>
  );
}
