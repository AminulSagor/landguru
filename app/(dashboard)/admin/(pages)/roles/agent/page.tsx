"use client";
import AgentLists from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-lists";
import AgentSearchToolbar from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/search-tool-bars";
import Button from "@/components/buttons/button";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";

const AgentListPage = () => {
  const router = useRouter();
  return (
    <div className="space-y-6">
      {/* head */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-black text-2xl font-bold">Agent Workforce</h1>
          <p className="text-sm flex items-center gap-2 text-gray">
            <Users size={12} />{" "}
            <span className="border-r pr-2">Total Agents: 12</span>{" "}
            <span className="text-green">Active: 8</span>
          </p>
        </div>
        <Button onClick={() => router.push('/admin/onboard/agent')}>+ Onboard New Agent</Button>
      </div>

      {/* search */}
      <AgentSearchToolbar />

      {/* agent list */}
      <AgentLists />
    </div>
  );
};

export default AgentListPage;
