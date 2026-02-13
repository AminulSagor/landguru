"use client";
import { AGENT_LINKS } from "@/constants/navigation-links";
import { Bell, Sandwich } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AgentDashbaordNavbar = () => {
  const route = usePathname();

  return (
    <nav className="flex py-4 lg:py-0 items-center justify-between bg-white responsive-padding shadow-md border-b border-gray/20 fixed w-full z-50">
      <div className="flex gap-12">
        <div className="flex items-center gap-2">
          <span className="bg-primary rounded-lg text-white p-2 px-3">
            <Sandwich size={18} />
          </span>
          <h1 className="font-bold text-base">LandGuru</h1>
        </div>

        {/* navlinks */}
        <ul className="gap-4 lg:gap-8  items-center text-base text-gray hidden md:flex">
          {AGENT_LINKS.map((path) => {
            const isActive = path.link === route;
            return (
              <li
                className={`${isActive && "border-b-2 border-primary "} py-4`}
                key={path.name}
              >
                <Link href={path.link}>{path.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* setting area */}
      <div className="flex items-center gap-3 text-base">
        <Link href={"/agent/notifications"}>
          <Bell />
        </Link>

        {/* profile */}
        <Link href={"/agent/profile"}>
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
    </nav>
  );
};

export default AgentDashbaordNavbar;
