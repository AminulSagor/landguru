import Card from "@/components/cards/card";
import { MapPin } from "lucide-react";
import type { AgentDetails } from "@/types/admin/agent-list/details/[id]/agent-details.types";

export default function AgentAssignedLocationCard({
  agent,
}: {
  agent: AgentDetails;
}) {
  const location = agent?.assignedLocation;

  return (
    <Card>
      <div className="flex items-center gap-2">
        <MapPin size={18} className="text-primary" />
        <p className="font-semibold text-black">Assigned Location</p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Division" value={location?.division ?? "-"} />
        <Field label="District" value={location?.district ?? "-"} />
        <Field label="Upazila" value={location?.upazila ?? "-"} />
        <Field
          label="Pourashava/City Corp/Union"
          value={location?.unionOrCityCorp ?? "-"}
        />
        <Field label="Ward No" value={location?.wardNo ?? "-"} />
        <Field label="Postal Code" value={location?.postalCode ?? "-"} />
      </div>

      <div className="mt-4">
        <p className="text-xs uppercase text-gray">Full Address</p>
        <div className="mt-2 rounded-lg border border-gray/10 bg-secondary px-4 py-3">
          <p className="whitespace-pre-line text-sm text-black">
            {location?.fullAddress ?? "-"}
          </p>
        </div>
      </div>
    </Card>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase text-gray">{label}</p>
      <div className="mt-2 rounded-lg border border-gray/10 bg-secondary/30 px-4 py-3">
        <p className="text-sm text-black">{value}</p>
      </div>
    </div>
  );
}