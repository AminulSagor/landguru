"use client";

import { useMemo, useState } from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import type { AgentOnboardFormState } from "@/app/(dashboard)/admin/types/agent-onboard-types";
import { serviceOptions } from "@/app/(dashboard)/admin/dummy-data/agent-onboard-data";
import AgentOnboardSidebar from "@/app/(dashboard)/admin/(pages)/onboard/agent/_components/agent-onboard-sidebar";
import AgentOnboardFormColumn from "@/app/(dashboard)/admin/(pages)/onboard/agent/_components/agent-onboard-form-column";
import AgentOnboardServicesColumn from "@/app/(dashboard)/admin/(pages)/onboard/agent/_components/agent-onboard-services-column";
import AgentOnboardVerification from "@/app/(dashboard)/admin/(pages)/onboard/agent/_components/agent-onboard-verification";
import AgentOnboardSuccessDialog from "@/app/(dashboard)/admin/(pages)/onboard/agent/_components/agent-onboard-success-dialog";

export default function AdminOnboardAgentPage() {
  const [successOpen, setSuccessOpen] = useState(false);

  const [state, setState] = useState<AgentOnboardFormState>({
    role: "Lawyer",
    personal: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      bankName: "",
      bankAccountNo: "",
      bankSwiftCode: "",
      bankRoutingNo: "",
    },
    location: {
      division: "",
      district: "",
      upazila: "",
      pourashavaOrUnion: "",
      wardNo: "",
      fullAddress: "",
    },
    services: {
      selectedServiceIds: [
        "ownership_history_validation",
        "pentagraph_map",
        "document_organization",
      ],
      feesByServiceId: {
        ownership_history_validation: "3000",
        pentagraph_map: "3000",
        document_organization: "3000",
      },
    },
    verification: {
      nidNumber: "",
      tinNumber: "",
    },
  });

  const selectedServices = useMemo(() => {
    const setIds = new Set(state.services.selectedServiceIds);
    return serviceOptions.filter((s) => setIds.has(s.id));
  }, [state.services.selectedServiceIds]);

  return (
    <div className="space-y-4">
      {/* breadcrumb header */}
      <Card>
        <div className="text-sm flex items-center gap-2">
          <span className="text-gray">Agent Workforce</span>
          <span className="text-gray">{">"}</span>
          <span className="text-black">Create New Agent</span>
        </div>
      </Card>

      {/* main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-14 gap-4">
        {/* left sidebar */}
        <div className="col-span-12 lg:col-span-3">
          <AgentOnboardSidebar
            role={state.role}
            onRoleChange={(role) => setState((p) => ({ ...p, role }))}
          />
        </div>
        <div className="col-span-14 lg:col-span-11 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* middle forms */}
            <div className="col-span-5 lg:col-span-3 space-y-4">
              <AgentOnboardFormColumn
                state={state}
                onChange={(next) => setState(next)}
              />
            </div>

            {/* right services */}
            <div className="col-span-5 lg:col-span-2 space-y-4">
              <AgentOnboardServicesColumn
                selectedServices={selectedServices}
                selectedIds={state.services.selectedServiceIds}
                feesById={state.services.feesByServiceId}
                onToggleService={(id) => {
                  setState((p) => {
                    const exists = p.services.selectedServiceIds.includes(id);
                    const nextIds = exists
                      ? p.services.selectedServiceIds.filter((x) => x !== id)
                      : [...p.services.selectedServiceIds, id];

                    const nextFees = { ...p.services.feesByServiceId };
                    if (!exists && nextFees[id] == null) nextFees[id] = "3000";
                    if (exists) delete nextFees[id];

                    return {
                      ...p,
                      services: {
                        ...p.services,
                        selectedServiceIds: nextIds,
                        feesByServiceId: nextFees,
                      },
                    };
                  });
                }}
                onFeeChange={(id, fee) => {
                  setState((p) => ({
                    ...p,
                    services: {
                      ...p.services,
                      feesByServiceId: {
                        ...p.services.feesByServiceId,
                        [id]: fee,
                      },
                    },
                  }));
                }}
              />
            </div>
          </div>
          {/* verification */}
          <AgentOnboardVerification
            verification={state.verification}
            onChange={(verification) =>
              setState((p) => ({ ...p, verification }))
            }
          />
        </div>
      </div>

      {/* footer actions */}
      <Card>
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="secondary"
            className="bg-white border border-gray/15 hover:bg-secondary"
          >
            Cancel
          </Button>

          <Button onClick={() => setSuccessOpen(true)}>
            Create Account &amp; Send Credentials
          </Button>
        </div>
      </Card>

      {/*dialog */}
      <AgentOnboardSuccessDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
      />
    </div>
  );
}
