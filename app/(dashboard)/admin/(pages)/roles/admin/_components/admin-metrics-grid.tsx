import { AdminMiniStat } from "@/app/(dashboard)/admin/types/admin-details-type";
import Card from "@/components/cards/card";
import { Box, Wallet, Timer, TrendingUp } from "lucide-react";

function metricIcon(id: AdminMiniStat["id"]) {
  const cls = "h-5 w-5";
  if (id === "inventory") return <Box className={cls} />;
  if (id === "txn") return <Wallet className={cls} />;
  if (id === "services") return <Timer className={cls} />;
  return <TrendingUp className={cls} />;
}

function accentBox(accent?: AdminMiniStat["accent"]) {
  if (accent === "purple") return "bg-[#F3E8FF] text-[#6D28D9]";
  if (accent === "orange") return "bg-[#FFE8D6] text-[#9A3412]";
  if (accent === "green") return "bg-[#DCFCE7] text-[#166534]";
  return "bg-[#DBEAFE] text-[#1D4ED8]";
}

export default function AdminMetricsGrid({
  items,
}: {
  items: AdminMiniStat[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((m) => (
        <Card key={m.id} className="">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray">{m.title}</p>
              <p className="mt-2 text-2xl font-semibold text-primary">
                {m.value}
              </p>

              {(m.helperLeft || m.helperRight) && (
                <div className="mt-3 flex items-center gap-3">
                  {m.helperLeft && (
                    <span className="rounded-md bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                      {m.helperLeft}
                    </span>
                  )}
                  {m.helperRight && (
                    <span className="rounded-md bg-secondary px-3 py-1 text-xs font-semibold text-gray">
                      {m.helperRight}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div
              className={`h-10 w-10 rounded-xl flex items-center justify-center ${accentBox(m.accent)}`}
            >
              {metricIcon(m.id)}
            </div>
          </div>

          {/* tiny extras like screenshot (keep simple static) */}
          {m.id === "txn" && (
            <div className="mt-4">
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div className="h-full w-[60%] rounded-full bg-[#A855F7]" />
              </div>
              <div className="mt-2 flex justify-between text-xs font-medium text-gray">
                <span>Sold</span>
                <span>৳ 12.5 Cr</span>
              </div>
              <div className="mt-1 flex justify-between text-xs font-medium text-gray">
                <span>Bought</span>
                <span>৳ 10.2 Cr</span>
              </div>
            </div>
          )}

          {m.id === "services" && (
            <div className="mt-4 flex items-center gap-6">
              <div>
                <p className="text-sm font-semibold text-primary">320</p>
                <p className="text-xs font-medium text-gray">Provided</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">12</p>
                <p className="text-xs font-medium text-gray">Ongoing</p>
              </div>
            </div>
          )}

          {m.id === "revenue" && (
            <div className="mt-3 inline-flex items-center rounded-md bg-[#DCFCE7] px-3 py-1 text-xs font-semibold text-[#166534]">
              {m.helperRight}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
