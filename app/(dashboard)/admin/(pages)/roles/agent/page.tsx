"use client";

import React from "react";
import AgentLists from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-lists";
import AgentSearchToolbar from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/search-tool-bars";
import Button from "@/components/buttons/button";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { agentSummaryService } from "@/service/admin/agent/agent-summary.service";
import type {
  AgentSortOrder,
  AgentType,
} from "@/types/admin/agent-list/agent-list.types";

const AgentListPage = () => {
  const router = useRouter();

  const [agentType, setAgentType] = React.useState<AgentType | "">("");
  const [sort, setSort] = React.useState<AgentSortOrder>("ASC");

  const { data: summaryResponse } = useQuery({
    queryKey: ["admin-agent-summary"],
    queryFn: () => agentSummaryService.getAdminAgentSummary(),
  });

  const totalAgents = summaryResponse?.data.totalAgents ?? 0;
  const activeAgents = summaryResponse?.data.activeAgents ?? 0;

  const handleAgentTypeChange = React.useCallback((value: AgentType | "") => {
    setAgentType(value);
  }, []);

  const handleSortChange = React.useCallback((value: AgentSortOrder) => {
    setSort(value);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-black text-2xl font-bold">Agent Workforce</h1>
          <p className="text-sm flex items-center gap-2 text-gray">
            <Users size={12} />
            <span className="border-r pr-2">Total Agents: {totalAgents}</span>
            <span className="text-green">Active: {activeAgents}</span>
          </p>
        </div>

        <Button onClick={() => router.push("/admin/onboard/agent")}>
          + Onboard New Agent
        </Button>
      </div>

      <AgentSearchToolbar
        agentType={agentType}
        sort={sort}
        onAgentTypeChange={handleAgentTypeChange}
        onSortChange={handleSortChange}
      />

      <AgentLists agentType={agentType} sort={sort} />
    </div>
  );
};

export default AgentListPage;