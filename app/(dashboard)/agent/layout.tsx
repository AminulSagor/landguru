import UserDashbaordFooter from "@/components/footers/footer";
import AgentDashbaordNavbar from "@/components/navbars/agent-dashboard-navbar";
import React from "react";

const AgentDashbaordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AgentDashbaordNavbar />
      <div className="min-h-screen responsive-padding bg-[#F8F9FA] py-24">
        {children}
      </div>
      <UserDashbaordFooter />
    </>
  );
};

export default AgentDashbaordLayout;
