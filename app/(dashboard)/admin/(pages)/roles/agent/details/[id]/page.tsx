
import AgentDetailsHeader from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-details-header";
import AgentLeftColumn from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-left-column";
import AgentMiddleColumn from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-middle-column";
import AgentRightColumn from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-right-column";
import { Agents } from "@/app/(dashboard)/admin/dummy-data/agent-list-data";

interface Props {
  params: { id: string };
}

const AgentDetails = async ({ params }: Props) => {
  const param = await params;

  const agent = Agents.find((a) => a.id === param.id);

  if (!agent) {
    return <div className="text-gray">Agent not found</div>;
  }

  return (
    <div>
      {/* head */}
      <AgentDetailsHeader agent={agent} />

      {/* details */}
      <div className="grid grid-cols-1 lg:grid-cols-14 gap-4 mt-7">
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <AgentLeftColumn agent={agent} />
        </div>

        <div className="col-span-12 lg:col-span-6 space-y-4">
          <AgentMiddleColumn agent={agent} />
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-4">
          <AgentRightColumn agent={agent} />
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
