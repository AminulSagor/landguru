import UserDashbaordFooter from "@/components/footers/user-dashboard-footer";
import UserDashbaordNavbar from "@/components/navbars/user-dashbaord-navbar";
import React from "react";

const UserDashbaordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <UserDashbaordNavbar />
      <div className="min-h-screen px-3 md:px-8 lg:px-14 2xl:px-24 bg-[#F8F9FA]">
        {children}
      </div>
      <UserDashbaordFooter />
    </div>
  );
};

export default UserDashbaordLayout;
