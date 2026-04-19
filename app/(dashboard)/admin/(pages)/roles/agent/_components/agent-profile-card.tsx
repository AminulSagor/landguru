import Card from "@/components/cards/card";
import Image from "next/image";
import { Check, ImageOff } from "lucide-react";
import type { AgentDetails } from "@/types/admin/agent-list/details/[id]/agent-details.types";

const formatRoleLabel = (role?: string) => {
  if (!role) return "-";

  return role
    .split("_")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
    .join(" ");
};

const formatDate = (value?: string | null) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const getInitials = (name?: string) => {
  if (!name?.trim()) return "A";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((item) => item.charAt(0).toUpperCase())
    .join("");
};

export default function AgentProfileCard({ agent }: { agent: AgentDetails }) {
  const name = agent?.profileHeader?.name ?? "Agent";
  const profileId = agent?.profileHeader?.id ?? "-";
  const img = agent?.profileHeader?.photoUrl?.trim() ?? "";
  const roleChip = formatRoleLabel(agent?.profileHeader?.agentType);
  const statusText = agent?.profileHeader?.isActive ? "Active" : "Inactive";
  const joinedText = formatDate(agent?.profileHeader?.joinedDate);

  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="flex h-22 w-22 items-center justify-center overflow-hidden rounded-full border border-gray/15 bg-gray-100">
            {img ? (
              <Image
                src={img}
                alt={name}
                width={88}
                height={88}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
                <ImageOff size={18} />
                <span className="mt-1 text-xs font-medium">
                  {getInitials(name)}
                </span>
              </div>
            )}
          </div>

          {agent?.profileHeader?.isNidVerified ? (
            <div className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green">
              <Check size={14} className="text-white" />
            </div>
          ) : null}
        </div>

        <div className="mt-3">
          <p className="text-lg font-semibold text-black">{name}</p>
          <p className="mt-1 text-sm text-gray">ID: {profileId}</p>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs text-primary">
            {roleChip}
          </span>

          {agent?.profileHeader?.isNidVerified ? (
            <span className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-green">
              <span className="h-2 w-2 rounded-full bg-green" />
              NID Verified
            </span>
          ) : null}
        </div>

        <div className="mt-5 w-full">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray">Status</span>
            <span
              className={`font-semibold ${
                agent?.profileHeader?.isActive ? "text-green" : "text-red-500"
              }`}
            >
              {statusText}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-gray">Joined</span>
            <span className="font-medium text-black">{joinedText}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}