import Card from "@/components/cards/card";
import { BadgeCheck, FileText, ShieldCheck } from "lucide-react";
import type { AgentDetails } from "@/types/admin/agent-list/details/[id]/agent-details.types";

const maskValue = (value?: string | null) => {
  if (!value) return "-";

  if (value.length <= 4) {
    return value;
  }

  const visiblePart = value.slice(-4);
  return `${"*".repeat(Math.max(value.length - 4, 0))}${visiblePart}`;
};

export default function AgentVerificationDocsCard({
  agent,
}: {
  agent: AgentDetails;
}) {
  const docs = [
    {
      title: "National ID (NID)",
      meta: `ID: ${maskValue(agent?.verificationDocuments?.nid?.number)}`,
      verified: agent?.verificationDocuments?.nid?.isVerified ?? false,
      icon: ShieldCheck,
    },
    {
      title: "TIN Certificate",
      meta: `Tax ID: ${maskValue(agent?.verificationDocuments?.tin?.number)}`,
      verified: agent?.verificationDocuments?.tin?.isVerified ?? false,
      icon: FileText,
    },
  ];

  return (
    <Card>
      <div className="flex items-center gap-2">
        <BadgeCheck size={18} className="text-primary" />
        <p className="font-semibold text-black">Verification Documents</p>
      </div>

      <div className="mt-4 space-y-3">
        {docs.map((doc) => {
          const Icon = doc.icon;

          return (
            <div
              key={doc.title}
              className="flex items-center justify-between rounded-lg border border-gray/10 bg-white px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <Icon size={18} className="text-primary" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-black">
                    {doc.title}
                  </p>
                  <p className="mt-1 text-xs text-gray">{doc.meta}</p>
                </div>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  doc.verified
                    ? "bg-green/10 text-green"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {doc.verified ? "Verified" : "Unverified"}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}