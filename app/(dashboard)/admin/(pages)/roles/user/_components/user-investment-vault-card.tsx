import Card from "@/components/cards/card";
import { FileText } from "lucide-react";

export default function UserInvestmentVaultCard() {
  // screenshot static
  const file = { name: "Invest Doc.pdf", meta: "ID: 89***321" };
  const amount = "৳ 4,000";

  return (
    <Card>
      <p className="font-semibold text-black">Investment Vault</p>
      <div className="h-px bg-gray/10 mt-4" />

      <div className="mt-4 rounded-lg border border-gray/10 bg-white px-4 py-3 flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-secondary/30 flex items-center justify-center">
          <FileText size={18} className="text-primary" />
        </div>

        <div>
          <p className="text-sm font-semibold text-black">{file.name}</p>
          <p className="text-xs text-gray mt-1">{file.meta}</p>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs text-gray uppercase">Investment Amount</p>
        <div className="mt-2 rounded-lg border border-gray/10 bg-secondary/30 px-4 py-3">
          <p className="text-sm text-black">{amount}</p>
        </div>
      </div>
    </Card>
  );
}
