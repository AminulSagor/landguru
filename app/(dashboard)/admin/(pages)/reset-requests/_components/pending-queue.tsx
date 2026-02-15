import QueueItem from "@/app/(dashboard)/admin/(pages)/reset-requests/_components/queue-item";
import { ResetRequest } from "@/app/(dashboard)/admin/types/admin-reset-types";
import Card from "@/components/cards/card";
import { Search } from "lucide-react";

export default function PendingQueue({ items }: { items: ResetRequest[] }) {
  const activeId = items?.[0]?.id;

  return (
    <Card className="p-0 overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between px-5 pt-5">
        <p className="text-xs font-semibold tracking-widest text-primary">
          PENDING QUEUE
        </p>

        <span className="rounded-full bg-secondary/40 px-3 py-1 text-xs font-semibold text-gray">
          {items.length} Requests
        </span>
      </div>

      {/* search */}
      <div className="px-5 pb-4 pt-3">
        <div className="flex h-11 items-center gap-2 rounded-xl border border-gray/15 bg-white px-3">
          <Search className="h-4 w-4 text-gray" />
          <input
            placeholder=""
            className="h-full w-full bg-transparent text-sm text-primary outline-none placeholder:text-gray"
          />
        </div>
      </div>

      {/* list */}
      <div>
        {items.map((item) => (
          <QueueItem key={item.id} item={item} active={item.id === activeId} />
        ))}
      </div>
    </Card>
  );
}
