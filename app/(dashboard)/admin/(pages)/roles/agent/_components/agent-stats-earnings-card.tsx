import Card from "@/components/cards/card";

export default function AgentStatsEarningsCard() {
  // Screenshot static
  const earned = "৳ 4,000";
  const note = "Last payout: 2 days ago";

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs tracking-wide text-gray uppercase">Total Earned</p>
          <p className="text-3xl font-semibold text-black mt-2">{earned}</p>
          <p className="text-xs text-gray mt-1">{note}</p>
        </div>

        <div className="h-7 w-7 rounded-md bg-green/10 flex items-center justify-center">
          <span className="text-green font-semibold text-sm">৳</span>
        </div>
      </div>
    </Card>
  );
}
