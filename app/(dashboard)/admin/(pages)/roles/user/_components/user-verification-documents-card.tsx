import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { FileText, ShieldCheck } from "lucide-react";

export default function UserVerificationDocumentsCard() {
  // screenshot static
  const docs = [
    { title: "National ID (NID)", meta: "ID: 89***321", icon: ShieldCheck },
    { title: "TIN Certificate", meta: "Tax ID: 44***99", icon: FileText },
  ];

  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-black">Verification Documents</p>
        <span className="px-3 py-1 rounded-full text-xs bg-[#fff7ed] text-[#c2410c]">
          Pending
        </span>
      </div>

      <div className="h-px bg-gray/10 mt-4" />

      <div className="mt-4 space-y-3">
        {docs.map((d) => {
          const Icon = d.icon;
          return (
            <div
              key={d.title}
              className="rounded-lg border border-gray/10 bg-white px-4 py-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">{d.title}</p>
                  <p className="text-xs text-gray mt-1">{d.meta}</p>
                </div>
              </div>

              <Button size="base">Approve</Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
