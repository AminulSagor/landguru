"use client";

import AdminNavbar from "@/components/navbars/admin-navbar";
import AdminSidebar from "@/components/sidebars/admin-sidebar";
import React, { useState } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <div className="h-screen flex overflow-hidden relative">
      <AdminSidebar openSidebar={openSidebar} onOpenChange={setOpenSidebar} />

      <div className="flex flex-col flex-1 min-w-0">
        <AdminNavbar openSidebar={openSidebar} onOpenChange={setOpenSidebar} />

        <div className="flex-1 bg-[#F8F9FA] p-2 md:p-4 2xl:px-8 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
