import Button from "@/components/buttons/button";
import { Plus, Search, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function LandTypesToolbar({
  query,
  onQueryChange,
  onAdd,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  onAdd: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* left controls */}
      <div className="flex flex-1 items-center gap-4">
        {/* search */}
        <div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-gray/15 bg-white px-4">
          <Search className="h-4 w-4 text-gray" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="h-full w-full bg-transparent text-sm text-primary outline-none placeholder:text-gray"
            placeholder=""
          />
        </div>

        {/* dropdown filter (visual only) */}
        <div className="flex h-12 w-[220px] items-center justify-between rounded-xl border border-gray/15 bg-white px-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-gray" />
          </div>
          <ChevronDown className="h-4 w-4 text-gray" />
        </div>
      </div>

      {/* right */}
      <Button variant="primary" onClick={onAdd} size="base">
        <Plus className="h-4 w-4" />
        Add Land Type
      </Button>
    </div>
  );
}
