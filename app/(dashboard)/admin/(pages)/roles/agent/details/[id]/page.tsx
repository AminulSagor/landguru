import AgentDetailsHeader from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-details-header";
import AgentLeftColumn from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-left-column";
import AgentMiddleColumn from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-middle-column";
import AgentRightColumn from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-right-column";
import { agentDetailsService } from "@/service/admin/agent/details/[id]/agent-details.service";

interface Props {
  params: Promise<{ id: string }>;
}

const AgentDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const decodedId = decodeURIComponent(id ?? "");

  try {
    const agent = await agentDetailsService.getAdminAgentDetailsServer(
      decodedId,
    );

    return (
      <div>
        <AgentDetailsHeader agent={agent} />

        <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-14">
          <div className="col-span-12 space-y-4 lg:col-span-4">
            <AgentLeftColumn agent={agent} />
          </div>

          <div className="col-span-12 space-y-4 lg:col-span-6">
            <AgentMiddleColumn agent={agent} />
          </div>

          <div className="col-span-12 space-y-4 lg:col-span-4">
            <AgentRightColumn agent={agent} />
          </div>
        </div>
      </div>
    );
  } catch {
    return <div className="text-gray">Agent not found</div>;
  }
};

export default AgentDetailsPage;