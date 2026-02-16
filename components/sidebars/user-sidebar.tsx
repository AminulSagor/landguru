"use client";

import { USER_LINKS } from "@/constants/navigation-links";
import { Bell, X, Sandwich } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export default function UserMobileDrawer({ open, onOpenChange }: Props) {
  const route = usePathname();

  return (
    <>
      {/* Overlay */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => onOpenChange(false)}
      />

      {/* Drawer */}
      <aside
        className={[
          "fixed top-0 left-0 z-50 h-full w-80 max-w-[85vw]",
          "bg-white border-r border-gray/20",
          "transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-gray/10">
            <div className="flex items-center gap-2">
              <span className="bg-primary rounded-lg text-white p-2 px-3">
                <Sandwich size={18} />
              </span>
              <span className="font-bold text-base">LandGuru</span>
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="p-2 rounded-lg hover:bg-gray/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="px-3 py-4">
            {/* Links (scroll if long) */}
            <div className="max-h-[60vh] overflow-y-auto pr-1">
              <ul className="space-y-1">
                {USER_LINKS.map((item) => {
                  const isActive = item.link === route;
                  return (
                    <li key={item.link}>
                      <Link
                        href={item.link}
                        onClick={() => onOpenChange(false)}
                        className={[
                          "flex items-center px-3 py-2.5 rounded-lg text-sm transition-colors",
                          isActive
                            ? "bg-secondary text-primary font-semibold"
                            : "text-gray hover:bg-gray/5",
                        ].join(" ")}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* User Area*/}
            <div className="mt-4 border-t border-gray/10 pt-4 space-y-3">
              {/* Notifications */}
              <Link
                href="/user/notifications"
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray hover:bg-gray/5 transition-colors"
              >
                <Bell size={18} />
                Notifications
              </Link>

              {/* Profile */}
              <Link
                href="/user/profile"
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray/5 transition-colors"
              >
                <Image
                  src={"/images/avatars/avatar.png"}
                  height={32}
                  width={32}
                  className="rounded-full h-8 w-8 object-cover"
                  alt="Profile-image"
                />
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-gray">John Doe</p>
                  <p className="text-xs text-gray/70">View profile</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
