// 1) components/offers/select-property-dialog.tsx
"use client";

import * as React from "react";
import { Search, ChevronDown, MapPin } from "lucide-react";
import Button from "@/components/buttons/button";
import { cn } from "@/lib/utils";
import Dialog from "@/components/dialogs/dialog";

export type ListingStatus = "Active" | "Pending";

export type Listing = {
  id: string;
  title: string;
  location: string;
  price: number;
  status: ListingStatus;
  thumbBg: string; // demo only
};

function ListingStatusPill({ status }: { status: ListingStatus }) {
  if (status === "Active") {
    return (
      <span className="inline-flex items-center rounded-full bg-green/10 px-3 py-1 text-xs font-semibold text-green">
        Active
      </span>
    );
  }

  // screenshot shows yellow-ish pill → ok to use custom color
  return (
    <span className="inline-flex items-center rounded-full bg-[#fff7e6] px-3 py-1 text-xs font-semibold text-[#a35b00]">
      Pending
    </span>
  );
}

export default function SelectPropertyDialog({
  open,
  onOpenChange,
  requestTitle,
  requestId,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  requestTitle: string;
  requestId: string | number;
  onConfirm: (listing: Listing) => void;
}) {
  const listings = React.useMemo<Listing[]>(
    () => [
      {
        id: "LIST-101",
        title: "Modern Duplex Villa",
        location: "Road 11, Banani, Dhaka",
        price: 4000000,
        status: "Active",
        thumbBg: "#f43f5e",
      },
      {
        id: "LIST-102",
        title: "Commercial Space in Gulshan",
        location: "Gulshan 1, Dhaka",
        price: 20000000,
        status: "Active",
        thumbBg: "#22c55e",
      },
      {
        id: "LIST-103",
        title: "3 Bedroom Apartment in Uttara",
        location: "Sector 4, Uttara, Dhaka",
        price: 9512000,
        status: "Active",
        thumbBg: "#3b82f6",
      },
      {
        id: "LIST-104",
        title: "Ready Flat in Bashundhara R/A",
        location: "Block C, Bashundhara R/A",
        price: 4000000,
        status: "Pending",
        thumbBg: "#f59e0b",
      },
    ],
    [],
  );

  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"All" | ListingStatus>("Active");
  const [selectedId, setSelectedId] = React.useState<string>("LIST-101");

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setStatus("Active");
      setSelectedId("LIST-101");
    }
  }, [open]);

  const filtered = listings.filter((l) => {
    const matchesQuery =
      !query.trim() ||
      l.title.toLowerCase().includes(query.toLowerCase()) ||
      l.id.toLowerCase().includes(query.toLowerCase());

    const matchesStatus = status === "All" ? true : l.status === status;
    return matchesQuery && matchesStatus;
  });

  const selected = filtered.find((x) => x.id === selectedId) ?? listings[0];

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      size="lg"
      position="center"
      className="rounded-2xl"
    >
      <div className="overflow-hidden rounded-2xl">
        {/* Header */}
        <div className=" bg-white px-6 py-5">
          <div className="pr-10">
            <h3 className="text-lg font-semibold text-gray">
              Select Property to Offer
            </h3>

            <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 text-sm text-gray">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                i
              </span>
              <span className="text-gray/80">
                Offering for:{" "}
                <span className="font-semibold text-primary">
                  {requestTitle} (#{requestId})
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="px-6 pt-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray/50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find your listing by title or ID that matches"
                className="h-11 w-full rounded-xl border  pl-10 pr-3 text-sm text-gray outline-none focus:border-primary/40"
              />
            </div>

            <div className="relative w-full md:w-[220px]">
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "All" | ListingStatus)
                }
                className="h-11 w-full appearance-none rounded-xl border bg-white px-3 pr-10 text-sm text-gray outline-none focus:border-primary/40"
              >
                <option value="All">Status: All</option>
                <option value="Active">Status: Active</option>
                <option value="Pending">Status: Pending</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray/60" />
            </div>
          </div>
        </div>

        {/* List */}
        <div className="px-6 pb-5 pt-4">
          <div className="space-y-3">
            {filtered.map((l) => {
              const isSelected = l.id === selectedId;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setSelectedId(l.id)}
                  className={cn(
                    "w-full rounded-2xl border bg-white p-4 text-left transition-all",
                    isSelected
                      ? "border-primary shadow-sm"
                      : "border-gray/20 hover:border-primary/30",
                  )}
                >
                  <div className="flex items-center gap-4">
                    {/* Thumbnail */}
                    <div className="h-16 w-16 overflow-hidden rounded-xl bg-secondary">
                      <div
                        className="h-full w-full"
                        style={{ backgroundColor: l.thumbBg, opacity: 0.18 }}
                      />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <p className="truncate text-base font-semibold text-gray">
                          {l.title}
                        </p>
                        <ListingStatusPill status={l.status} />
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-sm text-gray/70">
                        <MapPin className="h-4 w-4" />
                        <span className="truncate">{l.location}</span>
                      </div>

                      <p className="mt-1 text-sm font-semibold text-primary">
                        ৳ {l.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Radio */}
                    <div
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full border",
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-gray/30 bg-white",
                      )}
                    >
                      {isSelected ? (
                        <div className="h-2 w-2 rounded-full bg-white" />
                      ) : null}
                    </div>
                  </div>
                </button>
              );
            })}

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed bg-secondary p-10 text-center text-sm text-gray/70">
                No listings found. Try a different search.
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t bg-white px-6 py-4">
          <Button
            variant="secondary"
            className="h-11 rounded-xl border border-gray/20"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            className="h-11 rounded-xl"
            disabled={!selected}
            onClick={() => selected && onConfirm(selected)}
          >
            Confirm Offer
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
