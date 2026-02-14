import Card from "@/components/cards/card";

export default function UserAccountMetricsCard() {
  const activeListings = 5;
  const bought = 2;

  return (
    <Card>
      <p className="text-sm font-semibold text-black uppercase tracking-wide">
        Account Metrics
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <MetricBox label="Active Listings" value={activeListings} />
        <MetricBox label="Bought" value={bought} />
      </div>
    </Card>
  );
}

function MetricBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-gray/10 bg-secondary/30 px-4 py-4 text-center">
      <p className="text-xs text-gray">{label}</p>
      <p className="mt-2 text-xl font-semibold text-primary">{value}</p>
    </div>
  );
}
