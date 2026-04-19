import Card from "@/components/cards/card";
import { Wrench } from "lucide-react";
import type { AgentDetails } from "@/types/admin/agent-list/details/[id]/agent-details.types";

const formatFee = (value?: number) => {
  if (value === null || value === undefined) {
    return "-";
  }

  return `৳ ${value.toLocaleString("en-BD")}`;
};

export default function AgentServicesProvidedCard({
  agent,
}: {
  agent: AgentDetails;
}) {
  const services = agent?.servicesProvided ?? [];

  return (
    <Card>
      <div className="flex items-center gap-2">
        <Wrench size={18} className="text-primary" />
        <p className="font-semibold text-black">Services Provided</p>
      </div>

      <div className="mt-4 space-y-3">
        {services.length > 0 ? (
          services.map((serviceItem, index) => (
            <div
              key={`${serviceItem.name}-${index}`}
              className="flex items-center justify-between rounded-lg border border-gray/10 bg-secondary px-4 py-3"
            >
              <p className="text-sm text-black">{serviceItem.name}</p>
              <p className="text-sm font-semibold text-primary">
                {formatFee(serviceItem.fee)}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-gray/10 bg-secondary px-4 py-3 text-sm text-gray">
            No services available
          </div>
        )}
      </div>
    </Card>
  );
}