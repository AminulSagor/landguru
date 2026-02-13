"use client";

import {
  ADMIN_LINKS,
  SUPER_ADMIN_LINKS,
  type SidebarLink,
  type SectionedSidebarLink,
} from "@/constants/navigation-links";
import { currentUser, User } from "@/helpers/helpers";
import { useScreenSize } from "@/hooks/useScreenSize";
import { LayoutDashboard, PanelRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement, JSX } from "react";

type Props = {
  openSidebar: boolean;
  onOpenChange: (v: boolean) => void;
};

const AdminSidebar = ({ onOpenChange, openSidebar }: Props) => {
  const width = useScreenSize();
  const isMobile = width <= 768;
  const user: User = currentUser;
  const path = usePathname();

  // Function to render icon with consistent size
  const renderIcon = (icon: JSX.Element | undefined) => {
    if (!icon) return null;
    // Clone the icon element and add consistent size
    return cloneElement(icon, {
      className: "w-5 h-5",
      strokeWidth: 1.5,
    });
  };

  // Render regular admin links
  const renderAdminLinks = () => (
    <ul className="space-y-1">
      {ADMIN_LINKS.map((item: SidebarLink) => {
        const isActive = item.link === path;
        return (
          <li key={item.link}>
            <Link
              href={item.link}
              className={`flex gap-3 items-center px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-secondary text-primary font-semibold"
                  : "text-gray hover:bg-gray/5"
              }`}
            >
              <span className="text-current">{renderIcon(item.icon)}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  // Render super admin links with sections
  const renderSuperAdminLinks = () => (
    <div className="space-y-6">
      {SUPER_ADMIN_LINKS.map((section: SectionedSidebarLink, index) => (
        <div key={section.section || index}>
          {section.section && (
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider px-4 mb-2">
              {section.section}
            </h3>
          )}
          <ul className="space-y-1">
            {section.items.map((item: SidebarLink) => {
              const isActive = item.link === path;
              return (
                <li key={item.link}>
                  <Link
                    href={item.link}
                    className={`flex gap-3 items-center px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-secondary text-primary font-semibold"
                        : "text-gray hover:bg-gray/5"
                    }`}
                  >
                    <span className="text-current">
                      {renderIcon(item.icon)}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );

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
            "h-full transition-all duration-300 ease-in-out px-3",
            openSidebar
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-2",
          ].join(" ")}
        >
          {/* Logo/Brand */}
          <div className="flex items-center gap-2 h-16 border-b border-gray/10 mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-primary rounded-lg text-white p-2">
                <LayoutDashboard size={18} />
              </span>
              <span className="text-base font-bold">LandGuru</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-4">
            {user === "admin" ? renderAdminLinks() : renderSuperAdminLinks()}
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
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray/10">
            <div className="flex items-center gap-2">
              <span className="bg-primary rounded-lg text-white p-2">
                <LayoutDashboard size={18} />
              </span>
              <span className="text-base font-bold">LandGuru</span>
            </div>
            <button
              className="p-2 hover:bg-gray/10 rounded-lg cursor-pointer transition-colors"
              onClick={() => onOpenChange(false)}
              aria-label="Close sidebar"
            >
              <PanelRight size={20} />
            </button>
          </div>

          {/* Navigation Links - Scrollable */}
          <div className="flex-1 overflow-y-auto py-4 px-3">
            {user === "admin" ? renderAdminLinks() : renderSuperAdminLinks()}
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;