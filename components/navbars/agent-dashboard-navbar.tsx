"use client";
import { AGENT_LINKS } from "@/constants/navigation-links";
import { Bell, Sandwich } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import useNotifications from "@/hooks/useNotifications";
import { agentProfileService } from "@/service/agent/agent-profile.service";

const AgentDashbaordNavbar = () => {
  const route = usePathname();
  const [profileName, setProfileName] = React.useState("Agent");
  const [profilePhoto, setProfilePhoto] = React.useState("/images/avatars/avatar.png");
  const { unreadCount } = useNotifications({ page: 1, limit: 1 });

  React.useEffect(() => {
    let mounted = true;

    agentProfileService
      .getProfile()
      .then((p) => {
        if (!mounted) return;
        const name = p.fullName ?? p.personalDetails?.fullName ?? p.email ?? p.phone ?? "Agent";
        setProfileName(name);
        setProfilePhoto(p.photoUrl ?? "/images/avatars/avatar.png");
      })
      .catch((err) => {
        console.error("Failed to load agent profile", err);
      });

    return () => {
      mounted = false;
    };
  }, []);

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
        <Link href={"/agent/notifications"} className="relative">
          <Bell />
          {unreadCount > 0 ? (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-pumpkin text-white text-[10px] font-bold flex items-center justify-center px-1">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          ) : null}
        </Link>

        {/* profile */}
        <Link href={"/agent/profile"}>
          <div className="flex gap-2 items-center">
            <h1>{profileName}</h1>
            <Image
              src={profilePhoto}
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
