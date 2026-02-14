import Card from "@/components/cards/card";
import Image from "next/image";
import { Check } from "lucide-react";
import { Agent } from "@/app/(dashboard)/admin/types/agent-list-type";

export default function AgentProfileCard({ agent }: { agent: Agent }) {
  const name = agent?.profile?.name ?? "Adv. Sahil";
  const profileId = agent?.profile?.profileId ?? "LAW-2026-0001";
  const img = agent?.profile?.image ?? "/images/avatars/avatar.png";

  // Screenshot static (not in your agent object)
  const joined = "Jan 12, 2026";
  const roleChip = "LAWYER";
  const nidChip = "NID Verified";

  const statusText = agent?.status === "on" ? "Active" : "Inactive";

  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="h-22 w-22 rounded-full overflow-hidden border border-gray/15">
            <Image
              src={img}
              alt={name}
              width={88}
              height={88}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute bottom-1 right-1 h-6 w-6 rounded-full bg-green flex items-center justify-center border-2 border-white">
            <Check size={14} className="text-white" />
          </div>
        </div>

        <div className="mt-3">
          <p className="text-lg font-semibold text-black">{name}</p>
          <p className="text-sm text-gray mt-1">ID: {profileId}</p>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs bg-secondary text-primary">
            {roleChip}
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-secondary text-green flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green" />
            {nidChip}
          </span>
        </div>

        <div className="w-full mt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray">Status</span>
            <span className="text-green font-semibold">{statusText}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-gray">Joined</span>
            <span className="text-black font-medium">{joined}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
