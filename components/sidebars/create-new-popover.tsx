// components/popovers/create-new-popover.tsx
"use client";

import Button from "@/components/buttons/button";
import { useScreenSize } from "@/hooks/useScreenSize";
import { currentUser, User } from "@/helpers/helpers";
import {
  ChevronDown,
  ShieldCheck,
  Headphones,
  UserCog,
  MapPin,
  Shapes,
} from "lucide-react";

type CreateItem = {
  name: string;
  Icon: React.ElementType;
  roles: User[]; // who can see this item
};

const ITEMS: CreateItem[] = [
  { name: "Admin", Icon: ShieldCheck, roles: ["superAdmin"] },
  { name: "Agent", Icon: Headphones, roles: ["admin", "superAdmin"] },
  { name: "Role", Icon: UserCog, roles: ["admin", "superAdmin"] },
  { name: "Location", Icon: MapPin, roles: ["admin", "superAdmin"] },
  { name: "Services", Icon: Shapes, roles: ["admin", "superAdmin"] },
];

export default function CreateNewPopover() {
  const width = useScreenSize();
  const user: User = currentUser;

  const visibleItems = ITEMS.filter((item) => item.roles.includes(user));

  return (
    <div className="relative group">
      {/* Trigger */}
      <Button size={width > 425 ? "md" : "sm"}>
        + Create new
        <ChevronDown size={18} />
      </Button>

      {/* Dropdown */}
      <div
        className={[
          "absolute right-0 mt-2 w-64 rounded-2xl bg-white",
          "border border-gray/15 shadow-xl",
          "opacity-0 invisible translate-y-2",
          "transition-all duration-200",
          "group-hover:opacity-100 group-hover:visible group-hover:translate-y-0",
          "z-50",
        ].join(" ")}
      >
        <ul className="py-2">
          {visibleItems.map(({ name, Icon }) => (
            <li key={name}>
              <button
                type="button"
                className={[
                  "w-full flex items-center gap-3 px-5 py-3",
                  "text-left hover:bg-gray/5 text-sm",
                  "transition-colors",
                ].join(" ")}
              >
                <Icon className="w-5 h-5 opacity-70" strokeWidth={1.5} />
                <span>{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
