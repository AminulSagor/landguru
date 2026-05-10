"use client";

import Image from "next/image";
import { Check, Phone, Clock, MapPin, Home, Ruler, Wallet } from "lucide-react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { cn } from "@/lib/utils";
import type {
  BuyRequestListItem,
  BuyRequestTagIconKey,
} from "@/types/admin/buy-requests/buy-requests-list.types";

export default function BuyRequestRow({
  item,
  checked,
  onToggle,
  onApprove,
  onReject,
}: {
  item: BuyRequestListItem;
  checked: boolean;
  onToggle: () => void;
  onApprove: (item: BuyRequestListItem) => void;
  onReject: (item: BuyRequestListItem) => void;
}) {
  return (
    <Card>
      <div className="hidden w-full gap-4 lg:grid lg:grid-cols-12">
        <div className="flex gap-2 lg:col-span-4">
          <div className="pt-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={onToggle}
              className="h-4 w-4 accent-primary"
            />
          </div>

          <div>
            <UserProfileCell user={item.user} id={item.id} createdAgo={item.createdAgo} />
          </div>
        </div>

        <div className="lg:col-span-4">
          <p className="text-base font-extrabold text-gray">{item.title}</p>

          <div className="mt-2 flex min-w-0 items-center gap-2">
            <MapPin size={14} className="shrink-0 text-primary" />
            <p className="truncate text-[11px] font-semibold text-light-gray">
              {item.locationLine}
            </p>
          </div>

          <div className="mt-3 grid max-w-66 grid-cols-2 gap-3">
            {item.tags.map((tag, index) => (
              <ReqBox
                key={`${item.id}-req-${index}`}
                icon={tag.icon}
                label={tag.label}
                strong={tag.strong}
                highlight={tag.icon === "wallet"}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center lg:col-span-2">
          <p className="line-clamp-4 text-xs font-semibold leading-5 text-light-gray">
            {item.description}
          </p>
        </div>

        <div className="flex justify-end lg:col-span-2">
          <ActionsCell
            status={item.statusLabel}
            onApprove={() => onApprove(item)}
            onReject={() => onReject(item)}
          />
        </div>
      </div>

      <div className="space-y-4 px-4 py-4 lg:hidden">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={checked}
            onChange={onToggle}
            className="mt-1 h-4 w-4 accent-primary"
          />
          <UserProfileCell user={item.user} id={item.id} createdAgo={item.createdAgo} />
        </div>

        <div className="border-t border-gray/15 pt-4">
          <p className="text-sm font-extrabold text-gray">{item.title}</p>

          <div className="mt-2 flex items-center gap-2">
            <MapPin size={14} className="text-primary" />
            <p className="truncate text-[11px] font-semibold text-light-gray">
              {item.locationLine}
            </p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {item.tags.map((tag, index) => (
              <ReqBox
                key={`${item.id}-mreq-${index}`}
                icon={tag.icon}
                label={tag.label}
                strong={tag.strong}
                highlight={tag.icon === "wallet"}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-gray/15 pt-4">
          <p className="line-clamp-4 text-xs font-semibold leading-5 text-light-gray">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-gray/15 pt-4">
          <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-extrabold text-gray">
            {item.statusLabel}
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onReject(item)}
              className="text-[11px] font-extrabold text-[#ff3b30]"
            >
              Reject
            </button>

            <Button
              size="sm"
              className="rounded-xl px-5 py-2"
              onClick={() => onApprove(item)}
            >
              <span className="inline-flex items-center gap-2">
                <Check size={16} />
                Approve
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ReqBox({
  icon,
  label,
  strong,
  highlight,
}: {
  icon: BuyRequestTagIconKey;
  label: string;
  strong?: string;
  highlight?: boolean;
}) {
  const Icon = icon === "home" ? Home : icon === "wallet" ? Wallet : Ruler;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border px-3 py-2",
        highlight
          ? "border-primary/20 bg-primary/5"
          : "border-gray/15 bg-secondary",
      )}
    >
      <Icon
        size={14}
        className={cn(highlight ? "text-primary" : "text-light-gray")}
      />
      <p className="text-[11px] font-semibold text-gray">{strong ?? label}</p>
    </div>
  );
}

function UserProfileCell({
  user,
  id,
  createdAgo,
}: {
  user: BuyRequestListItem["user"];
  id: string;
  createdAgo?: string | null;
}) {
  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((segment) => segment[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-gray/15 bg-secondary">
        {user.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt={user.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-extrabold text-gray">
            {initials}
          </div>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <p className="truncate text-sm font-extrabold text-gray">{user.name}</p>

          {user.verified && (
            <span className="shrink-0 rounded-md bg-primary/10 px-2 py-1 text-[10px] font-extrabold text-primary">
              VERIFIED
            </span>
          )}
        </div>

        <p className="mt-0.5 text-[11px] font-semibold text-light-gray">{id}</p>

        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-gray/15 bg-white px-3 py-2">
          <Phone size={14} className="text-light-gray" />
          <p className="text-[11px] font-semibold text-gray">{user.phone}</p>
        </div>

        {createdAgo ? (
          <div className="mt-2 flex items-center gap-2">
            <Clock size={14} className="text-light-gray" />
            <p className="text-[11px] font-semibold text-light-gray">
              {createdAgo}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ActionsCell({
  status,
  onApprove,
  onReject,
}: {
  status: BuyRequestListItem["statusLabel"];
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <div className="flex flex-col items-end gap-3">
      <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-extrabold text-gray">
        {status}
      </span>

      <Button size="sm" className="rounded-xl px-6 py-2" onClick={onApprove}>
        <span className="inline-flex items-center gap-2">
          <Check size={16} />
          Approve
        </span>
      </Button>

      <button
        type="button"
        onClick={onReject}
        className="text-[11px] font-extrabold text-[#ff3b30]"
      >
        Reject Request
      </button>
    </div>
  );
}
