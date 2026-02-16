"use client";
import UserMobileDrawer from "@/components/sidebars/user-sidebar";
import { USER_LINKS } from "@/constants/navigation-links";
import { Bell, Sandwich } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";

const UserDashbaordNavbar = () => {
  const route = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="py-4 flex lg:py-0 items-center justify-between bg-white responsive-padding shadow-md border-b border-gray/20 fixed w-full z-50">
      <div className="flex gap-12">
        <div className="flex items-center gap-2">
          <span className="bg-primary rounded-lg text-white p-2 px-3">
            <Sandwich size={18} />
          </span>
          <h1 className="font-bold text-base">LandGuru</h1>
        </div>

        {/* navlinks */}
        <ul className="gap-4 lg:gap-8 items-center text-base text-gray hidden md:flex">
          {USER_LINKS.map((path) => {
            const isActive = path.link === route;
            return (
              <li
                className={`${isActive && "border-b-2 border-primary"} py-4`}
                key={path.name}
              >
                <Link href={path.link}>{path.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* setting area */}
      <div className="items-center gap-3 text-base hidden md:flex">
        <Link href={"/user/notifications"}>
          <Bell />
        </Link>

        {/* profile */}
        <Link href={"/user/profile"}>
          <div className="flex gap-2 items-center">
            <h1>John Doe</h1>
            <Image
              src={"/images/avatars/avatar.png"}
              height={28}
              width={28}
              className="rounded-full h-8 w-8 object-cover"
              alt="Profile-image"
            />
          </div>
        </Link>
      </div>

      {/* mobile view */}
      <button
        onClick={() => setOpen(true)}
        className="border p-1 rounded-md border-gray/20 cursor-pointer md:hidden"
      >
        <FaBarsStaggered size={18} />
      </button>

      <UserMobileDrawer open={open} onOpenChange={setOpen} />
    </nav>
  );
};

export default UserDashbaordNavbar;
