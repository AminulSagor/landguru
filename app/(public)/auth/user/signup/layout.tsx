import AuthFooter from "@/components/footers/auth-footer";
import AuthNavbar from "@/components/navbars/auth-navbar";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="px-3 md:px-8 lg:px-14 2xl:px-24 bg-[#F8F9FA]">
        <AuthNavbar />
        <div className="min-h-[86vh] flex items-center justify-center">
          {children}
        </div>
      </div>
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;
