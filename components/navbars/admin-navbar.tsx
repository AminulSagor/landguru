import NotificationsPopover from "@/app/(dashboard)/admin/(pages)/dashboard/_components/notifications-popover";
import AdminProfilePopover from "@/app/(dashboard)/admin/(pages)/dashboard/_components/profile-popover";
import CreateNewPopover from "@/components/sidebars/create-new-popover";
import { PanelRight } from "lucide-react";
import { redirect } from "next/navigation";

type Props = {
  openSidebar: boolean;
  onOpenChange: (v: boolean) => void;
};

const AdminNavbar = ({ onOpenChange, openSidebar }: Props) => {
  const redirectProfile = () => {
    redirect("/admin/profile");
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
        <CreateNewPopover />

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
