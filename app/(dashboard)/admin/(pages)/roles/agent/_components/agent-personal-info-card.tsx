import type { AgentDetails } from "@/types/admin/agent-list/details/[id]/agent-details.types";
import Card from "@/components/cards/card";
import { User, Phone, Mail } from "lucide-react";

export default function AgentPersonalInfoCard({
  agent,
}: {
  agent: AgentDetails;
}) {
  const fullName = agent?.personalInformation?.fullName ?? "-";
  const phone = agent?.personalInformation?.phone ?? "-";
  const email = agent?.personalInformation?.email ?? "-";

  return (
    <Card>
      <div className="flex items-center gap-2">
        <User size={18} className="text-primary" />
        <p className="font-semibold text-black">Personal Information</p>
      </div>

      <div className="mt-4">
        <p className="text-xs uppercase text-gray">Full Name</p>
        <p className="mt-1 text-sm text-black">{fullName}</p>
        <div className="mt-3 h-px bg-gray/10" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase text-gray">Phone Number</p>
          <div className="mt-2 flex items-center gap-2 text-sm text-black">
            <Phone size={16} className="text-gray" />
            <span>{phone}</span>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase text-gray">Email Address</p>
          <div className="mt-2 flex items-center gap-2 text-sm text-black">
            <Mail size={16} className="text-gray" />
            <span>{email}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}