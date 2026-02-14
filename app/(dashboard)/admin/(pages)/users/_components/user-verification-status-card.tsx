import Card from "@/components/cards/card";

export default function UserVerificationStatusCard() {
  // screenshot static
  const items = [
    { title: "NID Verification Pending", subtitle: "Verification Pending" },
    { title: "TIN Verification Pending", subtitle: "Verification Pending" },
  ];

  return (
    <Card>
      <p className="text-sm font-semibold text-black uppercase tracking-wide">
        Verification Status
      </p>

      <div className="mt-4 space-y-4">
        {items.map((i) => (
          <div key={i.title} className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-[#fff7ed] flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-[#f97316]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-black">{i.title}</p>
              <p className="text-xs text-gray mt-1">{i.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
