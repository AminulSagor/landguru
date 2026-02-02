import UserDashbaordFooter from "@/components/footers/footer";
import UserDashbaordNavbar from "@/components/navbars/user-dashbaord-navbar";
import React from "react";

const UserDashbaordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <UserDashbaordNavbar />
      <div className="min-h-screen responsive-padding bg-[#F8F9FA]">
        {children}
      </div>
      <UserDashbaordFooter />
    </>
  );
};

export default UserDashbaordLayout;
