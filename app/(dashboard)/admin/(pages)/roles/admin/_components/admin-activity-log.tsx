import { ActivityLogRow } from "@/app/(dashboard)/admin/types/admin-details-type";
import Card from "@/components/cards/card";

export default function AdminActivityLog({
  items,
}: {
  items: ActivityLogRow[];
}) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray/10">
        <p className="text-lg">
          Recent Activity Log
        </p>
      </div>

      <div className="px-5 py-4 space-y-5">
        {items.map((a) => {
          const dot =
            a.tone === "blue"
              ? "bg-primary"
              : "bg-secondary border border-gray/20";
          return (
            <div key={a.id} className="flex items-start justify-between gap-6">
              <div className="flex items-start gap-3">
                <span className={`mt-2 h-2 w-2 rounded-full ${dot}`} />
                <div>
                  <p className="text-sm font-semibold">
                    {a.title}
                  </p>
                  <p className="text-sm font-medium text-gray">{a.desc}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray">{a.timeText}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
