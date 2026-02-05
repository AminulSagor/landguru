"use client";

import NotificationsPopover from "@/app/(admin)/admin/dashboard/_components/notifications-popover";
import AdminProfilePopover from "@/app/(admin)/admin/dashboard/_components/profile-popover";
import Button from "@/components/buttons/button";
import { useScreenSize } from "@/hooks/useScreenSize";
import { ChevronDown, PanelRight } from "lucide-react";
import { redirect } from "next/navigation";

type Props = {
  openSidebar: boolean;
  onOpenChange: (v: boolean) => void;
};

const AdminNavbar = ({ onOpenChange, openSidebar }: Props) => {
  const width = useScreenSize();
  const redirectProfile = () => {
    redirect("/admin/dashboard/profile");
  };

  return (
    <div className="bg-white w-full flex items-center justify-between border-b border-gray/20 px-2 md:px-4 2xl:px-8 py-2 sticky top-0 z-30">
      <div className="flex items-center gap-2 md:gap-4">
        <button
          className="cursor-pointer"
          onClick={() => onOpenChange(!openSidebar)}
          aria-label="Toggle sidebar"
        >
          <PanelRight size={18} />
        </button>

        <h1 className="font-bold text-lg">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3 md:gap-8">
        <Button size={width > 425 ? "md" : "sm"}>
          + Create new{" "}
          <span>
            <ChevronDown size={18} />
          </span>
        </Button>

        <NotificationsPopover />

        <AdminProfilePopover
          name="Admin"
          zone="Banani Zone"
          avatarSrc="/images/avatars/avatar.png"
          onProfileSettings={() => redirectProfile()}
          onLogout={() => console.log("logout")}
        />
      </div>
    </div>
  );
};

export default AdminNavbar;
