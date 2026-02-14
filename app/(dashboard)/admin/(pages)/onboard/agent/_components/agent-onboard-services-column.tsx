import Card from "@/components/cards/card";
import type { AgentServiceOption } from "@/app/(dashboard)/admin/types/agent-onboard-types";
import { serviceOptions } from "@/app/(dashboard)/admin/dummy-data/agent-onboard-data";
import { Check } from "lucide-react";
import {
  FileCheck,
  PencilRuler,
  Map,
  Folder,
  PenTool,
  RefreshCcw,
  Users,
  AlertTriangle,
  Gavel,
} from "lucide-react";

const serviceIcon: Record<string, React.ReactNode> = {
  ownership_history_validation: <FileCheck size={16} />,
  physical_estimate: <PencilRuler size={16} />,
  pentagraph_map: <Map size={16} />,
  document_organization: <Folder size={16} />,
  deed_writing: <PenTool size={16} />,
  namjari_update: <RefreshCcw size={16} />,
  inheritance_dispute: <Users size={16} />,
  risk_analysis: <AlertTriangle size={16} />,
  court_case: <Gavel size={16} />,
};

export default function AgentOnboardServicesColumn({
  selectedServices,
  selectedIds,
  feesById,
  onToggleService,
  onFeeChange,
}: {
  selectedServices: AgentServiceOption[];
  selectedIds: string[];
  feesById: Record<string, string>;
  onToggleService: (id: string) => void;
  onFeeChange: (id: string, fee: string) => void;
}) {
  return (
    <>
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded-full bg-secondary border border-gray/10 flex items-center justify-center text-xs text-primary font-semibold">
              3
            </span>
            <p className="text-sm font-semibold text-black">Services Offered</p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs bg-secondary text-primary border border-gray/10">
            {selectedIds.length} Selected
          </span>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-3">
          {serviceOptions.map((s) => {
            const active = selectedIds.includes(s.id);

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onToggleService(s.id)}
                className={`rounded-lg border px-3 py-3 text-left relative
          ${active ? "border-primary bg-secondary/70 border-2" : "border-gray/15 bg-white hover:bg-secondary"}`}
              >
                <div
                  className={`mb-2 ${active ? "text-primary" : "text-gray"}`}
                >
                  {serviceIcon[s.id]}
                </div>

                <p className="text-xs font-medium text-black">{s.title}</p>

                <div
                  className={`absolute top-3 right-3 h-5 w-5 rounded-full border flex items-center justify-center
            ${active ? "border-primary bg-primary" : "border-gray/20 bg-white"}`}
                >
                  {active ? <Check size={14} className="text-white" /> : null}
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 rounded-full bg-secondary border border-gray/10 flex items-center justify-center text-xs text-primary font-semibold">
            4
          </span>
          <p className="text-sm font-semibold text-black">Service Fees Setup</p>
        </div>

        <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-3">
          {selectedServices.map((s) => (
            <div
              key={s.id}
              className="rounded-lg bg-secondary/50 border border-gray/10 px-3 py-3"
            >
              <p className="text-xs font-semibold text-black">{s.title}</p>
              <div className="mt-2 flex items-center gap-2 rounded-lg bg-white border border-gray/15 px-3 h-10">
                <span className="text-gray text-sm">৳</span>
                <input
                  value={feesById[s.id] ?? ""}
                  onChange={(e) => onFeeChange(s.id, e.target.value)}
                  className="w-full outline-none text-sm text-black"
                  placeholder="3000"
                />
              </div>
            </div>
          ))}

          {/* show empty boxes like screenshot */}
          {Array.from({ length: Math.max(0, 6 - selectedServices.length) }).map(
            (_, i) => (
              <div
                key={`empty-${i}`}
                className="rounded-lg border border-dashed border-gray/20 bg-white px-3 py-8 text-center"
              >
                <p className="text-xs text-gray">Empty</p>
              </div>
            ),
          )}
        </div>
      </Card>
    </>
  );
}
