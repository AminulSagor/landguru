import AgentServicesProvidedCard from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-services-provided-card";
import AgentVerificationDocsCard from "@/app/(dashboard)/admin/(pages)/roles/agent/_components/agent-verification-docs-card";
import { Agent } from "@/app/(dashboard)/admin/types/agent-list-type";

export default function AgentRightColumn({ agent }: { agent: Agent }) {
  return (
    <>
      <AgentServicesProvidedCard />
      <AgentVerificationDocsCard />
    </>
  );
}
