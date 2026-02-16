import { LeaderRow } from "@/app/(dashboard)/admin/types/admin-details-type";
import Card from "@/components/cards/card";

function Avatar({ row }: { row: LeaderRow }) {
  if (row.avatarText) {
    return (
      <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
        <span className="text-xs font-semibold text-primary">
          {row.avatarText}
        </span>
      </div>
    );
  }
  return (
    <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
      <span className="text-xs font-semibold text-primary">
        {row.name.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
}

export default function AdminLeaderboards({
  topSellers,
  topBuyers,
}: {
  topSellers: LeaderRow[];
  topBuyers: LeaderRow[];
}) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-6 p-0 overflow-hidden border border-gray/15 rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray/10">
          <p className="text-sm font-semibold">Top Sellers</p>
          <button className="text-sm text-primary">
            View All
          </button>
        </div>

        <div className="px-5 py-3 border-b border-gray/10 bg-secondary/20">
          <div className="grid grid-cols-12 text-[11px] font-semibold tracking-widest text-gray">
            <p className="col-span-7">CLIENT NAME</p>
            <p className="col-span-2 text-center">SOLD</p>
            <p className="col-span-3 text-right">VOLUME</p>
          </div>
        </div>

        <div>
          {topSellers.map((r) => (
            <div
              key={r.id}
              className="grid grid-cols-12 items-center px-5 py-4 border-b border-gray/10"
            >
              <div className="col-span-7 flex items-center gap-3">
                <Avatar row={r} />
                <p className="text-sm font-semibold">{r.name}</p>
              </div>
              <p className="col-span-2 text-center text-sm font-semibold text-primary">
                {r.sold ?? 0}
              </p>
              <p className="col-span-3 text-right text-sm font-semibold text-gray">
                {r.volume}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 p-0 overflow-hidden border border-gray/15 rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray/10">
          <p className="text-sm font-semibold">Top Buyers</p>
          <button className="text-sm text-primary">
            View All
          </button>
        </div>

        <div className="px-5 py-3 border-b border-gray/10 bg-secondary/20">
          <div className="grid grid-cols-12 text-[11px] font-semibold tracking-widest text-gray">
            <p className="col-span-7">CLIENT NAME</p>
            <p className="col-span-2 text-center">PROPERTIES</p>
            <p className="col-span-3 text-right">SPENT</p>
          </div>
        </div>

        <div>
          {topBuyers.map((r) => (
            <div
              key={r.id}
              className="grid grid-cols-12 items-center px-5 py-4 border-b border-gray/10"
            >
              <div className="col-span-7 flex items-center gap-3">
                <Avatar row={r} />
                <p className="text-sm font-semibold">{r.name}</p>
              </div>
              <p className="col-span-2 text-center text-sm font-semibold text-primary">
                {r.properties ?? 0}
              </p>
              <p className="col-span-3 text-right text-sm font-semibold text-gray">
                {r.spent}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
