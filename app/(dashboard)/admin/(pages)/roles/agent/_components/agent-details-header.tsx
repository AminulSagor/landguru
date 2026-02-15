import { Agent } from "@/app/(dashboard)/admin/types/agent-list-type";
import Button from "@/components/buttons/button";
import Card from "@/components/cards/card";
import { ArrowLeft, Pen } from "lucide-react";
import Link from "next/link";

export default function AgentDetailsHeader({ agent }: { agent: Agent }) {
  const displayName = agent?.profile?.name ?? "Agent";
  const profileId = agent?.profile?.profileId ?? "LAW-2026-0001";

  return (
    <Card>
      <div className="flex gap-4 md:items-center flex-col md:flex-row justify-between">
        <p className="text-sm flex gap-2 items-center">
          <Link href={"/admin/roles/agent"} className="text-gray hover:text-black">
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
