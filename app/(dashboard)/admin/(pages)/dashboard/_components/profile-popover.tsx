"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { UserCog, LogOut } from "lucide-react";

type Props = {
  name?: string;
  zone?: string;
  avatarSrc?: string;

  onProfileSettings?: () => void;
  onLogout?: () => void;
};

export default function AdminProfilePopover({
  name,
  zone = "Banani Zone",
  avatarSrc = "/images/avatars/avatar.png",
  onProfileSettings,
  onLogout,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* trigger (navbar profile area) */}
      <button className="flex items-center gap-2 md:gap-4" aria-label="Admin profile">
        <Image
          src={avatarSrc}
          height={30}
          width={30}
          alt="admin-profile-image"
          className="rounded-full"
        />
        <h1 className="text-base text-gray">{name}</h1>
      </button>

      {/* hover bridge */}
      <div
        className={cn(
          "absolute right-0 top-full h-4 w-[320px]",
          open ? "block" : "hidden"
        )}
      />

      {/* popover */}
      <div
        className={cn(
          "absolute right-0 top-full mt-3 w-[360px] transition",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="rounded-2xl border border-gray/15 bg-white shadow-xl overflow-hidden">
          {/* top profile */}
          <div className="flex items-center gap-4 px-5 py-5">
            <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-sm">
              <Image
                src={avatarSrc}
                height={56}
                width={56}
                alt="admin-avatar"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-base text-gray">{name}</h3>
              <span className="mt-2 inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-extrabold text-primary">
                {zone}
              </span>
            </div>
          </div>

          <div className="h-px w-full bg-gray/10" />

          {/* menu item 1 */}
          <button
            onClick={onProfileSettings}
            className="w-full flex items-center gap-4 px-5 py-6 text-left hover:bg-gray/5"
          >
            <div className="text-gray/40">
              <UserCog size={22} />
            </div>
            <div className="text-sm font-semibold text-gray">
              Profile Settings
            </div>
          </button>

          <div className="h-px w-full bg-gray/10" />

          {/* menu item 2 */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-5 py-6 text-left hover:bg-red/5 text-red-400 cursor-pointer"
          >
            <div className="cursor-pointer">
              <LogOut size={22} />
            </div>
            <div className="text-sm font-extrabold">Logout</div>
          </button>
        </div>
      </div>
    </div>
  );
}
