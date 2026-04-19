import AgentServicesProvidedCard from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-services-provided-card";
import AgentVerificationDocsCard from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-verification-docs-card";
import type { AgentDetails } from "@/types/admin/agent-list/details/[id]/agent-details.types";

export default function AgentRightColumn({ agent }: { agent: AgentDetails }) {
  return (
    <>
      <AgentServicesProvidedCard agent={agent} />
      <AgentVerificationDocsCard agent={agent} />
    </>
  );
}