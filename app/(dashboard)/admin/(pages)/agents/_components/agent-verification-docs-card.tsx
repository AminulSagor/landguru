import Card from "@/components/cards/card";
import { BadgeCheck, FileText, ShieldCheck } from "lucide-react";

const docs = [
  {
    title: "National ID (NID)",
    meta: "ID: 89***321",
    verified: true,
    icon: ShieldCheck,
  },
  {
    title: "TIN Certificate",
    meta: "Tax ID: 44***99",
    verified: true,
    icon: FileText,
  },
];

export default function AgentVerificationDocsCard() {
  return (
    <Card>
      <div className="flex items-center gap-2">
        <BadgeCheck size={18} className="text-primary" />
        <p className="font-semibold text-black">Verification Documents</p>
      </div>

      <div className="mt-4 space-y-3">
        {docs.map((d) => {
          const Icon = d.icon;
          return (
            <div
              key={d.title}
              className="rounded-lg border border-gray/10 bg-white px-4 py-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                  <Icon size={18} className="text-primary" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-black">{d.title}</p>
                  <p className="text-xs text-gray mt-1">{d.meta}</p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs bg-green/10 text-green font-semibold">
                Verified
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-lg bg-secondary px-4 py-3">
        <p className="text-xs text-gray">
          <span className="text-primary font-semibold">Note:</span> These
          documents were manually verified by admin on Jan 15, 2023.
        </p>
      </div>
    </Card>
  );
}
