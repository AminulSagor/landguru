"use client";

import Image from "next/image";
import Link from "next/link";
import { MoreVertical } from "lucide-react";

import Button from "@/components/buttons/button";
import type { PropertyPostItem } from "@/types/admin/property.types";

import {
  buildPropertyDetailsHref,
  formatCompactBdt,
  formatRelativeTime,
  getActionConfig,
  getProgressSummary,
  getStatusClasses,
  getStatusLabel,
  getStatusMeta,
} from "../_utils/properties-management-table.utils";

type PropertyPostsTableRowProps = {
  property: PropertyPostItem;
};

function TagPill({
  label,
  tone = "blue",
}: {
  label: string;
  tone?: "blue" | "red" | "purple";
}) {
  const toneClasses =
    tone === "red"
      ? "border-[#FCA5A5] bg-[#FEE2E2] text-[#B91C1C]"
      : tone === "purple"
        ? "border-[#D8B4FE] bg-[#F3E8FF] text-[#6D28D9]"
        : "border-primary/20 bg-primary/10 text-primary";

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-bold ${toneClasses}`}
    >
      {label}
    </span>
  );
}

function ProgressBar({ done, total }: { done: number; total: number }) {
  const percentage =
    total > 0 ? Math.min(100, Math.round((done / total) * 100)) : 0;

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <div className="h-full bg-green" style={{ width: `${percentage}%` }} />
    </div>
  );
}

function ActionLinkButton({
  href,
  label,
  variant,
}: {
  href: string;
  label: string;
  variant: "primary" | "secondary";
}) {
  return (
    <Button
      variant={variant}
      size="sm"
      className={
        variant === "primary"
          ? "min-w-[110px]"
          : "min-w-[126px] border border-gray/15 bg-white text-gray"
      }
    >
      <Link
        href={href}
        className="flex h-full w-full items-center justify-center"
      >
        {label}
      </Link>
    </Button>
  );
}

export default function PropertyPostsTableRow({
  property,
}: PropertyPostsTableRowProps) {
  const detailsHref = buildPropertyDetailsHref(property.id);
  const progress = getProgressSummary(property.servicesProgress);
  const actionConfig = getActionConfig(property.status);
  const statusLabel = getStatusLabel(property.status);
  const statusMeta = getStatusMeta(property.status);
  const statusClasses = getStatusClasses(property.status);

  return (
    <tr className="border-t border-gray/15 transition-colors hover:bg-secondary/40">
      <td className="px-6 py-6 align-top">
        <div className="h-14 w-14 overflow-hidden rounded-lg border border-gray/15 bg-secondary">
          {property.photos[0] ? (
            <Image
              src={property.photos[0]}
              alt={property.title}
              width={56}
              height={56}
              unoptimized
              className="h-14 w-14 object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center text-[10px] font-bold text-gray">
              No Image
            </div>
          )}
        </div>
      </td>

      <td className="px-6 py-6 align-top">
        <Link href={detailsHref} className="inline-block">
          <p className="text-sm font-extrabold text-primary hover:underline">
            {property.title}
          </p>
        </Link>

        <p className="mt-1 max-w-[320px] text-xs font-semibold leading-relaxed text-gray">
          {property.description || "No description available."}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <TagPill label={property.propertyType} tone="blue" />

          {property.isResell && <TagPill label="Resell Post" tone="red" />}

          <span className="text-[11px] font-semibold text-gray">
            #{property.id.slice(0, 8).toUpperCase()}
          </span>
        </div>
      </td>

      <td className="px-6 py-6 align-top">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray">Ask:</span>
            <span className="text-xs font-extrabold text-gray">
              {formatCompactBdt(property.askingPrice)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray">Val:</span>

            {property.validatedPrice === null ? (
              <span className="text-xs font-extrabold italic text-gray">
                Pending
              </span>
            ) : (
              <span className="text-xs font-extrabold text-green">
                {formatCompactBdt(property.validatedPrice)}
              </span>
            )}
          </div>
        </div>
      </td>

      <td className="px-6 py-6 align-top">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-gray/15 bg-secondary">
            {property.seller.photoUrl ? (
              <Image
                src={property.seller.photoUrl}
                alt={property.seller.name}
                width={40}
                height={40}
                unoptimized
                className="h-10 w-10 object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center text-[10px] font-bold text-gray">
                N/A
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-extrabold text-gray">
              {property.seller.name}
            </p>
            <p className="text-xs font-semibold text-gray">
              {property.seller.phone}
            </p>
            <p className="text-xs font-semibold text-gray">
              ID: {property.seller.id.slice(0, 8)}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-6 align-top">
        <div className="min-w-[180px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray">
              {progress.label}
            </span>

            <span className="text-xs font-semibold text-gray">
              {progress.total > 0 ? `${progress.done}/${progress.total}` : "0/0"}
            </span>
          </div>

          <div className="mt-2">
            <ProgressBar done={progress.done} total={progress.total} />
          </div>

          {progress.pendingCount > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#EF4444]">
                Pending Assign
              </span>
              <span className="text-xs font-extrabold text-[#EF4444]">
                {progress.pendingCount}
              </span>
            </div>
          )}
        </div>
      </td>

      <td className="px-6 py-6 align-top">
        <div className="flex flex-col items-center gap-2">
          <span
            className={`inline-flex items-center justify-center rounded-full border px-4 py-1 text-xs font-extrabold whitespace-nowrap ${statusClasses}`}
          >
            {statusLabel}
          </span>

          <div className="text-center">
            <p className="text-xs font-semibold text-gray">{statusMeta}</p>
            <p className="text-xs font-semibold text-gray">
              {formatRelativeTime(property.updatedAt || property.createdAt)}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-6 align-top">
        <div className="flex items-center justify-end gap-3">
          <ActionLinkButton
            href={detailsHref}
            label={actionConfig.label}
            variant={actionConfig.variant}
          />

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent transition-colors hover:border-gray/15 hover:bg-secondary"
            aria-label="More actions"
          >
            <MoreVertical size={18} className="text-gray" />
          </button>
        </div>
      </td>
    </tr>
  );
}