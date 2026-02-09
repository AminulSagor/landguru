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
import { SidebarItems } from "@/app/(admin)/admin/types/sidebar-types";

export const adminSideBarItems: SidebarItems[] = [
  {
    name: "Dashboard",
    url: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    name: "Property Posts",
    url: "/admin/dashboard/property-posts",
    icon: <FileText />,
  },
  {
    name: "Quote / Request",
    url: "/admin/dashboard/quote-requote",
    icon: <FileSignature />,
  },
  {
    name: "Buy Requests",
    url: "/admin/dashboard/buy-requests",
    icon: <ShoppingCart />,
  },
  {
    name: "Service Requests",
    url: "/admin/dashboard/service-requests",
    icon: <Wrench />,
  },
  {
    name: "Appointments",
    url: "/admin/dashboard/appointments",
    icon: <Calendar />,
  },
  {
    name: "Agent List",
    url: "/admin/dashboard/agents",
    icon: <Users />,
  },
  {
    name: "User Management",
    url: "/admin/dashboard/users",
    icon: <UserCog />,
  },
  {
    name: "Reset Requests",
    url: "/admin/dashboard/reset-requests",
    icon: <RotateCcw />,
  },
];

export const SuperAdminSideBarItems: SidebarItems[] = [
  /* -------- main -------- */
  {
    name: "Dashboard",
    url: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    name: "Property Posts",
    url: "/admin/dashboard/property-posts",
    icon: <FileText />,
  },
  {
    name: "Quote / Requote",
    url: "/admin/dashboard/quote-requote",
    icon: <Repeat />,
  },
  {
    name: "Buy Requests",
    url: "/admin/dashboard/buy-requests",
    icon: <ShoppingCart />,
  },
  {
    name: "Service Requests",
    url: "/admin/dashboard/service-requests",
    icon: <Wrench />,
  },
  {
    name: "Appointments",
    url: "/admin/dashboard/appointments",
    icon: <Calendar />,
  },

  /* -------- people -------- */
  {
    name: "Admin List",
    url: "/admin/dashboard/admins",
    icon: <ShieldCheck />,
  },
  {
    name: "Agent List",
    url: "/admin/dashboard/agents",
    icon: <Users />,
  },
  {
    name: "User Mgmt",
    url: "/admin/dashboard/users",
    icon: <UserCog />,
  },

  /* -------- requests -------- */
  {
    name: "Admin Resets",
    url: "/admin/dashboard/reset-requests/admin",
    icon: <RotateCcw />,
  },
  {
    name: "Agent Resets",
    url: "/admin/dashboard/reset-requests/agent",
    icon: <UserX />,
  },

  /* -------- manage options -------- */
  {
    name: "Services",
    url: "/admin/dashboard/options/services",
  },
  {
    name: "Locations",
    url: "/admin/dashboard/options/locations",
  },
  {
    name: "Agent Roles",
    url: "/admin/dashboard/options/agent-roles",
  },
  {
    name: "Land Types",
    url: "/admin/dashboard/options/land-types",
  },
];
