"use client";

import ApprovedDialog from "@/app/(admin)/admin/dashboard/(pages)/buy-requests/_components/approved-dialog";
import BuyRequestPagination from "@/app/(admin)/admin/dashboard/(pages)/buy-requests/_components/buy-request-pagination";
import BuyRequestRow from "@/app/(admin)/admin/dashboard/(pages)/buy-requests/_components/buy-request-row";
import BuyRequestTabsSearch from "@/app/(admin)/admin/dashboard/(pages)/buy-requests/_components/buy-request-tabs-search";
import {
  buyRequestTabs,
  demoBuyRequests,
} from "@/app/(admin)/admin/dummy-data/buy-request.data";
import {
  BuyRequestSortKey,
  BuyRequestTabKey,
} from "@/app/(admin)/admin/types/buy-request.types";
import Button from "@/components/buttons/button";
import { CircleCheckBig, CircleOff, Download, X } from "lucide-react";
import { useMemo, useState } from "react";

export default function BuyRequestList() {
  const [tab, setTab] = useState<BuyRequestTabKey>("pending_validation");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<BuyRequestSortKey>("newest_first");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [approved, setApproved] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);
  const seletectedPostLength = Object.keys(selected).length;

  const filtered = useMemo(() => {
    const base = demoBuyRequests.filter((r) => {
      const inTab =
        tab === "pending_validation"
          ? r.statusLabel === "Pending"
          : tab === "active_listings"
            ? r.statusLabel === "Active"
            : r.statusLabel === "Archived";

      if (!inTab) return false;

      return `${r.title} ${r.id} ${r.user.name} ${r.locationLine}`
        .toLowerCase()
        .includes(q.toLowerCase());
    });

    const copy = [...base];
    if (sort === "oldest_first") copy.reverse();
    return copy;
  }, [q, sort, tab]);

  const selectedIds = useMemo(
    () => Object.keys(selected).filter((k) => selected[k]),
    [selected],
  );

  const allChecked =
    filtered.length > 0 && selectedIds.length === filtered.length;

  function toggle(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleAllVisible() {
    if (allChecked) {
      setSelected((prev) => {
        const copy = { ...prev };
        filtered.forEach((r) => delete copy[r.id]);
        return copy;
      });
      return;
    }

    setSelected((prev) => {
      const copy = { ...prev };
      filtered.forEach((r) => (copy[r.id] = true));
      return copy;
    });
  }

  return (
    <div className="w-full">
      <BuyRequestTabsSearch
        tabs={buyRequestTabs}
        tab={tab}
        onTabChange={setTab}
        q={q}
        onQChange={setQ}
        sort={sort}
        onSortChange={setSort}
      />

      {/*  buypost list */}
      <div className="mt-4 space-y-4">
        <div className="hidden lg:grid grid-cols-12 mt-10 px-5 gap-4 text-[11px] font-semibold">
          <div className="col-span-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={allChecked}
              onChange={() => {}}
              className="h-4 w-4 accent-primary"
            />
            <p className="text-gray">USER PROFILE</p>
          </div>

          <div className="col-span-4 flex items-center text-gray">
            REQUIREMENTS & LOCATION
          </div>

          <div className="col-span-2 flex items-center text-gray">
            DESCRIPTION
          </div>

          <div className="col-span-2 flex items-center justify-end text-gray">
            ACTIONS
          </div>
        </div>

        {filtered.map((r) => (
          <BuyRequestRow
            key={r.id}
            item={r}
            checked={!!selected[r.id]}
            onToggle={() => toggle(r.id)}
            setApproved={setApproved}
            setPostId={setPostId}
          />
        ))}
      </div>

      {/* pagination */}
      <BuyRequestPagination
        showingFrom={1}
        showingTo={Math.min(filtered.length, 5)}
        total={42}
        onToggleAllVisible={toggleAllVisible}
      />

      {/* selected option area */}
      {seletectedPostLength > 0 && (
        <div className=" flex items-center justify-center w-full mt-10">
          <div className="flex items-center gap-4 border-gray/20 border p-4 rounded-md shadow-lg bg-white">
            <div className="border-r pr-4 flex gap-2 items-center">
              <p className="bg-primary rounded-full text-white text-sm h-6 w-6 p-2 flex items-center">
                {seletectedPostLength}
              </p>
              <span className="text-sm font-semibold">Seleted Items</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button>
                <CircleCheckBig size={18} />
                Approve Selected
              </Button>

              <Button variant="secondary">
                <Download size={18} />
                Move to Archive
              </Button>

              <Button
                variant="secondary"
                className="bg-red-200 border-red-400 border"
              >
                <CircleOff size={18} />
                Reject Selected
              </Button>

              <button className="text-gray" onClick={() => setSelected({})}>
                <X size={22} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* approved dialog */}
      <ApprovedDialog openDialog={approved} handleOpenDialog={setApproved} postId={postId}/>
    </div>
  );
}
