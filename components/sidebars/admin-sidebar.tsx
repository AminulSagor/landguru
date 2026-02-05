"use client";

import {
  adminSideBarItems,
  SuperAdminSideBarItems,
} from "@/app/(admin)/admin/sidebar-items/item";
import { currentUser, User } from "@/helpers/helpers";
import { useScreenSize } from "@/hooks/useScreenSize";
import { LayoutDashboard, PanelRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  openSidebar: boolean;
  onOpenChange: (v: boolean) => void;
};

const AdminSidebar = ({ onOpenChange, openSidebar }: Props) => {
  const width = useScreenSize();
  const isMobile = width <= 768;
  const user: User = currentUser;
  const path = usePathname();

  // Desktop sidebar (push layout)
  if (!isMobile) {
    return (
      <aside
        className={[
          "bg-white border-r border-gray/20 h-full",
          "transition-[width] duration-300 ease-in-out",
          "overflow-hidden",
          openSidebar ? "w-60" : "w-0",
        ].join(" ")}
      >
        {/* content wrapper for fade + slide */}
        <div
          className={[
            "h-full transition-all duration-300 ease-in-out px-2",
            openSidebar
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-2",
          ].join(" ")}
        >
          <div className="flex items-center gap-2 justify-between">
            <p className="flex items-center gap-2 mt-4 pl-5">
              <span>
                <LayoutDashboard size={18} />
              </span>
              <span className="text-lg font-semibold">LandGuru</span>
            </p>
          </div>

          {/* lists */}
          <div className="mt-10">
            {user === "admin" ? (
              <ul>
                {adminSideBarItems.map((item) => {
                  const isActive = item.url === path;
                  return (
                    <li
                      key={item.name}
                      className={`flex gap-4 items-center px-4 py-3 text-sm ${isActive ? "bg-secondary  rounded-md text-primary font-semibold" : "text-gray"}`}
                    >
                      <span className="">{item.icon}</span>{" "}
                      <Link href={item.url}>{item.name}</Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ul>
                {SuperAdminSideBarItems.map((item) => {
                  const isActive = item.url === path;
                  return (
                    <li
                      key={item.name}
                      className={`flex gap-4 items-center px-4 py-3 text-sm ${isActive ? "bg-secondary  rounded-md text-primary font-semibold" : "text-gray"}`}
                    >
                      <span className="">{item.icon}</span>{" "}
                      <Link href={item.url}>{item.name}</Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </aside>
    );
  }

  // Mobile drawer (overlay)
  return (
    <>
      {/* overlay */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300",
          openSidebar ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => onOpenChange(false)}
      />

      {/* drawer */}
      <aside
        className={[
          "fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-gray/20",
          "transform transition-transform duration-300 ease-in-out",
          openSidebar ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 justify-between">
            <p className="flex items-center gap-2">
              <span>
                <LayoutDashboard size={18} />
              </span>
              <span className="text-lg font-semibold">LandGuru</span>
            </p>

            <button
              className="cursor-pointer"
              onClick={() => onOpenChange(false)}
              aria-label="Close sidebar"
            >
              <PanelRight size={18} />
            </button>
          </div>

          {/* lists */}
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
