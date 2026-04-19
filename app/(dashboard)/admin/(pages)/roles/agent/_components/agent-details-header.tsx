import type { AgentDetails } from "@/types/admin/agent-list/details/[id]/agent-details.types";
import Button from "@/components/buttons/button";
import Card from "@/components/cards/card";
import { ArrowLeft, Pen } from "lucide-react";
import Link from "next/link";

export default function AgentDetailsHeader({
  agent,
}: {
  agent: AgentDetails;
}) {
  const displayName = agent?.profileHeader?.name ?? "Agent";
  const profileId = agent?.profileHeader?.id ?? "-";

  return (
    <Card>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <p className="flex items-center gap-2 text-sm">
          <Link
            href={"/admin/roles/agent"}
            className="text-gray hover:text-black"
          >
            <ArrowLeft size={18} />
          </Link>

          <span className="text-gray">Agent Workforce</span>
          <span className="text-gray">{">"}</span>
          <span className="text-black">
            {displayName} ({profileId})
          </span>
        </p>

        <Button variant="secondary" className="bg-secondary text-primary">
          <Pen size={18} /> Edit Agent
        </Button>
      </div>
    </Card>
  );
}