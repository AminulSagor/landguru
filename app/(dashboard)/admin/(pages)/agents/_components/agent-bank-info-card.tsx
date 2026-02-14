import Card from "@/components/cards/card";
import { Landmark } from "lucide-react";

export default function AgentBankInfoCard() {
  // Screenshot static
  const bankName = "DBBL";
  const accountNo = "123456789123";
  const swift = "DBBLBDDH";
  const routing = "123456789123";

  return (
    <Card>
      <div className="flex items-center gap-2">
        <Landmark size={18} className="text-primary" />
        <p className="font-semibold text-black">Bank Information</p>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs text-gray uppercase">Bank Name</p>
          <p className="text-sm text-black mt-1">{bankName}</p>

          <div className="mt-5">
            <p className="text-xs text-gray uppercase">Swift Code</p>
            <p className="text-sm text-black mt-1">{swift}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray uppercase">Bank Account No.</p>
          <p className="text-sm text-black mt-1">{accountNo}</p>

          <div className="mt-5">
            <p className="text-xs text-gray uppercase">Routing No.</p>
            <p className="text-sm text-black mt-1">{routing}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
