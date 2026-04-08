import Card from "@/components/cards/card";
import { Landmark } from "lucide-react";
import type { AgentDetails } from "@/types/admin/agent-list/details/[id]/agent-details.types";

export default function AgentBankInfoCard({ agent }: { agent: AgentDetails }) {
  const bankInfo = agent?.bankInformation;

  return (
    <Card>
      <div className="flex items-center gap-2">
        <Landmark size={18} className="text-primary" />
        <p className="font-semibold text-black">Bank Information</p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase text-gray">Bank Name</p>
          <p className="mt-1 text-sm text-black">{bankInfo?.bankName ?? "-"}</p>

          <div className="mt-5">
            <p className="text-xs uppercase text-gray">Swift Code</p>
            <p className="mt-1 text-sm text-black">
              {bankInfo?.swiftCode ?? "-"}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase text-gray">Bank Account No.</p>
          <p className="mt-1 text-sm text-black">
            {bankInfo?.bankAccountNo ?? "-"}
          </p>

          <div className="mt-5">
            <p className="text-xs uppercase text-gray">Routing No.</p>
            <p className="mt-1 text-sm text-black">
              {bankInfo?.routingNo ?? "-"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}