import Button from "@/components/buttons/button";
import { Plus, Search, SlidersHorizontal } from "lucide-react";

export default function LocationsToolbar({
  query,
  onQueryChange,
  onAdd,
  onFilter,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  onAdd: () => void;
  onFilter: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-end">
        <Button variant="primary" onClick={onAdd} size="base">
          <Plus className="h-4 w-4" />
          Add New Zone
        </Button>
      </div>

      <div className="flex items-center gap-3">
        {/* search bar */}
        <div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-gray/15 bg-white px-4">
          <Search className="h-4 w-4 text-gray" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder=""
            className="h-full w-full bg-transparent text-sm text-primary outline-none placeholder:text-gray"
          />
        </div>

        {/* filter btn */}
        <button
          type="button"
          onClick={onFilter}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-secondary px-4 text-sm font-semibold text-gray hover:text-primary"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </button>
      </div>
    </div>
  );
}
