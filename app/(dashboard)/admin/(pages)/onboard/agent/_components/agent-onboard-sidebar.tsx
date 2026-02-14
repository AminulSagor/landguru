import Card from "@/components/cards/card";
import type { AgentRole } from "@/app/(dashboard)/admin/types/agent-onboard-types";
import { agentRoles } from "@/app/(dashboard)/admin/dummy-data/agent-onboard-data";
import { Camera, Scale, Ruler, PenTool, MapPin } from "lucide-react";

const roleIcon: Record<AgentRole, React.ReactNode> = {
  Lawyer: <Scale size={18} className="text-primary" />,
  Surveyor: <Ruler size={18} className="text-primary" />,
  "Deed Writer": <PenTool size={18} className="text-primary" />,
  "Field Assistant": <MapPin size={18} className="text-primary" />,
};

export default function AgentOnboardSidebar({
  role,
  onRoleChange,
}: {
  role: AgentRole;
  onRoleChange: (role: AgentRole) => void;
}) {
  return (
    <div className="space-y-4">
      {/* profile picture */}
      <Card>
        <div className="flex flex-col items-center text-center">
          <div className="h-20 w-20 rounded-full bg-secondary border border-gray/10 flex items-center justify-center relative">
            <Camera size={20} className="text-gray" />
            <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center border-2 border-white">
              <Camera size={14} className="text-white" />
            </div>
          </div>

          <p className="mt-3 text-sm font-semibold text-black">
            Profile Picture
          </p>
          <p className="text-xs text-gray mt-1">
            Clear front face photo recommended
          </p>
        </div>
      </Card>

      {/* role selection */}
      <div>
        <p className="text-sm font-semibold text-black">Select Role</p>
        <p className="text-xs text-gray mt-1">
          Primary function for this new agent.
        </p>

        <div className="mt-4 space-y-4">
          {agentRoles.map((r) => {
            const active = r === role;

            return (
              <button
                key={r}
                type="button"
                onClick={() => onRoleChange(r)}
                className={`w-full rounded-xl border px-4 py-4 flex items-center justify-between text-left transition
                  ${
                    active
                      ? "border-primary border-2 bg-[#EFF6FF]"
                      : "border-gray/15 bg-white hover:bg-secondary"
                  }`}
              >
                <div className="flex  flex-col gap-4">
                  {/* icon box like ss */}
                  <div className="h-10 w-10 rounded-xl bg-[#DBEAFE] flex items-center justify-center">
                    {roleIcon[r]}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-black">{r}</p>
                  </div>
                </div>

                {/* radio circle (always visible) */}
                <div
                  className={`h-5 w-5 rounded-full border flex items-center justify-center
                    ${active ? "border-primary" : "border-gray/20"}`}
                >
                  {active ? (
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
