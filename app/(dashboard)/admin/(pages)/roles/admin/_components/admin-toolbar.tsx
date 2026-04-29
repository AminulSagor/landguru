import { Search, ChevronDown } from "lucide-react";

export default function AdminToolbar({
  query,
  onQueryChange,
  zone,
  zoneOptions,
  onZoneChange,
  tab,
  onTabChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  zone: string;
  zoneOptions: string[];
  onZoneChange: (v: string) => void;
  tab: "active" | "suspended";
  onTabChange: (v: "active" | "suspended") => void;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-3">
        {/* search */}
        <div className="flex h-11 flex-1 items-center gap-3 rounded-xl border border-gray/15 bg-white px-4">
          <Search className="h-4 w-4 text-gray" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by name or email"
            className="h-full w-full bg-transparent text-sm text-primary outline-none placeholder:text-gray"
          />
        </div>

        {/* zone dropdown */}
        <div className="relative w-[200px]">
          <select
            value={zone}
            onChange={(e) => onZoneChange(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-gray/15 bg-white px-4 text-sm font-medium text-gray outline-none"
          >
            <option value="">All Zone</option>
            {zoneOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
        </div>
      </div>

      {/* tabs */}
      <div className="flex items-center gap-2 rounded-xl bg-secondary/30 p-1">
        <button
          type="button"
          onClick={() => onTabChange("active")}
          className={[
            "h-9 rounded-lg px-5 text-sm font-semibold",
            tab === "active" ? "bg-white text-primary" : "text-gray",
          ].join(" ")}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => onTabChange("suspended")}
          className={[
            "h-9 rounded-lg px-5 text-sm font-semibold",
            tab === "suspended" ? "bg-white text-primary" : "text-gray",
          ].join(" ")}
        >
          Suspended
        </button>
      </div>
    </div>
  );
}
