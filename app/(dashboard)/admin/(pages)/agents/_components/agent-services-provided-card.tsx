import Card from "@/components/cards/card";
import { Wrench } from "lucide-react";

const services = [
  { title: "Ownership History Validation", price: "৳ 3000" },
  { title: "Pentagraph Map Validation", price: "৳ 3000" },
  { title: "Physical Estimate .....", price: "৳ 3000" },
  { title: "Document Organization", price: "৳ 3000" },
];

export default function AgentServicesProvidedCard() {
  return (
    <Card>
      <div className="flex items-center gap-2">
        <Wrench size={18} className="text-primary" />
        <p className="font-semibold text-black">Services Provided</p>
      </div>

      <div className="mt-4 space-y-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-lg border border-gray/10 bg-secondary px-4 py-3 flex items-center justify-between"
          >
            <p className="text-sm text-black">{s.title}</p>
            <p className="text-sm text-primary font-semibold">{s.price}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="text-xs text-gray hover:text-black">
          + 5 more services
        </button>
      </div>
    </Card>
  );
}
