import { Agent } from "@/app/(dashboard)/admin/types/agent-list-type";
import Card from "@/components/cards/card";
import { User, Phone, Mail } from "lucide-react";

export default function AgentPersonalInfoCard({ agent }: { agent: Agent }) {
  const fullName = agent?.profile?.name ?? "User Name";

  // Your agent has contact (phone-like) but screenshot uses full phone + email
  const phone = agent?.contact ?? "+8801700000000";
  const email = "username@email.com"; // screenshot static

  return (
    <Card>
      <div className="flex items-center gap-2">
        <User size={18} className="text-primary" />
        <p className="font-semibold text-black">Personal Information</p>
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray uppercase">Full Name</p>
        <p className="text-sm text-black mt-1">{fullName}</p>
        <div className="h-px bg-gray/10 mt-3" />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray uppercase">Phone Number</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-black">
            <Phone size={16} className="text-gray" />
            <span>{phone}</span>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray uppercase">Email Address</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-black">
            <Mail size={16} className="text-gray" />
            <span>{email}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
