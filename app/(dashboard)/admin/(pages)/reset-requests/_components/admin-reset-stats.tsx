import { ResetStat } from "@/app/(dashboard)/admin/types/admin-reset-types";
import Card from "@/components/cards/card";
import { CheckCircle2, Users, AlertCircle } from "lucide-react";

function StatIcon({ id }: { id: string }) {
  if (id === "pending") return <AlertCircle className="h-4 w-4" />;
  if (id === "processed") return <CheckCircle2 className="h-4 w-4" />;
  return <Users className="h-4 w-4" />;
}

export default function AdminResetStats({ stats }: { stats: ResetStat[] }) {
  return (
    <div className="grid grid-cols-12 gap-5">
      {stats.map((s) => (
        <Card key={s.id} className="col-span-12 md:col-span-4 p-6">
          {/* top row */}
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-gray">{s.title}</p>

            {s.status === "critical" && (
              <span className="rounded-full bg-red-100 text-red-500 px-3 py-1 text-xs font-semibold">
                Critical
              </span>
            )}
          </div>

          {/* value row */}
          <div className="mt-3 flex items-center gap-2">
            <p className="text-4xl font-semibold leading-none text-primary">
              {s.value}
            </p>

            <span
              className={[
                "mt-1",
                s.id === "processed" ? "text-green" : "text-primary",
              ].join(" ")}
            >
              <StatIcon id={s.id} />
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
