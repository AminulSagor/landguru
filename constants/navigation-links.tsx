// constants/navigation-links.ts
import {
  LayoutDashboard,
  FileText,
  FileSignature,
  ShoppingCart,
  Wrench,
  Calendar,
  Users,
  UserCog,
  RotateCcw,
  Repeat,
  ShieldCheck,
  UserX,
} from "lucide-react";
import { JSX } from "react";

export type NavLink = {
  name: string;
  link: string;
};

export type SidebarLink = NavLink & {
  icon?: JSX.Element;
};

// User Dashboard Links
export const USER_LINKS: NavLink[] = [
  {
    name: "Home",
    link: "/user/dashboard",
  },
  {
    name: "Properties",
    link: "/user/properties",
  },
  {
    name: "Appointments",
    link: "/user/appointments",
  },
  {
    name: "My Deals",
    link: "/user/my-deals",
  },
];

// Agent Dashboard Links
export const AGENT_LINKS: NavLink[] = [
  {
    name: "Home",
    link: "/agent/dashboard",
  },
  {
    name: "My Task",
    link: "/agent/tasks",
  },
  {
    name: "Appointments",
    link: "/agent/appointment",
  },
];

// Admin Dashboard Links
export const ADMIN_LINKS: SidebarLink[] = [
  {
    name: "Dashboard",
    link: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    name: "Property Posts",
    link: "/admin/property-posts",
    icon: <FileText size={12} />,
  },
  {
    name: "Quote / Request",
    link: "/admin/quote-requote",
    icon: <FileSignature />,
  },
  {
    name: "Buy Requests",
    link: "/admin/buy-requests",
    icon: <ShoppingCart />,
  },
  {
    name: "Service Requests",
    link: "/admin/service-requests",
    icon: <Wrench />,
  },
  {
    name: "Appointments",
    link: "/admin/appointments",
    icon: <Calendar />,
  },
  {
    name: "Agent List",
    link: "/admin/agents",
    icon: <Users />,
  },
  {
    name: "User Management",
    link: "/admin/users",
    icon: <UserCog />,
  },
  {
    name: "Reset Requests",
    link: "/admin/reset-requests",
    icon: <RotateCcw />,
  },
];

// Super Admin Dashboard Links (with sections)
export type SectionedSidebarLink = {
  section?: string;
  items: SidebarLink[];
};

export const SUPER_ADMIN_LINKS: SectionedSidebarLink[] = [
  {
    section: "Main",
    items: [
      {
        name: "Dashboard",
        link: "/admin/dashboard",
        icon: <LayoutDashboard />,
      },
      {
        name: "Property Posts",
        link: "/admin/property-posts",
        icon: <FileText />,
      },
      {
        name: "Quote / Requote",
        link: "/admin/quote-requote",
        icon: <Repeat />,
      },
      {
        name: "Buy Requests",
        link: "/admin/buy-requests",
        icon: <ShoppingCart />,
      },
      {
        name: "Service Requests",
        link: "/admin/service-requests",
        icon: <Wrench />,
      },
      {
        name: "Appointments",
        link: "/admin/appointments",
        icon: <Calendar />,
      },
    ],
  },
  {
    section: "People",
    items: [
      {
        name: "Admin List",
        link: "/admin/admins",
        icon: <ShieldCheck />,
      },
      {
        name: "Agent List",
        link: "/admin/agents",
        icon: <Users />,
      },
      {
        name: "User Mgmt",
        link: "/admin/users",
        icon: <UserCog />,
      },
    ],
  },
  {
    section: "Requests",
    items: [
      {
        name: "Admin Resets",
        link: "/admin/reset-requests/admin",
        icon: <RotateCcw />,
      },
      {
        name: "Agent Resets",
        link: "/admin/reset-requests/agent",
        icon: <UserX />,
      },
    ],
  },
  {
    section: "Manage Options",
    items: [
      {
        name: "Services",
        link: "/admin/options/services",
        // No icon for these
      },
      {
        name: "Locations",
        link: "/admin/options/locations",
      },
      {
        name: "Agent Roles",
        link: "/admin/options/agent-roles",
      },
      {
        name: "Land Types",
        link: "/admin/options/land-types",
      },
    ],
  },
];
